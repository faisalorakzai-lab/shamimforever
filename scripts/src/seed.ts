import { db, productsTable, categoriesTable, boutiquesTable, usersTable } from "@workspace/db";
import { createHash } from "crypto";

function hashPassword(password: string): string {
  return createHash("sha256").update(password + (process.env.SESSION_SECRET || "secret")).digest("hex");
}

async function seed() {
  console.log("Seeding database...");

  // Categories
  const categories = await db.insert(categoriesTable).values([
    { name: "Perfume", slug: "perfume", description: "Rare and exclusive fragrances crafted from the finest ingredients", image: null },
    { name: "Cosmetics", slug: "cosmetics", description: "Luxury cosmetics that celebrate timeless beauty", image: null },
    { name: "Jewelry", slug: "jewelry", description: "Exquisite jewelry pieces for the discerning connoisseur", image: null },
  ]).onConflictDoNothing().returning();

  console.log("Categories seeded:", categories.length);

  // Products
  const products = await db.insert(productsTable).values([
    {
      name: "Noir Absolu",
      slug: "noir-absolu",
      description: "A mesmerizing oriental fragrance that opens with saffron and bergamot before settling into a heart of dark rose and oud, anchored by warm amber and musk.",
      price: "24500",
      originalPrice: "28000",
      category: "Perfume",
      categoryId: 1,
      stock: 15,
      sku: "SF-P001",
      images: [],
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      hasEngravingOption: true,
      scentNotes: "Top: Saffron, Bergamot | Heart: Dark Rose, Oud | Base: Amber, Sandalwood, Musk",
      ingredients: "Alcohol denat., Parfum (Fragrance), Aqua (Water), Saffron Extract, Rose Otto",
      usageInstructions: "Apply to pulse points — wrists, neck, and behind ears — for long-lasting radiance.",
    },
    {
      name: "Velvet Orchid",
      slug: "velvet-orchid",
      description: "An intoxicating floral fragrance with notes of rare orchid, jasmine absolute, and vanilla orchid, wrapped in a silky musk base.",
      price: "19800",
      originalPrice: null,
      category: "Perfume",
      categoryId: 1,
      stock: 22,
      sku: "SF-P002",
      images: [],
      isFeatured: true,
      isBestseller: false,
      isNewArrival: true,
      hasEngravingOption: true,
      scentNotes: "Top: Pink Pepper, Mandarin | Heart: Orchid, Jasmine | Base: Vanilla, Sandalwood, Musk",
      ingredients: "Alcohol denat., Parfum, Orchid Extract, Jasmine Absolute, Vanilla Oleoresin",
      usageInstructions: "Spray generously on pulse points and allow to dry naturally.",
    },
    {
      name: "Gold Elixir",
      slug: "gold-elixir",
      description: "An opulent unisex fragrance inspired by liquid gold — warm, woody, and deeply sensual. A signature scent for those who command attention.",
      price: "32000",
      originalPrice: null,
      category: "Perfume",
      categoryId: 1,
      stock: 8,
      sku: "SF-P003",
      images: [],
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      hasEngravingOption: true,
      scentNotes: "Top: Cardamom, Saffron | Heart: Oud, Guaiac Wood | Base: Amber, Gold Incense, Musk",
      ingredients: "Alcohol denat., Parfum, Saffron CO2, Oud Oil, Amberwood",
      usageInstructions: "Apply 2-3 sprays to warm areas of the body.",
    },
    {
      name: "La Femme Mystique",
      slug: "la-femme-mystique",
      description: "A feminine masterpiece — powdery iris and violet unfurl over a heart of Bulgarian rose absolute and Egyptian jasmine, resting on a bed of white musk and cedar.",
      price: "21500",
      originalPrice: "25000",
      category: "Perfume",
      categoryId: 1,
      stock: 18,
      sku: "SF-P004",
      images: [],
      isFeatured: false,
      isBestseller: false,
      isNewArrival: true,
      hasEngravingOption: true,
      scentNotes: "Top: Iris, Violet | Heart: Rose Absolute, Jasmine | Base: White Musk, Cedar, Benzoin",
      ingredients: "Alcohol denat., Parfum, Iris Pallida Extract, Rose Otto Bulgaria, Jasmine Absolute Egypt",
      usageInstructions: "Apply to pulse points. Reapply as desired throughout the day.",
    },
    {
      name: "Lumière Lip Collection",
      slug: "lumiere-lip-collection",
      description: "Ultra-rich lip colour infused with 24K gold dust and hyaluronic acid. Delivers intense pigmentation and an all-day cushioned finish.",
      price: "8500",
      originalPrice: "10000",
      category: "Cosmetics",
      categoryId: 2,
      stock: 35,
      sku: "SF-C001",
      images: [],
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      hasEngravingOption: false,
      scentNotes: null,
      ingredients: "Ricinus Communis Seed Oil, Beeswax, 24K Gold Dust, Hyaluronic Acid, Shea Butter",
      usageInstructions: "Apply directly from bullet. For precision, use a lip brush.",
    },
    {
      name: "Velour Foundation Serum",
      slug: "velour-foundation-serum",
      description: "A hybrid serum-foundation with buildable coverage and skin-perfecting technology. Infused with black truffle extract and peptides.",
      price: "12000",
      originalPrice: null,
      category: "Cosmetics",
      categoryId: 2,
      stock: 28,
      sku: "SF-C002",
      images: [],
      isFeatured: false,
      isBestseller: false,
      isNewArrival: true,
      hasEngravingOption: false,
      scentNotes: null,
      ingredients: "Aqua, Black Truffle Extract, Niacinamide, Peptide Complex, SPF 30",
      usageInstructions: "Apply 2-3 pumps to cleansed skin. Blend with fingertips or beauty tool.",
    },
    {
      name: "Obsidian Diamond Ring",
      slug: "obsidian-diamond-ring",
      description: "An architectural masterpiece — black obsidian set in 18K gold, surrounded by a constellation of VVS diamonds. Each piece is individually handcrafted.",
      price: "185000",
      originalPrice: null,
      category: "Jewelry",
      categoryId: 3,
      stock: 3,
      sku: "SF-J001",
      images: [],
      isFeatured: true,
      isBestseller: false,
      isNewArrival: false,
      hasEngravingOption: true,
      scentNotes: null,
      ingredients: null,
      usageInstructions: "Store in the provided velvet-lined box. Clean with the enclosed microfibre cloth.",
    },
    {
      name: "Celestial Pearl Necklace",
      slug: "celestial-pearl-necklace",
      description: "South Sea pearls of exceptional lustre, set on an 18K gold chain with diamond pavé clasps. A timeless heirloom crafted for eternity.",
      price: "145000",
      originalPrice: "165000",
      category: "Jewelry",
      categoryId: 3,
      stock: 5,
      sku: "SF-J002",
      images: [],
      isFeatured: true,
      isBestseller: false,
      isNewArrival: true,
      hasEngravingOption: true,
      scentNotes: null,
      ingredients: null,
      usageInstructions: "Keep away from perfumes and chemicals. Store in provided jewelry box.",
    },
  ]).onConflictDoNothing().returning();

  console.log("Products seeded:", products.length);

  // Boutiques
  const boutiques = await db.insert(boutiquesTable).values([
    {
      name: "Shamim Forever — Karachi Flagship",
      address: "Dolmen Mall Clifton, Block 4, Clifton",
      city: "Karachi",
      country: "Pakistan",
      phone: "+92 21 3581 0000",
      email: "karachi@shamimforever.com",
      openingHours: "Mon–Sun: 11:00 AM – 10:00 PM",
      lat: "24.8112",
      lng: "67.0308",
    },
    {
      name: "Shamim Forever — Lahore",
      address: "Emporium Mall, Johar Town",
      city: "Lahore",
      country: "Pakistan",
      phone: "+92 42 3540 0000",
      email: "lahore@shamimforever.com",
      openingHours: "Mon–Sun: 11:00 AM – 10:00 PM",
      lat: "31.4697",
      lng: "74.2728",
    },
    {
      name: "Shamim Forever — Islamabad",
      address: "Centaurus Mall, Jinnah Avenue",
      city: "Islamabad",
      country: "Pakistan",
      phone: "+92 51 2809 0000",
      email: "islamabad@shamimforever.com",
      openingHours: "Mon–Sun: 10:00 AM – 9:00 PM",
      lat: "33.7294",
      lng: "73.0931",
    },
  ]).onConflictDoNothing().returning();

  console.log("Boutiques seeded:", boutiques.length);

  // Admin user
  const admin = await db.insert(usersTable).values({
    email: process.env.ADMIN_EMAIL || "faisalorakzaiofficial@gmail.com",
    name: "Faisal Orakzai",
    passwordHash: hashPassword("admin123"),
    role: "admin",
  }).onConflictDoNothing().returning();

  console.log("Admin user seeded:", admin.length);
  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
