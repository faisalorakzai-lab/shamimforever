import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const SERIALS: Record<string, number> = {'SF-FND-0001':4,'SF-SG-2026-00005':4,'SF-IK-2026-00001':0,'SF-BL-2026-00002':1,'SF-VA-2026-00003':2,'SF-MI-2026-00004':3,'SF-RN-2026-00006':5,'SF-OC-2026-00007':6,'SF-MO-2026-00008':7,'SF-CM-2026-00009':8,'SF-IO-2026-00010':9,'SF-RO-2026-01':4}

const NAMES: Record<string, string[]> = {
  "SF-FND-0001":     ["SHAMIM'S GHOST","FOUNDERS SOVEREIGN EDITION"],
  "SF-SG-2026-00005":["SHAMIM'S GHOST","FOUNDERS SOVEREIGN EDITION"],
  "SF-IK-2026-00001":["SACRED INCENSE OF KYOTO","IMPERIAL CUT"],
  "SF-BL-2026-00002":["SAPPHIRE BLUE LEVANT","ROYAL HERITAGE"],
  "SF-VA-2026-00003":["SF VANILLA ABSOLUTE","FOUNDERS EDITION"],
  "SF-MI-2026-00004":["MIDNIGHT IRIS ROYALE","BESPOKE MASTERPIECE"],
  "SF-RN-2026-00006":["SOVEREIGN ROSE NOIR","ELITE ATELIER SELECTION"],
  "SF-OC-2026-00007":["THE ORAKZAI CREST AMBER","1/1 VAULT PIECE"],
  "SF-MO-2026-00008":["MAJESTIC OUD SUPREME","IMPERIAL REGISTRY"],
  "SF-CM-2026-00009":["CELESTIAL MUSK SIGNET","ATELIER ARCHIVE"],
  "SF-IO-2026-00010":["SOVEREIGN INFINITE OUD","GRAND FINALE ASSET"],
  "SF-RO-2026-01":  ["SHAMIM'S GHOST","FOUNDERS SOVEREIGN EDITION"],
}

