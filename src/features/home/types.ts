export interface Product {
	id: string;
	name: string;
	price: string;
	image: string;
	description: string;
	quantity?: number; // Optional for initial product definition
}
