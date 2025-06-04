// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.string().url(),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    DB_TIMEOUT: z.string(),
    DB_TRANSACTION_TIMEOUT: z.string(),
    DB_SLOW_QUERY_THRESHOLD: z.string(),
    DB_ENABLE_LOGGING: z.string(),
    JWT_TOKEN_SECRET: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    DB_TIMEOUT: process.env.DB_TIMEOUT,
    DB_TRANSACTION_TIMEOUT: process.env.DB_TRANSACTION_TIMEOUT,
    DB_SLOW_QUERY_THRESHOLD: process.env.DB_SLOW_QUERY_THRESHOLD,
    DB_ENABLE_LOGGING: process.env.DB_ENABLE_LOGGING,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET
  },
});