const PRICES: Record<string,string> = {'SF-FND-0001':'$150,000','SF-SG-2026-00005':'$150,000','SF-IK-2026-00001':'$85,000','SF-BL-2026-00002':'$65,000','SF-VA-2026-00003':'$120,000','SF-MI-2026-00004':'$250,000','SF-RN-2026-00006':'$55,000','SF-OC-2026-00007':'$500,000','SF-MO-2026-00008':'$95,000','SF-CM-2026-00009':'$75,000','SF-IO-2026-00010':'$1,000,000','SF-RO-2026-01':'$150,000'}
const ORIGINS: Record<string,string> = {'SF-FND-0001':'Karachi Sovereign Atelier','SF-SG-2026-00005':'Karachi Sovereign Atelier','SF-IK-2026-00001':'Kyoto Japan','SF-BL-2026-00002':'Damascus Syria','SF-VA-2026-00003':'Tahiti and Madagascar','SF-MI-2026-00004':'Florence Italy','SF-RN-2026-00006':'Istanbul Turkey','SF-OC-2026-00007':'Orakzai Pakistan','SF-MO-2026-00008':'Phnom Penh Cambodia','SF-CM-2026-00009':'Kannauj India','SF-IO-2026-00010':'Assam India 1963','SF-RO-2026-01':'Karachi Sovereign Atelier'}
const MATERIALS: Record<string,string> = {'SF-FND-0001':'Black Oud and Kashmiri Saffron','SF-SG-2026-00005':'Black Oud and Kashmiri Saffron','SF-IK-2026-00001':'Japanese Oud and Hinoki','SF-BL-2026-00002':'Taif Rose and Sandalwood','SF-VA-2026-00003':'Vanilla Absolute and Ambergris','SF-MI-2026-00004':'12yr Iris and Civet','SF-RN-2026-00006':'Rose de Mai and Oud Smoke','SF-OC-2026-00007':'Baltic Amber and 60yr Sandalwood','SF-MO-2026-00008':'25yr Wild Oud and Frankincense','SF-CM-2026-00009':'White Musk and Cedar','SF-IO-2026-00010':'60yr Assam Oud and 1985 Grasse Rose','SF-RO-2026-01':'Black Oud and Kashmiri Saffron'}
const EDITIONS: Record<string,string> = {'SF-FND-0001':'1 of 1 Founder Master Asset','SF-SG-2026-00005':'1 of 1 Founders Legacy','SF-IK-2026-00001':'Imperial Registry 1 of 3','SF-BL-2026-00002':'Royal Archive 1 of 5','SF-VA-2026-00003':'Founders Archive 1 of 2','SF-MI-2026-00004':'Absolute Unique 1 of 1','SF-RN-2026-00006':'Elite Selection 1 of 7','SF-OC-2026-00007':'Absolute Unique 1 of 1','SF-MO-2026-00008':'Imperial Registry 1 of 3','SF-CM-2026-00009':'Royal Archive 1 of 5','SF-IO-2026-00010':'Absolute Unique 1 of 1','SF-RO-2026-01':'1 of 1 Founders Ghost — Genesis'}
const TIERS: Record<string,string> = {'SF-FND-0001':'FOUNDERS','SF-SG-2026-00005':'FOUNDERS','SF-IK-2026-00001':'IMPERIAL','SF-BL-2026-00002':'ROYAL','SF-VA-2026-00003':'FOUNDERS','SF-MI-2026-00004':'ONE-OF-ONE','SF-RN-2026-00006':'ELITE','SF-OC-2026-00007':'ONE-OF-ONE','SF-MO-2026-00008':'IMPERIAL','SF-CM-2026-00009':'ROYAL','SF-IO-2026-00010':'ONE-OF-ONE','SF-RO-2026-01':'FOUNDERS'}

function getTier(t: string): Record<string,string> {
  if (t === 'ONE-OF-ONE') return {g1:'#f8f8f0',g2:'#d8d8cc',g3:'#909088',bg:'#040404',glow:'#e0e0d8',badge:'ONE OF ONE'}
  if (t === 'IMPERIAL')   return {g1:'#ffcc44',g2:'#d4900a',g3:'#8a5800',bg:'#080400',glow:'#d4900a',badge:'IMPERIAL REGISTRY'}
  if (t === 'ROYAL')      return {g1:'#b8d4ff',g2:'#7a9fcf',g3:'#3a5a8f',bg:'#010418',glow:'#7a9fcf',badge:'ROYAL HERITAGE'}
  if (t === 'ELITE')      return {g1:'#d8c890',g2:'#b0a060',g3:'#706040',bg:'#080706',glow:'#b0a060',badge:'ELITE ATELIER'}
  return {g1:'#e8c87a',g2:'#c9a054',g3:'#8a6830',bg:'#060402',glow:'#c9a054',badge:'FOUNDERS RESERVE'}
}

function fp(v: number): string { return v.toFixed(1) }

