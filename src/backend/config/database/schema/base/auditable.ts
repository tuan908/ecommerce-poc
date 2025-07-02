// src/backend/database/schema/base/auditable.ts
import {sql} from "drizzle-orm";
import {integer, timestamp, uuid} from "drizzle-orm/pg-core";

// Define audit columns that will be added to every table
export const auditableColumns = {
	// Timestamps
	createdAt: timestamp("created_at", {withTimezone: true})
		.notNull()
		.defaultNow(),

	updatedAt: timestamp("updated_at", {withTimezone: true})
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()), // Drizzle's built-in update trigger

	deletedAt: timestamp("deleted_at", {withTimezone: true}),

	// User tracking (optional - can be foreign keys)
	createdBy: uuid("created_by"),
	updatedBy: uuid("updated_by"),
	deletedBy: uuid("deleted_by"),

	// Optimistic locking version
	version: integer("version").notNull().default(1),
};

// SQL functions for advanced features
export const auditableSQLHelpers = {
	// For soft delete checks
	isNotDeleted: (table: any) => sql`${table.deletedAt} IS NULL`,

	// For versioning
	incrementVersion: (table: any) => sql`${table.version} + 1`,

	// For timestamp updates (if not using Drizzle's $onUpdate)
	updateTimestamp: () => sql`NOW()`,
};

// Default indexes for audit fields
export const auditableIndexes = (table: any) => [
	// Index for soft deletes
	{name: "idx_deleted_at", columns: [table.deletedAt]},
	// Index for created timestamp queries
	{name: "idx_created_at", columns: [table.createdAt]},
	// Composite index for user activity tracking
	{name: "idx_created_by_at", columns: [table.createdBy, table.createdAt]},
];
