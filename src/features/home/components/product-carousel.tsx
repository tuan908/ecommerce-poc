"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import json from "@/shared/i18n/locales/vi.json";
import {formatCurrency} from "@/shared/utils";
import {ChevronLeft, ChevronRight, ShoppingCart, Star} from "lucide-react";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import type {Product} from "../types";

const products: Product[] = [
	{
		id: "1",
		name: "Bánh Ít Lá Gai",
		price: "45000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/501045153_685464734106527_6570116145315859211_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG5XJ_fzB6vbJe6HsqvWgOPMbCYdoXAv-MxsJh2hcC_4_1rw2ceWHn6rS_vmw3IRWnK-3GA3z_blgaa9lv-RO9u&_nc_ohc=xpCERR11n-cQ7kNvwGMPYu3&_nc_oc=AdlemCrlb4C6LZrN9rwGlW_AdcJ1W5FraAk3D8VQiSYxSOgh6QWWHdESnYHE36hvmTY&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=2VL-VIpDQIQwfOBPVMGmLQ&oh=00_AfKKMjTvadYNwbsJOpA7HhkOgqPPwGGD8P43wTW3jKywzA&oe=68432E38",
		description:
			"Bánh truyền thống dẻo thơm, nhân dừa đậu xanh, gói bằng lá chuối.",
	},
	{
		id: "2",
		name: "Nem Chợ Huyện",
		price: "60000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/501218698_684793637506970_7319189275128287360_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFYXtB5Fb1dKJF9w8gKZ4FY8mQFbekc7sfyZAVt6Rzux-IEXNAOE1wMnBrlGTUxF1BhfG3BRV3hw-Cf4zgrmciJ&_nc_ohc=lM66Y9oRXDsQ7kNvwH08Yfh&_nc_oc=Adkh_07SuZjX9nQnK4f56uEsI_RqRR-CZn2u4TmOqWHcOHYQaeiDRdLiNRSDt44OdVs&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=rl3sDA6qHT26Bvq5FxW_0Q&oh=00_AfLFrk7hGctyNRkPR5y0lTkQCcilXugIokJnG_edvpI-JQ&oe=68431449",
		description: "Nem chua nổi tiếng với vị chua thanh, giòn sật, đậm đà.",
	},
	{
		id: "3",
		name: "Tré Bình Định",
		price: "55000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/499997191_682063464446654_1231366500660072475_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFh9BeoOsJe0two7MpHbmRvkf067o4ISdWR_TrujghJ1VogICUX2eCN98qNKxSLvGcFW3imUGA15Zel-31MiRAN&_nc_ohc=UHdiV5hV7zsQ7kNvwEAfV-D&_nc_oc=Adlu9YcJBx6gH4clHc1bmmGBV6xiPwmms7dwhZ7KaHXOYIQnTOO3qhy-Vkt5yweyPIA&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=JirzL2k-BdqQ_N0HlnJ0Vw&oh=00_AfJ6_ax-UfYrZ233Oynh0S8QxlHQby2kaKSsNzgAMHzr7w&oe=684338AC",
		description:
			"Món khai vị đặc trưng được làm từ thịt tai heo và riềng sả, thơm cay hấp dẫn.",
	},
	{
		id: "4",
		name: "Rượu Bàu Đá",
		price: "120000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/499828063_679898831329784_3708533152967349999_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE_yHaRMAw5E3FW9rv9Z8LkpuTcLvisfJOm5Nwu-Kx8k2SyRzQRW1oun-nLbhWgpwhnpyarFNBg3t3LDnaDKLg6&_nc_ohc=azTa84QN64sQ7kNvwFnhqe7&_nc_oc=Adk5O65WR66WxlG_hBxOdQYXIg3eEdq_xjYCUJq0WddoT9Dyfcgh0z1G2Jg0PKmGCdI&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=0cj02MIL78nK06SEpVo_RA&oh=00_AfJ5f5yseAoRc-h4c067eJWmvUr2GjwGtWBhg9FJ8eDJUQ&oe=68433DB4",
		description:
			"Rượu nếp truyền thống nồng nàn, chưng cất thủ công từ làng Bàu Đá.",
	},
	{
		id: "5",
		name: "Chả Cá Quy Nhơn",
		price: "95000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/496302703_672160155436985_7727292524106695976_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHYEfwr_mcWYMWjmEWBf5qnED2XmVBGGRIQPZeZUEYZEjBMRhPnGylxLO2ujky-hTINi7iAWfbYDKt0blWCYcPs&_nc_ohc=wEv44cbmCvYQ7kNvwHf6rUp&_nc_oc=AdkPm_OKKBWVbEPdgiM41Fwxaq2yMBe5LNupvgv0GxsJGQPGIU3TtmvmsSO31WxXRUg&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=8oIi4bgnBOsKU6RMySQ7WQ&oh=00_AfIdZtoMwMq8uL6QTWJzJTptJXuOX9aRHWBfLXYWt4u2CA&oe=68431346",
		description:
			"Chả cá thu dai ngon, thích hợp chiên, hấp hoặc nấu bún chả cá.",
	},
	{
		id: "6",
		name: "Bánh Tráng Nướng Mè",
		price: "30000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/492013117_660520216600979_901220003135168897_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGn6EBZqG56XzfYrb84DtG00WaBzmlHu2bRZoHOaUe7Zv9R8Sk1v-2HToyb0v6fLnpLfZ1domu4UkQY6TY3t9j1&_nc_ohc=ONHzRV4pM7MQ7kNvwGNk5z3&_nc_oc=AdmKyUGH0ILrlv3-E8Ky9D6oLqJggBMvoMxYScYFtdLIkXavI4AnydXJDk3gq9TxANY&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=VP9UtTIEUVbWvgaWCT2PVA&oh=00_AfJhG11ZYUchzl0kO2tKf3U0CQO4CLgYf0_KvuJuDlT7vQ&oe=68433B25",
		description:
			"Bánh tráng mè nướng giòn, vị bùi béo, thích hợp ăn vặt hoặc cuốn nem tré.",
	},
];

