import {Redis} from "@upstash/redis";
import {env} from "../../../env.mjs";

export const redis = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN,
});
// Redis key helpers
const getCartKey = (userId: string) => `cart:${userId}`;
const getInventoryKey = (productId: string) => `inventory:${productId}`;
const getAnalyticsKey = (date: string) => `analytics:cart:${date}`;

export const REDIS_UTILS = {
	getCartKey,
	getInventoryKey,
	getAnalyticsKey,
};
