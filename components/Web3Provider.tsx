'use client'

import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  RainbowKitProvider, darkTheme, getDefaultConfig,
  type AvatarComponent,
} from '@rainbow-me/rainbowkit'
import {
  trustWallet, metaMaskWallet, walletConnectWallet,
  coinbaseWallet, rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets'
import '@rainbow-me/rainbowkit/styles.css'

const APP_URL = 'https://shamimforever-api-server.vercel.app'
const APP_NAME = 'Shamim Forever'
const APP_DESCRIPTION = 'House of Shamim Forever — Luxury Perfume & Jewelry, Polygon Payments'
const APP_ICON = `${APP_URL}/logo.png`

const config = getDefaultConfig({
  appName: APP_NAME,
  appDescription: APP_DESCRIPTION,
  appUrl: APP_URL,
  appIcon: APP_ICON,
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

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
})

const ShamimAvatar: AvatarComponent = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      background: 'linear-gradient(135deg, #c9a054, #8b6914)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.4,
      fontFamily: 'Georgia, serif',
      color: '#050505',
      fontWeight: 600,
    }}
  >
    SF
  </div>
)

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          avatar={ShamimAvatar}
          theme={darkTheme({
            accentColor: '#c9a054',
            accentColorForeground: '#050505',
            borderRadius: 'none',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          modalSize="compact"
          appInfo={{
            appName: APP_NAME,
            learnMoreUrl: APP_URL,
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
