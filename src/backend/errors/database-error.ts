export class DatabaseError extends Error {
	constructor(
		message: string,
		public code: string,
		public statusCode: number = 500,
		public cause?: Error,
	) {
		super(message);
		this.name = "DatabaseError";
	}
}

export class TransactionError extends DatabaseError {
	constructor(
		message: string,
		public transactionId?: string,
		cause?: Error,
	) {
		super(message, "TRANSACTION_ERROR", 500, cause);
		this.name = "TransactionError";
	}
}
