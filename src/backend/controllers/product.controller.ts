import {nullsToUndefined} from "@/lib/utils";
import {Hono} from "hono";
import {Product} from "../config/database/schema/product";
import {createSuccessResponse} from "../utils/response";

const productController = new Hono().get("/", async c => {
	const db = c.get("db");
	const products = await db.select().from(Product);
	return c.json(
		createSuccessResponse(
			nullsToUndefined(
				products.map(x => ({
					...x,
					description: x.description ?? "",
					rating: Number(x.rating),
				})),
			),
		),
		200,
	);
});

export default productController;
