export interface CartItem {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	imageUrl?: string;
	maxQuantity?: number;
	expiresAt?: number; // Unix timestamp for limited availability
}

export interface CartState {
	items: CartItem[];
	total: number;
	itemCount: number;
	isLoading: boolean;
	isSyncing: boolean;
	lastSyncAt?: number;
	version: number; // For optimistic concurrency control
	error: string | null;
}

export interface CartAnalytics {
	cartId: string;
	userId: string;
	action: "add" | "remove" | "update" | "abandon" | "checkout";
	productId?: string;
	quantity?: number;
	value?: number;
	timestamp: number;
	sessionId: string;
}
