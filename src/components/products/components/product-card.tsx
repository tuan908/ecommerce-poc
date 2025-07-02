"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {formatCurrency} from "@/lib/utils/currency";
import {Eye, Heart, ShoppingCart, Star} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import type {Product} from "../types";

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
	onAddToWishlist: (product: Product) => void;
}

export function ProductCard({
	product,
	onAddToCart,
	onAddToWishlist,
}: ProductCardProps) {
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleWishlistClick = () => {
		setIsWishlisted(!isWishlisted);
		onAddToWishlist(product);
	};

	const getBadgeVariant = (badge: string) => {
		switch (badge) {
			case "new":
				return "bg-blue-500 text-white";
			case "best-seller":
				return "bg-orange-500 text-white";
			case "sale":
				return "bg-red-500 text-white";
			case "featured":
				return "bg-purple-500 text-white";
			default:
				return "bg-gray-500 text-white";
		}
	};

	const isOutOfStock = product.availability === "out-of-stock";
	const isLowStock = product.inventory && product.inventory <= 5;

	return (
		<Card className="group relative h-full bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
			{/* Wishlist Button */}
			<button
				onClick={handleWishlistClick}
				className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
				aria-label="Add to wishlist"
			>
				<Heart
					className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"}`}
				/>
			</button>

			<CardHeader className="p-0 relative">
				<Link href={`/products/${product.slug}`} className="block relative">
					<div className="relative aspect-square overflow-hidden bg-gray-100">
						{!imageLoaded && (
							<div className="absolute inset-0 bg-gray-200 animate-pulse" />
						)}
						<Image
							src={product.imageUrl || "/placeholder.svg"}
							alt={product.name}
							fill
							className={`object-cover group-hover:scale-105 transition-transform duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
							onLoad={() => setImageLoaded(true)}
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						/>

						{/* Overlay for out of stock */}
						{isOutOfStock && (
							<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
								<span className="text-white font-semibold text-lg">
									Out of Stock
								</span>
							</div>
						)}
					</div>

					{/* Badges */}
					{product.badges && product.badges.length > 0 && (
						<div className="absolute top-3 left-3 flex flex-col gap-1">
							{product.badges.split(",").map(badge => (
								<Badge
									key={badge}
									className={`text-xs font-medium px-2 py-1 ${getBadgeVariant(badge)}`}
								>
									{badge.replace("-", " ").toUpperCase()}
								</Badge>
							))}
						</div>
					)}

					{/* Quick View Button */}
					<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
						<Button
							variant="secondary"
							size="sm"
							className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm hover:bg-white"
						>
							<Eye className="w-4 h-4 mr-2" />
							Quick View
						</Button>
					</div>
				</Link>
			</CardHeader>

			<CardContent className="p-4 flex-1">
				<div className="space-y-2">
					<div className="text-sm text-gray-500 font-medium">
						{product.category}
					</div>

					<Link href={`/products/${product.slug}`}>
						<h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
							{product.name}
						</h3>
					</Link>

					<p className="text-sm text-gray-600 line-clamp-2">
						{product.description}
					</p>

					{/* Rating */}
					<div className="flex items-center gap-2">
						<div className="flex items-center">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-4 h-4 ${i < Math.floor(Number(product.rating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
								/>
							))}
						</div>
						<span className="text-sm text-gray-500">
							{product.rating} ({product.reviewCount})
						</span>
					</div>

					{/* Price */}
					<div className="flex items-center gap-2">
						<span className="text-lg font-bold text-gray-900">
							{formatCurrency(product.price)}
						</span>
						{product.originalPrice && (
							<span className="text-sm text-gray-500 line-through">
								{formatCurrency(product.originalPrice)}
							</span>
						)}
					</div>

					{/* Stock Status */}
					{isLowStock && !isOutOfStock && (
						<div className="text-sm text-orange-600 font-medium">
							Only {product.inventory} left!
						</div>
					)}
				</div>
			</CardContent>

			<CardFooter className="p-4 pt-0">
				<Button
					onClick={() => onAddToCart(product)}
					disabled={isOutOfStock}
					className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
				>
					<ShoppingCart className="w-4 h-4 mr-2" />
					{isOutOfStock ? "Out of Stock" : "Add to Cart"}
				</Button>
			</CardFooter>
		</Card>
	);
}
