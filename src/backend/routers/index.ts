import cartRouter from "./cart";
import inventoryRouter from "./inventory";
import productRouter from "./product";

export const Routes = {
	V1: {
		Cart: cartRouter,
		Inventory: inventoryRouter,
		Product: productRouter,
	},
};
