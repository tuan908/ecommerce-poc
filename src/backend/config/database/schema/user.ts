import {serial, text, timestamp} from "drizzle-orm/pg-core";
import {pgTableWithAudit} from "./base/helpers";

export const User = pgTableWithAudit("t_users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at", {mode: "string", precision: 6})
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", {mode: "string", precision: 6})
		.notNull()
		.defaultNow(),
});
