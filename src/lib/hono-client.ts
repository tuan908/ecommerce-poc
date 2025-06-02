import {AppType} from "@/server";
import {hc} from "hono/client";

export const honoClient = hc<AppType>("/").api;
