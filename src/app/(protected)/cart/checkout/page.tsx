"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {
	ArrowRight,
	CheckCircle,
	Download,
	Mail,
	Package,
	Phone,
	Truck,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
	const orderNumber = "ORD-2024-001234";
	const estimatedDelivery = "January 8-10, 2024";
	const trackingNumber = "VN123456789";

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="container mx-auto px-4 max-w-2xl">
				{/* Success Header */}
				<div className="text-center mb-8">
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<CheckCircle className="w-8 h-8 text-green-600" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Order Confirmed!
					</h1>
					<p className="text-gray-600">
						Thank you for your purchase. We've received your order and will
						process it shortly.
					</p>
				</div>

				{/* Order Details */}
				<Card className="mb-6">
					<CardContent className="p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold">Order Details</h2>
							<Badge
								variant="outline"
								className="text-green-600 border-green-600"
							>
								Confirmed
							</Badge>
						</div>

						<div className="space-y-3">
							<div className="flex justify-between">
								<span className="text-gray-600">Order Number:</span>
								<span className="font-medium">{orderNumber}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Estimated Delivery:</span>
								<span className="font-medium">{estimatedDelivery}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Tracking Number:</span>
								<span className="font-medium">{trackingNumber}</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* What's Next */}
				<Card className="mb-6">
					<CardContent className="p-6">
						<h2 className="text-lg font-semibold mb-4">What happens next?</h2>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
									<Mail className="w-4 h-4 text-blue-600" />
								</div>
								<div>
									<h3 className="font-medium">Order Confirmation</h3>
									<p className="text-sm text-gray-600">
										You'll receive an email confirmation with your order
										details.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
									<Package className="w-4 h-4 text-orange-600" />
								</div>
								<div>
									<h3 className="font-medium">Order Processing</h3>
									<p className="text-sm text-gray-600">
										We'll prepare your traditional Vietnamese products with
										care.
									</p>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
									<Truck className="w-4 h-4 text-green-600" />
								</div>
								<div>
									<h3 className="font-medium">Shipping & Delivery</h3>
									<p className="text-sm text-gray-600">
										Your order will be shipped and delivered to your address.
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Contact & Support */}
				<Card className="mb-8">
					<CardContent className="p-6">
						<h2 className="text-lg font-semibold mb-4">Need Help?</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
								<Phone className="w-5 h-5 text-gray-600" />
								<div>
									<div className="font-medium">Call Us</div>
									<div className="text-sm text-gray-600">1900-xxxx</div>
								</div>
							</div>
							<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
								<Mail className="w-5 h-5 text-gray-600" />
								<div>
									<div className="font-medium">Email Support</div>
									<div className="text-sm text-gray-600">
										support@example.com
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4">
					<Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
						<Download className="w-4 h-4 mr-2" />
						Download Receipt
					</Button>
					<Button variant="outline" className="flex-1">
						Track Your Order
					</Button>
				</div>

				{/* Continue Shopping */}
				<div className="text-center mt-8">
					<Link href="/products">
						<Button
							variant="ghost"
							className="text-emerald-600 hover:text-emerald-700"
						>
							Continue Shopping
							<ArrowRight className="w-4 h-4 ml-2" />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
