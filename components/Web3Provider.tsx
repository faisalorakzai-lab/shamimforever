'use client'

import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { trustWallet, metaMaskWallet, walletConnectWallet, coinbaseWallet, rainbowWallet } from '@rainbow-me/rainbowkit/wallets'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'Shamim Forever',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'f8a6b7d9e3c14a2b8f5d1e7c9a4b3d2e',
  chains: [polygon],
  ssr: true,
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, trustWallet, walletConnectWallet],
    },
    {
      groupName: 'More',
      wallets: [coinbaseWallet, rainbowWallet],
    },
  ],
})

const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#c9a054',
            accentColorForeground: '#050505',
            borderRadius: 'none',
            fontStack: 'system',
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
