"use client";

import {ProductImageGallery} from "@/components/product/components/product-image-gallery";
import {ProductReviews} from "@/components/product/components/product-reviews";
import {ProductSpecifications} from "@/components/product/components/product-specifications";
import {RelatedProducts} from "@/components/product/components/related-products";
import {Product} from "@/components/products/types";
import {Badge} from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {formatCurrency} from "@/lib/utils/currency";
import {
	Clock,
	Heart,
	MapPin,
	Minus,
	Plus,
	RotateCcw,
	Share2,
	Shield,
	ShoppingCart,
	Star,
	Truck,
} from "lucide-react";
import {useEffect, useState} from "react";

// Sample product data - In production, this would come from an API
const sampleProduct: Product & {
	images: Array<{id: string; url: string; alt: string}>;
	longDescription: string;
	specifications: Array<{label: string; value: string}>;
	ingredients: string[];
	nutritionFacts: {[key: string]: string};
	allergens: string[];
	variants: Array<{
		id: string;
		name: string;
		value: string;
		available: boolean;
	}>;
	shipping: {
		freeShippingThreshold: number;
		estimatedDelivery: string;
		shippingCost: number;
	};
	policies: {
		returnPolicy: string;
		warranty: string;
	};
} = {
	id: "1",
	name: "Bánh Ít Lá Gai Premium",
	price: "45000",
	originalPrice: "50000",
	imageUrl: "/placeholder.svg",
	description:
		"Bánh truyền thống dẻo thơm, nhân dừa đậu xanh, gói bằng lá chuối.",
	category: "Traditional Cakes",
	rating: 4.8,
	reviewCount: 124,
	availability: "in-stock",
	badges: "featured,best-seller",
	inventory: 15,
	slug: "banh-it-la-gai-premium",
	images: [
		{
			id: "1",
			url: "https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/501045153_685464734106527_6570116145315859211_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG5XJ_fzB6vbJe6HsqvWgOPMbCYdoXAv-MxsJh2hcC_4_1rw2ceWHn6rS_vmw3IRWnK-3GA3z_blgaa9lv-RO9u&_nc_ohc=xpCERR11n-cQ7kNvwGMPYu3&_nc_oc=AdlemCrlb4C6LZrN9rwGlW_AdcJ1W5FraAk3D8VQiSYxSOgh6QWWHdESnYHE36hvmTY&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=2VL-VIpDQIQwfOBPVMGmLQ&oh=00_AfKKMjTvadYNwbsJOpA7HhkOgqPPwGGD8P43wTW3jKywzA&oe=68432E38",
			alt: "Bánh Ít Lá Gai - Main view",
		},
		{
			id: "2",
			url: "/placeholder.svg?height=600&width=600",
			alt: "Bánh Ít Lá Gai - Close up",
		},
		{
			id: "3",
			url: "/placeholder.svg?height=600&width=600",
			alt: "Bánh Ít Lá Gai - Packaging",
		},
		{
			id: "4",
			url: "/placeholder.svg?height=600&width=600",
			alt: "Bánh Ít Lá Gai - Ingredients",
		},
	],
	longDescription: `
    Bánh Ít Lá Gai Premium là sản phẩm bánh truyền thống được chế biến từ những nguyên liệu tươi ngon nhất.
    Với lớp vỏ bánh dẻo thơm được làm từ bột gạo tẻ và lá gai tươi, tạo nên màu xanh tự nhiên đặc trưng.
    Nhân bánh được làm từ dừa tươi và đậu xanh nguyên chất, mang đến hương vị ngọt ngào, béo ngậy.

    Mỗi chiếc bánh được gói cẩn thận trong lá chuối tươi, giữ nguyên hương vị truyền thống và đảm bảo
    vệ sinh an toàn thực phẩm. Sản phẩm không chứa chất bảo quản, phẩm màu nhân tạo.
  `,
	specifications: [
		{label: "Weight", value: "50g per piece"},
		{label: "Shelf Life", value: "3 days at room temperature"},
		{label: "Storage", value: "Store in cool, dry place"},
		{label: "Origin", value: "Bình Định, Vietnam"},
		{label: "Packaging", value: "Banana leaf wrapped"},
		{label: "Serving Size", value: "1-2 pieces per person"},
	],
	ingredients: [
		"Rice flour",
		"Pandan leaves",
		"Fresh coconut",
		"Mung beans",
		"Sugar",
		"Salt",
		"Banana leaves",
	],
	nutritionFacts: {
		Calories: "180 kcal",
		"Total Fat": "8g",
		"Saturated Fat": "6g",
		Carbohydrates: "25g",
		"Dietary Fiber": "2g",
		Sugars: "12g",
		Protein: "3g",
		Sodium: "150mg",
	},
	allergens: ["May contain traces of nuts", "Contains coconut"],
	variants: [
		{
			id: "size-small",
			name: "Size",
			value: "Small (6 pieces)",
			available: true,
		},
		{
			id: "size-medium",
			name: "Size",
			value: "Medium (12 pieces)",
			available: true,
		},
		{
			id: "size-large",
			name: "Size",
			value: "Large (24 pieces)",
			available: false,
		},
	],
	shipping: {
		freeShippingThreshold: 200000,
		estimatedDelivery: "2-3 business days",
		shippingCost: 25000,
	},
	policies: {
		returnPolicy: "30-day return policy for unopened items",
		warranty: "Freshness guaranteed or your money back",
	},
};

