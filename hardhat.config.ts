import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { SEPOLIA_API_KEY, GOERLI_API_KEY, METAMASK_1, METAMASK_2, METAMASK_3 } =
  process.env;

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_API_KEY,
      accounts: [`${METAMASK_1}`, `${METAMASK_2}`, `${METAMASK_3}`],
    },
    goerli: {
      url: GOERLI_API_KEY,
      chainId: 5,
      accounts: [`${METAMASK_1}`, `${METAMASK_2}`, `${METAMASK_3}`],
    },
    linea: {
      url: `https://rpc.goerli.linea.build/`,
      accounts: [`${METAMASK_1}`, `${METAMASK_2}`, `${METAMASK_3}`],
    },
    scroll: {
      url: `https://alpha-rpc.scroll.io/l2`,
      accounts: [`${METAMASK_1}`, `${METAMASK_2}`, `${METAMASK_3}`],
    },
    "base-goerli": {
      url: `https://goerli.base.org`,
      chainId: 84531,
      accounts: [`${METAMASK_1}`, `${METAMASK_2}`, `${METAMASK_3}`],
    },
    mantle: {
      url: `https://rpc.testnet.mantle.xyz/`,
      chainId: 5001,
      accounts: [`${METAMASK_1}`, `${METAMASK_2}`, `${METAMASK_3}`],
    },
  },
  etherscan: {
    apiKey: {
      // Basescan doesn't require an API key, however
      // Hardhat still expects an arbitrary string to be provided.
      "base-goerli": "PLACEHOLDER_STRING",
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org",
        },
      },
    ],
  },

  solidity: "0.8.18",
};

export default config;
