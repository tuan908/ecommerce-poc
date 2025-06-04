import z from "zod";

// Validation schemas
const addItemSchema = z.object({
	productId: z.string().min(1),
	name: z.string().min(1),
	price: z.number().positive(),
	quantity: z.number().int().positive().max(99),
	imageUrl: z.string().url().optional(),
	maxQuantity: z.number().int().positive().optional(),
	expiresAt: z.number().optional(),
	userId: z.string().min(1),
	version: z.number().int().min(0),
});

const updateQuantitySchema = z.object({
	itemId: z.string().min(1),
	quantity: z.number().int().positive().max(99),
	userId: z.string().min(1),
	version: z.number().int().min(0),
});

const removeItemSchema = z.object({
	itemId: z.string().min(1),
	userId: z.string().min(1),
	version: z.number().int().min(0),
});

const analyticsSchema = z.object({
	cartId: z.string(),
	userId: z.string(),
	action: z.enum(["add", "remove", "update", "abandon", "checkout"]),
	productId: z.string().optional(),
	quantity: z.number().optional(),
	value: z.number().optional(),
	timestamp: z.number(),
	sessionId: z.string(),
});

const CART_VALIDATION_SCHEMA = {
	addItem: addItemSchema,
	removeItem: removeItemSchema,
	analytics: analyticsSchema,
	updateQuantity: updateQuantitySchema,
};

export default CART_VALIDATION_SCHEMA;
