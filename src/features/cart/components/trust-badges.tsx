"use client";

import {Card, CardContent} from "@/shared/components/ui/card";
import {Award, Lock, Phone, RotateCcw, Shield, Truck} from "lucide-react";

export function TrustBadges() {
	const badges = [
		{
			icon: Shield,
			title: "Secure Payment",
			description: "SSL encrypted checkout",
		},
		{
			icon: Lock,
			title: "Privacy Protected",
			description: "Your data is safe with us",
		},
		{
			icon: Truck,
			title: "Fast Delivery",
			description: "Express shipping available",
		},
		{
			icon: RotateCcw,
			title: "Easy Returns",
			description: "30-day return policy",
		},
		{
			icon: Phone,
			title: "24/7 Support",
			description: "Customer service available",
		},
		{
			icon: Award,
			title: "Quality Guaranteed",
			description: "Premium traditional products",
		},
	];

	return (
		<div className="bg-white py-8">
			<div className="text-center mb-8">
				<h3 className="text-lg font-semibold text-gray-900 mb-2">
					Why Shop With Us?
				</h3>
				<p className="text-gray-600">
					Your satisfaction and security are our top priorities
				</p>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{badges.map((badge, index) => (
					<Card key={index} className="border-0 shadow-none">
						<CardContent className="p-4 text-center">
							<div className="flex justify-center mb-3">
								<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
									<badge.icon className="w-6 h-6 text-emerald-600" />
								</div>
							</div>
							<h4 className="font-medium text-sm text-gray-900 mb-1">
								{badge.title}
							</h4>
							<p className="text-xs text-gray-600">{badge.description}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
