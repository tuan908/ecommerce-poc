"use client";

import {Button} from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {Checkbox} from "@/shared/components/ui/checkbox";
import {Input} from "@/shared/components/ui/input";
import {Label} from "@/shared/components/ui/label";
import {Mail, Phone, User} from "lucide-react";
import type {ContactData} from "../types";

interface ContactStepProps {
	data: ContactData;
	onChange: (data: ContactData) => void;
	errors: Record<string, string>;
}

export function ContactStep({data, onChange, errors}: ContactStepProps) {
	const handleInputChange = (
		field: keyof ContactData,
		value: string | boolean,
	) => {
		onChange({...data, [field]: value});
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold text-gray-900 mb-2">
					Contact Information
				</h2>
				<p className="text-gray-600">
					We&apos;ll use this to send you order updates and delivery
					notifications.
				</p>
			</div>

			{/* Guest Checkout Option */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg flex items-center gap-2">
						<User className="w-5 h-5" />
						Account Options
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center space-x-2">
						<Checkbox
							id="guest-checkout"
							checked={data.isGuest}
							onCheckedChange={checked =>
								handleInputChange("isGuest", checked as boolean)
							}
						/>
						<Label htmlFor="guest-checkout" className="text-sm">
							Continue as guest (faster checkout)
						</Label>
					</div>

					{!data.isGuest && (
						<div className="p-4 bg-blue-50 rounded-lg">
							<p className="text-sm text-blue-700 mb-3">
								Create an account to track your orders and save your information
								for faster checkout.
							</p>
							<Button variant="outline" size="sm">
								Create Account
							</Button>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Contact Form */}
			<Card>
				<CardContent className="p-6 space-y-4">
					{/* Email */}
					<div className="space-y-2">
						<Label htmlFor="email" className="flex items-center gap-2">
							<Mail className="w-4 h-4" />
							Email Address *
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="your.email@example.com"
							value={data.email}
							onChange={e => handleInputChange("email", e.target.value)}
							className={errors.email ? "border-red-500" : ""}
						/>
						{errors.email && (
							<p className="text-sm text-red-600">{errors.email}</p>
						)}
					</div>

					{/* Phone */}
					<div className="space-y-2">
						<Label htmlFor="phone" className="flex items-center gap-2">
							<Phone className="w-4 h-4" />
							Phone Number *
						</Label>
						<Input
							id="phone"
							type="tel"
							placeholder="+84 123 456 789"
							value={data.phone}
							onChange={e => handleInputChange("phone", e.target.value)}
							className={errors.phone ? "border-red-500" : ""}
						/>
						{errors.phone && (
							<p className="text-sm text-red-600">{errors.phone}</p>
						)}
						<p className="text-xs text-gray-500">
							We'll send SMS updates about your delivery
						</p>
					</div>

					{/* Marketing Consent */}
					<div className="pt-4 border-t">
						<div className="flex items-start space-x-2">
							<Checkbox id="marketing-consent" />
							<div className="space-y-1">
								<Label
									htmlFor="marketing-consent"
									className="text-sm font-normal"
								>
									Send me promotional emails and special offers
								</Label>
								<p className="text-xs text-gray-500">
									You can unsubscribe at any time. See our privacy policy for
									details.
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
