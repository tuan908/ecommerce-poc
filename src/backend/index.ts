import {Hono} from "hono";
import {logger} from "hono/logger";
import {MiddlewareFactory} from "./middlewares";
import {Routes} from "./routers";
import type {Session} from "./types/session";

// Extend Hono Context types
declare module "hono" {
	interface ContextVariableMap {
		user: Session;
	}
}

const db = MiddlewareFactory.createDbMiddleware();

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use("*", db);
// Rate limiting middleware (simple implementation)
const rateLimitMap = new Map<string, {count: number; resetAt: number}>();
app.use("/api/v1/cart/*", async (c, next) => {
	const userId = c.get("user")?.userId;
	if (!userId) {
		return c.json({error: "Unauthorized"}, 401);
	}

	const now = performance.now();
	const windowMs = 60 * 1000; // 1 minute
	const maxRequests = 100;

	const userLimit = rateLimitMap.get(userId);
	if (!userLimit || now > userLimit.resetAt) {
		rateLimitMap.set(userId, {count: 1, resetAt: now + windowMs});
	} else {
		userLimit.count++;
		if (userLimit.count > maxRequests) {
			return c.json({error: "Too many requests"}, 429);
		}
	}

	await next();
});

const routes = app
	.route("/v1/product", Routes.V1.Product)
	.route("/v1/inventory", Routes.V1.Inventory)
	.route("/v1/cart", Routes.V1.Cart);

export default app;

export type AppType = typeof routes;
