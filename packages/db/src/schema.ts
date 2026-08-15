import { pgTable, text, timestamp, uuid, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const apiaries = pgTable("apiaries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  lat: doublePrecision("lat").notNull(),
  lon: doublePrecision("lon").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertApiarySchema = createInsertSchema(apiaries, {
  name: (schema) => schema.min(1),
  lat: (schema) => schema.min(-90).max(90),
  lon: (schema) => schema.min(-180).max(180),
}).omit({ id: true, createdAt: true });

export const updateApiarySchema = insertApiarySchema.partial();

export type Apiary = typeof apiaries.$inferSelect;
export type NewApiary = typeof apiaries.$inferInsert;
