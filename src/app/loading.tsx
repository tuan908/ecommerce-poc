"use client";

import {Card, CardContent} from "@/shared/components/ui/card";
import {Skeleton} from "@/shared/components/ui/skeleton";
import {ChefHat, Loader2} from "lucide-react";

export default function Loading() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
			{/* Header Loading */}
			<div className="bg-white border-b">
				<div className="container mx-auto px-4 py-4">
					<Skeleton className="h-4 w-48" />
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				{/* Main Loading Content */}
				<div className="text-center mb-12">
					<div className="flex justify-center mb-6">
						<div className="relative">
							{/* Animated Logo */}
							<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
								<ChefHat className="w-10 h-10 text-emerald-600" />
							</div>

							{/* Spinning Ring */}
							<div className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
						</div>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-center gap-2">
							<Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
							<h1 className="text-2xl font-bold text-gray-900">
								Loading Traditional Flavors
							</h1>
						</div>
						<p className="text-gray-600 max-w-md mx-auto">
							Preparing the finest Vietnamese delicacies for you...
						</p>
					</div>

					{/* Loading Progress Bar */}
					<div className="mt-8 max-w-xs mx-auto">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-emerald-600 h-2 rounded-full animate-pulse"
								style={{width: "60%"}}
							></div>
						</div>
					</div>
				</div>

				{/* Content Skeleton */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content Skeleton */}
					<div className="lg:col-span-2 space-y-6">
						<Card>
							<CardContent className="p-6 space-y-4">
								<Skeleton className="h-8 w-3/4" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
									<div className="space-y-2">
										<Skeleton className="h-4 w-20" />
										<Skeleton className="h-10 w-full" />
									</div>
									<div className="space-y-2">
										<Skeleton className="h-4 w-20" />
										<Skeleton className="h-10 w-full" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6 space-y-4">
								<Skeleton className="h-6 w-1/2" />
								<div className="space-y-3">
									{[...Array(3)].map((_, i) => (
										<div key={i} className="flex items-center gap-4">
											<Skeleton className="w-12 h-12 rounded-lg" />
											<div className="flex-1 space-y-2">
												<Skeleton className="h-4 w-3/4" />
												<Skeleton className="h-3 w-1/2" />
											</div>
											<Skeleton className="h-4 w-16" />
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar Skeleton */}
					<div className="space-y-6">
						<Card>
							<CardContent className="p-6 space-y-4">
								<Skeleton className="h-6 w-32" />
								<div className="space-y-3">
									{[...Array(4)].map((_, i) => (
										<div key={i} className="flex items-center gap-3">
											<Skeleton className="w-10 h-10 rounded-lg" />
											<div className="flex-1 space-y-1">
												<Skeleton className="h-3 w-full" />
												<Skeleton className="h-3 w-2/3" />
											</div>
										</div>
									))}
								</div>
								<div className="border-t pt-4 space-y-2">
									<div className="flex justify-between">
										<Skeleton className="h-4 w-16" />
										<Skeleton className="h-4 w-20" />
									</div>
									<div className="flex justify-between">
										<Skeleton className="h-4 w-20" />
										<Skeleton className="h-4 w-16" />
									</div>
									<div className="flex justify-between pt-2 border-t">
										<Skeleton className="h-5 w-12" />
										<Skeleton className="h-5 w-24" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Product Grid Skeleton */}
				<div className="mt-12">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{[...Array(8)].map((_, i) => (
							<Card key={i} className="overflow-hidden">
								<Skeleton className="aspect-square w-full" />
								<CardContent className="p-4 space-y-3">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-5 w-full" />
									<Skeleton className="h-4 w-3/4" />
									<div className="flex items-center gap-1">
										{[...Array(5)].map((_, j) => (
											<Skeleton key={j} className="w-4 h-4 rounded" />
										))}
										<Skeleton className="h-4 w-12 ml-2" />
									</div>
									<Skeleton className="h-6 w-20" />
									<Skeleton className="h-10 w-full" />
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>

			{/* Floating Loading Dots */}
			<div className="fixed bottom-8 right-8">
				<div className="flex space-x-1">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
							style={{animationDelay: `${i * 0.1}s`}}
						></div>
					))}
				</div>
			</div>
		</div>
	);
}