function buildSVG(serial: string): string {
  const tier = TIERS[serial] || 'ELITE'
  const c = getTier(tier)
  const names = NAMES[serial] || ['SOVEREIGN ASSET', 'ELITE EDITION']
  const price = PRICES[serial] || '$50,000+'
  const origin = ORIGINS[serial] || 'Karachi Sovereign Atelier'
  const material = MATERIALS[serial] || 'Luxury Accord'
  const edition = EDITIONS[serial] || 'Sovereign Edition'
  const tokenId = SERIALS[serial] ?? 0
  const G1 = c.g1, G2 = c.g2, G3 = c.g3, BG = c.bg, GLOW = c.glow, BADGE = c.badge
  const s: string[] = []

  s.push("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 2000 2000\" width=\"2000\" height=\"2000\">")
  s.push("<defs>")
  s.push("<radialGradient id=\"bgG\" cx=\"50%\" cy=\"25%\" r=\"80%\">")
  s.push("<stop offset=\"0%\" stop-color=\"#18120a\"/>")
  s.push('<stop offset="50%" stop-color="' + BG + '"/>')
  s.push("<stop offset=\"100%\" stop-color=\"#020202\"/>")
  s.push("</radialGradient>")
  s.push("<radialGradient id=\"spotG\" cx=\"50%\" cy=\"0%\" r=\"60%\">")
  s.push('<stop offset="0%" stop-color="' + GLOW + '" stop-opacity="0.2"/>')
  s.push('<stop offset="100%" stop-color="' + GLOW + '" stop-opacity="0"/>')
  s.push("</radialGradient>")
  s.push("<linearGradient id=\"btG\" x1=\"10%\" y1=\"0%\" x2=\"90%\" y2=\"100%\">")
  s.push('<stop offset="0%" stop-color="' + G1 + '" stop-opacity="0.16"/>')
  s.push("<stop offset=\"25%\" stop-color=\"#1c1a16\" stop-opacity=\"0.98\"/>")
  s.push("<stop offset=\"75%\" stop-color=\"#080806\"/>")
  s.push("<stop offset=\"100%\" stop-color=\"#1a1814\" stop-opacity=\"0.92\"/>")
  s.push("</linearGradient>")
  s.push("<linearGradient id=\"rfG\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">")
  s.push('<stop offset="0%" stop-color="' + G1 + '" stop-opacity="0"/>')
  s.push('<stop offset="15%" stop-color="' + G1 + '" stop-opacity="0.3"/>')
  s.push('<stop offset="25%" stop-color="' + G1 + '" stop-opacity="0.07"/>')
  s.push('<stop offset="100%" stop-color="' + G1 + '" stop-opacity="0"/>')
  s.push("</linearGradient>")
  s.push("<linearGradient id=\"gG\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">")
  s.push('<stop offset="0%" stop-color="' + G1 + '"/>')
  s.push('<stop offset="50%" stop-color="' + G2 + '"/>')
  s.push('<stop offset="100%" stop-color="' + G3 + '"/>')
  s.push("</linearGradient>")
  s.push("<linearGradient id=\"hF\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">")
  s.push('<stop offset="0%" stop-color="' + G2 + '" stop-opacity="0"/>')
  s.push('<stop offset="20%" stop-color="' + G2 + '" stop-opacity="0.8"/>')
  s.push('<stop offset="50%" stop-color="' + G1 + '"/>')
  s.push('<stop offset="80%" stop-color="' + G2 + '" stop-opacity="0.8"/>')
  s.push('<stop offset="100%" stop-color="' + G2 + '" stop-opacity="0"/>')
  s.push("</linearGradient>")
  s.push("<filter id=\"btGl\" x=\"-25%\" y=\"-10%\" width=\"150%\" height=\"120%\"><feGaussianBlur stdDeviation=\"20\" result=\"blur\"/><feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>")
  s.push("<filter id=\"sfGl\"><feGaussianBlur stdDeviation=\"6\" result=\"blur\"/><feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>")
  s.push("<filter id=\"txGl\"><feGaussianBlur stdDeviation=\"2.5\" result=\"blur\"/><feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>")
  s.push("<pattern id=\"dt\" x=\"0\" y=\"0\" width=\"50\" height=\"50\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"0.5\" fill=\"#c9a054\" fill-opacity=\"0.07\"/></pattern>")
  s.push("<path id=\"sT\" d=\"M862,430 A138,138 0 0,1 1138,430\"/>")
  s.push("<path id=\"sB\" d=\"M862,430 A138,138 0 0,0 1138,430\"/>")
  s.push("</defs>")

  s.push("<rect width=\"2000\" height=\"2000\" fill=\"url(#bgG)\"/>")
  s.push("<rect width=\"2000\" height=\"2000\" fill=\"url(#dt)\"/>")
  s.push("<rect width=\"2000\" height=\"2000\" fill=\"url(#spotG)\"/>")

  s.push("<rect x=\"24\" y=\"24\" width=\"1952\" height=\"1952\" rx=\"2\" fill=\"none\" stroke-width=\"0.5\" stroke-opacity=\"0.2\" stroke=\"#c9a054\"/>")
  s.push("<rect x=\"34\" y=\"34\" width=\"1932\" height=\"1932\" rx=\"1\" fill=\"none\" stroke=\"url(#gG)\" stroke-width=\"2.5\"/>")
  s.push("<rect x=\"46\" y=\"46\" width=\"1908\" height=\"1908\" rx=\"1\" fill=\"none\" stroke-width=\"0.4\" stroke-opacity=\"0.18\" stroke=\"#c9a054\"/>")
  s.push("<rect x=\"90\" y=\"90\" width=\"1820\" height=\"1820\" rx=\"1\" fill=\"none\" stroke-width=\"0.25\" stroke-opacity=\"0.1\" stroke=\"#c9a054\"/>")

  const cdata: number[][] = [[34,34,1,1],[1966,34,-1,1],[34,1966,1,-1],[1966,1966,-1,-1]]
  for (let i = 0; i < 4; i++) {
    const co = cdata[i]
    const cx = co[0], cy = co[1], sx = co[2], sy = co[3]
    s.push('<g transform="translate(' + cx + ',' + cy + ')">')
    s.push('<line x1="0" y1="0" x2="' + fp(sx*70) + '" y2="0" stroke="' + G1 + '" stroke-width="2.5" stroke-opacity="0.95"/>')
    s.push('<line x1="0" y1="0" x2="0" y2="' + fp(sy*70) + '" stroke="' + G1 + '" stroke-width="2.5" stroke-opacity="0.95"/>')
    s.push('<circle cx="' + fp(sx*9) + '" cy="' + fp(sy*9) + '" r="4" fill="' + G1 + '" fill-opacity="0.9"/>')
    s.push('</g>')
  }

  s.push("<rect x=\"34\" y=\"480\" width=\"2\" height=\"1040\" fill=\"#c9a054\" fill-opacity=\"0.22\"/>")
  s.push("<rect x=\"1964\" y=\"480\" width=\"2\" height=\"1040\" fill=\"#c9a054\" fill-opacity=\"0.22\"/>")

  s.push("<text x=\"1000\" y=\"118\" font-family=\"Georgia\" font-size=\"16\" fill=\"#c9a054\" fill-opacity=\"0.52\" letter-spacing=\"14\" text-anchor=\"middle\">THE HOUSE OF SHAMIM FOREVER</text>")
  s.push("<rect x=\"130\" y=\"136\" width=\"1740\" height=\"0.8\" fill=\"url(#hF)\" opacity=\"0.5\"/>")
  s.push("<rect x=\"770\" y=\"150\" width=\"460\" height=\"52\" rx=\"1\" fill=\"#c9a054\" fill-opacity=\"0.055\" stroke=\"#c9a054\" stroke-width=\"0.8\" stroke-opacity=\"0.5\"/>")
  s.push('<text x="1000" y="184" font-family="Georgia" font-size="18" fill="' + G1 + '" text-anchor="middle" letter-spacing="8" filter="url(#sfGl)">' + BADGE + '</text>')
  s.push('<text x="1920" y="118" font-family="Georgia" font-size="15" fill="' + G2 + '" fill-opacity="0.38" text-anchor="end" letter-spacing="3">TOKEN #' + tokenId + '</text>')

  s.push('<g transform="translate(1000,430)" filter="url(#sfGl)">')
  s.push("<circle cx=\"0\" cy=\"0\" r=\"155\" fill=\"none\" stroke=\"#c9a054\" stroke-width=\"0.5\" stroke-opacity=\"0.28\"/>")
  s.push("<circle cx=\"0\" cy=\"0\" r=\"142\" fill=\"#c9a054\" fill-opacity=\"0.03\" stroke=\"url(#gG)\" stroke-width=\"1.5\" stroke-opacity=\"0.9\"/>")
  s.push("<circle cx=\"0\" cy=\"0\" r=\"128\" fill=\"none\" stroke=\"#c9a054\" stroke-width=\"0.4\" stroke-opacity=\"0.2\"/>")
  for (let i = 0; i < 8; i++) {
    const a = i * 45 * Math.PI / 180
    const x1 = fp(Math.cos(a) * 36), y1 = fp(Math.sin(a) * 36)
    const x2 = fp(Math.cos(a) * 120), y2 = fp(Math.sin(a) * 120)
    s.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + G2 + '" stroke-width="0.7" stroke-opacity="0.42"/>')
  }
  if (tier === 'FOUNDERS' || tier === 'ONE-OF-ONE') {
    s.push('<polygon points="0,-52 37,0 0,52 -37,0" fill="' + G2 + '" fill-opacity="0.1" stroke="' + G2 + '" stroke-width="1.3" stroke-opacity="0.8"/>')
    s.push('<polygon points="0,-30 21,0 0,30 -21,0" fill="url(#gG)" fill-opacity="0.75"/>')
    s.push('<circle cx="0" cy="0" r="9" fill="' + G1 + '" fill-opacity="0.95"/>')
  } else {
    s.push('<circle cx="0" cy="0" r="46" fill="none" stroke="' + G2 + '" stroke-width="1.2" stroke-opacity="0.7"/>')
    s.push('<circle cx="0" cy="0" r="28" fill="url(#gG)" fill-opacity="0.6"/>')
    s.push('<circle cx="0" cy="0" r="9" fill="' + G1 + '" fill-opacity="0.9"/>')
  }
  s.push("<text font-family=\"Georgia\" font-size=\"12.5\" fill=\"#c9a054\" fill-opacity=\"0.45\" letter-spacing=\"4\"><textPath href=\"#sT\" startOffset=\"5%\">SHAMIM FOREVER  SOVEREIGN LUXURY ARCHIVE  KARACHI ATELIER</textPath></text>")
  s.push('<text font-family="Georgia" font-size="12" fill="' + G2 + '" fill-opacity="0.42" letter-spacing="3.5"><textPath href="#sB" startOffset="12%">POLYGON MAINNET  ERC-721  ' + serial + '</textPath></text>')
  s.push('</g>')

  let bCX = 1000, bTop = 620, bW = 96, bH = 300
  if (tier === 'ONE-OF-ONE') { bW = 58; bH = 360 }
  else if (tier === 'IMPERIAL') { bW = 108; bH = 275 }
  else if (tier === 'FOUNDERS') { bW = 88; bH = 310 }
  const bBot = bTop + bH

  s.push('<g filter="url(#btGl)">')
  s.push('<ellipse cx="' + bCX + '" cy="' + fp(bTop + bH * 0.5) + '" rx="' + (bW + 90) + '" ry="' + fp(bH * 0.55) + '" fill="' + GLOW + '" fill-opacity="0.035"/>')

  if (tier === 'ONE-OF-ONE') {
    const neck = fp(bW * 0.32)
    s.push('<path d="M' + fp(bCX - bW*0.32) + ',' + bTop + ' Q' + fp(bCX - bW) + ',' + fp(bTop + bH*0.18) + ' ' + fp(bCX - bW) + ',' + fp(bTop + bH*0.38) + ' L' + fp(bCX - bW) + ',' + bBot + ' L' + fp(bCX + bW) + ',' + bBot + ' L' + fp(bCX + bW) + ',' + fp(bTop + bH*0.38) + ' Q' + fp(bCX + bW) + ',' + fp(bTop + bH*0.18) + ' ' + fp(bCX + bW*0.32) + ',' + bTop + ' Z" fill="url(#btG)" stroke="' + G2 + '" stroke-width="0.8" stroke-opacity="0.6"/>')
    s.push('<rect x="' + fp(bCX - bW*0.24) + '" y="' + fp(bTop - 62) + '" width="' + fp(bW*0.48) + '" height="66" rx="4" fill="url(#gG)" fill-opacity="0.9"/>')
    s.push('<ellipse cx="' + bCX + '" cy="' + fp(bTop - 62) + '" rx="' + fp(bW*0.28) + '" ry="9" fill="' + G1 + '" fill-opacity="0.75"/>')
  } else if (tier === 'IMPERIAL') {
    s.push('<rect x="' + fp(bCX - bW) + '" y="' + fp(bTop + 44) + '" width="' + fp(bW*2) + '" height="' + (bH-44) + '" rx="8" fill="url(#btG)" stroke="' + G2 + '" stroke-width="0.9" stroke-opacity="0.6"/>')
    s.push('<rect x="' + fp(bCX - bW*0.52) + '" y="' + bTop + '" width="' + fp(bW*1.04) + '" height="48" rx="5" fill="url(#btG)" stroke="' + G2 + '" stroke-width="0.7" stroke-opacity="0.5"/>')
    s.push('<rect x="' + fp(bCX - 22) + '" y="' + fp(bTop - 60) + '" width="44" height="64" rx="5" fill="url(#gG)" fill-opacity="0.92"/>')
    s.push('<polygon points="' + bCX + ',' + fp(bTop-78) + ' ' + fp(bCX-20) + ',' + fp(bTop-58) + ' ' + fp(bCX-8) + ',' + fp(bTop-58) + ' ' + bCX + ',' + fp(bTop-46) + ' ' + fp(bCX+8) + ',' + fp(bTop-58) + ' ' + fp(bCX+20) + ',' + fp(bTop-58) + '" fill="' + G1 + '"/>')
  } else if (tier === 'FOUNDERS') {
    s.push('<ellipse cx="' + bCX + '" cy="' + fp(bTop + bH*0.52) + '" rx="' + bW + '" ry="' + fp(bH*0.52) + '" fill="url(#btG)" stroke="' + G2 + '" stroke-width="1.1" stroke-opacity="0.7"/>')
    s.push('<rect x="' + fp(bCX-30) + '" y="' + bTop + '" width="60" height="' + fp(bH*0.12) + '" rx="4" fill="url(#btG)" stroke="' + G2 + '" stroke-width="0.6" stroke-opacity="0.5"/>')
    s.push('<rect x="' + fp(bCX-24) + '" y="' + fp(bTop-58) + '" width="48" height="62" rx="7" fill="url(#gG)" fill-opacity="0.92"/>')
    s.push('<ellipse cx="' + bCX + '" cy="' + fp(bTop-58) + '" rx="26" ry="10" fill="' + G1 + '" fill-opacity="0.72"/>')
  } else if (tier === 'ROYAL') {
    s.push('<polygon points="' + bCX + ',' + bTop + ' ' + fp(bCX+bW) + ',' + fp(bTop+bH*0.25) + ' ' + fp(bCX+bW) + ',' + fp(bTop+bH*0.75) + ' ' + bCX + ',' + bBot + ' ' + fp(bCX-bW) + ',' + fp(bTop+bH*0.75) + ' ' + fp(bCX-bW) + ',' + fp(bTop+bH*0.25) + '" fill="url(#btG)" stroke="' + G2 + '" stroke-width="0.9" stroke-opacity="0.6"/>')
    s.push('<rect x="' + fp(bCX-26) + '" y="' + fp(bTop-58) + '" width="52" height="62" rx="4" fill="url(#gG)" fill-opacity="0.92"/>')
    s.push('<polygon points="' + bCX + ',' + fp(bTop-76) + ' ' + fp(bCX-14) + ',' + fp(bTop-56) + ' ' + fp(bCX+14) + ',' + fp(bTop-56) + '" fill="' + G1 + '"/>')
  } else {
    s.push('<rect x="' + fp(bCX-bW) + '" y="' + fp(bTop+42) + '" width="' + fp(bW*2) + '" height="' + (bH-42) + '" rx="8" fill="url(#btG)" stroke="' + G2 + '" stroke-width="0.8" stroke-opacity="0.6"/>')
    s.push('<rect x="' + fp(bCX-bW*0.5) + '" y="' + bTop + '" width="' + fp(bW) + '" height="46" rx="4" fill="url(#btG)" stroke="' + G2 + '" stroke-width="0.7" stroke-opacity="0.5"/>')
    s.push('<rect x="' + fp(bCX-19) + '" y="' + fp(bTop-56) + '" width="38" height="60" rx="4" fill="url(#gG)" fill-opacity="0.92"/>')
  }

  s.push('<rect x="' + fp(bCX-bW+6) + '" y="' + fp(bTop+50) + '" width="' + fp(bW*2-12) + '" height="' + fp(bH-60) + '" rx="6" fill="url(#rfG)"/>')
  s.push('<text x="' + bCX + '" y="' + fp(bTop+bH*0.54) + '" font-family="Georgia" font-size="20" fill="' + G2 + '" fill-opacity="0.55" text-anchor="middle" letter-spacing="5">SF</text>')
  s.push('<text x="' + bCX + '" y="' + fp(bTop+bH*0.54+22) + '" font-family="Georgia" font-size="9" fill="' + G2 + '" fill-opacity="0.28" text-anchor="middle" letter-spacing="3">SOVEREIGN</text>')
  s.push('<ellipse cx="' + bCX + '" cy="' + fp(bBot+20) + '" rx="' + fp(bW*0.7) + '" ry="11" fill="' + G2 + '" fill-opacity="0.12"/>')
  s.push('</g>')

  const titleTop = bBot + 80
  s.push('<rect x="130" y="' + fp(titleTop-8) + '" width="1740" height="0.8" fill="url(#hF)" opacity="0.38"/>')
  s.push('<text x="1000" y="' + fp(titleTop+68) + '" font-family="Georgia" font-size="58" fill="#f4efe0" fill-opacity="0.97" text-anchor="middle" letter-spacing="5" filter="url(#txGl)">' + names[0] + '</text>')
  s.push('<text x="1000" y="' + fp(titleTop+144) + '" font-family="Georgia" font-size="58" fill="#f4efe0" fill-opacity="0.97" text-anchor="middle" letter-spacing="5" filter="url(#txGl)">' + names[1] + '</text>')

  const divY = titleTop + 172
  s.push('<line x1="130" y1="' + divY + '" x2="890" y2="' + divY + '" stroke="' + G2 + '" stroke-width="0.6" stroke-opacity="0.35"/>')
  s.push('<polygon points="1000,' + fp(divY-9) + ' 1011,' + divY + ' 1000,' + fp(divY+9) + ' 989,' + divY + '" fill="' + G2 + '" fill-opacity="0.7"/>')
  s.push('<line x1="1110" y1="' + divY + '" x2="1870" y2="' + divY + '" stroke="' + G2 + '" stroke-width="0.6" stroke-opacity="0.35"/>')
  s.push('<text x="1000" y="' + fp(divY+44) + '" font-family="Georgia" font-size="19" fill="' + G2 + '" fill-opacity="0.72" text-anchor="middle" letter-spacing="9">' + names[1] + '</text>')
  s.push('<text x="1000" y="' + fp(divY+102) + '" font-family="Georgia" font-size="38" fill="' + G1 + '" text-anchor="middle" letter-spacing="4" filter="url(#sfGl)">' + price + '</text>')
  s.push('<text x="1000" y="' + fp(divY+128) + '" font-family="Georgia" font-size="12" fill="' + G2 + '" fill-opacity="0.38" text-anchor="middle" letter-spacing="5">APPRAISED VALUE</text>')

  const dY = divY + 162
  s.push('<rect x="130" y="' + dY + '" width="1740" height="0.5" fill="url(#hF)" opacity="0.16"/>')
  s.push('<text x="360" y="' + fp(dY+38) + '" font-family="Georgia" font-size="12" fill="' + G2 + '" fill-opacity="0.42" text-anchor="middle" letter-spacing="3">ORIGIN</text>')
  s.push('<text x="360" y="' + fp(dY+62) + '" font-family="Georgia" font-size="15" fill="' + G1 + '" fill-opacity="0.86" text-anchor="middle">' + origin + '</text>')
  s.push('<text x="1000" y="' + fp(dY+38) + '" font-family="Georgia" font-size="12" fill="' + G2 + '" fill-opacity="0.42" text-anchor="middle" letter-spacing="3">MATERIAL</text>')
  s.push('<text x="1000" y="' + fp(dY+62) + '" font-family="Georgia" font-size="15" fill="' + G1 + '" fill-opacity="0.86" text-anchor="middle">' + material + '</text>')
  s.push('<text x="1640" y="' + fp(dY+38) + '" font-family="Georgia" font-size="12" fill="' + G2 + '" fill-opacity="0.42" text-anchor="middle" letter-spacing="3">EDITION</text>')
  s.push('<text x="1640" y="' + fp(dY+62) + '" font-family="Georgia" font-size="15" fill="' + G1 + '" fill-opacity="0.86" text-anchor="middle">' + edition + '</text>')
  s.push('<line x1="670" y1="' + fp(dY+16) + '" x2="670" y2="' + fp(dY+76) + '" stroke="' + G2 + '" stroke-width="0.4" stroke-opacity="0.2"/>')
  s.push('<line x1="1330" y1="' + fp(dY+16) + '" x2="1330" y2="' + fp(dY+76) + '" stroke="' + G2 + '" stroke-width="0.4" stroke-opacity="0.2"/>')

  const srlY = dY + 120
  s.push('<rect x="130" y="' + fp(dY+86) + '" width="1740" height="0.5" fill="url(#hF)" opacity="0.12"/>')
  s.push('<text x="1000" y="' + srlY + '" font-family="Georgia" font-size="22" fill="' + G2 + '" fill-opacity="0.88" text-anchor="middle" letter-spacing="7">' + serial + '</text>')

  const fY = srlY + 68
  s.push('<rect x="130" y="' + fp(fY-6) + '" width="1740" height="0.8" fill="url(#hF)" opacity="0.26"/>')
  s.push('<text x="360" y="' + fp(fY+36) + '" font-family="Georgia" font-size="13" fill="' + G2 + '" fill-opacity="0.28" text-anchor="middle" letter-spacing="3">POLYGON MAINNET</text>')
  s.push('<text x="1000" y="' + fp(fY+36) + '" font-family="Georgia" font-size="22" fill="' + G2 + '" fill-opacity="0.52" text-anchor="middle" letter-spacing="11">SHAMIM FOREVER</text>')
  s.push('<text x="1640" y="' + fp(fY+36) + '" font-family="Georgia" font-size="13" fill="' + G2 + '" fill-opacity="0.28" text-anchor="middle" letter-spacing="3">ERC-721</text>')
  s.push('<rect x="130" y="' + fp(fY+50) + '" width="1740" height="0.4" fill="url(#hF)" opacity="0.1"/>')
  s.push('<text x="1000" y="' + fp(fY+74) + '" font-family="Georgia" font-size="11" fill="' + G2 + '" fill-opacity="0.15" text-anchor="middle" letter-spacing="3">SOVEREIGN LUXURY DIGITAL ARCHIVE  AUTHENTIC GENESIS MASTERPIECE  2026</text>')

  s.push('</svg>')
  return s.join('')
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { serial: string } }
) {
  const serial = params.serial.toUpperCase().replace(/\.svg$/i, '')
  const svg = buildSVG(serial)
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}