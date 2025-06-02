// lib/store.ts
import cartReducer from "@/features/home/cartSlice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Root reducer combining all feature slices
const rootReducer = combineReducers({
	cart: cartReducer,
	// Add other feature slices here as your app grows
	// user: userReducer,
	// products: productsReducer,
});

// Persist configuration for cart data
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"], // Only persist cart data
	// blacklist: ["user"], // Example: don't persist sensitive user data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					// Ignore redux-persist actions
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
					// Ignore paths that contain non-serializable values
					ignoredPaths: ["persist"],
				},
				// Enable additional checks in development
				immutableCheck: process.env.NODE_ENV === "development",
				actionCreatorCheck: process.env.NODE_ENV === "development",
			}),
		// Enable Redux DevTools in development only
		devTools: process.env.NODE_ENV === "development",
		// Preloaded state for SSR hydration
		preloadedState: undefined,
	});

	return store;
};

// Enhanced type definitions
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Persistor type for redux-persist
export type AppPersistor = ReturnType<typeof persistStore>;

// Helper type for async thunks
export type AppThunk<ReturnType = void> = (
	dispatch: AppDispatch,
	getState: () => RootState,
) => ReturnType;

// Export persistor factory for client-side usage
export const makePersistor = (store: AppStore) => persistStore(store);
