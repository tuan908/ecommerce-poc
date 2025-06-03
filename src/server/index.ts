import { Hono } from "hono";
import { MiddlewareFactory } from "./middlewares";
import productRouter from "./routers/product";
import type { Database, Session } from "./types";

// Extend Hono Context types
declare module "hono" {
	interface ContextVariableMap {
		db: Database;
		user: Session;
	}
}

const db = MiddlewareFactory.createDbMiddleware();

const app = new Hono().basePath("/api");

app.use(db)

app.route("/products", productRouter);

export default app;

export type AppType = typeof app;
