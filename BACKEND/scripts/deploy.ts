export async function deployContract(_artist: string) {
  //@ts-ignore
  const CareerToken = await ethers.getContractFactory("CareerToken");

  const name = "Career Token";
  const symbol = "CAREER";
  const maxSupply = 100_000_000;
  const platform = process.env.PLATFORM_WALLETS;
  const artist = _artist;

  const careerToken = await CareerToken.deploy(name, symbol, maxSupply, platform, artist);
  await careerToken.deployed();

  console.log("CareerToken desplegado en:", careerToken.address);
}