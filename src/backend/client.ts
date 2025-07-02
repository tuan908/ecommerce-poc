import {AppType} from "@/backend";
import {hc} from "hono/client";

export const client = hc<AppType>("/").api.v1;
