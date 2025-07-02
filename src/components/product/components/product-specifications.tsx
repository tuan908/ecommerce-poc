"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface Specification {
	label: string;
	value: string;
}

interface ProductSpecificationsProps {
	specifications: Specification[];
	ingredients?: string[];
	nutritionFacts?: {[key: string]: string};
	allergens?: string[];
}

export function ProductSpecifications({
	specifications,
	ingredients,
	nutritionFacts,
	allergens,
}: ProductSpecificationsProps) {
	return (
		<div className="space-y-6">
			{/* General Specifications */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Product Details</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{specifications.map((spec, index) => (
							<div key={index} className="flex justify-between py-2">
								<span className="text-gray-600">{spec.label}</span>
								<span className="font-medium text-right">{spec.value}</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Ingredients */}
			{ingredients && ingredients.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Ingredients</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">
							{ingredients.join(", ")}
						</p>
					</CardContent>
				</Card>
			)}

			{/* Nutrition Facts */}
			{nutritionFacts && Object.keys(nutritionFacts).length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Nutrition Facts</CardTitle>
						<p className="text-sm text-gray-600">Per 100g serving</p>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{Object.entries(nutritionFacts).map(([key, value], index) => (
								<div key={index} className="flex justify-between py-2">
									<span className="text-gray-600">{key}</span>
									<span className="font-medium">{value}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Allergens */}
			{allergens && allergens.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="text-lg text-orange-600">
							Allergen Information
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
							<p className="text-sm text-orange-800 mb-2">
								<strong>Contains:</strong>
							</p>
							<p className="text-orange-700">{allergens.join(", ")}</p>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
