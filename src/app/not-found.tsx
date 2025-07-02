"use client";

import type React from "react";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
	ArrowLeft,
	ChefHat,
	Home,
	Mail,
	MapPin,
	Phone,
	Search,
} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

export default function NotFound() {
	const [searchQuery, setSearchQuery] = useState("");

	const popularProducts = [
		{name: "Bánh Ít Lá Gai", href: "/products/banh-it-la-gai"},
		{name: "Nem Chợ Huyện", href: "/products/nem-cho-huyen"},
		{name: "Tré Bình Định", href: "/products/tre-binh-dinh"},
		{name: "Rượu Bàu Đá", href: "/products/ruou-bau-da"},
	];

	const helpfulLinks = [
		{name: "All Products", href: "/products"},
		{name: "Traditional Cakes", href: "/products?category=traditional-cakes"},
		{name: "Fermented Foods", href: "/products?category=fermented-foods"},
		{name: "Beverages", href: "/products?category=beverages"},
		{name: "About Us", href: "/about"},
		{name: "Contact", href: "/contact"},
	];

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
			<div className="container mx-auto px-4 py-12">
				<div className="max-w-4xl mx-auto">
					{/* 404 Header */}
					<div className="text-center mb-12">
						<div className="flex justify-center mb-6">
							<div className="relative">
								<div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center">
									<ChefHat className="w-16 h-16 text-emerald-600" />
								</div>
								<div className="absolute -top-2 -right-2 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
									<span className="text-2xl font-bold text-red-600">404</span>
								</div>
							</div>
						</div>

						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Oops! Recipe Not Found
						</h1>
						<p className="text-xl text-gray-600 mb-2">
							The traditional dish you&apos;re looking for seems to have
							wandered off the menu.
						</p>
						<p className="text-gray-500">
							Don&apos;t worry, we have plenty of other delicious Vietnamese
							specialties waiting for you!
						</p>
					</div>

					{/* Search Section */}
					<Card className="mb-8">
						<CardContent className="p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
								<Search className="w-5 h-5" />
								Search for Products
							</h2>
							<form onSubmit={handleSearch} className="flex gap-3">
								<Input
									type="text"
									placeholder="Search for traditional Vietnamese products..."
									value={searchQuery}
									onChange={e => setSearchQuery(e.target.value)}
									className="flex-1"
								/>
								<Button
									type="submit"
									className="bg-emerald-600 hover:bg-emerald-700"
								>
									<Search className="w-4 h-4 mr-2" />
									Search
								</Button>
							</form>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Popular Products */}
						<Card>
							<CardContent className="p-6">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									Popular Products
								</h2>
								<div className="space-y-3">
									{popularProducts.map((product, index) => (
										<Link
											key={index}
											href={product.href}
											className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
										>
											<div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
												<ChefHat className="w-5 h-5 text-emerald-600" />
											</div>
											<span className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
												{product.name}
											</span>
										</Link>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Helpful Links */}
						<Card>
							<CardContent className="p-6">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									Helpful Links
								</h2>
								<div className="grid grid-cols-1 gap-2">
									{helpfulLinks.map((link, index) => (
										<Link
											key={index}
											href={link.href}
											className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
										>
											<div className="w-2 h-2 bg-emerald-600 rounded-full group-hover:scale-125 transition-transform"></div>
											<span className="text-gray-700 group-hover:text-emerald-600 transition-colors">
												{link.name}
											</span>
										</Link>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Contact Information */}
					<Card className="mt-8">
						<CardContent className="p-6">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Need Help?
							</h2>
							<p className="text-gray-600 mb-4">
								Can&apos;t find what you&apos;re looking for? Our team is here
								to help you discover the perfect traditional Vietnamese
								products.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
									<Phone className="w-5 h-5 text-emerald-600" />
									<div>
										<div className="font-medium text-gray-900">Call Us</div>
										<div className="text-sm text-gray-600">1900-xxxx</div>
									</div>
								</div>
								<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
									<Mail className="w-5 h-5 text-emerald-600" />
									<div>
										<div className="font-medium text-gray-900">Email</div>
										<div className="text-sm text-gray-600">
											support@example.com
										</div>
									</div>
								</div>
								<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
									<MapPin className="w-5 h-5 text-emerald-600" />
									<div>
										<div className="font-medium text-gray-900">Visit Store</div>
										<div className="text-sm text-gray-600">
											Ho Chi Minh City
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
						<Button
							onClick={() => window.history.back()}
							variant="outline"
							className="flex items-center gap-2"
						>
							<ArrowLeft className="w-4 h-4" />
							Go Back
						</Button>
						<Link href="/">
							<Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
								<Home className="w-4 h-4" />
								Back to Home
							</Button>
						</Link>
						<Link href="/products">
							<Button variant="outline" className="flex items-center gap-2">
								<Search className="w-4 h-4" />
								Browse Products
							</Button>
						</Link>
					</div>

					{/* Fun Fact */}
					<div className="mt-12 text-center">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm">
							<ChefHat className="w-4 h-4" />
							<span>
								Did you know? Vietnamese cuisine has over 500 traditional
								dishes!
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
