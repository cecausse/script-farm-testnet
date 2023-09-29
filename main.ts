import { ethers } from "hardhat";
import { log, getCurrentDate } from "./scripts/utils/utils";
import { l2Bridge } from "./scripts/bridge/l2Bridge";
const { GOERLI_API_KEY, NB_ADDRESS } = process.env;

async function main() {
  const accounts = await ethers.getSigners();
  const providerGoerli = new ethers.providers.JsonRpcProvider(GOERLI_API_KEY);
  const feeData = await providerGoerli.getFeeData();
  log(`| Network | Address | Tx |`);
  log(`| :-: |:-:| :-:|`);
  let resBase = await l2Bridge(
    "base",
    parseInt(NB_ADDRESS ?? "0"),
    providerGoerli,
    accounts,
    feeData
  );
  resBase.forEach(({ network, address, tx }) => {
    log(`| ${network} | ${address} | ${tx} |`);
  });

  let resLinea = await l2Bridge(
    "linea",
    parseInt(NB_ADDRESS ?? "0"),
    providerGoerli,
    accounts,
    feeData
  );
  resLinea.forEach(({ network, address, tx }) => {
    log(`| ${network} | ${address} | ${tx} |`);
  });
  let resScroll = await l2Bridge(
    "scroll",
    parseInt(NB_ADDRESS ?? "0"),
    providerGoerli,
    accounts,
    feeData
  );
  resScroll.forEach(({ network, address, tx }) => {
    log(`| ${network} | ${address} | ${tx} |`);
  });

  let resMantle = await l2Bridge(
    "mantle",
    parseInt(NB_ADDRESS ?? "0"),
    providerGoerli,
    accounts,
    feeData
  );
  resMantle.forEach(({ network, address, tx }) => {
    log(`| ${network} | ${address} | ${tx} |`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