const sampleReviews = [
	{
		id: "1",
		author: {
			name: "Nguyễn Thị Mai",
			avatar: "/placeholder.svg?height=40&width=40",
			verified: true,
		},
		rating: 5,
		title: "Absolutely delicious!",
		content:
			"These traditional cakes are amazing! The texture is perfect - soft and chewy, and the coconut filling is so flavorful. Exactly like what my grandmother used to make. Will definitely order again!",
		date: "2024-01-15",
		helpful: 12,
		notHelpful: 1,
		images: ["/placeholder.svg?height=100&width=100"],
	},
	{
		id: "2",
		author: {
			name: "Trần Văn Hùng",
			verified: true,
		},
		rating: 4,
		title: "Great quality, fast delivery",
		content:
			"Very satisfied with the quality. The banana leaf packaging keeps them fresh and adds to the authentic experience. Only minor complaint is that I wish they were a bit larger.",
		date: "2024-01-10",
		helpful: 8,
		notHelpful: 0,
	},
	{
		id: "3",
		author: {
			name: "Lê Thị Hoa",
			verified: false,
		},
		rating: 5,
		title: "Perfect for special occasions",
		content:
			"Ordered these for Tet celebration and everyone loved them. The green color from pandan leaves is beautiful and natural. Highly recommend for anyone wanting authentic Vietnamese treats.",
		date: "2024-01-05",
		helpful: 15,
		notHelpful: 2,
	},
];

const relatedProducts: Product[] = [
	{
		id: "2",
		name: "Nem Chợ Huyện",
		price: "60000",
		imageUrl: "/placeholder.svg?height=300&width=300",
		description: "Nem chua nổi tiếng với vị chua thanh, giòn sật, đậm đà.",
		category: "Fermented Foods",
		rating: 4.6,
		reviewCount: 89,
		availability: "in-stock",
		badges: "new",
		inventory: 8,
		slug: "nem-cho-huyen",
	},
	{
		id: "3",
		name: "Tré Bình Định",
		price: "55000",
		imageUrl: "/placeholder.svg?height=300&width=300",
		description: "Món khai vị đặc trưng được làm từ thịt tai heo và riềng sả.",
		category: "Appetizers",
		rating: 4.7,
		reviewCount: 156,
		availability: "in-stock",
		badges: "featured",
		inventory: 3,
		slug: "tre-binh-dinh",
	},
	{
		id: "4",
		name: "Bánh Tráng Nướng Mè",
		price: "30000",
		imageUrl: "/placeholder.svg?height=300&width=300",
		description: "Bánh tráng mè nướng giòn, vị bùi béo.",
		category: "Snacks",
		rating: 4.3,
		reviewCount: 78,
		availability: "in-stock",
		badges: "new",
		inventory: 25,
		slug: "banh-trang-nuong-me",
	},
	{
		id: "5",
		name: "Rượu Bàu Đá",
		price: "120000",
		originalPrice: "150000",
		imageUrl: "/placeholder.svg?height=300&width=300",
		description: "Rượu nếp truyền thống nồng nàn, chưng cất thủ công.",
		category: "Beverages",
		rating: 4.9,
		reviewCount: 67,
		availability: "in-stock",
		badges: "sale,best-seller",
		inventory: 12,
		slug: "ruou-bau-da",
	},
];

