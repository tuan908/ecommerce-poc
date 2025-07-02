import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({path: ".env.local"})

console.log(process.env.DATABASE_URL!)

export default defineConfig({
  schema: "./src/backend/config/database/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
