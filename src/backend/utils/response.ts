import {ApiResponse, PaginationInfo, ValidationError} from "../types/reponse";

// Create a successful response
export function createSuccessResponse<TData>(
	data: TData,
	options?: {
		code?: number;
		message?: string;
		requestId?: string;
		pagination?: PaginationInfo;
	},
): ApiResponse<TData> {
	return {
		success: true,
		status: {
			code: options?.code ?? 200,
			message: options?.message ?? "Success",
		},
		requestId: options?.requestId ?? generateRequestId(),
		timestamp: new Date().toISOString(),
		data,
		pagination: options?.pagination,
	};
}

// Create an error response
export function createErrorResponse<T = unknown>(
	error: {
		code: string;
		message: string;
		details?: T;
		statusCode?: number;
		errors?: ValidationError[];
	},
	requestId?: string,
): ApiResponse {
	return {
		success: false,
		status: {
			code: error.statusCode ?? 400,
			message: "Error",
		},
		requestId: requestId ?? generateRequestId(),
		timestamp: new Date().toISOString(),
		error: {
			code: error.code,
			message: error.message,
			details: error.details,
			errors: error.errors,
		},
	};
}

// Generate a unique request ID
export function generateRequestId(): string {
	return `req_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// Generate a unique timestamp
export function generateTimestamp(): string {
	return new Date().toISOString();
}

/**
 * Error handling utilities
 */
export function getErrorMessage(error: ApiResponse): string {
	return error.error?.message || "An unknown error occurred";
}

export function getFieldError(
	error: ApiResponse,
	field: string,
): string | undefined {
	return error.error?.errors?.find(err => err.field === field)?.message;
}

export function getFieldErrors(error: ApiResponse): Record<string, string> {
	if (!error.error?.errors) return {};

	return error.error.errors.reduce(
		(acc, err) => {
			if (err.field) {
				acc[err.field] = err.message;
			}
			return acc;
		},
		{} as Record<string, string>,
	);
}

/**
 * Type guard to check if response is successful
 */
export function isSuccessResponse<TData>(
	response: ApiResponse<TData>,
): response is ApiResponse<TData> & {data: TData} {
	return response.success === true && response.data !== undefined;
}
