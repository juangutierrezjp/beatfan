import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import db from 'src/db/lowdb';

const envPath = path.resolve(process.cwd(), '../.env');
dotenv.config({ path: envPath });

@Injectable()
export class ArtTokenService {
  async deployArtTokenContract(
    artistWallet: string,
    platformWallet: string,
    name: string,
    symbol: string,
  ): Promise<{ contractAddress: string; id: string }> {

    const provider = new ethers.providers.JsonRpcProvider(process.env.MOONBASE_RPC!);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const contractPath = path.resolve(process.cwd(), '../', 'artifacts', 'contracts', 'ArtToken.sol', 'ArtToken.json');
    const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
    const factory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);

    const contract = await factory.deploy(name, symbol, 100_000_000, platformWallet, artistWallet);

    const id = crypto.randomUUID();

    await db.read()
    db.data!.contracts.push({
      id,
      artistWallet,
      platformWallet,
      name,
      symbol,
      contractAddress: contract.address,
      deployedAt: new Date().toISOString(),
    })
    await db.write()

    return { contractAddress: contract.address, id }
  }

  async findAll() {
    await db.read()
    return db.data!.contracts
  }

  async findOne(id: string) {
    await db.read()
    return db.data!.contracts.find((c) => c.id === id) || null
  }
}