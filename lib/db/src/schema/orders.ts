import { pgTable, text, serial, timestamp, integer, numeric, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  guestEmail: text("guest_email"),
  status: text("status").notNull().default("pending"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("PKR"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  paymentMethod: text("payment_method"),
  shippingAddress: jsonb("shipping_address").$type<Record<string, string>>().notNull().default({}),
  trackingNumber: text("tracking_number"),
  discountCode: text("discount_code"),
  discountAmount: numeric("discount_amount", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const orderItemsTable = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  engravingText: text("engraving_text"),
});

export const paymentProofsTable = pgTable("payment_proofs", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  paymentMethod: text("payment_method").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  senderName: text("sender_name").notNull(),
  senderPhone: text("sender_phone"),
  transactionId: text("transaction_id"),
  screenshotUrl: text("screenshot_url"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
export type OrderItem = typeof orderItemsTable.$inferSelect;
