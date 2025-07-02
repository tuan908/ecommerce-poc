export interface Product {
	id: string;
	name: string;
	price: string;
	originalPrice?: string;
	imageUrl?: string;
	description: string;
	category: string;
	rating?: number;
	reviewCount: number;
	availability?: string;
	badges?: string;
	inventory?: number;
	slug: string;
}

export interface FilterState {
	category: string[];
	priceRange: [number, number];
	rating: number;
	availability: string[];
	search: string;
	sortBy: string;
}

export interface PaginationState {
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;
}
