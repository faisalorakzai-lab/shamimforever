import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, decimal, jsonb, uniqueIndex } from "drizzle-orm/pg-core";

export const assetTokenization = pgTable(
  "asset_tokenization",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    productId: varchar("product_id", { length: 255 }).notNull(),
    nftContractAddress: text("nft_contract_address"),
    tokenId: varchar("token_id", { length: 255 }),
    blockchainNetwork: varchar("blockchain_network", { length: 50 }).default("ethereum"),
    ownerAddress: varchar("owner_address", { length: 255 }),
    qrCode: text("qr_code"),
    certificateUrl: text("certificate_url"),
    isVerified: boolean("is_verified").default(false),
    verificationDate: timestamp("verification_date"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    productIdIdx: uniqueIndex("asset_tokenization_product_id_idx").on(table.productId),
    tokenIdIdx: uniqueIndex("asset_tokenization_token_id_idx").on(table.tokenId),
  })
);

export type AssetTokenization = typeof assetTokenization.$inferSelect;
export type AssetTokenizationInsert = typeof assetTokenization.$inferInsert;
