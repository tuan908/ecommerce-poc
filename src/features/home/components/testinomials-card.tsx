import {Card, CardContent, CardHeader} from "@/shared/components/ui/card";
import {Testimonial} from "@/shared/types";
import {Star} from "lucide-react";
import Image from "next/image";
import {memo} from "react";

interface TestimonialCardProps extends Testimonial {
	className?: string;
}

const TestimonialCard = memo(
	({
		quote,
		author,
		role,
		avatar,
		rating,
		className = "",
	}: TestimonialCardProps) => {
		// Calculate star distribution for fractional ratings
		const wholeStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;
		const emptyStars = 5 - wholeStars - (hasHalfStar ? 1 : 0);

		const renderStars = () => {
			const stars = [];

			// Render filled stars
			for (let i = 0; i < wholeStars; i++) {
				stars.push(
					<Star
						key={`filled-${i}`}
						className="h-5 w-5 fill-yellow-400 text-yellow-400"
					/>,
				);
			}

			// Render half star if needed
			if (hasHalfStar) {
				stars.push(
					<div key="half" className="relative inline-block">
						<Star className="h-5 w-5 text-yellow-400" />
						<div className="absolute inset-0 overflow-hidden w-1/2">
							<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
						</div>
					</div>,
				);
			}

			// Render empty stars
			for (let i = 0; i < emptyStars; i++) {
				stars.push(
					<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />,
				);
			}

			return stars;
		};

		return (
			<Card
				className={`hover:shadow-lg transition-shadow bg-white ${className}`}
			>
				<CardHeader>
					<div className="flex items-center mb-2">
						<div className="flex mr-2" aria-label={`${rating} out of 5 stars`}>
							{renderStars()}
						</div>
						<span className="text-sm text-gray-600 font-medium">
							{rating.toFixed(1)}
						</span>
					</div>
				</CardHeader>
				<CardContent>
					<p className="text-gray-700 mb-4">&quot;{quote}&quot;</p>
					<div className="flex items-center">
						<Image
							src={avatar || "/placeholder.svg"}
							alt={author}
							width={48}
							height={48}
							className="w-12 h-12 rounded-full mr-4"
						/>
						<div>
							<p className="font-semibold text-black">{author}</p>
							<p className="text-sm text-gray-500">{role}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	},
);

TestimonialCard.displayName = "TestimonialCard";
export default TestimonialCard;
