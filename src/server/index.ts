import {Hono} from "hono";
import productRouter from "./routers/product";

const app = new Hono().basePath("/api").route("/products", productRouter);

export default app;

export type AppType = typeof app;
