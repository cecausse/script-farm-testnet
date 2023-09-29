import { ethers } from "hardhat";
import { L2NETWORK } from "../../bridgeConfig";
import { FeeData, Provider } from "@ethersproject/abstract-provider";
import { Signer } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export async function l2Bridge(
  network: string,
  nbAddress: number,
  provider: Signer | Provider,
  accounts: SignerWithAddress[],
  feeData: FeeData
) {
  const l2 = L2NETWORK[network];
  const bridgeContract = new ethers.Contract(l2.bridge, l2.abi, provider);
  let tab = [];
  for (let i = 0; i < nbAddress; i++) {
    let recipient = await accounts[i].getAddress();
    let valueFunc: any[] = l2.abi[0].inputsValues;
    // replace with current account address where is necessary
    const newValueFunc = valueFunc.map((val) =>
      val === "recipient" ? recipient : val
    );
    let txData = bridgeContract.interface.encodeFunctionData(
      l2.abi[0].name,
      newValueFunc
    );
    let txResponse = await accounts[i].sendTransaction({
      to: l2.bridge,
      data: txData,
      value: l2.amountTx,
      maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"] || 0,
      maxFeePerGas: feeData["maxFeePerGas"] || 0,
      gasLimit:
        network == "linea" ? L2NETWORK.gasLimitLinea : L2NETWORK.gasLimitBase,
      chainId: 5,
    });
    tab.push({ network: network, address: recipient, tx: txResponse.hash });
  }
  return tab;
}
