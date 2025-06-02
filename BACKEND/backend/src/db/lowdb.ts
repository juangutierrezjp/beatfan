// src/db/lowdb.ts
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

type Contract = {
  id: string;
  artistWallet: string;
  platformWallet: string;
  name: string;
  symbol: string;
  contractAddress: string;
  deployedAt: string;
}

type Data = {
  contracts: Contract[]
}

const adapter = new JSONFile<Data>('contracts.json')
const db = new Low<Data>(adapter, { contracts: [] });

// Inicializar con estructura por defecto si está vacío
(async () => {
  await db.read()
  db.data ||= { contracts: [] }
  await db.write()
})();

export default db
