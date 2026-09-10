import type { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  absoluteUrl,
  breadcrumbSchema,
  metadataImage,
  pageSchema,
  organizationRef,
} from "@/lib/seo";

const path = "/gallery";
const title = "Heritage Gallery | Sovereign Gold Cuff & Kyoto Sacred Incense";
const socialTitle = `${title} | Shamim Forever`;
const description =
  "Explore the Shamim Forever Heritage Gallery, including the SF-003 Sovereign Gold Cuff unique commission and the SF-005 Kyoto Sacred Incense reserve, with provenance-led product films.";
const image = "/founder-3.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl(path) },
  openGraph: {
    title: socialTitle,
    description,
    url: absoluteUrl(path),
    type: "website",
    siteName: "Shamim Forever",
    images: [metadataImage(image, "Shamim Forever Digital Heritage Gallery")],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
    images: [absoluteUrl(image)],
  },
  robots: { index: true, follow: true },
};

const galleryPieces = [
  {
    name: "Shamim Bloom — The Sovereign Grace",
    image: "/products/shamims-bloom/bloom-hero.png",
    video: "/products/shamims-bloom/heritage-3d.mp4",
    sku: "SF-001",
    category: "Fragrance",
    origin: "Karachi Atelier",
    year: "2023",
    edition: "First Edition · 150 pieces",
  },
  {
    name: "Sapphire Blue Levant",
    image: "/products/sapphire-blue-levant/levant-bottle.png",
    video: "/products/sapphire-blue-levant/heritage-3d.mp4",
    sku: "SF-002",
    category: "Fragrance",
    origin: "Lahore Maison",
    year: "2023",
    edition: "Limited · 300 pieces",
  },
  {
    name: "Sovereign Gold Cuff",
    image: "/founder-3.png",
    video: "/videos/products/sovereign-gold-cuff.mp4",
    sku: "SF-003",
    category: "Jewelry",
    origin: "Master Artisan Faisal",
    year: "2024",
    edition: "Unique Commission",
  },
  { name: "Eternal Empress", image: "/founder-3.png" },
  { name: "Amethyst Veil", image: "/founder-4.png" },
  {
    name: "Kyoto Sacred Incense",
    image: "/products/sf-kyoto-sacred-incense/kyoto-hero.png",
    video: "/videos/products/kyoto-sacred-incense.mp4",
    sku: "SF-005",
    category: "Fragrance",
    origin: "Sovereign Vault",
    year: "2025",
    edition: "Private Reserve · 50 pieces",
  },
];

