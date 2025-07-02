"use client";

import Hero from "@/components/home/components/hero-section";
import json from "@/i18n/locales/vi.json";
import {useAppSelector} from "@/store/hooks";
import {useRouter} from "next/navigation";
import {memo, startTransition} from "react";
import CTASection from "./cta-section";
import FeaturesSection from "./features-section";
import ProductCarousel from "./product-carousel";
import TestimonialsSection from "./testinomials-section";

const HomeContent = memo(() => {
	const router = useRouter();
	const heroImageSrc = useAppSelector(
		state => state.admin.settings.branding.thumbnailUrl,
	);

	const handleBrowseProducts = () => {
		router.prefetch("/products");
		startTransition(() => {
			router.push("/products");
		});
	};

	const ctaButtons = [
		{
			text: json.home.viewProducts,
			variant: "secondary" as const,
			onClick: handleBrowseProducts,
		},
		{text: json.navigation.contact, variant: "outline" as const},
	];

	return (
		<div className="min-h-screen bg-background">
			<main>
				<Hero
					title={json.home.heroTitle}
					highlightText={json.home.heroHighlight}
					description={json.home.heroDescription}
					imageSrc={heroImageSrc}
					imageAlt={json.home.heroImageAlt}
					primaryButtonText={json.home.heroPrimaryButtonText}
					onPrimaryClick={handleBrowseProducts}
				/>

				<FeaturesSection
					title={json.home.featuresTitle}
					description={json.home.featuresDescription}
				/>

				<section id="products" className="bg-[#1f5d59]/5">
					<ProductCarousel />
				</section>

				<TestimonialsSection
					title={json.home.testimonialsTitle}
					description={json.home.testimonialsDescription}
				/>

				<CTASection
					title={json.home.ctaTitle}
					description={json.home.ctaDescription}
					buttons={ctaButtons}
				/>
			</main>
		</div>
	);
});

HomeContent.displayName = "HomeContent";
export default HomeContent;
