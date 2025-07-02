import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CartAnalytics, CartItem, CartState} from "../types/cart";

// Async thunks for server synchronization
export const syncCartFromServer = createAsyncThunk(
	"cart/syncFromServer",
	async (userId: string, {rejectWithValue}) => {
		try {
			const response = await fetch(`/api/cart/${userId}`, {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Failed to sync cart from server");
			}

			return await response.json();
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : "Sync failed",
			);
		}
	},
);

export const addItemToCart = createAsyncThunk(
	"cart/addItem",
	async (
		{item, userId}: {item: Omit<CartItem, "id">; userId: string},
		{getState, rejectWithValue},
	) => {
		try {
			const state = getState() as {cart: CartState};

			const response = await fetch("/api/cart/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					...item,
					userId,
					version: state.cart.version,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to add item");
			}

			const result = await response.json();

			// Track analytics
			await trackCartAnalytics({
				cartId: `cart_${userId}`,
				userId,
				action: "add",
				productId: item.productId,
				quantity: item.quantity,
				value: item.price * item.quantity,
				timestamp: Date.now(),
				sessionId: getSessionId(),
			});

			return result;
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : "Add item failed",
			);
		}
	},
);

export const removeItemFromCart = createAsyncThunk(
	"cart/removeItem",
	async (
		{itemId, userId}: {itemId: string; userId: string},
		{getState, rejectWithValue},
	) => {
		try {
			const state = getState() as {cart: CartState};
			const item = state.cart.items.find(i => i.id === itemId);

			const response = await fetch("/api/cart/remove", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					itemId,
					userId,
					version: state.cart.version,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to remove item");
			}

			const result = await response.json();

			// Track analytics
			if (item) {
				await trackCartAnalytics({
					cartId: `cart_${userId}`,
					userId,
					action: "remove",
					productId: item.productId,
					quantity: item.quantity,
					value: item.price * item.quantity,
					timestamp: Date.now(),
					sessionId: getSessionId(),
				});
			}

			return result;
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : "Remove item failed",
			);
		}
	},
);

export const updateItemQuantity = createAsyncThunk(
	"cart/updateQuantity",
	async (
		{
			itemId,
			quantity,
			userId,
		}: {itemId: string; quantity: number; userId: string},
		{getState, rejectWithValue},
	) => {
		try {
			const state = getState() as {cart: CartState};

			const response = await fetch("/api/cart/update", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({
					itemId,
					quantity,
					userId,
					version: state.cart.version,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to update quantity");
			}

			const result = await response.json();

			const item = state.cart.items.find(i => i.id === itemId);
			if (item) {
				await trackCartAnalytics({
					cartId: `cart_${userId}`,
					userId,
					action: "update",
					productId: item.productId,
					quantity,
					value: item.price * quantity,
					timestamp: Date.now(),
					sessionId: getSessionId(),
				});
			}

			return result;
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : "Update failed",
			);
		}
	},
);

const initialState: CartState = {
	items: [],
	total: 0,
	itemCount: 0,
	isLoading: false,
	isSyncing: false,
	version: 0,
	error: null,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearError: state => {
			state.error = null;
		},
		startSync: state => {
			state.isSyncing = true;
		},
		endSync: state => {
			state.isSyncing = false;
			state.lastSyncAt = Date.now();
		},
		clearCart: state => {
			state.items = [];
			state.total = 0;
			state.itemCount = 0;
			state.version += 1;
		},
		removeExpiredItems: state => {
			const now = Date.now();
			const validItems = state.items.filter(
				item => !item.expiresAt || item.expiresAt > now,
			);

			if (validItems.length !== state.items.length) {
				state.items = validItems;
				recalculateCart(state);
				state.version += 1;
			}
		},
	},
	extraReducers: builder => {
		builder
			// Sync from server
			.addCase(syncCartFromServer.pending, state => {
				state.isSyncing = true;
				state.error = null;
			})
			.addCase(syncCartFromServer.fulfilled, (state, action) => {
				state.isSyncing = false;
				state.items = action.payload.items || [];
				state.version = action.payload.version || 0;
				state.lastSyncAt = Date.now();
				recalculateCart(state);
			})
			.addCase(syncCartFromServer.rejected, (state, action) => {
				state.isSyncing = false;
				state.error = action.payload as string;
			})

			// Add item
			.addCase(addItemToCart.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addItemToCart.fulfilled, (state, action) => {
				state.isLoading = false;
				const {item, version} = action.payload;

				const existingIndex = state.items.findIndex(
					i => i.productId === item.productId,
				);
				if (existingIndex >= 0) {
					state.items[existingIndex] = item;
				} else {
					state.items.push(item);
				}

				state.version = version;
				recalculateCart(state);
			})
			.addCase(addItemToCart.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			// Remove item
			.addCase(removeItemFromCart.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(removeItemFromCart.fulfilled, (state, action) => {
				state.isLoading = false;
				const {itemId, version} = action.payload;
				state.items = state.items.filter(item => item.id !== itemId);
				state.version = version;
				recalculateCart(state);
			})
			.addCase(removeItemFromCart.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})

			// Update quantity
			.addCase(updateItemQuantity.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateItemQuantity.fulfilled, (state, action) => {
				state.isLoading = false;
				const {item, version} = action.payload;
				const index = state.items.findIndex(i => i.id === item.id);
				if (index >= 0) {
					state.items[index] = item;
				}
				state.version = version;
				recalculateCart(state);
			})
			.addCase(updateItemQuantity.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

function recalculateCart(state: CartState) {
	state.total = state.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
}

// Analytics helper
async function trackCartAnalytics(event: CartAnalytics) {
	try {
		await fetch("/api/analytics/cart", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(event),
		});
	} catch (error) {
		console.warn("Failed to track cart analytics:", error);
	}
}

function getSessionId(): string {
	let sessionId = sessionStorage.getItem("::SESSION_ID::");
	if (!sessionId) {
		sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
		sessionStorage.setItem("::SESSION_ID::", sessionId);
	}
	return sessionId;
}

export const {clearError, startSync, endSync, clearCart, removeExpiredItems} =
	cartSlice.actions;
export default cartSlice.reducer;
