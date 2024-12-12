import { http, createConfig, createStorage } from "wagmi";
import {
  sepolia,
  mainnet,
  baseSepolia,
  polygonAmoy,
  mantleSepoliaTestnet,
} from "wagmi/chains";
import { connectors } from "./wallets";
import { Chain } from "@rainbow-me/rainbowkit";

const chains: readonly [Chain, ...Chain[]] = [
  sepolia,
  mainnet,
  baseSepolia,
  polygonAmoy,
  mantleSepoliaTestnet,
];

export const config = createConfig({
  chains,
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
