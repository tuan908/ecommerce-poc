import {neon, Pool} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-serverless";
import type {PgTransaction} from "drizzle-orm/pg-core";
import type {MiddlewareHandler} from "hono";
import {ContentfulStatusCode} from "hono/utils/http-status";
import {DbSchema} from "../database/schema";
import {DatabaseError, TransactionError} from "../errors/database-error";
import type {
	DatabaseConfig,
	TransactionConfig,
	TransactionResult,
} from "../types/database";

// Singleton connection manager optimized for Neon serverless
class NeonConnectionManager {
	private static instance: NeonConnectionManager;
	private config: DatabaseConfig;
	private sqlClient: Pool | null = null;
	private dbInstance: ReturnType<typeof drizzle> | null = null;

	private constructor(config: DatabaseConfig) {
		this.config = this.validateConfig(config);
	}

	static getInstance(config?: DatabaseConfig): NeonConnectionManager {
		if (!NeonConnectionManager.instance) {
			if (!config) {
				throw new DatabaseError(
					"Database configuration required for first initialization",
					"CONFIG_MISSING",
					500,
				);
			}
			NeonConnectionManager.instance = new NeonConnectionManager(config);
		}
		return NeonConnectionManager.instance;
	}

	private validateConfig(config: DatabaseConfig): DatabaseConfig {
		if (!config.connectionString) {
			throw new DatabaseError(
				"Database connection string is required",
				"CONFIG_INVALID",
				500,
			);
		}

		// Validate connection string format
		if (
			!config.connectionString.startsWith("postgresql://") &&
			!config.connectionString.startsWith("postgres://")
		) {
			throw new DatabaseError(
				"Invalid connection string format",
				"CONFIG_INVALID",
				500,
			);
		}

		return {
			connectionString: config.connectionString,
			timeout: config.timeout ?? 30000, // 30 seconds default
			slowQueryThreshold: config.slowQueryThreshold ?? 1000, // 1 second default
			enableLogging: config.enableLogging ?? false,
			transactionTimeout: config.transactionTimeout ?? 10000, // 10 seconds default for transactions
		};
	}

	private createSqlClient() {
		if (!this.sqlClient) {
			this.sqlClient = new Pool({
				connectionString: this.config.connectionString,
			});
		}
		return this.sqlClient;
	}

	getDrizzleInstance(): ReturnType<typeof drizzle> {
		if (!this.dbInstance) {
			const sql = this.createSqlClient();
			this.dbInstance = drizzle(sql, {
				schema: DbSchema,
				logger: this.config.enableLogging,
			});
		}
		return this.dbInstance;
	}

	async healthCheck(): Promise<{
		healthy: boolean;
		latency: number;
		error?: string;
	}> {
		const startTime = performance.now();

		try {
			const sql = neon(this.config.connectionString);

			// Use Promise.race for timeout handling
			const healthQuery = sql`SELECT 1 as health`;
			const timeoutPromise = new Promise((_, reject) =>
				setTimeout(
					() => reject(new Error("Health check timeout")),
					this.config.timeout,
				),
			);

			await Promise.race([healthQuery, timeoutPromise]);

			return {
				healthy: true,
				latency: performance.now() - startTime,
			};
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error";
			console.error("Database health check failed:", errorMessage);

			return {
				healthy: false,
				latency: Date.now() - startTime,
				error: errorMessage,
			};
		}
	}

	getConfig(): Readonly<DatabaseConfig> {
		return {...this.config};
	}

