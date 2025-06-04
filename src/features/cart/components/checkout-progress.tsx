"use client";

import {Check} from "lucide-react";
import type {CheckoutStep} from "../types";

interface CheckoutProgressProps {
	currentStep: CheckoutStep;
}

const steps = [
	{id: "contact", label: "Contact", description: "Email & Phone"},
	{id: "shipping", label: "Shipping", description: "Delivery Address"},
	{id: "payment", label: "Payment", description: "Payment Method"},
	{id: "review", label: "Review", description: "Confirm Order"},
] as const;

export function CheckoutProgress({currentStep}: CheckoutProgressProps) {
	const currentStepIndex = steps.findIndex(step => step.id === currentStep);

	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				{steps.map((step, index) => {
					const isCompleted = index < currentStepIndex;
					const isCurrent = index === currentStepIndex;

					return (
						<div key={step.id} className="flex items-center flex-1">
							{/* Step Circle */}
							<div className="flex flex-col items-center">
								<div
									className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                    ${
											isCompleted
												? "bg-emerald-600 text-white"
												: isCurrent
													? "bg-emerald-100 text-emerald-600 border-2 border-emerald-600"
													: "bg-gray-200 text-gray-500"
										}
                  `}
								>
									{isCompleted ? (
										<Check className="w-5 h-5" />
									) : (
										<span>{index + 1}</span>
									)}
								</div>

								{/* Step Label */}
								<div className="mt-2 text-center">
									<div
										className={`text-sm font-medium ${isCompleted || isCurrent ? "text-gray-900" : "text-gray-500"}`}
									>
										{step.label}
									</div>
									<div className="text-xs text-gray-500 hidden sm:block">
										{step.description}
									</div>
								</div>
							</div>

							{/* Connector Line */}
							{index < steps.length - 1 && (
								<div className="flex-1 mx-4">
									<div
										className={`h-0.5 transition-all duration-200 ${isCompleted ? "bg-emerald-600" : "bg-gray-200"}`}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
