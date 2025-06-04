import {Hono} from "hono";

const inventoryRouter = new Hono()
	.get("/", async c => {
		return c.json("Inventory");
	})
	.get("/stock/:id", async c => {
		return c.json({
			stock: 0,
		});
	});

export default inventoryRouter;
