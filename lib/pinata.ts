// Pinata IPFS utilities — production sovereign NFT infrastructure

const PINATA_JWT = process.env.PINATA_JWT!
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/'

export interface NFTMetadata {
  name: string
  description: string
  image: string
  external_url: string
  background_color: string
  attributes: { trait_type: string; value: string | number; display_type?: string }[]
  unlockable_content?: { description: string; vault_gate_url: string }
}

export async function uploadMetadataToIPFS(metadata: NFTMetadata): Promise<string> {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PINATA_JWT}`,
    },
    body: JSON.stringify({
      pinataContent: metadata,
      pinataMetadata: { name: metadata.name + ' — Metadata' },
    }),
  })
  if (!res.ok) throw new Error(`Pinata JSON upload failed: ${await res.text()}`)
  const data = await res.json()
  return `ipfs://${data.IpfsHash}`
}

export async function uploadImageURLToIPFS(imageUrl: string, name: string): Promise<string> {
  // Download image then pin to Pinata
  const imgRes = await fetch(imageUrl)
  if (!imgRes.ok) throw new Error('Failed to fetch image: ' + imageUrl)
  const blob = await imgRes.blob()
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const formData = new FormData()
  const file = new Blob([buffer], { type: blob.type || 'image/png' })
  formData.append('file', file, name + '.png')
  formData.append('pinataMetadata', JSON.stringify({ name: name + ' — Sovereign Artwork' }))

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${PINATA_JWT}` },
    body: formData,
  })
  if (!res.ok) throw new Error(`Pinata file upload failed: ${await res.text()}`)
  const data = await res.json()
  return `ipfs://${data.IpfsHash}`
}

export function ipfsToHTTP(ipfsUri: string): string {
  if (!ipfsUri) return ''
  return ipfsUri.replace('ipfs://', PINATA_GATEWAY)
}
