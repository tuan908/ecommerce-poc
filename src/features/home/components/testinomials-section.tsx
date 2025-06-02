import SectionHeader from "@/shared/components/layout/section-header";
import {testimonials} from "@/shared/data/testimonials";
import {Testimonial} from "@/shared/types";
import {memo} from "react";
import TestimonialCard from "./testinomials-card";

interface TestimonialsSectionProps {
	title?: string;
	description?: string;
	customTestimonials?: Testimonial[];
}

const TestimonialsSection = memo(
	({
		title = "What Our Customers Say",
		description = "Join thousands of satisfied customers worldwide",
		customTestimonials = testimonials,
	}: TestimonialsSectionProps) => {
		return (
			<section className="py-16 bg-[#1f5d59]/10">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<SectionHeader title={title} description={description} />

					<div className="grid md:grid-cols-3 gap-8">
						{customTestimonials.map((testimonial, index) => (
							<TestimonialCard key={index} {...testimonial} />
						))}
					</div>
				</div>
			</section>
		);
	},
);

TestimonialsSection.displayName = "TestimonialsSection";
export default TestimonialsSection;
