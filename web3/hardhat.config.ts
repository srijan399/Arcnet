import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const LINEASCAN_API_KEY = process.env.LINEASCAN_API_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    lineaSepolia: {
      url: `${ALCHEMY_RPC_URL}`,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 59141,
    },
  },
  etherscan: {
    apiKey: {
      lineaSepolia: `${LINEASCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "lineaSepolia",
        chainId: 59141,
        urls: {
          apiURL: `https://api-sepolia.lineascan.build/api`,
          browserURL: "https://sepolia.lineascan.build",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
  solidity: "0.8.28",
};

export default config;
