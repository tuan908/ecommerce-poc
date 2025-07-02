"use client";

import type {CartItem} from "@/components/cart/types";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Shield, ShoppingBag, Tag, Truck} from "lucide-react";
import Image from "next/image";
import {useState} from "react";

interface OrderSummaryProps {
	items: CartItem[];
	promoCode?: string;
	shippingMethod?: string;
}

export function OrderSummary({
	items,
	promoCode,
	shippingMethod,
}: OrderSummaryProps) {
	const [promoInput, setPromoInput] = useState("");
	const [isPromoApplied, setIsPromoApplied] = useState(!!promoCode);

	const formatCurrency = (amount: string | number) => {
		const numAmount = typeof amount === "string" ? Number(amount) : amount;
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(numAmount);
	};

	const subtotal = items.reduce((sum, item) => {
		const price = Number(item.price);
		return sum + price * item.quantity;
	}, 0);

	const getShippingCost = () => {
		switch (shippingMethod) {
			case "express":
				return 50000;
			case "same-day":
				return 100000;
			default:
				return 25000;
		}
	};

	const shipping = getShippingCost();
	const discount = promoCode ? subtotal * 0.1 : 0; // 10% discount
	const total = subtotal + shipping - discount;

	const handleApplyPromo = () => {
		// In a real app, validate promo code with API
		if (promoInput.trim()) {
			setIsPromoApplied(true);
		}
	};

	return (
		<Card className="sticky top-8">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<ShoppingBag className="w-5 h-5" />
					Order Summary
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Items List */}
				<div className="space-y-3">
					{items.map(item => (
						<div key={item.id} className="flex items-center gap-3">
							<div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
								<Image
									src={item.image || "/placeholder.svg"}
									alt={item.name}
									fill
									className="object-cover"
								/>
								{item.quantity > 1 && (
									<div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
										{item.quantity}
									</div>
								)}
							</div>
							<div className="flex-1 min-w-0">
								<h4 className="text-sm font-medium text-gray-900 truncate">
									{item.name}
								</h4>
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium">
										{formatCurrency(item.price)}
									</span>
									{item.originalPrice && (
										<span className="text-xs text-gray-500 line-through">
											{formatCurrency(item.originalPrice)}
										</span>
									)}
								</div>
							</div>
							<div className="text-sm font-medium">
								{formatCurrency(Number(item.price) * item.quantity)}
							</div>
						</div>
					))}
				</div>

				<Separator />

				{/* Promo Code */}
				{!isPromoApplied && !promoCode && (
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm font-medium">
							<Tag className="w-4 h-4" />
							Promo Code
						</div>
						<div className="flex gap-2">
							<Input
								placeholder="Enter code"
								value={promoInput}
								onChange={e => setPromoInput(e.target.value)}
								className="text-sm"
							/>
							<Button
								variant="outline"
								size="sm"
								onClick={handleApplyPromo}
								disabled={!promoInput.trim()}
							>
								Apply
							</Button>
						</div>
					</div>
				)}

				{(promoCode || isPromoApplied) && (
					<div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
						<div className="flex items-center gap-2">
							<Tag className="w-4 h-4 text-green-600" />
							<span className="text-sm font-medium text-green-700">
								{promoCode || promoInput}
							</span>
						</div>
						<Badge
							variant="outline"
							className="text-green-600 border-green-600"
						>
							-10%
						</Badge>
					</div>
				)}

				<Separator />

				{/* Cost Breakdown */}
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>Subtotal</span>
						<span>{formatCurrency(subtotal)}</span>
					</div>

					<div className="flex justify-between text-sm">
						<div className="flex items-center gap-2">
							<Truck className="w-4 h-4" />
							<span>Shipping</span>
						</div>
						<span>{formatCurrency(shipping)}</span>
					</div>

					{discount > 0 && (
						<div className="flex justify-between text-sm text-green-600">
							<span>Discount</span>
							<span>-{formatCurrency(discount)}</span>
						</div>
					)}

					<Separator />

					<div className="flex justify-between text-base font-semibold">
						<span>Total</span>
						<span>{formatCurrency(total)}</span>
					</div>
				</div>

				{/* Security Badge */}
				<div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg">
					<Shield className="w-4 h-4 text-green-600" />
					<span className="text-xs text-gray-600">
						Secure checkout with SSL encryption
					</span>
				</div>

				{/* Additional Info */}
				<div className="text-xs text-gray-500 space-y-1">
					<p>• Free returns within 30 days</p>
					<p>• Customer support: 1900-xxxx</p>
					<p>• Estimated delivery: 3-5 business days</p>
				</div>
			</CardContent>
		</Card>
	);
}
