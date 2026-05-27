'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  useAccount, useWriteContract, useWaitForTransactionReceipt, useWalletClient
} from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseUnits } from 'viem'
import { Wallet, ShieldCheck, ExternalLink, Copy, Check, Plus } from 'lucide-react'

const MERCHANT_WALLET = '0x9b02e2Edd6F58D626aAa91889708dbF39dfa8Cd7' as const

const TOKEN_META = {
  USDT: {
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as const,
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    image: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
  },
  USDC: {
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' as const,
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    image: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
  },
  OKBOND: {
    address: '0xc89729DA02a8c2E282EC3070A9a680E01bE2E22F' as const,
    decimals: 18,
    symbol: 'OKBOND',
    name: 'OrakzaiBond',
    image: 'https://orakzaibond.com/logo.png',
  },
} as const

const ERC20_ABI = [
  {
    name: 'transfer',
    type: 'function' as const,
    stateMutability: 'nonpayable' as const,
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const

export type CoinType = keyof typeof TOKEN_META
export type PayStep = 'idle' | 'adding_token' | 'sending' | 'confirming' | 'done' | 'error'

interface Props {
  priceUsd: number
  onSuccess: (txHash: string, coin: CoinType) => void
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="flex items-center gap-1 text-[#c9a054] hover:text-zinc-100 transition-colors shrink-0"
    >
      {copied ? <Check size={9} /> : <Copy size={9} />}
      <span className="text-[7px] tracking-[0.25em] uppercase">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

export default function Web3PaySection({ priceUsd, onSuccess }: Props) {
  const [coin, setCoin] = useState<CoinType>('USDT')
  const [step, setStep] = useState<PayStep>('idle')
  const [errMsg, setErrMsg] = useState('')
  const [localTx, setLocalTx] = useState<`0x${string}` | undefined>()
  const [tokenAdded, setTokenAdded] = useState(false)

  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const { writeContract, isPending: isSending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash: localTx })

  const discount = coin === 'OKBOND' ? 0.10 : 0
  const finalUsd = parseFloat((priceUsd * (1 - discount)).toFixed(2))
  const token = TOKEN_META[coin]
  const tokenAmount = parseUnits(finalUsd.toFixed(coin === 'OKBOND' ? 6 : 2), token.decimals)

  useEffect(() => {
    if (isConfirmed && localTx) {
      setStep('done')
      onSuccess(localTx, coin)
    }
  }, [isConfirmed, localTx, coin, onSuccess])

  // Reset tokenAdded when coin changes
  useEffect(() => { setTokenAdded(false) }, [coin])

  async function addTokenToWallet() {
    if (!walletClient) return
    try {
      setStep('adding_token')
      await walletClient.watchAsset({
        type: 'ERC20',
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: token.image,
        },
      })
      setTokenAdded(true)
      setStep('idle')
    } catch {
      setStep('idle')
    }
  }

  function handlePay() {
    if (!isConnected || !address) return
    setErrMsg('')
    setStep('sending')
    writeContract(
      {
        address: token.address,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [MERCHANT_WALLET, tokenAmount],
      },
      {
        onSuccess: (hash) => { setLocalTx(hash); setStep('confirming') },
        onError: (err) => {
          setErrMsg(err.message?.split('\n')[0] ?? 'Transaction failed')
          setStep('error')
        },
      }
    )
  }

  return (
    <div className="space-y-4">
      {/* Coin selector */}
      <div className="flex gap-0 border border-[#1a1a1a]">
        {(Object.keys(TOKEN_META) as CoinType[]).map(c => (
          <button key={c} onClick={() => { setCoin(c); setStep('idle'); setErrMsg('') }}
            className={`flex-1 py-3 text-[8px] tracking-[0.18em] uppercase transition-all duration-300 border-b-2 ${coin === c ? 'text-[#c9a054] border-b-[#c9a054] bg-[#c9a054]/5' : 'text-zinc-600 border-b-transparent hover:text-zinc-400'}`}>
            {c}{c === 'OKBOND' ? ' −10%' : ''}
          </button>
        ))}
      </div>

      {/* OKBOND info + add to wallet */}
      {coin === 'OKBOND' && (
        <div className="px-4 py-3 bg-[#c9a054]/5 border border-[#c9a054]/15 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-500">Don't have OKBOND?</p>
              <p className="text-[8px] tracking-[0.2em] text-zinc-400 mt-0.5">Buy at $0.50/token</p>
            </div>
            <a href="https://orakzaibond.com" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-[8px] tracking-[0.25em] uppercase text-[#c9a054] hover:text-zinc-100 transition-colors">
              orakzaibond.com <ExternalLink size={9} />
            </a>
          </div>
          {/* Add OKBOND to MetaMask */}
          {isConnected && !tokenAdded && (
            <button onClick={addTokenToWallet}
              className="w-full flex items-center justify-center gap-2 py-2 border border-[#c9a054]/25 text-[7px] tracking-[0.3em] uppercase text-zinc-500 hover:text-[#c9a054] hover:border-[#c9a054]/40 transition-all">
              <Plus size={9} />
              Add OKBOND to MetaMask (shows name instead of Unknown)
            </button>
          )}
          {tokenAdded && (
            <p className="text-center text-[7px] tracking-[0.3em] uppercase text-emerald-400">
              ✓ OKBOND added to wallet
            </p>
          )}
        </div>
      )}

      {/* Price summary */}
      <div className="p-4 bg-[#080808] border border-[#1a1a1a] space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-[7px] tracking-[0.35em] uppercase text-zinc-600">You Pay</p>
          <div className="text-right">
            <p className="text-zinc-100 font-light text-base">{finalUsd.toFixed(2)} {coin}</p>
            {coin === 'OKBOND' && (
              <p className="text-[7px] tracking-[0.2em] uppercase text-[#c9a054]">10% Discount Applied</p>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-[#111]">
          <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">Merchant Wallet</p>
          <div className="flex items-center gap-2">
            <p className="text-zinc-500 text-[9px] font-mono">{MERCHANT_WALLET.slice(0, 8)}...{MERCHANT_WALLET.slice(-5)}</p>
            <CopyBtn text={MERCHANT_WALLET} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[7px] tracking-[0.3em] uppercase text-zinc-700">Network</p>
          <p className="text-zinc-500 text-[9px]">Polygon Mainnet</p>
        </div>
      </div>

      {/* Action */}
      {!isConnected ? (
        <div>
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button onClick={openConnectModal}
                className="w-full py-4 flex items-center justify-center gap-3 border border-[#c9a054]/40 text-[9px] tracking-[0.45em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500">
                <Wallet size={13} />
                Connect Wallet to Pay
              </button>
            )}
          </ConnectButton.Custom>
          <p className="text-center text-[7px] tracking-[0.3em] uppercase text-zinc-700 mt-2">
            MetaMask · Trust · WalletConnect · Coinbase
          </p>
        </div>
      ) : step === 'adding_token' ? (
        <div className="p-4 text-center">
          <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]">Approve in MetaMask...</p>
        </div>
      ) : step === 'confirming' ? (
        <div className="p-5 border border-[#c9a054]/20 bg-[#c9a054]/5 text-center space-y-3">
          <div className="w-5 h-5 border-2 border-[#c9a054] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[8px] tracking-[0.4em] uppercase text-[#c9a054]">Confirming on Polygon...</p>
          {localTx && (
            <a href={`https://polygonscan.com/tx/${localTx}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 text-[7px] tracking-[0.25em] uppercase text-zinc-600 hover:text-zinc-400 transition-colors">
              View on PolygonScan <ExternalLink size={9} />
            </a>
          )}
        </div>
      ) : step === 'done' ? (
        <div className="p-5 border border-emerald-500/20 bg-emerald-500/5 text-center space-y-2">
          <p className="text-emerald-400 text-xl">✓</p>
          <p className="text-[8px] tracking-[0.4em] uppercase text-emerald-400">Payment Confirmed on Polygon</p>
          {localTx && (
            <a href={`https://polygonscan.com/tx/${localTx}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 text-[8px] tracking-[0.25em] uppercase text-zinc-400 hover:text-zinc-200 transition-colors">
              Verify TX <ExternalLink size={9} />
            </a>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {isConnected && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-500 truncate">
                {address?.slice(0, 7)}...{address?.slice(-5)}
              </p>
            </div>
          )}
          {errMsg && (
            <p className="text-red-400/80 text-[9px] break-words">{errMsg}</p>
          )}
          <button
            onClick={handlePay}
            disabled={isSending}
            className="w-full py-4 flex items-center justify-center gap-3 border border-[#c9a054]/40 text-[9px] tracking-[0.45em] uppercase text-[#c9a054] hover:bg-[#c9a054]/10 transition-all duration-500 disabled:opacity-50"
          >
            <ShieldCheck size={13} />
            {isSending ? 'Approve in Wallet...' : `Pay ${finalUsd.toFixed(2)} ${coin}`}
          </button>
        </div>
      )}
    </div>
  )
}
