import {Hono} from "hono";

const app = new Hono().basePath("/api");

export default app;

export type AppType = typeof app;
