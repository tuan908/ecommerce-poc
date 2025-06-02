import SectionHeader from "@/shared/components/layout/section-header";
import {features} from "@/shared/data/features";
import {memo} from "react";
import FeatureCard from "./features-card";

interface FeaturesSectionProps {
	title?: string;
	description?: string;
	customFeatures?: typeof features;
}

const FeaturesSection = memo(
	({
		title = "Why Choose StreamLine?",
		description = "We're committed to delivering exceptional value and service with every purchase",
		customFeatures = features,
	}: FeaturesSectionProps) => {
		return (
			<section className="py-16 bg-[#1f5d59]/5">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader title={title} description={description} />

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{customFeatures.map((feature, index) => (
							<FeatureCard key={index} {...feature} />
						))}
					</div>
				</div>
			</section>
		);
	},
);

FeaturesSection.displayName = "FeaturesSection";
export default FeaturesSection;
