import {Button} from "@/components/ui/button";
import {memo} from "react";

interface CTAButton {
	text: string;
	variant?: "default" | "secondary" | "outline";
	onClick?: () => void;
}

interface CTASectionProps {
	title: string;
	description: string;
	buttons: CTAButton[];
	className?: string;
}

const CTASection = memo(
	({title, description, buttons, className = ""}: CTASectionProps) => {
		return (
			<section
				className={`py-16 bg-gradient-to-r from-[#1f5d59] to-[#2a6b66] text-white ${className}`}
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold mb-4">{title}</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">{description}</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						{buttons.map((button, index) => (
							<Button
								key={index}
								size="lg"
								variant={button.variant || "secondary"}
								className={`text-lg px-8 py-3 ${
									button.variant === "outline"
										? "border-white text-white hover:bg-white hover:text-blue-600"
										: ""
								}`}
								onClick={button.onClick}
							>
								{button.text}
							</Button>
						))}
					</div>
				</div>
			</section>
		);
	},
);

CTASection.displayName = "CTASection";
export default CTASection;
