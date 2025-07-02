export type CheckoutStep = "contact" | "shipping" | "payment" | "review";

export interface ContactData {
	email: string;
	phone: string;
	isGuest: boolean;
}

export interface ShippingData {
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	district: string;
	ward: string;
	postalCode: string;
	country: string;
}

export interface BillingData {
	sameAsShipping: boolean;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	district: string;
	ward: string;
	postalCode: string;
	country: string;
}

export interface CheckoutData {
	contact: ContactData;
	shipping: ShippingData;
	billing: BillingData;
	shippingMethod: string;
	paymentMethod: string;
	promoCode: string;
	specialInstructions: string;
}

export interface CartItem {
	id: string;
	name: string;
	price: string;
	originalPrice?: string;
	image: string;
	quantity: number;
	category: string;
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
