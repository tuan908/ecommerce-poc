"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
	Banknote,
	Clock,
	CreditCard,
	Smartphone,
	Tag,
	Truck,
	Zap,
} from "lucide-react";
import {useState} from "react";

interface PaymentStepProps {
	paymentMethod: string;
	shippingMethod: string;
	promoCode: string;
	specialInstructions: string;
	onChange: (data: {
		paymentMethod?: string;
		shippingMethod?: string;
		promoCode?: string;
		specialInstructions?: string;
	}) => void;
	errors: Record<string, string>;
}

const paymentMethods = [
	{
		id: "credit-card",
		name: "Credit/Debit Card",
		description: "Visa, Mastercard, JCB",
		icon: CreditCard,
		popular: true,
	},
	{
		id: "momo",
		name: "MoMo Wallet",
		description: "Pay with MoMo e-wallet",
		icon: Smartphone,
		popular: true,
	},
	{
		id: "bank-transfer",
		name: "Bank Transfer",
		description: "Direct bank transfer",
		icon: Banknote,
		popular: false,
	},
	{
		id: "cod",
		name: "Cash on Delivery",
		description: "Pay when you receive",
		icon: Truck,
		popular: false,
	},
];

const shippingMethods = [
	{
		id: "standard",
		name: "Standard Delivery",
		description: "3-5 business days",
		price: 25000,
		icon: Truck,
	},
	{
		id: "express",
		name: "Express Delivery",
		description: "1-2 business days",
		price: 50000,
		icon: Zap,
		popular: true,
	},
	{
		id: "same-day",
		name: "Same Day Delivery",
		description: "Within 24 hours",
		price: 100000,
		icon: Clock,
		available: false,
	},
];

export function PaymentStep({
	paymentMethod,
	shippingMethod,
	promoCode,
	specialInstructions,
	onChange,
	errors,
}: PaymentStepProps) {
	const [promoCodeInput, setPromoCodeInput] = useState(promoCode);
	const [promoCodeApplied, setPromoCodeApplied] = useState(false);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const handleApplyPromoCode = () => {
		// In a real app, you would validate the promo code with an API
		if (promoCodeInput.trim()) {
			onChange({promoCode: promoCodeInput});
			setPromoCodeApplied(true);
		}
	};

	const handleRemovePromoCode = () => {
		setPromoCodeInput("");
		onChange({promoCode: ""});
		setPromoCodeApplied(false);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold text-gray-900 mb-2">
					Payment & Delivery
				</h2>
				<p className="text-gray-600">
					Choose your payment method and delivery options.
				</p>
			</div>

			{/* Shipping Methods */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg flex items-center gap-2">
						<Truck className="w-5 h-5" />
						Delivery Method
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{shippingMethods.map(method => (
						<div
							key={method.id}
							className={`
                relative p-4 border rounded-lg cursor-pointer transition-all
                ${
									method.available === false
										? "opacity-50 cursor-not-allowed bg-gray-50"
										: shippingMethod === method.id
											? "border-emerald-500 bg-emerald-50"
											: "border-gray-200 hover:border-gray-300"
								}
              `}
							onClick={() =>
								method.available !== false &&
								onChange({shippingMethod: method.id})
							}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div
										className={`
                    w-4 h-4 rounded-full border-2 transition-colors
                    ${shippingMethod === method.id ? "border-emerald-500 bg-emerald-500" : "border-gray-300"}
                  `}
									>
										{shippingMethod === method.id && (
											<div className="w-full h-full rounded-full bg-white scale-50" />
										)}
									</div>
									<method.icon className="w-5 h-5 text-gray-600" />
									<div>
										<div className="flex items-center gap-2">
											<span className="font-medium">{method.name}</span>
											{method.popular && (
												<Badge variant="secondary" className="text-xs">
													Popular
												</Badge>
											)}
											{method.available === false && (
												<Badge variant="outline" className="text-xs">
													Not Available
												</Badge>
											)}
										</div>
										<p className="text-sm text-gray-600">
											{method.description}
										</p>
									</div>
								</div>
								<div className="text-right">
									<div className="font-medium">
										{formatCurrency(method.price)}
									</div>
								</div>
							</div>
						</div>
					))}
					{errors.shippingMethod && (
						<p className="text-sm text-red-600">{errors.shippingMethod}</p>
					)}
				</CardContent>
			</Card>

			{/* Payment Methods */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg flex items-center gap-2">
						<CreditCard className="w-5 h-5" />
						Payment Method
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{paymentMethods.map(method => (
						<div
							key={method.id}
							className={`
                relative p-4 border rounded-lg cursor-pointer transition-all
                ${
									paymentMethod === method.id
										? "border-emerald-500 bg-emerald-50"
										: "border-gray-200 hover:border-gray-300"
								}
              `}
							onClick={() => onChange({paymentMethod: method.id})}
						>
							<div className="flex items-center gap-3">
								<div
									className={`
                  w-4 h-4 rounded-full border-2 transition-colors
                  ${paymentMethod === method.id ? "border-emerald-500 bg-emerald-500" : "border-gray-300"}
                `}
								>
									{paymentMethod === method.id && (
										<div className="w-full h-full rounded-full bg-white scale-50" />
									)}
								</div>
								<method.icon className="w-5 h-5 text-gray-600" />
								<div>
									<div className="flex items-center gap-2">
										<span className="font-medium">{method.name}</span>
										{method.popular && (
											<Badge variant="secondary" className="text-xs">
												Popular
											</Badge>
										)}
									</div>
									<p className="text-sm text-gray-600">{method.description}</p>
								</div>
							</div>
						</div>
					))}
					{errors.paymentMethod && (
						<p className="text-sm text-red-600">{errors.paymentMethod}</p>
					)}
				</CardContent>
			</Card>

			{/* Promo Code */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg flex items-center gap-2">
						<Tag className="w-5 h-5" />
						Promo Code
					</CardTitle>
				</CardHeader>
				<CardContent>
					{!promoCodeApplied ? (
						<div className="flex gap-2">
							<Input
								placeholder="Enter promo code"
								value={promoCodeInput}
								onChange={e => setPromoCodeInput(e.target.value)}
								className="flex-1"
							/>
							<Button
								variant="outline"
								onClick={handleApplyPromoCode}
								disabled={!promoCodeInput.trim()}
							>
								Apply
							</Button>
						</div>
					) : (
						<div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
							<div className="flex items-center gap-2">
								<Tag className="w-4 h-4 text-green-600" />
								<span className="font-medium text-green-700">
									Promo code &quot;{promoCode}&quot; applied
								</span>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={handleRemovePromoCode}
								className="text-green-600 hover:text-green-700"
							>
								Remove
							</Button>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Special Instructions */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg">Special Instructions</CardTitle>
				</CardHeader>
				<CardContent>
					<Textarea
						placeholder="Any special delivery instructions? (e.g., gate code, preferred delivery time, etc.)"
						value={specialInstructions}
						onChange={e => onChange({specialInstructions: e.target.value})}
						rows={3}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