	// Transaction helper methods
	async withTransaction<T>(
		callback: (tx: PgTransaction<any, any, any>) => Promise<T>,
		config?: TransactionConfig,
	): Promise<TransactionResult<T>> {
		const startTime = performance.now();
		const transactionId = `tx_${performance.now()}_${Math.random()
			.toString(36)
			.substr(2, 9)}`;

		try {
			const db = this.getDrizzleInstance();
			const timeout =
				config?.timeout ?? this.config.transactionTimeout ?? 10000;

			// Create transaction with timeout
			const transactionPromise = db.transaction(async tx => {
				// Set transaction configuration if provided
				if (config?.isolationLevel || config?.accessMode) {
					const isolationLevel = config.isolationLevel ?? "read committed";
					const accessMode = config.accessMode ?? "read write";
					await tx.execute(
						`SET TRANSACTION ISOLATION LEVEL ${isolationLevel.toUpperCase()}`,
					);
					await tx.execute(`SET TRANSACTION ${accessMode.toUpperCase()}`);
				}

				return await callback(tx);
			});

			const timeoutPromise = new Promise<never>((_, reject) =>
				setTimeout(
					() =>
						reject(
							new TransactionError(
								`Transaction timeout after ${timeout}ms`,
								transactionId,
							),
						),
					timeout,
				),
			);

			const result = await Promise.race([transactionPromise, timeoutPromise]);

			const duration = performance.now() - startTime;

			if (this.config.enableLogging) {
				console.log(
					`Transaction ${transactionId} completed successfully in ${duration}ms`,
				);
			}

			return {
				success: true,
				data: result,
				duration,
			};
		} catch (error) {
			const duration = performance.now() - startTime;
			const transactionError = new TransactionError(
				`Transaction failed: ${
					error instanceof Error ? error.message : "Unknown error"
				}`,
				transactionId,
				error instanceof Error ? error : undefined,
			);

			console.error(
				`Transaction ${transactionId} failed after ${duration}ms:`,
				{
					transactionId,
					duration,
					error: error instanceof Error ? error.message : "Unknown error",
					stack: error instanceof Error ? error.stack : undefined,
				},
			);

			return {
				success: false,
				error: transactionError,
				duration,
			};
		}
	}

	// Batch operation helper
	async withBatchTransaction<T>(
		operations: Array<(tx: PgTransaction<any, any, any>) => Promise<T>>,
		config?: TransactionConfig,
	): Promise<TransactionResult<T[]>> {
		return this.withTransaction(async tx => {
			const results: T[] = [];
			for (const operation of operations) {
				const result = await operation(tx);
				results.push(result);
			}
			return results;
		}, config);
	}
}

// Factory function for creating database middleware
export const createDbMiddleware = (
	configOverride?: Partial<DatabaseConfig>,
): MiddlewareHandler => {
	return async (c, next) => {
		const requestId = c.get("requestId") || "unknown";
		const start = Date.now();

		try {
			// Get base config from environment
			const baseConfig: DatabaseConfig = {
				connectionString: process.env.DATABASE_URL || "",
				timeout: parseInt(process.env.DB_TIMEOUT || "30000"),
				slowQueryThreshold: parseInt(
					process.env.DB_SLOW_QUERY_THRESHOLD || "1000",
				),
				enableLogging: process.env.DB_ENABLE_LOGGING === "true",
				transactionTimeout: parseInt(
					process.env.DB_TRANSACTION_TIMEOUT || "10000",
				),
			};

			// Merge with any overrides
			const finalConfig = {...baseConfig, ...configOverride};

			// Get or create connection manager
			const connectionManager = NeonConnectionManager.getInstance(finalConfig);

			// Get Drizzle instance
			const db = connectionManager.getDrizzleInstance();

			// Add to context
			c.set("db", db);
			c.set("dbConnectionManager", connectionManager);

			// Continue to next middleware/handler
			await next();

			// Performance monitoring
			const duration = Date.now() - start;
			const threshold = connectionManager.getConfig().slowQueryThreshold;

			if (threshold && duration > threshold) {
				console.warn(`Slow database operation detected`, {
					requestId,
					duration,
					path: c.req.path,
					method: c.req.method,
					threshold,
				});
			}
		} catch (error) {
			const duration = Date.now() - start;

			// Log error with context
			console.error("Database middleware error:", {
				requestId,
				duration,
				path: c.req.path,
				method: c.req.method,
				error: error instanceof Error ? error.message : "Unknown error",
			});

			// Handle different error types
			if (error instanceof DatabaseError) {
				return c.json(
					{
						error: "Database Error",
						message:
							error.code === "CONFIG_INVALID"
								? "Database configuration error"
								: "Database connection unavailable",
						statusCode: error.statusCode,
						requestId,
					},
					error.statusCode as ContentfulStatusCode,
				);
			}

			// Generic error response
			return c.json(
				{
					error: "Internal Server Error",
					message: "An unexpected error occurred",
					statusCode: 500,
					requestId,
				},
				500,
			);
		}
	};
};

