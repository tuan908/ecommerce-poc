import {AppType} from "@/backend";
import {hc} from "hono/client";

const honoClient = hc<AppType>("/").api;

export const API_V1 = honoClient.v1;
