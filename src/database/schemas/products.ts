import {
  boolean,
  integer,
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }),
  priceCents: integer('price_cents').notNull(),
  description: text('description').notNull(),
  stock: integer('stock').default(0).notNull(),
  category: varchar('category', { length: 100 }),
  images: text('images').array(),
  status: boolean('status').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});
