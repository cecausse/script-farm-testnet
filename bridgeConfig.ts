import { ethers } from "hardhat";

export const gasLimitBase = 300000;
export const gasLimitLinea = 1000000;
const amountToBridge = ethers.utils.parseEther("0.02");
const fee = ethers.utils.parseEther("0.00001");
const amountAndFee = amountToBridge.add(fee);

export const L2NETWORK: { [key: string]: any } = {
  scroll: {
    bridge: "0xe5E30E7c24e4dFcb281A682562E53154C15D3332",
    abi: [
      {
        inputs: [
          { internalType: "uint256", name: "_amount", type: "uint256" },
          { internalType: "uint256", name: "_gasLimit", type: "uint256" },
        ],
        inputsValues: [
          amountToBridge, //_amount
          gasLimitBase,
        ],
        name: "depositETH",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    amountTx: ethers.utils.parseEther("0.021"), //_amount + fee
    gasLimit: gasLimitBase,
  },
  base: {
    bridge: "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA",
    abi: [
      {
        inputs: [
          { internalType: "address", name: "_to", type: "address" },
          { internalType: "uint256", name: "_value", type: "uint256" },
          { internalType: "uint64", name: "_gasLimit", type: "uint64" },
          { internalType: "bool", name: "_isCreation", type: "bool" },
          { internalType: "bytes", name: "_data", type: "bytes" },
        ],
        inputsValues: [
          "recipient", //_to
          amountToBridge, //_value
          gasLimitBase, // _gasLimit
          false, //_isCreation
          0, //_data
        ],
        name: "depositTransaction",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    amountTx: amountToBridge,
  },
  linea: {
    bridge: "0xd9e10c6b1bd26de4e2749ce8afe8dd64294bcbf5",
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
            value: "0xe704",
          },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "address", name: "relayer", type: "address" },
          { internalType: "uint256", name: "relayerFee", type: "uint256" },
        ],
        inputsValues: [
          "0xe704", // chainId
          "recipient", // address
          ethers.utils.parseEther("0.05"), // amount
          ethers.utils.parseEther("0.03"), // amountOutMin
          Math.floor(Date.now() / 1000) + 3600, //deadline
          "0x81682250d4566b2986a2b33e23e7c52d401b7ab7", //relayer
          ethers.utils.parseEther("0.01"), // relayerFee
        ],
        name: "sendToL2",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    amountTx: ethers.utils.parseEther("0.06"), //special linea
  },
  mantle: {
    bridge: "0xc92470d7ffa21473611ab6c6e2fcfb8637c8f330",
    abi: [
      {
        inputs: [
          { internalType: "uint32", name: "_l2Gas", type: "uint32" },
          { internalType: "bytes", name: "_data", type: "bytes" },
        ],
        inputsValues: [
          gasLimitBase, //_l2Gas
          0, //_data
        ],
        name: "depositETH",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    amountTx: amountToBridge,
  },
};
