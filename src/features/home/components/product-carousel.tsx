"use client";

import {Product} from "@/features/products/types";
import {Badge} from "@/shared/components/ui/badge";
import {Button} from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/shared/components/ui/card";
import json from "@/shared/i18n/locales/vi.json";
import {formatCurrency} from "@/shared/utils/currency";
import {AnimatePresence, motion, PanInfo} from "framer-motion";
import {ChevronLeft, ChevronRight, ShoppingCart, Star} from "lucide-react";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useGetProducts} from "../hooks";

const useScreenSize = () => {
	const [screenSize, setScreenSize] = useState({
		isMobile: false,
		isTablet: false,
		isDesktop: true,
	});

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setScreenSize({
				isMobile: width < 640,
				isTablet: width >= 640 && width < 1024,
				isDesktop: width >= 1024,
			});
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return screenSize;
};

export default function ProductCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const {isMobile, isTablet} = useScreenSize();
	const {products} = useGetProducts();

	const itemsPerView = {
		mobile: 1,
		tablet: 2,
		desktop: 3,
	};

	const getCurrentItemsPerView = () => {
		if (isMobile) return itemsPerView.mobile;
		if (isTablet) return itemsPerView.tablet;
		return itemsPerView.desktop;
	};

	const currentItemsPerView = getCurrentItemsPerView();
	const maxIndex = Math.ceil(products.length / currentItemsPerView) - 1;

	const nextSlide = () => {
		setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
	};

	const prevSlide = () => {
		setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
	};

	const addToCart = (product: Product) => {
		console.log(`Adding ${product.name} to cart`);
	};

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(nextSlide, 5000);
		return () => clearInterval(interval);
	}, [currentIndex, isAutoPlaying, maxIndex]);

	// Handle drag end to determine slide direction
	const handleDragEnd = (
		event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	) => {
		const threshold = 50;
		const swipeDirection = info.offset.x;

		if (Math.abs(swipeDirection) > threshold) {
			if (swipeDirection > 0 && currentIndex > 0) {
				setCurrentIndex(prev => prev - 1);
			} else if (swipeDirection < 0 && currentIndex < maxIndex) {
				setCurrentIndex(prev => prev + 1);
			}
		}

		// Resume auto-play after drag
		setTimeout(() => setIsAutoPlaying(true), 1000);
	};

	const containerVariants = {
		animate: {
			x: `-${currentIndex * 100}%`,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30,
				mass: 0.8,
			},
		},
	};

	return (
		<section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				{/* Header Section */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-6">
						<Star className="w-4 h-4 fill-current" />
						Featured Products
					</div>
					<h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
						{json.home.featureProductsTitle}
					</h2>
					<p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
						{json.home.featureProductsDescription}
					</p>
				</div>

				<div className="relative">
					{/* Navigation Buttons */}
					<Button
						variant="outline"
						size="icon"
						className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl hover:bg-white hover:scale-105 transition-all duration-200"
						onClick={prevSlide}
						onMouseEnter={() => setIsAutoPlaying(false)}
						onMouseLeave={() => setIsAutoPlaying(true)}
					>
						<ChevronLeft className="h-5 w-5 text-slate-700" />
					</Button>

					<Button
						variant="outline"
						size="icon"
						className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl hover:bg-white hover:scale-105 transition-all duration-200"
						onClick={nextSlide}
						onMouseEnter={() => setIsAutoPlaying(false)}
						onMouseLeave={() => setIsAutoPlaying(true)}
					>
						<ChevronRight className="h-5 w-5 text-slate-700" />
					</Button>

					{/* Product Grid */}
					<div className="overflow-hidden mx-16">
						<motion.div
							className="flex cursor-grab active:cursor-grabbing"
							variants={containerVariants}
							animate="animate"
							drag="x"
							dragConstraints={{left: 0, right: 0}}
							dragElastic={0.1}
							onDragStart={() => setIsAutoPlaying(false)}
							onDragEnd={handleDragEnd}
							style={{userSelect: "none"}}
						>
							{products.map(product => (
								<motion.div
									key={product.id}
									className={`${isMobile ? "w-full" : isTablet ? "w-1/2" : "w-1/3"} flex-shrink-0 px-4 pb-4`}
									whileHover={{y: -8}}
									transition={{type: "spring", stiffness: 300, damping: 20}}
								>
									<Card className="group h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden rounded-xl">
										<CardHeader className="p-0 relative">
											<div className="relative overflow-hidden">
												<motion.div
													whileHover={{scale: 1.1}}
													transition={{duration: 0.5}}
												>
													<Image
														src={product.imageUrl || "/placeholder.svg"}
														alt={product.name}
														width={400}
														height={280}
														className="w-full h-64 object-cover"
														draggable={false}
													/>
												</motion.div>
												<motion.div
													className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
													initial={{opacity: 0}}
													whileHover={{opacity: 1}}
													transition={{duration: 0.3}}
												/>
												<Badge className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg">
													Traditional
												</Badge>
											</div>
										</CardHeader>
										<CardContent className="p-4 space-y-4">
											<div className="space-y-2">
												<h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
													{product.name}
												</h3>
												<p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
													{product.description}
												</p>
											</div>
											<div className="flex flex-col md:flex-row items-center justify-between gap-y-4">
												<div className="flex flex-row md:flex-col gap-x-2">
													<div className="text-2xl font-bold text-slate-900">
														{formatCurrency(product.price)}
													</div>
													<div className="text-base text-slate-500">VND</div>
												</div>
												<div className="flex items-center gap-1">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className="w-4 h-4 fill-amber-400 text-amber-400"
														/>
													))}
													<span className="text-sm text-slate-500 ml-1">
														(4.9)
													</span>
												</div>
											</div>
										</CardContent>
										<CardFooter className="pt-0">
											<motion.div
												className="w-full"
												whileHover={{scale: 1.05}}
												whileTap={{scale: 0.95}}
											>
												<Button
													className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 shadow-lg hover:shadow-xl transition-all duration-200"
													onClick={() => addToCart(product)}
												>
													<ShoppingCart className="mr-2 h-4 w-4" />
													{json.order.addToCart}
												</Button>
											</motion.div>
										</CardFooter>
									</Card>
								</motion.div>
							))}
						</motion.div>
					</div>

					{/* Progress Indicators */}
					<div className="flex justify-center mt-12 space-x-3">
						{Array.from({length: maxIndex + 1}).map((_, index) => (
							<motion.button
								key={index}
								className={`relative w-12 h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "bg-emerald-600 shadow-lg"
										: "bg-slate-300 hover:bg-slate-400"
								}`}
								onClick={() => setCurrentIndex(index)}
								whileHover={{scale: 1.1}}
								whileTap={{scale: 0.95}}
							>
								<AnimatePresence>
									{index === currentIndex && (
										<motion.div
											className="absolute inset-0 bg-emerald-400 rounded-full"
											initial={{scale: 0}}
											animate={{scale: 1}}
											exit={{scale: 0}}
											transition={{duration: 0.3}}
										/>
									)}
								</AnimatePresence>
							</motion.button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
