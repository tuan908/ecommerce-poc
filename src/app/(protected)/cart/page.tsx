"use client";

import {CheckoutForm} from "@/features/cart/components/checkout-form";
import {CheckoutProgress} from "@/features/cart/components/checkout-progress";
import {OrderSummary} from "@/features/cart/components/order-summary";
import {TrustBadges} from "@/features/cart/components/trust-badges";
import type {CartItem, CheckoutData, CheckoutStep} from "@/features/cart/types";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import {useState} from "react";

// Sample cart items - in production, this would come from cart state/context
const sampleCartItems: CartItem[] = [
	{
		id: "1",
		name: "Bánh Ít Lá Gai",
		price: "45000",
		originalPrice: "50000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/501045153_685464734106527_6570116145315859211_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG5XJ_fzB6vbJe6HsqvWgOPMbCYdoXAv-MxsJh2hcC_4_1rw2ceWHn6rS_vmw3IRWnK-3GA3z_blgaa9lv-RO9u&_nc_ohc=xpCERR11n-cQ7kNvwGMPYu3&_nc_oc=AdlemCrlb4C6LZrN9rwGlW_AdcJ1W5FraAk3D8VQiSYxSOgh6QWWHdESnYHE36hvmTY&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=2VL-VIpDQIQwfOBPVMGmLQ&oh=00_AfKKMjTvadYNwbsJOpA7HhkOgqPPwGGD8P43wTW3jKywzA&oe=68432E38",
		quantity: 2,
		category: "Traditional Cakes",
	},
	{
		id: "2",
		name: "Nem Chợ Huyện",
		price: "60000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/501218698_684793637506970_7319189275128287360_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFYXtB5Fb1dKJF9w8gKZ4FY8mQFbekc7sfyZAVt6Rzux-IEXNAOE1wMnBrlGTUxF1BhfG3BRV3hw-Cf4zgrmciJ&_nc_ohc=lM66Y9oRXDsQ7kNvwH08Yfh&_nc_oc=Adkh_07SuZjX9nQnK4f56uEsI_RqRR-CZn2u4TmOqWHcOHYQaeiDRdLiNRSDt44OdVs&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=rl3sDA6qHT26Bvq5FxW_0Q&oh=00_AfLFrk7hGctyNRkPR5y0lTkQCcilXugIokJnG_edvpI-JQ&oe=68431449",
		quantity: 1,
		category: "Fermented Foods",
	},
	{
		id: "4",
		name: "Rượu Bàu Đá",
		price: "120000",
		originalPrice: "150000",
		image:
			"https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/499828063_679898831329784_3708533152967349999_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE_yHaRMAw5E3FW9rv9Z8LkpuTcLvisfJOm5Nwu-Kx8k2SyRzQRW1oun-nLbhWgpwhnpyarFNBg3t3LDnaDKLg6&_nc_ohc=azTa84QN64sQ7kNvwFnhqe7&_nc_oc=Adk5O65WR66WxlG_hBxOdQYXIg3eEdq_xjYCUJq0WddoT9Dyfcgh0z1G2Jg0PKmGCdI&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=0cj02MIL78nK06SEpVo_RA&oh=00_AfJ5f5yseAoRc-h4c067eJWmvUr2GjwGtWBhg9FJ8eDJUQ&oe=68433DB4",
		quantity: 1,
		category: "Beverages",
	},
];

export default function CheckoutPage() {
	const [currentStep, setCurrentStep] = useState<CheckoutStep>("contact");
	const [checkoutData, setCheckoutData] = useState<CheckoutData>({
		contact: {
			email: "",
			phone: "",
			isGuest: true,
		},
		shipping: {
			firstName: "",
			lastName: "",
			address: "",
			city: "",
			district: "",
			ward: "",
			postalCode: "",
			country: "Vietnam",
		},
		billing: {
			sameAsShipping: true,
			firstName: "",
			lastName: "",
			address: "",
			city: "",
			district: "",
			ward: "",
			postalCode: "",
			country: "Vietnam",
		},
		shippingMethod: "",
		paymentMethod: "",
		promoCode: "",
		specialInstructions: "",
	});

	const handleStepChange = (step: CheckoutStep) => {
		setCurrentStep(step);
	};

	const handleDataChange = (data: Partial<CheckoutData>) => {
		setCheckoutData(prev => ({...prev, ...data}));
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Breadcrumb */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-4">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Checkout</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
					<p className="text-gray-600">
						Complete your order in just a few steps
					</p>
				</div>

				{/* Progress Indicator */}
				<div className="mb-8">
					<CheckoutProgress currentStep={currentStep} />
				</div>

				{/* Main Checkout Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Checkout Form */}
					<div className="lg:col-span-2">
						<CheckoutForm
							currentStep={currentStep}
							checkoutData={checkoutData}
							onStepChange={handleStepChange}
							onDataChange={handleDataChange}
							cartItems={sampleCartItems}
						/>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="sticky top-8">
							<OrderSummary
								items={sampleCartItems}
								promoCode={checkoutData.promoCode}
								shippingMethod={checkoutData.shippingMethod}
							/>
						</div>
					</div>
				</div>

				{/* Trust Badges */}
				<div className="mt-12">
					<TrustBadges />
				</div>
			</div>
		</div>
	);
}
