"use client";

import {useGetProducts} from "@/features/home/hooks";
import {LoadingAnimation} from "@/shared/components/layout/loading-animations";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import {Button} from "@/shared/components/ui/button";
import {Grid, List} from "lucide-react";
import {useEffect, useState} from "react";
import type {FilterState, PaginationState, Product} from "../types";
import {FilterSidebar} from "./filter-sidebar";
import {Pagination} from "./pagination";
import {ProductCard} from "./product-card";
import {ProductGridSkeleton} from "./product-skeleton";
import {SearchBar} from "./search-bar";
import {SortDropdown} from "./sort-dropdown";

export default function ProductListPage() {
	const {products, isLoading} = useGetProducts();
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const [filters, setFilters] = useState<FilterState>({
		category: [],
		priceRange: [0, 200000],
		rating: 0,
		availability: [],
		search: "",
		sortBy: "relevance",
	});

	const [pagination, setPagination] = useState<PaginationState>({
		currentPage: 1,
		itemsPerPage: 12,
		totalItems: 0,
	});

	// Get unique categories and price range from products
	const categories = [...new Set(products.map(p => p.category))];
	const priceRange: [number, number] = [
		Math.min(...products.map(p => Number(p.price))),
		Math.max(...products.map(p => Number(p.price))),
	];
	// Filter and sort products
	useEffect(() => {
		let filtered = [...products];

		// Apply search filter
		if (filters.search) {
			filtered = filtered.filter(
				product =>
					product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
					product.description
						.toLowerCase()
						.includes(filters.search.toLowerCase()) ||
					product.category.toLowerCase().includes(filters.search.toLowerCase()),
			);
		}

		// Apply category filter
		if (filters.category.length > 0) {
			filtered = filtered.filter(product =>
				filters.category.includes(product.category),
			);
		}

		// Apply price range filter
		filtered = filtered.filter(product => {
			const price = Number(product.price);
			return price >= filters.priceRange[0] && price <= filters.priceRange[1];
		});

		// Apply rating filter
		if (filters.rating > 0) {
			filtered = filtered.filter(
				product => Number(product.rating) >= filters.rating,
			);
		}

		// Apply availability filter
		if (filters.availability.length > 0) {
			filtered = filtered.filter(product =>
				filters.availability.includes(product.availability),
			);
		}

		// Apply sorting
		switch (filters.sortBy) {
			case "price-low-high":
				filtered.sort((a, b) => Number(a.price) - Number(b.price));
				break;
			case "price-high-low":
				filtered.sort((a, b) => Number(b.price) - Number(a.price));
				break;
			case "name-asc":
				filtered.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "name-desc":
				filtered.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case "rating":
				filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
				break;
			case "newest":
				// In a real app, you'd sort by creation date
				filtered.sort((a, b) => b.id.localeCompare(a.id));
				break;
			case "best-selling":
				filtered.sort((a, b) => b.reviewCount - a.reviewCount);
				break;
			default:
				// Relevance - keep original order for search, otherwise by rating
				if (filters.search) {
					// In a real app, you'd implement relevance scoring
				} else {
					filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
				}
		}

		setFilteredProducts(filtered);
		setPagination(prev => ({
			...prev,
			totalItems: filtered.length,
			currentPage: 1, // Reset to first page when filters change
		}));
	}, [products, filters]);

	// Get paginated products
	const paginatedProducts = filteredProducts.slice(
		(pagination.currentPage - 1) * pagination.itemsPerPage,
		pagination.currentPage * pagination.itemsPerPage,
	);

	const handleAddToCart = (product: Product) => {
		console.log("Adding to cart:", product);
		// In a real app, you'd dispatch to cart state or call an API
	};

	const handleAddToWishlist = (product: Product) => {
		console.log("Adding to wishlist:", product);
		// In a real app, you'd dispatch to wishlist state or call an API
	};

	const handlePageChange = (page: number) => {
		setPagination(prev => ({...prev, currentPage: page}));
		// Scroll to top of product grid
		window.scrollTo({top: 0, behavior: "smooth"});
	};

	const handleItemsPerPageChange = (itemsPerPage: number) => {
		setPagination(prev => ({
			...prev,
			itemsPerPage,
			currentPage: 1,
		}));
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Breadcrumb */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-4">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Products</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filter Sidebar */}
					<aside className="lg:w-80 flex-shrink-0">
						<div className="lg:sticky lg:top-8">
							<FilterSidebar
								filters={filters}
								onFiltersChange={setFilters}
								categories={categories}
								priceRange={priceRange}
								isOpen={isFilterOpen}
								onToggle={() => setIsFilterOpen(!isFilterOpen)}
							/>
						</div>
					</aside>

					{/* Main Content */}
					<main className="flex-1">
						{/* Header */}
						<div className="mb-8">
							<h1 className="text-3xl font-bold text-gray-900 mb-4">
								Products
							</h1>

							{/* Search and Controls */}
							<div className="flex flex-col sm:flex-row gap-4 mb-6">
								<div className="flex-1">
									<SearchBar
										value={filters.search}
										onChange={search => setFilters(prev => ({...prev, search}))}
										placeholder="Search products..."
									/>
								</div>

								<div className="flex items-center gap-4">
									<SortDropdown
										value={filters.sortBy}
										onChange={sortBy => setFilters(prev => ({...prev, sortBy}))}
									/>

									{/* View Mode Toggle */}
									<div className="flex items-center border rounded-lg p-1">
										<Button
											variant={viewMode === "grid" ? "default" : "ghost"}
											size="sm"
											onClick={() => setViewMode("grid")}
											className="px-3"
										>
											<Grid className="w-4 h-4" />
										</Button>
										<Button
											variant={viewMode === "list" ? "default" : "ghost"}
											size="sm"
											onClick={() => setViewMode("list")}
											className="px-3"
										>
											<List className="w-4 h-4" />
										</Button>
									</div>
								</div>
							</div>

							{/* Results Summary */}
							<div className="flex items-center justify-between text-sm text-gray-600">
								<span>
									{isLoading ? (
										<LoadingAnimation />
									) : (
										`${filteredProducts.length} products found`
									)}
								</span>
								{filters.search && (
									<span>Search results for &quot;{filters.search}&quot;</span>
								)}
							</div>
						</div>

						{/* Product Grid */}
						{isLoading ? (
							<ProductGridSkeleton count={pagination.itemsPerPage} />
						) : paginatedProducts.length > 0 ? (
							<div
								className={`grid gap-6 ${
									viewMode === "grid"
										? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
										: "grid-cols-1"
								}`}
							>
								{paginatedProducts.map(product => (
									<ProductCard
										key={product.id}
										product={product}
										onAddToCart={handleAddToCart}
										onAddToWishlist={handleAddToWishlist}
									/>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<div className="text-gray-500 text-lg mb-4">
									No products found
								</div>
								<p className="text-gray-400 mb-6">
									Try adjusting your filters or search terms
								</p>
								<Button
									onClick={() =>
										setFilters({
											category: [],
											priceRange: priceRange,
											rating: 0,
											availability: [],
											search: "",
											sortBy: "relevance",
										})
									}
									variant="outline"
								>
									Clear All Filters
								</Button>
							</div>
						)}

						{/* Pagination */}
						{!isLoading && paginatedProducts.length > 0 && (
							<Pagination
								pagination={pagination}
								onPageChange={handlePageChange}
								onItemsPerPageChange={handleItemsPerPageChange}
							/>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
