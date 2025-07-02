"use client";

import {cn} from "@/lib/utils/styles";
import {ChefHat, Coffee, Sparkles, Utensils, Wheat} from "lucide-react";

interface LoadingAnimationProps {
	variant?:
		| "default"
		| "chef"
		| "cooking"
		| "brewing"
		| "harvest"
		| "sparkle"
		| "minimal";
	size?: "sm" | "md" | "lg" | "xl";
	text?: string;
	className?: string;
}

export function LoadingAnimation({
	variant = "default",
	size = "md",
	text = "Loading...",
	className,
}: LoadingAnimationProps) {
	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-12 h-12",
		lg: "w-16 h-16",
		xl: "w-24 h-24",
	};

	const textSizeClasses = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
		xl: "text-xl",
	};

	if (variant === "chef") {
		return (
			<div
				className={cn(
					"flex flex-col items-center justify-center gap-4",
					className,
				)}
			>
				<div className="relative">
					{/* Chef Hat with Bounce */}
					<div
						className={cn(
							"bg-emerald-100 rounded-full flex items-center justify-center animate-bounce",
							sizeClasses[size],
						)}
					>
						<ChefHat
							className={cn(
								"text-emerald-600",
								size === "sm"
									? "w-4 h-4"
									: size === "md"
										? "w-6 h-6"
										: size === "lg"
											? "w-8 h-8"
											: "w-12 h-12",
							)}
						/>
					</div>

					{/* Rotating Ring */}
					<div
						className={cn(
							"absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin",
							sizeClasses[size],
						)}
					></div>

					{/* Pulsing Outer Ring */}
					<div
						className={cn(
							"absolute inset-0 border-2 border-emerald-300 rounded-full animate-ping",
							sizeClasses[size],
						)}
					></div>
				</div>

				{text && (
					<p
						className={cn(
							"text-gray-600 font-medium animate-pulse",
							textSizeClasses[size],
						)}
					>
						{text}
					</p>
				)}
			</div>
		);
	}

	if (variant === "cooking") {
		return (
			<div
				className={cn(
					"flex flex-col items-center justify-center gap-4",
					className,
				)}
			>
				<div className="relative">
					{/* Cooking Utensils */}
					<div
						className={cn(
							"bg-orange-100 rounded-full flex items-center justify-center",
							sizeClasses[size],
						)}
					>
						<Utensils
							className={cn(
								"text-orange-600 animate-pulse",
								size === "sm"
									? "w-4 h-4"
									: size === "md"
										? "w-6 h-6"
										: size === "lg"
											? "w-8 h-8"
											: "w-12 h-12",
							)}
						/>
					</div>

					{/* Steam Animation */}
					<div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="w-1 h-4 bg-gray-300 rounded-full opacity-60 animate-bounce"
								style={{
									animationDelay: `${i * 0.2}s`,
									marginLeft: `${(i - 1) * 4}px`,
								}}
							></div>
						))}
					</div>

					{/* Rotating Border */}
					<div
						className={cn(
							"absolute inset-0 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin",
							sizeClasses[size],
						)}
					></div>
				</div>

				{text && (
					<p className={cn("text-gray-600 font-medium", textSizeClasses[size])}>
						{text}
					</p>
				)}
			</div>
		);
	}

	if (variant === "brewing") {
		return (
			<div
				className={cn(
					"flex flex-col items-center justify-center gap-4",
					className,
				)}
			>
				<div className="relative">
					{/* Coffee Cup */}
					<div
						className={cn(
							"bg-amber-100 rounded-full flex items-center justify-center",
							sizeClasses[size],
						)}
					>
						<Coffee
							className={cn(
								"text-amber-600",
								size === "sm"
									? "w-4 h-4"
									: size === "md"
										? "w-6 h-6"
										: size === "lg"
											? "w-8 h-8"
											: "w-12 h-12",
							)}
						/>
					</div>

					{/* Liquid Fill Animation */}
					<div
						className={cn(
							"absolute inset-2 bg-gradient-to-t from-amber-400 to-transparent rounded-full animate-pulse",
							"opacity-30",
						)}
					></div>

					{/* Bubbles */}
					<div className="absolute inset-0 flex items-center justify-center">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className="absolute w-1 h-1 bg-amber-400 rounded-full animate-ping"
								style={{
									top: `${20 + i * 15}%`,
									left: `${30 + i * 10}%`,
									animationDelay: `${i * 0.3}s`,
								}}
							></div>
						))}
					</div>
				</div>

				{text && (
					<p className={cn("text-gray-600 font-medium", textSizeClasses[size])}>
						{text}
					</p>
				)}
			</div>
		);
	}

	if (variant === "harvest") {
		return (
			<div
				className={cn(
					"flex flex-col items-center justify-center gap-4",
					className,
				)}
			>
				<div className="relative">
					{/* Wheat Icon */}
					<div
						className={cn(
							"bg-yellow-100 rounded-full flex items-center justify-center animate-pulse",
							sizeClasses[size],
						)}
					>
						<Wheat
							className={cn(
								"text-yellow-600",
								size === "sm"
									? "w-4 h-4"
									: size === "md"
										? "w-6 h-6"
										: size === "lg"
											? "w-8 h-8"
											: "w-12 h-12",
							)}
						/>
					</div>

					{/* Growing Circles */}
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className={cn(
								"absolute inset-0 border-2 border-yellow-300 rounded-full animate-ping",
								sizeClasses[size],
							)}
							style={{
								animationDelay: `${i * 0.5}s`,
								animationDuration: "2s",
							}}
						></div>
					))}
				</div>

				{text && (
					<p className={cn("text-gray-600 font-medium", textSizeClasses[size])}>
						{text}
					</p>
				)}
			</div>
		);
	}

	if (variant === "sparkle") {
		return (
			<div
				className={cn(
					"flex flex-col items-center justify-center gap-4",
					className,
				)}
			>
				<div className="relative">
					{/* Central Sparkle */}
					<div
						className={cn(
							"bg-purple-100 rounded-full flex items-center justify-center animate-spin",
							sizeClasses[size],
						)}
					>
						<Sparkles
							className={cn(
								"text-purple-600",
								size === "sm"
									? "w-4 h-4"
									: size === "md"
										? "w-6 h-6"
										: size === "lg"
											? "w-8 h-8"
											: "w-12 h-12",
							)}
						/>
					</div>

					{/* Orbiting Sparkles */}
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping"
							style={{
								top: "50%",
								left: "50%",
								transform: `rotate(${i * 60}deg) translateY(-${size === "sm" ? "20" : size === "md" ? "28" : size === "lg" ? "36" : "48"}px) translateX(-50%)`,
								transformOrigin: "50% 50%",
								animationDelay: `${i * 0.2}s`,
							}}
						></div>
					))}
				</div>

				{text && (
					<p
						className={cn(
							"text-gray-600 font-medium animate-pulse",
							textSizeClasses[size],
						)}
					>
						{text}
					</p>
				)}
			</div>
		);
	}

	if (variant === "minimal") {
		return (
			<div
				className={cn(
					"flex flex-col items-center justify-center gap-4",
					className,
				)}
			>
				{/* Simple Dots */}
				<div className="flex space-x-2">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className={cn(
								"bg-emerald-600 rounded-full animate-bounce",
								size === "sm"
									? "w-2 h-2"
									: size === "md"
										? "w-3 h-3"
										: size === "lg"
											? "w-4 h-4"
											: "w-6 h-6",
							)}
							style={{animationDelay: `${i * 0.1}s`}}
						></div>
					))}
				</div>

				{text && (
					<p className={cn("text-gray-600 font-medium", textSizeClasses[size])}>
						{text}
					</p>
				)}
			</div>
		);
	}

	// Default variant
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-4",
				className,
			)}
		>
			<div className="relative">
				{/* Main Circle */}
				<div
					className={cn(
						"bg-emerald-100 rounded-full flex items-center justify-center",
						sizeClasses[size],
					)}
				>
					<div
						className={cn(
							"bg-emerald-600 rounded-full animate-pulse",
							size === "sm"
								? "w-3 h-3"
								: size === "md"
									? "w-4 h-4"
									: size === "lg"
										? "w-6 h-6"
										: "w-8 h-8",
						)}
					></div>
				</div>

				{/* Spinning Ring */}
				<div
					className={cn(
						"absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin",
						sizeClasses[size],
					)}
				></div>
			</div>

			{text && (
				<p
					className={cn(
						"text-gray-600 font-medium animate-pulse",
						textSizeClasses[size],
					)}
				>
					{text}
				</p>
			)}
		</div>
	);
}
