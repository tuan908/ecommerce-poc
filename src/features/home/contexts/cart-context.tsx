"use client";

import type React from "react";
import {createContext, useContext, useReducer, type ReactNode} from "react";

export interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
	description: string;
}

export interface CartItem extends Product {
	quantity: number;
}

interface CartState {
	items: CartItem[];
	total: number;
	itemCount: number;
}

type CartAction =
	| {type: "ADD_TO_CART"; payload: Product}
	| {type: "REMOVE_FROM_CART"; payload: string}
	| {type: "UPDATE_QUANTITY"; payload: {id: string; quantity: number}}
	| {type: "CLEAR_CART"};

const CartContext = createContext<{
	state: CartState;
	dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case "ADD_TO_CART": {
			const existingItem = state.items.find(
				item => item.id === action.payload.id,
			);

			if (existingItem) {
				const updatedItems = state.items.map(item =>
					item.id === action.payload.id
						? {...item, quantity: item.quantity + 1}
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
		}
		case "REMOVE_FROM_CART": {
			const itemToRemove = state.items.find(item => item.id === action.payload);
			if (!itemToRemove) return state;

			return {
				...state,
				items: state.items.filter(item => item.id !== action.payload),
				total: state.total - itemToRemove.price * itemToRemove.quantity,
				itemCount: state.itemCount - itemToRemove.quantity,
			};
		}
		case "UPDATE_QUANTITY": {
			const item = state.items.find(item => item.id === action.payload.id);
			if (!item) return state;

			const quantityDiff = action.payload.quantity - item.quantity;
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
		}
		case "CLEAR_CART":
			return {
				items: [],
				total: 0,
				itemCount: 0,
			};
		default:
			return state;
	}
};

export const CartProvider = ({children}: {children: ReactNode}) => {
	const [state, dispatch] = useReducer(cartReducer, {
		items: [],
		total: 0,
		itemCount: 0,
	});

	return (
		<CartContext.Provider value={{state, dispatch}}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
