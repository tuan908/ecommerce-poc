"use client";

import {Button} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {ChevronLeft, ChevronRight, ShoppingCart} from "lucide-react";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {useCart, type Product} from "../contexts/cart-context";

const products: Product[] = [
	{
		id: "1",
		name: "StreamLine Pro Headset",
		price: 299,
		image: "/placeholder.svg?height=200&width=300",
		description: "Premium wireless headset with noise cancellation",
	},
	{
		id: "2",
		name: "StreamLine Wireless Mouse",
		price: 89,
		image: "/placeholder.svg?height=200&width=300",
		description: "Ergonomic wireless mouse with precision tracking",
	},
	{
		id: "3",
		name: "StreamLine Keyboard",
		price: 159,
		image: "/placeholder.svg?height=200&width=300",
		description: "Mechanical keyboard with RGB backlighting",
	},
	{
		id: "4",
		name: "StreamLine Monitor Stand",
		price: 79,
		image: "/placeholder.svg?height=200&width=300",
		description: "Adjustable monitor stand with cable management",
	},
	{
		id: "5",
		name: "StreamLine Webcam",
		price: 129,
		image: "/placeholder.svg?height=200&width=300",
		description: "4K webcam with auto-focus and noise reduction",
	},
	{
		id: "6",
		name: "StreamLine Desk Pad",
		price: 39,
		image: "/placeholder.svg?height=200&width=300",
		description: "Large desk pad with water-resistant surface",
	},
];

export default function ProductCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const carouselRef = useRef<HTMLDivElement>(null);
	const {dispatch} = useCart();

	const itemsPerView = {
		mobile: 1,
		tablet: 2,
		desktop: 3,
	};

	const nextSlide = () => {
		setCurrentIndex(
			prev => (prev + 1) % Math.ceil(products.length / itemsPerView.desktop),
		);
	};

	const prevSlide = () => {
		setCurrentIndex(prev =>
			prev === 0
				? Math.ceil(products.length / itemsPerView.desktop) - 1
				: prev - 1,
		);
	};

	const addToCart = (product: Product) => {
		dispatch({type: "ADD_TO_CART", payload: product});
	};

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			nextSlide();
		}, 4000);

		return () => clearInterval(interval);
	}, [currentIndex, isAutoPlaying]);

	// Touch/swipe functionality
	useEffect(() => {
		const carousel = carouselRef.current;
		if (!carousel) return;

		let startX = 0;
		let isDragging = false;

		const handleTouchStart = (e: TouchEvent) => {
			startX = e.touches[0].clientX;
			isDragging = true;
			setIsAutoPlaying(false);
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (!isDragging) return;
			e.preventDefault();
		};

		const handleTouchEnd = (e: TouchEvent) => {
			if (!isDragging) return;

			const endX = e.changedTouches[0].clientX;
			const diff = startX - endX;

			if (Math.abs(diff) > 50) {
				if (diff > 0) {
					nextSlide();
				} else {
					prevSlide();
				}
			}

			isDragging = false;
			setTimeout(() => setIsAutoPlaying(true), 3000);
		};

		carousel.addEventListener("touchstart", handleTouchStart);
		carousel.addEventListener("touchmove", handleTouchMove);
		carousel.addEventListener("touchend", handleTouchEnd);

		return () => {
			carousel.removeEventListener("touchstart", handleTouchStart);
			carousel.removeEventListener("touchmove", handleTouchMove);
			carousel.removeEventListener("touchend", handleTouchEnd);
		};
	}, []);

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Featured Products
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover our premium collection designed to enhance your
						productivity
					</p>
				</div>

				<div className="relative" ref={carouselRef}>
					{/* Navigation Buttons */}
					<Button
						variant="outline"
						size="icon"
						className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
						onClick={prevSlide}
						onMouseEnter={() => setIsAutoPlaying(false)}
						onMouseLeave={() => setIsAutoPlaying(true)}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					<Button
						variant="outline"
						size="icon"
						className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50"
						onClick={nextSlide}
						onMouseEnter={() => setIsAutoPlaying(false)}
						onMouseLeave={() => setIsAutoPlaying(true)}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>

					{/* Product Grid */}
					<div className="overflow-hidden mx-8">
						<div
							className="flex transition-transform duration-300 ease-in-out"
							style={{
								transform: `translateX(-${currentIndex * (100 / Math.ceil(products.length / itemsPerView.desktop))}%)`,
							}}
						>
							{products.map(product => (
								<div
									key={product.id}
									className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
								>
									<Card className="h-full hover:shadow-lg transition-shadow duration-300">
										<CardHeader className="p-0">
											<div className="relative overflow-hidden rounded-t-lg">
												<Image
													src={product.image || "/placeholder.svg"}
													alt={product.name}
													width={300}
													height={200}
													className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
												/>
											</div>
										</CardHeader>
										<CardContent className="p-4">
											<CardTitle className="text-lg mb-2">
												{product.name}
											</CardTitle>
											<p className="text-gray-600 text-sm mb-3">
												{product.description}
											</p>
											<div className="text-2xl font-bold text-blue-600">
												${product.price}
											</div>
										</CardContent>
										<CardFooter className="p-4 pt-0">
											<Button
												className="w-full"
												onClick={() => addToCart(product)}
											>
												<ShoppingCart className="mr-2 h-4 w-4" />
												Add to Cart
											</Button>
										</CardFooter>
									</Card>
								</div>
							))}
						</div>
					</div>

					{/* Dots Indicator */}
					<div className="flex justify-center mt-6 space-x-2">
						{Array.from({
							length: Math.ceil(products.length / itemsPerView.desktop),
						}).map((_, index) => (
							<button
								key={index}
								className={`w-3 h-3 rounded-full transition-colors ${
									index === currentIndex ? "bg-blue-600" : "bg-gray-300"
								}`}
								onClick={() => setCurrentIndex(index)}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
