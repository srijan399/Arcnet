import { http, createConfig, createStorage } from "wagmi";
import {
  baseSepolia,
  mantleSepoliaTestnet,
  linea,
  lineaSepolia,
} from "wagmi/chains";
import { connectors } from "./wallets";
import { Chain } from "@rainbow-me/rainbowkit";

const chains: readonly [Chain, ...Chain[]] = [lineaSepolia, linea];

export const config = createConfig({
  chains,
  storage: createStorage({ storage: window.localStorage }),
  connectors,
  transports: {
    [lineaSepolia.id]: http(),
    [baseSepolia.id]: http(),
    [mantleSepoliaTestnet.id]: http(),
    [linea.id]: http(),
  },
  ssr: true,
});
