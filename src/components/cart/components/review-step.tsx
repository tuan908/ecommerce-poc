"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
	CreditCard,
	Edit,
	Mail,
	MapPin,
	Package,
	Phone,
	Truck,
} from "lucide-react";
import Image from "next/image";
import type {CartItem, CheckoutData, CheckoutStep} from "../types";

interface ReviewStepProps {
	checkoutData: CheckoutData;
	cartItems: CartItem[];
	onEdit: (step: CheckoutStep) => void;
}

export function ReviewStep({checkoutData, cartItems, onEdit}: ReviewStepProps) {
	const formatCurrency = (amount: string | number) => {
		const numAmount = typeof amount === "string" ? Number(amount) : amount;
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(numAmount);
	};

	const getPaymentMethodName = (method: string) => {
		const methods = {
			"credit-card": "Credit/Debit Card",
			momo: "MoMo Wallet",
			"bank-transfer": "Bank Transfer",
			cod: "Cash on Delivery",
		};
		return methods[method as keyof typeof methods] || method;
	};

	const getShippingMethodName = (method: string) => {
		const methods = {
			standard: "Standard Delivery (3-5 days)",
			express: "Express Delivery (1-2 days)",
			"same-day": "Same Day Delivery",
		};
		return methods[method as keyof typeof methods] || method;
	};

	const subtotal = cartItems.reduce(
		(sum, item) => sum + Number(item.price) * item.quantity,
		0,
	);
	const shipping =
		checkoutData.shippingMethod === "express"
			? 50000
			: checkoutData.shippingMethod === "same-day"
				? 100000
				: 25000;
	const discount = checkoutData.promoCode ? subtotal * 0.1 : 0; // 10% discount if promo code applied
	const total = subtotal + shipping - discount;

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold text-gray-900 mb-2">
					Review Your Order
				</h2>
				<p className="text-gray-600">
					Please review all details before placing your order.
				</p>
			</div>

			{/* Order Items */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-lg flex items-center gap-2">
						<Package className="w-5 h-5" />
						Order Items ({cartItems.length})
					</CardTitle>
					<Button variant="ghost" size="sm" onClick={() => onEdit("contact")}>
						<Edit className="w-4 h-4 mr-1" />
						Edit Cart
					</Button>
				</CardHeader>
				<CardContent className="space-y-4">
					{cartItems.map(item => (
						<div
							key={item.id}
							className="flex items-center gap-4 p-4 border rounded-lg"
						>
							<div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
								<Image
									src={item.image || "/placeholder.svg"}
									alt={item.name}
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex-1">
								<h4 className="font-medium text-gray-900">{item.name}</h4>
								<p className="text-sm text-gray-600">{item.category}</p>
								<div className="flex items-center gap-2 mt-1">
									<span className="font-medium">
										{formatCurrency(item.price)}
									</span>
									{item.originalPrice && (
										<span className="text-sm text-gray-500 line-through">
											{formatCurrency(item.originalPrice)}
										</span>
									)}
								</div>
							</div>
							<div className="text-right">
								<div className="text-sm text-gray-600">
									Qty: {item.quantity}
								</div>
								<div className="font-medium">
									{formatCurrency(Number(item.price) * item.quantity)}
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Contact Information */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-lg flex items-center gap-2">
						<Mail className="w-5 h-5" />
						Contact Information
					</CardTitle>
					<Button variant="ghost" size="sm" onClick={() => onEdit("contact")}>
						<Edit className="w-4 h-4 mr-1" />
						Edit
					</Button>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="flex items-center gap-2">
						<Mail className="w-4 h-4 text-gray-500" />
						<span>{checkoutData.contact.email}</span>
					</div>
					<div className="flex items-center gap-2">
						<Phone className="w-4 h-4 text-gray-500" />
						<span>{checkoutData.contact.phone}</span>
					</div>
					{checkoutData.contact.isGuest && (
						<Badge variant="secondary" className="mt-2">
							Guest Checkout
						</Badge>
					)}
				</CardContent>
			</Card>

			{/* Shipping Address */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-lg flex items-center gap-2">
						<MapPin className="w-5 h-5" />
						Shipping Address
					</CardTitle>
					<Button variant="ghost" size="sm" onClick={() => onEdit("shipping")}>
						<Edit className="w-4 h-4 mr-1" />
						Edit
					</Button>
				</CardHeader>
				<CardContent>
					<div className="space-y-1">
						<div className="font-medium">
							{checkoutData.shipping.firstName} {checkoutData.shipping.lastName}
						</div>
						<div>{checkoutData.shipping.address}</div>
						<div>
							{checkoutData.shipping.ward && `${checkoutData.shipping.ward}, `}
							{checkoutData.shipping.district}, {checkoutData.shipping.city}
						</div>
						<div>
							{checkoutData.shipping.postalCode &&
								`${checkoutData.shipping.postalCode}, `}
							{checkoutData.shipping.country}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Payment & Delivery */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-lg flex items-center gap-2">
						<CreditCard className="w-5 h-5" />
						Payment & Delivery
					</CardTitle>
					<Button variant="ghost" size="sm" onClick={() => onEdit("payment")}>
						<Edit className="w-4 h-4 mr-1" />
						Edit
					</Button>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex items-center gap-2">
						<CreditCard className="w-4 h-4 text-gray-500" />
						<span>{getPaymentMethodName(checkoutData.paymentMethod)}</span>
					</div>
					<div className="flex items-center gap-2">
						<Truck className="w-4 h-4 text-gray-500" />
						<span>{getShippingMethodName(checkoutData.shippingMethod)}</span>
					</div>
					{checkoutData.promoCode && (
						<div className="flex items-center gap-2">
							<Badge
								variant="outline"
								className="text-green-600 border-green-600"
							>
								Promo: {checkoutData.promoCode}
							</Badge>
						</div>
					)}
					{checkoutData.specialInstructions && (
						<div className="pt-2 border-t">
							<div className="text-sm font-medium text-gray-700 mb-1">
								Special Instructions:
							</div>
							<div className="text-sm text-gray-600">
								{checkoutData.specialInstructions}
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Order Summary */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Order Summary</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>{formatCurrency(subtotal)}</span>
					</div>
					<div className="flex justify-between">
						<span>Shipping</span>
						<span>{formatCurrency(shipping)}</span>
					</div>
					{discount > 0 && (
						<div className="flex justify-between text-green-600">
							<span>Discount</span>
							<span>-{formatCurrency(discount)}</span>
						</div>
					)}
					<div className="border-t pt-3">
						<div className="flex justify-between text-lg font-semibold">
							<span>Total</span>
							<span>{formatCurrency(total)}</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
