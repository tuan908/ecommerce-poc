import {Button} from "@/shared/components/ui/button";
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
			<section className="py-20 lg:py-32 bg-gradient-to-br from-[#1f5d59] to-[#2a6b66]">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
								{title}{" "}
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									{highlightText}
								</span>
							</h1>
							<p className="text-xl text-gray-200 mb-8 max-w-xl">
								{description}
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="text-lg px-8 py-3"
									onClick={onPrimaryClick}
								>
									{primaryButtonText}
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</div>
						</div>
						<div className="relative">
							<Image
								src={imageSrc}
								alt={imageAlt}
								width={600}
								height={500}
								className="w-full h-auto rounded-lg shadow-2xl"
							/>
						</div>
					</div>
				</div>
			</section>
		);
	},
);

Hero.displayName = "Hero";
export default Hero;
