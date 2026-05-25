// Artwork generation is now handled directly in app/api/nft/artwork/[serial]/route.ts
// This file kept for backward compatibility

export interface ArtworkParams {
  serial: string
  rarityTier: string
  productName?: string
  ownershipCycle?: number
  price?: string
  origin?: string
  tokenId?: number
}

export function generateSovereignSVG(_params: ArtworkParams): string {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><rect width="1000" height="1000" fill="#050505"/></svg>'
}

export function generateCollectionBannerSVG(): string {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 400"><rect width="1400" height="400" fill="#050505"/></svg>'
}

export function generateCollectionLogoSVG(): string {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350"><rect width="350" height="350" fill="#050505"/></svg>'
}
