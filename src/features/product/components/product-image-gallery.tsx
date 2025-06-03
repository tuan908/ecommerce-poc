"use client";

import type React from "react";

import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight, Expand, Heart, Share2} from "lucide-react";
import Image from "next/image";
import {useState} from "react";

interface ProductImage {
	id: string;
	url: string;
	alt: string;
	isMain?: boolean;
}

interface ProductImageGalleryProps {
	images: ProductImage[];
	productName: string;
	onWishlistToggle: () => void;
	isWishlisted: boolean;
}

export function ProductImageGallery({
	images,
	productName,
	onWishlistToggle,
	isWishlisted,
}: ProductImageGalleryProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isZoomed, setIsZoomed] = useState(false);
	const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

	const handleThumbnailClick = (index: number) => {
		setCurrentImageIndex(index);
		setIsZoomed(false);
	};

	const handlePrevious = () => {
		setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
		setIsZoomed(false);
	};

	const handleNext = () => {
		setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
		setIsZoomed(false);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isZoomed) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		setMousePosition({x, y});
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: productName,
					url: window.location.href,
				});
			} catch (error) {
				console.log("Error sharing:", error);
			}
		} else {
			// Fallback: copy to clipboard
			navigator.clipboard.writeText(window.location.href);
		}
	};

	const currentImage = images[currentImageIndex];

	return (
		<div className="space-y-4">
			{/* Main Image */}
			<div className="relative group">
				<div
					className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
					onClick={() => setIsZoomed(!isZoomed)}
					onMouseMove={handleMouseMove}
					onMouseLeave={() => setIsZoomed(false)}
				>
					<Image
						src={currentImage?.url || "/placeholder.svg"}
						alt={currentImage?.alt || productName}
						fill
						className={`object-cover transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
						style={
							isZoomed
								? {
										transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
									}
								: {}
						}
						priority
						sizes="(max-width: 768px) 100vw, 50vw"
					/>

					{/* Navigation Arrows */}
					{images.length > 1 && (
						<>
							<Button
								variant="secondary"
								size="icon"
								className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm hover:bg-white"
								onClick={e => {
									e.stopPropagation();
									handlePrevious();
								}}
							>
								<ChevronLeft className="w-4 h-4" />
							</Button>

							<Button
								variant="secondary"
								size="icon"
								className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm hover:bg-white"
								onClick={e => {
									e.stopPropagation();
									handleNext();
								}}
							>
								<ChevronRight className="w-4 h-4" />
							</Button>
						</>
					)}

					{/* Action Buttons */}
					<div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
						<Button
							variant="secondary"
							size="icon"
							className="bg-white/90 backdrop-blur-sm hover:bg-white"
							onClick={e => {
								e.stopPropagation();
								onWishlistToggle();
							}}
						>
							<Heart
								className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
							/>
						</Button>

						<Button
							variant="secondary"
							size="icon"
							className="bg-white/90 backdrop-blur-sm hover:bg-white"
							onClick={e => {
								e.stopPropagation();
								handleShare();
							}}
						>
							<Share2 className="w-4 h-4" />
						</Button>

						<Button
							variant="secondary"
							size="icon"
							className="bg-white/90 backdrop-blur-sm hover:bg-white"
							onClick={e => {
								e.stopPropagation();
								setIsZoomed(!isZoomed);
							}}
						>
							<Expand className="w-4 h-4" />
						</Button>
					</div>

					{/* Zoom Indicator */}
					{isZoomed && (
						<div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
							Click to zoom out
						</div>
					)}
				</div>

				{/* Image Counter */}
				{images.length > 1 && (
					<div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
						{currentImageIndex + 1} / {images.length}
					</div>
				)}
			</div>

			{/* Thumbnail Gallery */}
			{images.length > 1 && (
				<div className="flex gap-2 overflow-x-auto pb-2">
					{images.map((image, index) => (
						<button
							key={image.id}
							onClick={() => handleThumbnailClick(index)}
							className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
								index === currentImageIndex
									? "border-blue-500 ring-2 ring-blue-200"
									: "border-gray-200 hover:border-gray-300"
							}`}
						>
							<Image
								src={image.url || "/placeholder.svg"}
								alt={image.alt}
								fill
								className="object-cover"
								sizes="80px"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
