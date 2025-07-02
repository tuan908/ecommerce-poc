// api/cart/routes.ts
import {client} from "@/backend/client";
import {CartItem} from "@/store/types/cart";
import {Redis} from "@upstash/redis";
import {Hono} from "hono";
import {z} from "zod";
import {env} from "../../../env.mjs";
import {REDIS_UTILS} from "../config/redis";
import CART_VALIDATION_SCHEMA from "../lib/validations/cart";

// Environment validation

// Initialize Redis client
const redis = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN,
});

interface CartData {
	items: CartItem[];
	version: number;
	updatedAt: number;
	expiresAt?: number;
}

const cartController = new Hono()

	// Get cart
	.get("/:userId", async c => {
		try {
			const userId = c.req.param("userId");
			const jwtUserId = c.get("user")?.userId;

			if (userId !== jwtUserId) {
				return c.json({error: "Forbidden"}, 403);
			}

			const cartData = await getCartWithLock(userId);

			// Remove expired items
			if (cartData?.items) {
				const now = Date.now();
				const validItems = cartData.items.filter(
					item => !item.expiresAt || item.expiresAt > now,
				);

				if (validItems.length !== cartData.items.length) {
					cartData.items = validItems;
					await updateCartWithVersion(userId, cartData, cartData.version);
				}
			}

			return c.json({
				items: cartData?.items || [],
				version: cartData?.version || 0,
				updatedAt: cartData?.updatedAt,
			});
		} catch (error) {
			console.error("Get cart error:", error);
			return c.json({error: "Internal server error"}, 500);
		}
	})

	// Add item to cart
	.post("/add", async c => {
		try {
			const body = await c.req.json();
			const validatedData = CART_VALIDATION_SCHEMA.addItem.parse(body);
			const jwtUserId = c.get("user")?.userId;

			if (validatedData.userId !== jwtUserId) {
				return c.json({error: "Forbidden"}, 403);
			}

			// Check inventory
			const hasStock = await checkInventory(
				validatedData.productId,
				validatedData.quantity,
			);
			if (!hasStock) {
				return c.json({error: "Insufficient inventory"}, 400);
			}

			const cartData = (await getCartWithLock(validatedData.userId)) || {
				items: [],
				version: 0,
				updatedAt: Date.now(),
			};

			// Check for existing item
			const existingIndex = cartData.items.findIndex(
				item => item.productId === validatedData.productId,
			);
			const newItem: CartItem = {
				id:
					existingIndex >= 0
						? cartData.items[existingIndex].id
						: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
				productId: validatedData.productId,
				name: validatedData.name,
				price: validatedData.price,
				quantity: validatedData.quantity,
				imageUrl: validatedData.imageUrl,
				maxQuantity: validatedData.maxQuantity,
				expiresAt: validatedData.expiresAt,
			};

			if (existingIndex >= 0) {
				// Update existing item
				const totalQuantity =
					cartData.items[existingIndex].quantity + validatedData.quantity;

				// Check max quantity constraint
				if (newItem.maxQuantity && totalQuantity > newItem.maxQuantity) {
					return c.json({error: "Exceeds maximum quantity"}, 400);
				}

				// Re-check inventory for total quantity
				const hasStockForTotal = await checkInventory(
					validatedData.productId,
					totalQuantity,
				);
				if (!hasStockForTotal) {
					return c.json(
						{error: "Insufficient inventory for requested quantity"},
						400,
					);
				}

				newItem.quantity = totalQuantity;
				cartData.items[existingIndex] = newItem;
			} else {
				cartData.items.push(newItem);
			}

			// Attempt optimistic update
			const success = await updateCartWithVersion(
				validatedData.userId,
				cartData,
				validatedData.version,
			);
			if (!success) {
				return c.json(
					{
						error:
							"Cart was modified by another request. Please refresh and try again.",
					},
					409,
				);
			}

			return c.json({
				item: newItem,
				version: validatedData.version + 1,
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				return c.json(
					{error: "Invalid request data", details: error.errors},
					400,
				);
			}
			console.error("Add item error:", error);
			return c.json({error: "Internal server error"}, 500);
		}
	})

	// Update item quantity
	.patch("/update", async c => {
		try {
			const body = await c.req.json();
			const validatedData = CART_VALIDATION_SCHEMA.updateQuantity.parse(body);
			const jwtUserId = c.get("user")?.userId;

			if (validatedData.userId !== jwtUserId) {
				return c.json({error: "Forbidden"}, 403);
			}

			const cartData = await getCartWithLock(validatedData.userId);
			if (!cartData) {
				return c.json({error: "Cart not found"}, 404);
			}

			const itemIndex = cartData.items.findIndex(
				item => item.id === validatedData.itemId,
			);
			if (itemIndex < 0) {
				return c.json({error: "Item not found in cart"}, 404);
			}

			const item = cartData.items[itemIndex];

			// Check inventory
			const hasStock = await checkInventory(
				item.productId,
				validatedData.quantity,
			);
			if (!hasStock) {
				return c.json({error: "Insufficient inventory"}, 400);
			}

			// Check max quantity constraint
			if (item.maxQuantity && validatedData.quantity > item.maxQuantity) {
				return c.json({error: "Exceeds maximum quantity"}, 400);
			}

			// Update quantity
			const updatedItem = {...item, quantity: validatedData.quantity};
			cartData.items[itemIndex] = updatedItem;

			const success = await updateCartWithVersion(
				validatedData.userId,
				cartData,
				validatedData.version,
			);
			if (!success) {
				return c.json(
					{
						error:
							"Cart was modified by another request. Please refresh and try again.",
					},
					409,
				);
			}

			return c.json({
				item: updatedItem,
				version: validatedData.version + 1,
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				return c.json(
					{error: "Invalid request data", details: error.errors},
					400,
				);
			}
			console.error("Update quantity error:", error);
			return c.json({error: "Internal server error"}, 500);
		}
	})

	// Remove item from cart
	.delete("/remove", async c => {
		try {
			const body = await c.req.json();
			const validatedData = CART_VALIDATION_SCHEMA.removeItem.parse(body);
			const jwtUserId = c.get("user")?.userId;

			if (validatedData.userId !== jwtUserId) {
				return c.json({error: "Forbidden"}, 403);
			}

			const cartData = await getCartWithLock(validatedData.userId);
			if (!cartData) {
				return c.json({error: "Cart not found"}, 404);
			}

			const initialLength = cartData.items.length;
			cartData.items = cartData.items.filter(
				item => item.id !== validatedData.itemId,
			);

			if (cartData.items.length === initialLength) {
				return c.json({error: "Item not found in cart"}, 404);
			}

			const success = await updateCartWithVersion(
				validatedData.userId,
				cartData,
				validatedData.version,
			);
			if (!success) {
				return c.json(
					{
						error:
							"Cart was modified by another request. Please refresh and try again.",
					},
					409,
				);
			}

			return c.json({
				itemId: validatedData.itemId,
				version: validatedData.version + 1,
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				return c.json(
					{error: "Invalid request data", details: error.errors},
					400,
				);
			}
			console.error("Remove item error:", error);
			return c.json({error: "Internal server error"}, 500);
		}
	})

	// Analytics endpoint
	.post("/api/analytics/cart", async c => {
		try {
			const body = await c.req.json();
			const validatedData = CART_VALIDATION_SCHEMA.analytics.parse(body);
			const jwtUserId = c.get("user")?.userId;

			if (validatedData.userId !== jwtUserId) {
				return c.json({error: "Forbidden"}, 403);
			}

			// Store analytics in Redis with daily partitioning
			const date = new Date(validatedData.timestamp)
				.toISOString()
				.split("T")[0];
			const analyticsKey = REDIS_UTILS.getAnalyticsKey(date);

			await redis.lpush(analyticsKey, JSON.stringify(validatedData));
			// Set TTL for 30 days
			await redis.expire(analyticsKey, 2592000);

			return c.json({success: true});
		} catch (error) {
			if (error instanceof z.ZodError) {
				return c.json(
					{error: "Invalid analytics data", details: error.errors},
					400,
				);
			}
			console.error("Analytics error:", error);
			return c.json({error: "Internal server error"}, 500);
		}
	})

	// Cart cleanup job (call periodically)
	.post("/cleanup", async c => {
		try {
			// This should be protected by an internal API key in production
			const authHeader = c.req.header("X-Internal-Key");
			if (authHeader !== process.env.INTERNAL_API_KEY) {
				return c.json({error: "Unauthorized"}, 401);
			}

			// Get all cart keys (in production, you'd want pagination)
			const keys = await redis.keys("cart:*");
			let cleanedCount = 0;

			for (const key of keys) {
				const cartData = (await redis.get(key)) as CartData | null;
				if (cartData?.items) {
					const now = Date.now();
					const validItems = cartData.items.filter(
						item => !item.expiresAt || item.expiresAt > now,
					);

					if (validItems.length !== cartData.items.length) {
						if (validItems.length === 0) {
							await redis.del(key);
						} else {
							cartData.items = validItems;
							await redis.set(key, JSON.stringify(cartData));
						}
						cleanedCount++;
					}
				}
			}

			return c.json({cleanedCarts: cleanedCount});
		} catch (error) {
			console.error("Cleanup error:", error);
			return c.json({error: "Internal server error"}, 500);
		}
	});

export default cartController;

// Inventory checking
async function checkInventory(
	productId: string,
	requestedQuantity: number,
): Promise<boolean> {
	try {
		// Check Redis cache first
		const cachedStock = await redis.get(REDIS_UTILS.getInventoryKey(productId));
		if (cachedStock !== null) {
			return Number(cachedStock) >= requestedQuantity;
		}

		// Fallback to inventory service if configured

		const response = await client.inventory.stock[":id"].$get({
			param: {
				id: productId,
			},
		});
		if (response.ok) {
			const {stock} = await response.json();
			// Cache for 5 minutes
			await redis.setex(REDIS_UTILS.getInventoryKey(productId), 300, stock);
			return stock >= requestedQuantity;
		}

		// Default to allowing if we can't check
		console.warn(`Could not verify inventory for product ${productId}`);
		return true;
	} catch (error) {
		console.error("Inventory check failed:", error);
		return true; // Fail open for availability
	}
}

// Optimistic concurrency control
async function getCartWithLock(userId: string): Promise<CartData | null> {
	const cartData = await redis.get(REDIS_UTILS.getCartKey(userId));
	return cartData as CartData | null;
}

async function updateCartWithVersion(
	userId: string,
	cartData: CartData,
	expectedVersion: number,
): Promise<boolean> {
	// Check if version matches (optimistic locking)
	const currentCart = await getCartWithLock(userId);
	if (currentCart && currentCart.version !== expectedVersion) {
		return false; // Version conflict
	}

	const newCartData: CartData = {
		...cartData,
		version: expectedVersion + 1,
		updatedAt: Date.now(),
	};

	// Set with TTL (24 hours for regular carts, custom for limited items)
	const ttl = cartData.expiresAt
		? Math.max(3600, Math.floor((cartData.expiresAt - Date.now()) / 1000))
		: 86400;

	await redis.setex(
		REDIS_UTILS.getCartKey(userId),
		ttl,
		JSON.stringify(newCartData),
	);
	return true;
}
