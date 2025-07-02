import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {Feature} from "@/types";
import {memo} from "react";

interface FeatureCardProps extends Feature {
	className?: string;
}

const FeatureCard = memo(
	({title, description, icon, className = ""}: FeatureCardProps) => {
		return (
			<Card
				className={`text-center hover:shadow-lg transition-shadow bg-white ${className}`}
			>
				<CardHeader>
					<div className="flex justify-center mb-4">{icon}</div>
					<CardTitle className="text-black">{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription className="text-gray-700">
						{description}
					</CardDescription>
				</CardContent>
			</Card>
		);
	},
);

FeatureCard.displayName = "FeatureCard";
export default FeatureCard;
