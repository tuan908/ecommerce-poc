import {nullsToUndefined} from "@/shared/utils";
import {Hono} from "hono";
import {DbSchema} from "../database/schema";
import {createSuccessResponse} from "../utils";

const productRouter = new Hono().get("/", async c => {
	const db = c.get("db");
	const products = await db.select().from(DbSchema.Product);
	return c.json(
		createSuccessResponse(
			nullsToUndefined(
				products.map(x => ({...x, description: x.description ?? ""})),
			),
		),
		200,
	);
});

export default productRouter;
