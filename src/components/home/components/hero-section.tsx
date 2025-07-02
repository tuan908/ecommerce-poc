"use client";

import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import {memo} from "react";

interface HeroProps {
	title: string;
	highlightText: string;
	description: string;
	primaryButtonText?: string;
	secondaryButtonText?: string;
	imageSrc: string;
	imageAlt: string;
	onPrimaryClick?: () => void;
}

const Hero = memo(
	({
		title,
		highlightText,
		description,
		primaryButtonText = "Browse Products",
		imageSrc,
		imageAlt,
		onPrimaryClick,
	}: HeroProps) => {
		return (
			<section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-gradient-to-br from-[#1f5d59] to-[#2a6b66]">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
						{/* Content Section */}
						<div className="order-2 lg:order-1">
							<h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
								{title}{" "}
								<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
									{highlightText}
								</span>
							</h1>
							<p className="text-lg sm:text-xl text-gray-200 mb-6 lg:mb-8 max-w-xl leading-relaxed">
								{description}
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 transition-colors"
									onClick={onPrimaryClick}
								>
									{primaryButtonText}
									<ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
								</Button>
							</div>
						</div>

						{/* Image Section */}
						<div className="order-1 lg:order-2 relative">
							<div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[5/4] w-full">
								<Image
									src={imageSrc || "/placeholder.svg"}
									alt={imageAlt}
									fill
									priority
									className="object-cover rounded-lg shadow-2xl"
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
								/>
							</div>

							{/* Optional: Decorative elements */}
							<div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl -z-10" />
						</div>
					</div>
				</div>
			</section>
		);
	},
);

Hero.displayName = "Hero";

export default Hero;
