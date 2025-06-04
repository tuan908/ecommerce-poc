export interface ApiResponse<TData = unknown> {
	success: boolean;
	status: {
		code: number;
		message: string;
	};
	requestId: string;
	timestamp: string;
	data?: TData;
	error?: ApiError;
	pagination?: PaginationInfo;
	rateLimit?: RateLimitInfo;
}

export interface ApiError {
	code: string;
	message: string;
	details?: unknown;
	path?: string;
	stack?: string;
	errors?: ValidationError[];
}

export interface ValidationError {
	field: string;
	message: string;
	code: string;
	value?: unknown;
}

export interface PaginationInfo {
	page: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	nextPageUrl?: string;
	previousPageUrl?: string;
}

export interface RateLimitInfo {
	limit: number;
	remaining: number;
	reset: number;
}
