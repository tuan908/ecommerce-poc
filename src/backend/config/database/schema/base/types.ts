// src/backend/database/schema/base/types.ts

import type {InferInsertModel, InferSelectModel} from "drizzle-orm";
import type {PgTableWithColumns} from "drizzle-orm/pg-core";

// Audit context for tracking who made changes
export interface AuditContext {
	userId?: string;
	requestId?: string;
	ipAddress?: string;
	userAgent?: string;
}

// Type representing the actual data values for auditable columns
export type AuditableData = {
	createdAt: Date;
	createdBy: string | null; // UUIDs are stored as strings, or null if not set
	updatedAt: Date;
	updatedBy: string | null;
	deletedAt: Date | null;
	deletedBy: string | null;
	version: number;
};

// Base audit fields interface (as previously)
export interface AuditableFields {
	createdAt: Date;
	createdBy?: string | null;
	updatedAt: Date;
	updatedBy?: string | null;
	deletedAt?: Date | null;
	deletedBy?: string | null;
	version: number;
}

// Utility types for tables with audit fields
export type WithAuditFields<T> = T & AuditableFields;

export type SelectModel<T extends PgTableWithColumns<any>> =
	InferSelectModel<T>;
export type InsertModel<T extends PgTableWithColumns<any>> =
	InferInsertModel<T>;