export default function ProductCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const carouselRef = useRef<HTMLDivElement>(null);

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

	const addToCart = (product: Product) => {};

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			nextSlide();
		}, 5000);

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

				<div className="relative" ref={carouselRef}>
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
						<div
							className="flex transition-transform duration-500 ease-out"
							style={{
								transform: `translateX(-${currentIndex * (100 / Math.ceil(products.length / itemsPerView.desktop))}%)`,
							}}
						>
							{products.map(product => (
								<div
									key={product.id}
									className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
								>
									<Card className="group h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
										<CardHeader className="p-0 relative">
											<div className="relative overflow-hidden">
												<Image
													src={product.image || "/placeholder.svg"}
													alt={product.name}
													width={400}
													height={280}
													className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
												<Badge className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg">
													Traditional
												</Badge>
											</div>
										</CardHeader>
										<CardContent className="p-6 space-y-4">
											<div className="space-y-2">
												<h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-200">
													{product.name}
												</h3>
												<p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
													{product.description}
												</p>
											</div>
											<div className="flex items-center justify-between">
												<div className="space-y-1">
													<div className="text-2xl font-bold text-slate-900">
														{formatCurrency(product.price)}
													</div>
													<div className="text-sm text-slate-500">VND</div>
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
										<CardFooter className="p-6 pt-0">
											<Button
												className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105"
												onClick={() => addToCart(product)}
											>
												<ShoppingCart className="mr-2 h-4 w-4" />
												{json.order.addToCart}
											</Button>
										</CardFooter>
									</Card>
								</div>
							))}
						</div>
					</div>

					{/* Progress Indicators */}
					<div className="flex justify-center mt-12 space-x-3">
						{Array.from({
							length: Math.ceil(products.length / itemsPerView.desktop),
						}).map((_, index) => (
							<button
								key={index}
								className={`relative w-12 h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? "bg-emerald-600 shadow-lg"
										: "bg-slate-300 hover:bg-slate-400"
								}`}
								onClick={() => setCurrentIndex(index)}
							>
								{index === currentIndex && (
									<div className="absolute inset-0 bg-emerald-400 rounded-full animate-pulse" />
								)}
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