const schemas = [
  pageSchema({
    type: "CollectionPage",
    path,
    name: "The Digital Heritage Vault",
    description,
    image,
  }),
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#pieces`,
    name: "Shamim Forever Digital Heritage Gallery",
    numberOfItems: galleryPieces.length,
    itemListElement: galleryPieces.map((piece, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: piece.name,
        image: absoluteUrl(piece.image),
        creator: organizationRef(),
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(path) + "#shamim-bloom",
    name: "Shamim Bloom",
    alternateName: "The Sovereign Grace",
    sku: "SF-001",
    category: "Fragrance",
    description:
      "Shamim Bloom — The Sovereign Grace, a Karachi Atelier fragrance archive from 2023.",
    image: absoluteUrl("/products/shamims-bloom/bloom-hero.png"),
    brand: { "@type": "Brand", name: "Shamim Forever" },
    video: { "@id": absoluteUrl(path) + "#shamim-bloom-video" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(path) + "#sapphire-blue-levant",
    name: "Sapphire Blue Levant",
    sku: "SF-002",
    category: "Fragrance",
    description:
      "Sapphire Blue Levant, a limited 2023 fragrance from Lahore Maison, catalogued as 300 pieces in the Shamim Forever Heritage Gallery.",
    image: absoluteUrl("/products/sapphire-blue-levant/levant-bottle.png"),
    brand: { "@type": "Brand", name: "Shamim Forever" },
    manufacturer: organizationRef(),
    productionDate: "2023",
    material: "Fragrance",
    video: { "@id": absoluteUrl(path) + "#sapphire-blue-levant-video" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Origin", value: "Lahore Maison" },
      {
        "@type": "PropertyValue",
        name: "Edition",
        value: "Limited · 300 pieces",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": absoluteUrl(path) + "#shamim-bloom-video",
    name: "Shamim Bloom 3D Heritage Film",
    description:
      "A cinematic 3D product film for Shamim Bloom — The Sovereign Grace.",
    thumbnailUrl: absoluteUrl("/products/shamims-bloom/bloom-hero.png"),
    contentUrl: absoluteUrl("/products/shamims-bloom/heritage-3d.mp4"),
    embedUrl: absoluteUrl("/products/shamims-bloom/heritage-3d.mp4"),
    duration: "PT6.33S",
    uploadDate: "2026-09-10",
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": absoluteUrl(path) + "#sapphire-blue-levant-video",
    name: "Sapphire Blue Levant 3D Product Film",
    description:
      "Autoplaying cinematic 3D product film for Sapphire Blue Levant, the limited SF-002 fragrance from Lahore Maison.",
    thumbnailUrl: absoluteUrl(
      "/products/sapphire-blue-levant/levant-bottle.png",
    ),
    contentUrl: absoluteUrl("/products/sapphire-blue-levant/heritage-3d.mp4"),
    embedUrl: absoluteUrl("/products/sapphire-blue-levant/heritage-3d.mp4"),
    duration: "PT6.29S",
    uploadDate: "2026-09-10",
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(path) + "#sovereign-gold-cuff",
    name: "Sovereign Gold Cuff",
    alternateName: "SF-003 Unique Commission",
    sku: "SF-003",
    category: "Jewelry",
    description:
      "Sovereign Gold Cuff — a 2024 unique commission by Master Artisan Faisal, preserved in the Shamim Forever Heritage Gallery.",
    image: absoluteUrl("/founder-3.png"),
    brand: { "@type": "Brand", name: "Shamim Forever" },
    manufacturer: organizationRef(),
    productionDate: "2024",
    material: "Gold jewelry",
    video: { "@id": absoluteUrl(path) + "#sovereign-gold-cuff-video" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Origin", value: "Master Artisan Faisal" },
      { "@type": "PropertyValue", name: "Edition", value: "Unique Commission" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": absoluteUrl(path) + "#sovereign-gold-cuff-video",
    name: "Sovereign Gold Cuff Product Film",
    description:
      "A cinematic product film for the SF-003 Sovereign Gold Cuff unique commission in the Shamim Forever Heritage Gallery.",
    thumbnailUrl: absoluteUrl("/founder-3.png"),
    contentUrl: absoluteUrl("/videos/products/sovereign-gold-cuff.mp4"),
    embedUrl: absoluteUrl("/videos/products/sovereign-gold-cuff.mp4"),
    duration: "PT9.01S",
    uploadDate: "2026-09-10",
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(path) + "#kyoto-sacred-incense",
    name: "Kyoto Sacred Incense",
    alternateName: "The Sovereign Sanctuary",
    sku: "SF-005",
    category: "Fragrance",
    description:
      "Kyoto Sacred Incense — a private 2025 fragrance reserve from the Sovereign Vault, presented in the Shamim Forever Heritage Gallery.",
    image: absoluteUrl("/products/sf-kyoto-sacred-incense/kyoto-hero.png"),
    brand: { "@type": "Brand", name: "Shamim Forever" },
    manufacturer: organizationRef(),
    productionDate: "2025",
    material: "Extrait de Parfum",
    video: { "@id": absoluteUrl(path) + "#kyoto-sacred-incense-video" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Origin", value: "Sovereign Vault" },
      {
        "@type": "PropertyValue",
        name: "Edition",
        value: "Private Reserve · 50 pieces",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": absoluteUrl(path) + "#kyoto-sacred-incense-video",
    name: "Kyoto Sacred Incense Product Film",
    description:
      "A cinematic product film for Kyoto Sacred Incense, the SF-005 private reserve fragrance in the Shamim Forever Heritage Gallery.",
    thumbnailUrl: absoluteUrl(
      "/products/sf-kyoto-sacred-incense/kyoto-hero.png",
    ),
    contentUrl: absoluteUrl("/videos/products/kyoto-sacred-incense.mp4"),
    embedUrl: absoluteUrl("/videos/products/kyoto-sacred-incense.mp4"),
    duration: "PT6.29S",
    uploadDate: "2026-09-10",
  },
  breadcrumbSchema(path, "Gallery"),
];

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SeoJsonLd schemas={schemas}>{children}</SeoJsonLd>;
}
