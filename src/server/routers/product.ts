import { db, Product } from "@/lib/db";
import { nullsToUndefined } from "@/shared/utils";
import { Hono } from "hono";
import { createSuccessResponse } from "../utils";

const productRouter = new Hono().get("/", async c => {
	const products = await db.select().from(Product);
	return c.json(
		createSuccessResponse(nullsToUndefined(products.map(x => ({...x, description: x.description ?? ""})))),
		200,
	);
});

export default productRouter;
