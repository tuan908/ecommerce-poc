export function ProductSkeleton() {
	return (
		<div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
			{/* Image Skeleton */}
			<div className="aspect-square bg-gray-200" />

			{/* Content Skeleton */}
			<div className="p-4 space-y-3">
				{/* Category */}
				<div className="h-4 bg-gray-200 rounded w-1/3" />

				{/* Title */}
				<div className="space-y-2">
					<div className="h-5 bg-gray-200 rounded w-3/4" />
					<div className="h-5 bg-gray-200 rounded w-1/2" />
				</div>

				{/* Description */}
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 rounded w-full" />
					<div className="h-4 bg-gray-200 rounded w-2/3" />
				</div>

				{/* Rating */}
				<div className="flex items-center gap-2">
					<div className="flex gap-1">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="w-4 h-4 bg-gray-200 rounded" />
						))}
					</div>
					<div className="h-4 bg-gray-200 rounded w-16" />
				</div>

				{/* Price */}
				<div className="h-6 bg-gray-200 rounded w-1/3" />
			</div>

			{/* Button Skeleton */}
			<div className="p-4 pt-0">
				<div className="h-10 bg-gray-200 rounded w-full" />
			</div>
		</div>
	);
}

export function ProductGridSkeleton({count = 12}: {count?: number}) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{[...Array(count)].map((_, i) => (
				<ProductSkeleton key={i} />
			))}
		</div>
	);
}
