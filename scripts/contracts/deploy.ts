import { ethers, network } from "hardhat";
import { log } from "../utils/utils";

export async function deployContract() {
  const NFT = await ethers.getContractFactory("NuRapeupTestNft");
  for (let i = 0; i < 3; i++) {
    let signer = ethers.provider.getSigner(i);
    let address = await signer.getAddress();
    let nft = await NFT.connect(signer).deploy();
    await nft.deployed();
    log(`${address} deployed ${nft.address} on ${network.name}\n`);
  }
}

deployContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
