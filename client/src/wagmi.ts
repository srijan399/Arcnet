import { http, createConfig, createStorage } from "wagmi";
import {
  sepolia,
  mainnet,
  baseSepolia,
  polygonAmoy,
  mantleSepoliaTestnet,
} from "wagmi/chains";
import { connectors } from "./wallets";

export const config = createConfig({
  chains: [sepolia, mainnet, baseSepolia, polygonAmoy, mantleSepoliaTestnet],
  storage: createStorage({ storage: window.localStorage }),
  connectors,
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [mantleSepoliaTestnet.id]: http(),
  },
  ssr: true,
});
