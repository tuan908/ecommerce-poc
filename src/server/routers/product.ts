import {Hono} from "hono";

const app = new Hono().get("/", async c => {
	return c.json({message: "Welcome to the Product API"});
});

export default app;