export default function ProductDetailPage() {
	const [product, setProduct] = useState(sampleProduct);
	const [quantity, setQuantity] = useState(1);
	const [selectedVariants, setSelectedVariants] = useState<{
		[key: string]: string;
	}>({});
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate API call
		const loadProduct = async () => {
			setLoading(true);
			await new Promise(resolve => setTimeout(resolve, 1000));
			setProduct(sampleProduct);
			setLoading(false);
		};

		loadProduct();
	}, []);

	const handleQuantityChange = (change: number) => {
		setQuantity(
			Math.max(1, Math.min(product.inventory || 1, quantity + change)),
		);
	};

	const handleVariantChange = (variantName: string, value: string) => {
		setSelectedVariants(prev => ({...prev, [variantName]: value}));
	};

	const handleAddToCart = () => {
		console.log("Adding to cart:", {
			product,
			quantity,
			variants: selectedVariants,
		});
	};

	const handleAddToWishlist = () => {
		setIsWishlisted(!isWishlisted);
		console.log("Wishlist toggled:", !isWishlisted);
	};

	const isOutOfStock = product.availability === "out-of-stock";
	const isLowStock = product.inventory && product.inventory <= 5;
	const totalPrice = Number(product.price) * quantity;
	const hasDiscount =
		product.originalPrice &&
		Number(product.originalPrice) > Number(product.price);
	const discountPercentage = hasDiscount
		? Math.round(
				((Number(product.originalPrice!) - Number(product.price)) /
					Number(product.originalPrice!)) *
					100,
			)
		: 0;

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-8">
					<div className="animate-pulse">
						<div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
						<div className="grid lg:grid-cols-2 gap-12">
							<div className="aspect-square bg-gray-200 rounded-lg"></div>
							<div className="space-y-6">
								<div className="h-8 bg-gray-200 rounded w-3/4"></div>
								<div className="h-6 bg-gray-200 rounded w-1/2"></div>
								<div className="h-20 bg-gray-200 rounded"></div>
								<div className="h-12 bg-gray-200 rounded w-1/3"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

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
								<BreadcrumbLink href="/products">Products</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink
									href={`/products?category=${encodeURIComponent(product.category)}`}
								>
									{product.category}
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{product.name}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8">
				{/* Product Overview */}
				<div className="grid lg:grid-cols-2 gap-12 mb-16">
					{/* Product Images */}
					<div>
						<ProductImageGallery
							images={product.images}
							productName={product.name}
							onWishlistToggle={handleAddToWishlist}
							isWishlisted={isWishlisted}
						/>
					</div>

					{/* Product Info */}
					<div className="space-y-6">
						{/* Badges */}
						{product.badges && product.badges.length > 0 && (
							<div className="flex gap-2">
								{product.badges?.split(",")?.map(badge => (
									<Badge key={badge} variant="secondary" className="capitalize">
										{badge.replace("-", " ")}
									</Badge>
								))}
							</div>
						)}

						{/* Title and Rating */}
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-4">
								{product.name}
							</h1>
							<div className="flex items-center gap-4 mb-2">
								<div className="flex items-center gap-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-5 h-5 ${
												i < Math.floor(Number(product.rating))
													? "fill-yellow-400 text-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="text-lg font-medium">{product.rating}</span>
								<span className="text-gray-600">
									({product.reviewCount} reviews)
								</span>
							</div>
						</div>

						{/* Price */}
						<div className="space-y-2">
							<div className="flex items-center gap-4">
								<span className="text-3xl font-bold text-gray-900">
									{formatCurrency(product.price)}
								</span>
								{hasDiscount && (
									<>
										<span className="text-xl text-gray-500 line-through">
											{formatCurrency(product.originalPrice!)}
										</span>
										<Badge variant="destructive" className="text-sm">
											{discountPercentage}% OFF
										</Badge>
									</>
								)}
							</div>
							{quantity > 1 && (
								<div className="text-lg text-gray-600">
									Total:{" "}
									<span className="font-semibold">
										{formatCurrency(totalPrice.toString())}
									</span>
								</div>
							)}
						</div>

						{/* Description */}
						<div>
							<p className="text-gray-700 leading-relaxed">
								{product.description}
							</p>
						</div>

						{/* Stock Status */}
						<div className="space-y-2">
							{isOutOfStock ? (
								<div className="text-red-600 font-medium">Out of Stock</div>
							) : isLowStock ? (
								<div className="text-orange-600 font-medium">
									Only {product.inventory} left in stock!
								</div>
							) : (
								<div className="text-green-600 font-medium">In Stock</div>
							)}
						</div>

						{/* Variants */}
						{product.variants && product.variants.length > 0 && (
							<div className="space-y-4">
								{product.variants.map(variant => (
									<div key={variant.id}>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											{variant.name}
										</label>
										<div className="flex gap-2">
											<Button
												variant={
													selectedVariants[variant.name] === variant.value
														? "default"
														: "outline"
												}
												onClick={() =>
													handleVariantChange(variant.name, variant.value)
												}
												disabled={!variant.available}
												className="flex-1"
											>
												{variant.value}
												{!variant.available && " (Unavailable)"}
											</Button>
										</div>
									</div>
								))}
							</div>
						)}

						{/* Quantity and Add to Cart */}
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Quantity
								</label>
								<div className="flex items-center gap-3">
									<div className="flex items-center border border-gray-300 rounded-lg">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleQuantityChange(-1)}
											disabled={quantity <= 1}
											className="px-3"
										>
											<Minus className="w-4 h-4" />
										</Button>
										<span className="px-4 py-2 font-medium">{quantity}</span>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleQuantityChange(1)}
											disabled={quantity >= (product.inventory || 1)}
											className="px-3"
										>
											<Plus className="w-4 h-4" />
										</Button>
									</div>
									<span className="text-sm text-gray-600">
										{product.inventory} available
									</span>
								</div>
							</div>

							<div className="flex gap-4">
								<Button
									onClick={handleAddToCart}
									disabled={isOutOfStock}
									className="flex-1 h-12 text-lg font-medium"
									size="lg"
								>
									<ShoppingCart className="w-5 h-5 mr-2" />
									{isOutOfStock ? "Out of Stock" : "Add to Cart"}
								</Button>
								<Button
									variant="outline"
									onClick={handleAddToWishlist}
									className="h-12 px-6"
									size="lg"
								>
									<Heart
										className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
									/>
								</Button>
								<Button variant="outline" className="h-12 px-6" size="lg">
									<Share2 className="w-5 h-5" />
								</Button>
							</div>
						</div>

						{/* Shipping Info */}
						<Card>
							<CardContent className="p-4">
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<Truck className="w-5 h-5 text-blue-600" />
										<div>
											<div className="font-medium">Free shipping</div>
											<div className="text-sm text-gray-600">
												On orders over{" "}
												{formatCurrency(
													product.shipping.freeShippingThreshold.toString(),
												)}
											</div>
										</div>
									</div>
									<Separator />
									<div className="flex items-center gap-3">
										<Clock className="w-5 h-5 text-green-600" />
										<div>
											<div className="font-medium">Fast delivery</div>
											<div className="text-sm text-gray-600">
												{product.shipping.estimatedDelivery}
											</div>
										</div>
									</div>
									<Separator />
									<div className="flex items-center gap-3">
										<RotateCcw className="w-5 h-5 text-purple-600" />
										<div>
											<div className="font-medium">Easy returns</div>
											<div className="text-sm text-gray-600">
												{product.policies.returnPolicy}
											</div>
										</div>
									</div>
									<Separator />
									<div className="flex items-center gap-3">
										<Shield className="w-5 h-5 text-orange-600" />
										<div>
											<div className="font-medium">Quality guarantee</div>
											<div className="text-sm text-gray-600">
												{product.policies.warranty}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Store Location */}
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center gap-3">
									<MapPin className="w-5 h-5 text-red-600" />
									<div>
										<div className="font-medium">
											Made in{" "}
											{
												product.specifications.find(s => s.label === "Origin")
													?.value
											}
										</div>
										<div className="text-sm text-gray-600">
											Authentic traditional recipe
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Product Details Tabs */}
				<div className="mb-16">
					<Tabs defaultValue="description" className="w-full">
						<TabsList className="grid w-full grid-cols-4">
							<TabsTrigger value="description">Description</TabsTrigger>
							<TabsTrigger value="specifications">Specifications</TabsTrigger>
							<TabsTrigger value="reviews">
								Reviews ({product.reviewCount})
							</TabsTrigger>
							<TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
						</TabsList>

						<TabsContent value="description" className="mt-6">
							<Card>
								<CardContent className="p-6">
									<div className="prose max-w-none">
										<div className="whitespace-pre-line text-gray-700 leading-relaxed">
											{product.longDescription}
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="specifications" className="mt-6">
							<ProductSpecifications
								specifications={product.specifications}
								ingredients={product.ingredients}
								nutritionFacts={product.nutritionFacts}
								allergens={product.allergens}
							/>
						</TabsContent>

						<TabsContent value="reviews" className="mt-6">
							<ProductReviews
								reviews={sampleReviews}
								averageRating={Number(product.rating)}
								totalReviews={product.reviewCount}
								ratingDistribution={{5: 89, 4: 25, 3: 8, 2: 1, 1: 1}}
							/>
						</TabsContent>

						<TabsContent value="shipping" className="mt-6">
							<div className="grid md:grid-cols-2 gap-6">
								<Card>
									<CardContent className="p-6">
										<h3 className="text-lg font-semibold mb-4">
											Shipping Information
										</h3>
										<div className="space-y-3">
											<div>
												<strong>Standard Delivery:</strong>{" "}
												{product.shipping.estimatedDelivery}
											</div>
											<div>
												<strong>Shipping Cost:</strong>{" "}
												{formatCurrency(
													product.shipping.shippingCost.toString(),
												)}
											</div>
											<div>
												<strong>Free Shipping:</strong> On orders over{" "}
												{formatCurrency(
													product.shipping.freeShippingThreshold.toString(),
												)}
											</div>
											<div>
												<strong>Express Delivery:</strong> Available for
												additional cost
											</div>
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardContent className="p-6">
										<h3 className="text-lg font-semibold mb-4">
											Returns & Exchanges
										</h3>
										<div className="space-y-3">
											<div>
												<strong>Return Policy:</strong>{" "}
												{product.policies.returnPolicy}
											</div>
											<div>
												<strong>Condition:</strong> Items must be unopened and
												in original packaging
											</div>
											<div>
												<strong>Refund:</strong> Full refund within 7-10
												business days
											</div>
											<div>
												<strong>Exchange:</strong> Free exchange for defective
												items
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>

				{/* Related Products */}
				<RelatedProducts
					products={relatedProducts}
					title="You might also like"
					onAddToCart={product =>
						console.log("Adding related product to cart:", product)
					}
				/>
			</div>
		</div>
	);
}
