import {sql} from "drizzle-orm";
import {
	check,
	index,
	integer,
	numeric,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// Enum for availability status
export const availabilityEnum = pgEnum("availability_status", [
	"in-stock",
	"out-of-stock",
	"pre-order",
	"discontinued",
]);

// Enum for common badge types (extensible)
export const badgeEnum = pgEnum("product_badge", [
	"featured",
	"best-seller",
	"new",
	"sale",
	"limited-edition",
	"organic",
	"vegetarian",
	"gluten-free",
]);

export const Product = pgTable(
	"products",
	{
		// Primary identifier
		id: uuid("id").primaryKey().defaultRandom(),

		// Product information
		name: varchar("name", {length: 255}).notNull(),
		slug: varchar("slug", {length: 255}).notNull().unique(),
		description: text("description"),
		category: varchar("category", {length: 100}).notNull(),

		// Pricing (stored in smallest currency unit - VND doesn't have subunits)
		price: numeric("price", {precision: 12, scale: 0}).notNull(),
		originalPrice: numeric("original_price", {precision: 12, scale: 0}),

		// Media
		imageUrl: text("image_url"),

		// Product metrics
		rating: numeric("rating", {precision: 3, scale: 2}).default("0.00"),
		reviewCount: integer("review_count").notNull().default(0),

		// Inventory and availability
		availability: availabilityEnum("availability")
			.notNull()
			.default("in-stock"),
		inventory: integer("inventory").notNull().default(0),

		// Marketing features
		badges: text("badges"),

		// Audit fields
		createdAt: timestamp("created_at", {withTimezone: true})
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", {withTimezone: true})
			.notNull()
			.defaultNow(),
		createdBy: uuid("created_by"), // Foreign key to users table
		updatedBy: uuid("updated_by"), // Foreign key to users table

		// Soft delete
		deletedAt: timestamp("deleted_at", {withTimezone: true}),
		deletedBy: uuid("deleted_by"), // Foreign key to users table
	},
	table => [
		{
			// Indexes for performance
			categoryIdx: index("products_category_idx").on(table.category),
			availabilityIdx: index("products_availability_idx").on(
				table.availability,
			),
			ratingIdx: index("products_rating_idx").on(table.rating),
			createdAtIdx: index("products_created_at_idx").on(table.createdAt),
			slugIdx: index("products_slug_idx").on(table.slug),

			// Constraints
			priceCheck: check("price_positive", sql`${table.price} >= 0`),
			originalPriceCheck: check(
				"original_price_positive",
				sql`${table.originalPrice} IS NULL OR ${table.originalPrice} >= 0`,
			),
			ratingCheck: check(
				"rating_range",
				sql`${table.rating} >= 0 AND ${table.rating} <= 5`,
			),
			reviewCountCheck: check(
				"review_count_positive",
				sql`${table.reviewCount} >= 0`,
			),
			inventoryCheck: check("inventory_positive", sql`${table.inventory} >= 0`),
		},
	],
);

// Type inference for TypeScript
export type ProductType = typeof Product.$inferSelect;
export type NewProductType = typeof Product.$inferInsert;

// Helper type for product updates (excludes audit fields that should be managed automatically)
export type ProductUpdate = Omit<
	Partial<NewProductType>,
	"id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy"
>;

export const User = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at", {mode: "string", precision: 6})
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", {mode: "string", precision: 6})
		.notNull()
		.defaultNow(),
});

const DbSchema = {
	Product,
	User,
};

export {DbSchema};
