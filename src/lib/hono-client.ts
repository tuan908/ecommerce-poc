import {hc} from "hono/client";

export const honoClient = hc<typeof import("@/server").default>("/");