// Transaction middleware for automatic transaction per request
export const createTransactionMiddleware = (
	config?: TransactionConfig & {
		autoCommit?: boolean;
		skipPaths?: string[];
	},
): MiddlewareHandler => {
	return async (c, next) => {
		const requestId = c.get("requestId") || "unknown";
		const path = c.req.path;

		// Skip transaction for specified paths (like health checks)
		if (config?.skipPaths?.some(skipPath => path.startsWith(skipPath))) {
			return next();
		}

		// Only wrap write operations in transactions by default
		const isWriteOperation = ["POST", "PUT", "PATCH", "DELETE"].includes(
			c.req.method,
		);
		const autoCommit = config?.autoCommit ?? isWriteOperation;

		if (!autoCommit) {
			return next();
		}

		try {
			const connectionManager = c.get(
				"dbConnectionManager",
			) as NeonConnectionManager;

			if (!connectionManager) {
				throw new DatabaseError(
					"Database connection manager not available",
					"CONNECTION_MISSING",
					500,
				);
			}

			// Wrap the entire request in a transaction
			const result = await connectionManager.withTransaction(
				async tx => {
					// Replace the db context with transaction
					c.set("db", tx);
					c.set("isInTransaction", true);

					await next();

					// If we get here, the request was successful
					return true;
				},
				{
					timeout: config?.timeout,
					isolationLevel: config?.isolationLevel,
					accessMode: config?.accessMode,
				},
			);

			if (!result.success) {
				console.error(`Transaction middleware failed for ${path}:`, {
					requestId,
					error: result.error?.message,
				});

				return c.json(
					{
						error: "Transaction Failed",
						message: "Request could not be completed",
						statusCode: 500,
						requestId,
					},
					500,
				);
			}
		} catch (error) {
			console.error(`Transaction middleware error for ${path}:`, {
				requestId,
				error: error instanceof Error ? error.message : "Unknown error",
			});

			return c.json(
				{
					error: "Transaction Error",
					message: "An error occurred during request processing",
					statusCode: 500,
					requestId,
				},
				500,
			);
		}
	};
};
export const createHealthCheckHandler = () => {
	return async (c: any) => {
		try {
			const connectionManager = c.get(
				"dbConnectionManager",
			) as NeonConnectionManager;

			if (!connectionManager) {
				// Fallback: try to create connection manager from env
				const config: DatabaseConfig = {
					connectionString: process.env.DATABASE_URL || "",
				};
				const manager = NeonConnectionManager.getInstance(config);
				const result = await manager.healthCheck();

				return c.json(
					{
						status: result.healthy ? "healthy" : "unhealthy",
						database: result,
						timestamp: new Date().toISOString(),
					},
					result.healthy ? 200 : 503,
				);
			}

			const result = await connectionManager.healthCheck();

			return c.json(
				{
					status: result.healthy ? "healthy" : "unhealthy",
					database: result,
					timestamp: new Date().toISOString(),
				},
				result.healthy ? 200 : 503,
			);
		} catch (error) {
			console.error("Health check handler error:", error);

			return c.json(
				{
					status: "unhealthy",
					database: {
						healthy: false,
						latency: 0,
						error: "Health check failed",
					},
					timestamp: new Date().toISOString(),
				},
				503,
			);
		}
	};
};

// Utility function for testing database configuration
export const validateDatabaseConfig = async (
	connectionString: string,
): Promise<{valid: boolean; error?: string}> => {
	try {
		const config: DatabaseConfig = {connectionString};
		const manager = NeonConnectionManager.getInstance(config);
		const health = await manager.healthCheck();

		return {
			valid: health.healthy,
			error: health.error,
		};
	} catch (error) {
		return {
			valid: false,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
};

// Type augmentation for Hono context
declare module "hono" {
	interface ContextVariableMap {
		db: ReturnType<typeof drizzle> | PgTransaction<any, any, any>;
		dbConnectionManager: NeonConnectionManager;
		isInTransaction?: boolean;
	}
}
