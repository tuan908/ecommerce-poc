"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {MapPin, Package} from "lucide-react";
import type {BillingData, ShippingData} from "../types";

interface ShippingStepProps {
	data: ShippingData;
	billingData: BillingData;
	onChange: (shipping: ShippingData, billing?: BillingData) => void;
	errors: Record<string, string>;
}

const vietnamCities = [
	"Ho Chi Minh City",
	"Hanoi",
	"Da Nang",
	"Can Tho",
	"Hai Phong",
	"Bien Hoa",
	"Hue",
	"Nha Trang",
	"Buon Ma Thuot",
	"Quy Nhon",
];

export function ShippingStep({
	data,
	billingData,
	onChange,
	errors,
}: ShippingStepProps) {
	const handleShippingChange = (field: keyof ShippingData, value: string) => {
		const newShippingData = {...data, [field]: value};
		onChange(newShippingData);
	};

	const handleBillingToggle = (sameAsShipping: boolean) => {
		const newBillingData = {
			...billingData,
			sameAsShipping,
			...(sameAsShipping
				? {
						firstName: data.firstName,
						lastName: data.lastName,
						address: data.address,
						city: data.city,
						district: data.district,
						ward: data.ward,
						postalCode: data.postalCode,
						country: data.country,
					}
				: {}),
		};
		onChange(data, newBillingData);
	};

	const handleBillingChange = (
		field: keyof Omit<BillingData, "sameAsShipping">,
		value: string,
	) => {
		const newBillingData = {...billingData, [field]: value};
		onChange(data, newBillingData);
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold text-gray-900 mb-2">
					Shipping Information
				</h2>
				<p className="text-gray-600">Where should we deliver your order?</p>
			</div>

			{/* Shipping Address */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg flex items-center gap-2">
						<Package className="w-5 h-5" />
						Delivery Address
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Name Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="firstName">First Name *</Label>
							<Input
								id="firstName"
								value={data.firstName}
								onChange={e =>
									handleShippingChange("firstName", e.target.value)
								}
								className={errors.firstName ? "border-red-500" : ""}
								placeholder="John"
							/>
							{errors.firstName && (
								<p className="text-sm text-red-600">{errors.firstName}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="lastName">Last Name *</Label>
							<Input
								id="lastName"
								value={data.lastName}
								onChange={e => handleShippingChange("lastName", e.target.value)}
								className={errors.lastName ? "border-red-500" : ""}
								placeholder="Doe"
							/>
							{errors.lastName && (
								<p className="text-sm text-red-600">{errors.lastName}</p>
							)}
						</div>
					</div>

					{/* Address */}
					<div className="space-y-2">
						<Label htmlFor="address">Street Address *</Label>
						<Input
							id="address"
							value={data.address}
							onChange={e => handleShippingChange("address", e.target.value)}
							className={errors.address ? "border-red-500" : ""}
							placeholder="123 Main Street, Apartment 4B"
						/>
						{errors.address && (
							<p className="text-sm text-red-600">{errors.address}</p>
						)}
					</div>

					{/* City, District, Ward */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="city">City *</Label>
							<Select
								value={data.city}
								onValueChange={value => handleShippingChange("city", value)}
							>
								<SelectTrigger className={errors.city ? "border-red-500" : ""}>
									<SelectValue placeholder="Select city" />
								</SelectTrigger>
								<SelectContent>
									{vietnamCities.map(city => (
										<SelectItem key={city} value={city}>
											{city}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.city && (
								<p className="text-sm text-red-600">{errors.city}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="district">District *</Label>
							<Input
								id="district"
								value={data.district}
								onChange={e => handleShippingChange("district", e.target.value)}
								className={errors.district ? "border-red-500" : ""}
								placeholder="District 1"
							/>
							{errors.district && (
								<p className="text-sm text-red-600">{errors.district}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="ward">Ward</Label>
							<Input
								id="ward"
								value={data.ward}
								onChange={e => handleShippingChange("ward", e.target.value)}
								placeholder="Ben Nghe Ward"
							/>
						</div>
					</div>

					{/* Postal Code and Country */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="postalCode">Postal Code</Label>
							<Input
								id="postalCode"
								value={data.postalCode}
								onChange={e =>
									handleShippingChange("postalCode", e.target.value)
								}
								placeholder="700000"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="country">Country</Label>
							<Select
								value={data.country}
								onValueChange={value => handleShippingChange("country", value)}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Vietnam">Vietnam</SelectItem>
									<SelectItem value="Thailand">Thailand</SelectItem>
									<SelectItem value="Singapore">Singapore</SelectItem>
									<SelectItem value="Malaysia">Malaysia</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Billing Address */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg flex items-center gap-2">
						<MapPin className="w-5 h-5" />
						Billing Address
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center space-x-2">
						<Checkbox
							id="same-as-shipping"
							checked={billingData.sameAsShipping}
							onCheckedChange={handleBillingToggle}
						/>
						<Label htmlFor="same-as-shipping">Same as shipping address</Label>
					</div>

					{!billingData.sameAsShipping && (
						<div className="space-y-4 pt-4 border-t">
							{/* Billing Name Fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="billingFirstName">First Name *</Label>
									<Input
										id="billingFirstName"
										value={billingData.firstName}
										onChange={e =>
											handleBillingChange("firstName", e.target.value)
										}
										placeholder="John"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="billingLastName">Last Name *</Label>
									<Input
										id="billingLastName"
										value={billingData.lastName}
										onChange={e =>
											handleBillingChange("lastName", e.target.value)
										}
										placeholder="Doe"
									/>
								</div>
							</div>

							{/* Billing Address */}
							<div className="space-y-2">
								<Label htmlFor="billingAddress">Street Address *</Label>
								<Input
									id="billingAddress"
									value={billingData.address}
									onChange={e => handleBillingChange("address", e.target.value)}
									placeholder="123 Main Street, Apartment 4B"
								/>
							</div>

							{/* Billing City, District, Ward */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="billingCity">City *</Label>
									<Select
										value={billingData.city}
										onValueChange={value => handleBillingChange("city", value)}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select city" />
										</SelectTrigger>
										<SelectContent>
											{vietnamCities.map(city => (
												<SelectItem key={city} value={city}>
													{city}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="billingDistrict">District *</Label>
									<Input
										id="billingDistrict"
										value={billingData.district}
										onChange={e =>
											handleBillingChange("district", e.target.value)
										}
										placeholder="District 1"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="billingWard">Ward</Label>
									<Input
										id="billingWard"
										value={billingData.ward}
										onChange={e => handleBillingChange("ward", e.target.value)}
										placeholder="Ben Nghe Ward"
									/>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
