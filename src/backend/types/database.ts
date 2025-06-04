// Configuration interface
export interface DatabaseConfig {
	connectionString: string;
	timeout?: number;
	slowQueryThreshold?: number;
	enableLogging?: boolean;
	transactionTimeout?: number;
}

// Transaction configuration
export interface TransactionConfig {
	timeout?: number;
	isolationLevel?:
		| "read uncommitted"
		| "read committed"
		| "repeatable read"
		| "serializable";
	accessMode?: "read write" | "read only";
}

// Transaction result type
export type TransactionResult<T> = {
	success: boolean;
	data?: T;
	error?: Error;
	duration: number;
};
