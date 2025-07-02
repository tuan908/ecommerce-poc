"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useState} from "react";
import type {CartItem, CheckoutData, CheckoutStep} from "../types";
import {ContactStep} from "./contact-step";
import {PaymentStep} from "./payment-step";
import {ReviewStep} from "./review-step";
import {ShippingStep} from "./shipping-step";

interface CheckoutFormProps {
	currentStep: CheckoutStep;
	checkoutData: CheckoutData;
	onStepChange: (step: CheckoutStep) => void;
	onDataChange: (data: Partial<CheckoutData>) => void;
	cartItems: CartItem[];
}

const stepOrder: CheckoutStep[] = ["contact", "shipping", "payment", "review"];

export function CheckoutForm({
	currentStep,
	checkoutData,
	onStepChange,
	onDataChange,
	cartItems,
}: CheckoutFormProps) {
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const currentStepIndex = stepOrder.indexOf(currentStep);
	const isFirstStep = currentStepIndex === 0;
	const isLastStep = currentStepIndex === stepOrder.length - 1;

	const validateCurrentStep = (): boolean => {
		const newErrors: Record<string, string> = {};

		switch (currentStep) {
			case "contact":
				if (!checkoutData.contact.email) {
					newErrors.email = "Email is required";
				} else if (!/\S+@\S+\.\S+/.test(checkoutData.contact.email)) {
					newErrors.email = "Please enter a valid email";
				}
				if (!checkoutData.contact.phone) {
					newErrors.phone = "Phone number is required";
				}
				break;

			case "shipping":
				if (!checkoutData.shipping.firstName)
					newErrors.firstName = "First name is required";
				if (!checkoutData.shipping.lastName)
					newErrors.lastName = "Last name is required";
				if (!checkoutData.shipping.address)
					newErrors.address = "Address is required";
				if (!checkoutData.shipping.city) newErrors.city = "City is required";
				if (!checkoutData.shipping.district)
					newErrors.district = "District is required";
				break;

			case "payment":
				if (!checkoutData.paymentMethod) {
					newErrors.paymentMethod = "Please select a payment method";
				}
				if (!checkoutData.shippingMethod) {
					newErrors.shippingMethod = "Please select a shipping method";
				}
				break;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNext = () => {
		if (validateCurrentStep()) {
			if (!isLastStep) {
				onStepChange(stepOrder[currentStepIndex + 1]);
			} else {
				handlePlaceOrder();
			}
		}
	};

	const handlePrevious = () => {
		if (!isFirstStep) {
			onStepChange(stepOrder[currentStepIndex - 1]);
		}
	};

	const handlePlaceOrder = async () => {
		setIsProcessing(true);
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));

			// In a real app, you would:
			// 1. Submit order to API
			// 2. Process payment
			// 3. Clear cart
			// 4. Redirect to success page

			console.log("Order placed successfully!", {checkoutData, cartItems});

			// Redirect to success page
			window.location.href = "/checkout/success";
		} catch (error) {
			console.error("Order failed:", error);
			setErrors({general: "Failed to place order. Please try again."});
		} finally {
			setIsProcessing(false);
		}
	};

	const renderCurrentStep = () => {
		switch (currentStep) {
			case "contact":
				return (
					<ContactStep
						data={checkoutData.contact}
						onChange={contact => onDataChange({contact})}
						errors={errors}
					/>
				);
			case "shipping":
				return (
					<ShippingStep
						data={checkoutData.shipping}
						billingData={checkoutData.billing}
						onChange={(shipping, billing) => onDataChange({shipping, billing})}
						errors={errors}
					/>
				);
			case "payment":
				return (
					<PaymentStep
						paymentMethod={checkoutData.paymentMethod}
						shippingMethod={checkoutData.shippingMethod}
						promoCode={checkoutData.promoCode}
						specialInstructions={checkoutData.specialInstructions}
						onChange={data => onDataChange(data)}
						errors={errors}
					/>
				);
			case "review":
				return (
					<ReviewStep
						checkoutData={checkoutData}
						cartItems={cartItems}
						onEdit={onStepChange}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<Card>
			<CardContent className="p-6">
				{/* Error Message */}
				{errors.general && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-red-600 text-sm">{errors.general}</p>
					</div>
				)}

				{/* Step Content */}
				<div className="mb-8">{renderCurrentStep()}</div>

				{/* Navigation Buttons */}
				<div className="flex items-center justify-between pt-6 border-t">
					<Button
						variant="outline"
						onClick={handlePrevious}
						disabled={isFirstStep || isProcessing}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="w-4 h-4" />
						Previous
					</Button>

					<Button
						onClick={handleNext}
						disabled={isProcessing}
						className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
					>
						{isProcessing ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
								Processing...
							</>
						) : isLastStep ? (
							"Place Order"
						) : (
							<>
								Next
								<ArrowRight className="w-4 h-4" />
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
