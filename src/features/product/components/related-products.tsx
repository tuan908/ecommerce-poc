"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Product} from "@/features/products/types";
import {formatCurrency} from "@/shared/utils";
import {ShoppingCart, Star} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RelatedProductsProps {
	products: Product[];
	title?: string;
	onAddToCart: (product: Product) => void;
}

export function RelatedProducts({
	products,
	title = "Related Products",
	onAddToCart,
}: RelatedProductsProps) {
	if (products.length === 0) return null;

	return (
		<div className="space-y-6">
			<h3 className="text-2xl font-semibold">{title}</h3>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{products.map(product => (
					<Card
						key={product.id}
						className="group hover:shadow-lg transition-shadow"
					>
						<CardContent className="p-0">
							<Link href={`/products/${product.slug}`} className="block">
								<div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
									<Image
										src={product.imageUrl || "/placeholder.svg"}
										alt={product.name}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									/>
								</div>

								<div className="p-4 space-y-2">
									<h4 className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
										{product.name}
									</h4>

									<div className="flex items-center gap-1">
										<div className="flex items-center">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`w-3 h-3 ${
														i < Math.floor(Number(product.rating))
															? "fill-yellow-400 text-yellow-400"
															: "text-gray-300"
													}`}
												/>
											))}
										</div>
										<span className="text-xs text-gray-500">
											({product.reviewCount})
										</span>
									</div>

									<div className="flex items-center gap-2">
										<span className="font-semibold text-gray-900">
											{formatCurrency(product.price)}
										</span>
										{product.originalPrice && (
											<span className="text-sm text-gray-500 line-through">
												{formatCurrency(product.originalPrice)}
											</span>
										)}
									</div>
								</div>
							</Link>
						</CardContent>

						<CardFooter className="p-4 pt-0">
							<Button
								onClick={() => onAddToCart(product)}
								disabled={product.availability === "out-of-stock"}
								className="w-full"
								size="sm"
							>
								<ShoppingCart className="w-4 h-4 mr-2" />
								{product.availability === "out-of-stock"
									? "Out of Stock"
									: "Add to Cart"}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
