import {Hono} from "hono";

const inventoryController = new Hono()
	.get("/", async c => {
		return c.json("Inventory");
	})
	.get("/stock/:id", async c => {
		return c.json({
			stock: 0,
		});
	});

export default inventoryController;
