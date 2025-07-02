// src/backend/database/schema/base/helpers.ts

import type {BuildExtraConfigColumns} from "drizzle-orm/column-builder";
import {
	type PgColumnBuilderBase,
	pgTable,
	type PgTableExtraConfigValue,
} from "drizzle-orm/pg-core"; // Import explicit Drizzle types
import {auditableColumns, auditableIndexes} from "./auditable";
import type {AuditableData, AuditContext} from "./types";

// Create a function that composes audit columns with custom columns
export function pgTableWithAudit<
	TTableName extends string,
	TColumnsMap extends Record<string, PgColumnBuilderBase>,
>(
	name: TTableName,
	columns: TColumnsMap,
	extraConfig?: (
		self: BuildExtraConfigColumns<TTableName, TColumnsMap, "pg">,
	) => PgTableExtraConfigValue[],
) {
	// Create the table with merged columns
	return pgTable(name, {...columns, ...auditableColumns}, t => {
		if (!extraConfig) return [...auditableIndexes(t)];
		return [...auditableIndexes(t), ...extraConfig(t)];
	});
}

// Helper to prepare insert data with audit fields (remains the same as fixed in previous turn)
export function withAuditFields<T extends Record<string, any>>(
	data: T,
	context?: AuditContext,
): T & Partial<AuditableData> {
	const now = new Date();
	return {
		...data,
		createdAt: now,
		createdBy: context?.userId ?? null,
		updatedAt: now,
		updatedBy: context?.userId ?? null,
		version: 1,
	};
}

// Helper to prepare update data with audit fields (remains the same)
export function withUpdateAuditFields<T extends Record<string, any>>(
	data: T,
	context?: AuditContext,
): T & Partial<AuditableData> {
	return {
		...data,
		updatedAt: new Date(),
		updatedBy: context?.userId ?? null,
	};
}

// Helper for soft delete (remains the same)
export function withSoftDelete(context?: AuditContext): Partial<AuditableData> {
	return {
		deletedAt: new Date(),
		deletedBy: context?.userId ?? null,
	};
}
