"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import {Button} from "@/shared/components/ui/button";
import {Card, CardContent, CardHeader} from "@/shared/components/ui/card";
import {Progress} from "@/shared/components/ui/progress";
import {MoreHorizontal, Star, ThumbsDown, ThumbsUp} from "lucide-react";
import {useState} from "react";

interface Review {
	id: string;
	author: {
		name: string;
		avatar?: string;
		verified: boolean;
	};
	rating: number;
	title: string;
	content: string;
	date: string;
	helpful: number;
	notHelpful: number;
	images?: string[];
}

interface ProductReviewsProps {
	reviews: Review[];
	averageRating: number;
	totalReviews: number;
	ratingDistribution: {[key: number]: number};
}

export function ProductReviews({
	reviews,
	averageRating,
	totalReviews,
	ratingDistribution,
}: ProductReviewsProps) {
	const [sortBy, setSortBy] = useState<
		"newest" | "oldest" | "highest" | "lowest" | "helpful"
	>("newest");
	const [showAll, setShowAll] = useState(false);

	const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

	const sortedReviews = [...displayedReviews].sort((a, b) => {
		switch (sortBy) {
			case "newest":
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			case "oldest":
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			case "highest":
				return b.rating - a.rating;
			case "lowest":
				return a.rating - b.rating;
			case "helpful":
				return b.helpful - a.helpful;
			default:
				return 0;
		}
	});

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getRatingPercentage = (rating: number) => {
		return totalReviews > 0
			? (ratingDistribution[rating] / totalReviews) * 100
			: 0;
	};

	return (
		<div className="space-y-6">
			{/* Rating Summary */}
			<Card>
				<CardHeader>
					<h3 className="text-xl font-semibold">Customer Reviews</h3>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-2 gap-8">
						{/* Overall Rating */}
						<div className="text-center">
							<div className="text-4xl font-bold text-gray-900 mb-2">
								{averageRating.toFixed(1)}
							</div>
							<div className="flex items-center justify-center gap-1 mb-2">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-5 h-5 ${
											i < Math.floor(averageRating)
												? "fill-yellow-400 text-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<div className="text-sm text-gray-600">
								{totalReviews} reviews
							</div>
						</div>

						{/* Rating Distribution */}
						<div className="space-y-2">
							{[5, 4, 3, 2, 1].map(rating => (
								<div key={rating} className="flex items-center gap-3">
									<div className="flex items-center gap-1 w-12">
										<span className="text-sm">{rating}</span>
										<Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
									</div>
									<Progress
										value={getRatingPercentage(rating)}
										className="flex-1 h-2"
									/>
									<span className="text-sm text-gray-600 w-12 text-right">
										{ratingDistribution[rating] || 0}
									</span>
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Sort Controls */}
			<div className="flex items-center justify-between">
				<h4 className="font-semibold">Reviews ({totalReviews})</h4>
				<select
					value={sortBy}
					onChange={e => setSortBy(e.target.value as any)}
					className="border border-gray-300 rounded-md px-3 py-1 text-sm"
				>
					<option value="newest">Newest First</option>
					<option value="oldest">Oldest First</option>
					<option value="highest">Highest Rating</option>
					<option value="lowest">Lowest Rating</option>
					<option value="helpful">Most Helpful</option>
				</select>
			</div>

			{/* Reviews List */}
			<div className="space-y-6">
				{sortedReviews.map(review => (
					<Card key={review.id}>
						<CardContent className="pt-6">
							<div className="flex items-start gap-4">
								<Avatar className="w-10 h-10">
									<AvatarImage
										src={review.author.avatar || "/placeholder.svg"}
									/>
									<AvatarFallback>
										{review.author.name.charAt(0)}
									</AvatarFallback>
								</Avatar>

								<div className="flex-1 space-y-3">
									{/* Author and Rating */}
									<div className="flex items-center justify-between">
										<div>
											<div className="flex items-center gap-2">
												<span className="font-medium">
													{review.author.name}
												</span>
												{review.author.verified && (
													<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
														Verified Purchase
													</span>
												)}
											</div>
											<div className="flex items-center gap-2 mt-1">
												<div className="flex items-center">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`w-4 h-4 ${
																i < review.rating
																	? "fill-yellow-400 text-yellow-400"
																	: "text-gray-300"
															}`}
														/>
													))}
												</div>
												<span className="text-sm text-gray-600">
													{formatDate(review.date)}
												</span>
											</div>
										</div>
										<Button variant="ghost" size="sm">
											<MoreHorizontal className="w-4 h-4" />
										</Button>
									</div>

									{/* Review Content */}
									<div>
										<h5 className="font-medium mb-2">{review.title}</h5>
										<p className="text-gray-700 leading-relaxed">
											{review.content}
										</p>
									</div>

									{/* Review Images */}
									{review.images && review.images.length > 0 && (
										<div className="flex gap-2">
											{review.images.map((image, index) => (
												<div
													key={index}
													className="w-16 h-16 rounded-lg overflow-hidden border"
												>
													<img
														src={image || "/placeholder.svg"}
														alt={`Review image ${index + 1}`}
														className="w-full h-full object-cover"
													/>
												</div>
											))}
										</div>
									)}

									{/* Helpful Actions */}
									<div className="flex items-center gap-4 pt-2">
										<span className="text-sm text-gray-600">
											Was this helpful?
										</span>
										<div className="flex items-center gap-2">
											<Button
												variant="outline"
												size="sm"
												className="flex items-center gap-1"
											>
												<ThumbsUp className="w-3 h-3" />
												Yes ({review.helpful})
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="flex items-center gap-1"
											>
												<ThumbsDown className="w-3 h-3" />
												No ({review.notHelpful})
											</Button>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Show More Button */}
			{!showAll && reviews.length > 3 && (
				<div className="text-center">
					<Button variant="outline" onClick={() => setShowAll(true)}>
						Show All {reviews.length} Reviews
					</Button>
				</div>
			)}
		</div>
	);
}
