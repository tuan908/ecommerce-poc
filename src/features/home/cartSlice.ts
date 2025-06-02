import {createSlice} from "@reduxjs/toolkit";
import {Product} from "./types";

export const cartSlice = createSlice({
	name: "CART",
	initialState: {
		items: [] as Product[],
		total: 0,
		itemCount: 0,
	},
	reducers: {
		addToCart: (state, action) => {
			const existingItem = state.items.find(
				item => item.id === action.payload.id,
			);

			if (existingItem) {
				const updatedItems = state.items.map(item =>
					item.id === action.payload.id
						? {...item, quantity: item.quantity! + 1}
						: item,
				);
				return {
					...state,
					items: updatedItems,
					total: state.total + action.payload.price,
					itemCount: state.itemCount + 1,
				};
			} else {
				const newItem = {...action.payload, quantity: 1};
				return {
					...state,
					items: [...state.items, newItem],
					total: state.total + action.payload.price,
					itemCount: state.itemCount + 1,
				};
			}
		},
		removeFromCart: (state, action) => {
			const itemToRemove = state.items.find(item => item.id === action.payload);
			if (!itemToRemove) return state;

			return {
				...state,
				items: state.items.filter(item => item.id !== action.payload),
				total: state.total - itemToRemove.price * itemToRemove.quantity!,
				itemCount: state.itemCount - itemToRemove.quantity!,
			};
		},
		updateQuantity: (state, action) => {
			const item = state.items.find(item => item.id === action.payload.id);
			if (!item) return state;

			const quantityDiff = action.payload.quantity - item.quantity!;
			const updatedItems = state.items.map(item =>
				item.id === action.payload.id
					? {...item, quantity: action.payload.quantity}
					: item,
			);

			return {
				...state,
				items: updatedItems,
				total: state.total + item.price * quantityDiff,
				itemCount: state.itemCount + quantityDiff,
			};
		},
		clearCart: () => ({
			items: [] as Product[],
			total: 0,
			itemCount: 0,
		}),
	},
	selectors: {
		selectCartItems: state => state.items,
		selectCartTotal: state => state.total,
		selectCartItemCount: state => state.itemCount,
	},
});

export default cartSlice.reducer;
export const {addToCart, removeFromCart, updateQuantity, clearCart} =
	cartSlice.actions;
