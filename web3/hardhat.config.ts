import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MANTLESCAN_API_KEY = process.env.MANTLESCAN_API_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    mantleSepolia: {
      url: `${ALCHEMY_RPC_URL}`,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 5003,
    },
  },
  etherscan: {
    apiKey: {
      mantleSepolia: `${MANTLESCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "mantleSepolia",
        chainId: 5003,
        urls: {
          apiURL: `https://api-sepolia.mantlescan.xyz/api`,
          browserURL: "https://sepolia.mantlescan.xyz/",
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
