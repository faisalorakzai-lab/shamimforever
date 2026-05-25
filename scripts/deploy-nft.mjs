#!/usr/bin/env node
/**
 * Shamim Forever — SovereignAssetProtocol Deploy Script
 * Run: node scripts/deploy-nft.mjs
 * Requires: MINTER_PRIVATE_KEY, ALCHEMY_RPC_URL env vars
 */
import { createWalletClient, createPublicClient, http, parseGwei } from 'viem'
import { polygon } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

// Pre-compiled bytecode (compiled from SovereignAssetProtocol.sol)
// NOTE: If you need to recompile, use: npx hardhat compile
// For fresh compilation, paste contract into remix.ethereum.org and copy bytecode
const CONTRACT_ABI = [
  { type: 'constructor', inputs: [{ name: 'initialOwner', type: 'address' }, { name: 'defaultRoyaltyFeeNumerator', type: 'uint96' }] },
  { name: 'mintSovereignAsset', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'to', type: 'address' }, { name: 'uri', type: 'string' }, { name: 'serialNumber', type: 'string' }, { name: 'rarityTier', type: 'string' }], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'ownerOf', type: 'function', stateMutability: 'view', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ name: '', type: 'address' }] },
  { name: 'totalSupply', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'balanceOf', type: 'function', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'tokenOfOwnerByIndex', type: 'function', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }, { name: 'index', type: 'uint256' }], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'tokenURI', type: 'function', stateMutability: 'view', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ name: '', type: 'string' }] },
  { name: 'getSerialByToken', type: 'function', stateMutability: 'view', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ name: '', type: 'string' }] },
  { name: 'getRarityByToken', type: 'function', stateMutability: 'view', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ name: '', type: 'string' }] },
]

async function main() {
  const pk = process.env.MINTER_PRIVATE_KEY
  const rpcUrl = process.env.ALCHEMY_RPC_URL
  if (!pk || !rpcUrl) throw new Error('MINTER_PRIVATE_KEY and ALCHEMY_RPC_URL must be set')

  const account = privateKeyToAccount(pk)
  const transport = http(rpcUrl)
  const publicClient = createPublicClient({ chain: polygon, transport })
  const walletClient = createWalletClient({ account, chain: polygon, transport })

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  Shamim Forever — Sovereign Asset Protocol Deployment')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  Network:    Polygon Mainnet')
  console.log('  Deployer:  ', account.address)
  
  const balance = await publicClient.getBalance({ address: account.address })
  const maticBal = Number(balance) / 1e18
  console.log('  Balance:   ', maticBal.toFixed(4), 'MATIC')
  
  if (maticBal < 0.01) {
    console.error('\n  ❌ Insufficient MATIC balance. Need at least 0.01 MATIC for deployment gas.')
    console.error('  Fund this address:', account.address)
    process.exit(1)
  }

  console.log('\n  Deploying SovereignAssetProtocol...')
  console.log('  Royalty:    750 basis points (7.5%)')
  console.log('  Owner:     ', account.address)

  // NOTE: Paste bytecode here after compiling via Remix or Hardhat
  // Remix: https://remix.ethereum.org → paste SovereignAssetProtocol.sol → compile → copy bytecode
  const BYTECODE = process.env.CONTRACT_BYTECODE
  if (!BYTECODE) {
    console.log('\n  📋 COMPILATION REQUIRED:')
    console.log('  1. Open https://remix.ethereum.org')
    console.log('  2. Create file: SovereignAssetProtocol.sol')
    console.log('  3. Paste the contract code from contracts/SovereignAssetProtocol.sol')
    console.log('  4. Compile with Solidity 0.8.22')
    console.log('  5. Copy bytecode and set: CONTRACT_BYTECODE=0x... node scripts/deploy-nft.mjs')
    console.log('\n  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('  Deployer Wallet Address:', account.address)
    console.log('  Fund with MATIC, then deploy via Remix → Injected Provider (MetaMask)')
    console.log('  Constructor args: initialOwner =', account.address, ', royalty = 750')
    return
  }

  // Deploy via bytecode
  const hash = await walletClient.deployContract({
    abi: CONTRACT_ABI,
    bytecode: BYTECODE,
    args: [account.address, 750n],
    account,
  })

  console.log('\n  ⏳ Transaction sent:', hash)
  const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 3 })
  console.log('\n  ✅ CONTRACT DEPLOYED!')
  console.log('  Address:', receipt.contractAddress)
  console.log('\n  ⚡ Next steps:')
  console.log('  1. Set NFT_CONTRACT_ADDRESS=' + receipt.contractAddress + ' in Vercel env vars')
  console.log('  2. Set NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=' + receipt.contractAddress + ' in Vercel')
  console.log('  3. Verify on Polygonscan: https://polygonscan.com/address/' + receipt.contractAddress)
  console.log('  4. Set up Alchemy webhook for ProvenanceUpdated events → /api/nft/webhook')
}

main().catch(console.error)
