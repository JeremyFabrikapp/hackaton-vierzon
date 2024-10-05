"use client"
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, createConfig } from 'wagmi'
import { localhost, mainnet, sepolia, base, baseSepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [localhost, base, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [localhost.id]: http(),
  },
})
