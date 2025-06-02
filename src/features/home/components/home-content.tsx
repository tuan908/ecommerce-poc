"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ArrowRight,
	Award,
	Headphones,
	Menu,
	RotateCcw,
	Star,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {CartProvider} from "../contexts/cart-context";
import CartIcon from "./cart-icon";
import ProductCarousel from "./product-carousel";

export default function HomeContent() {
	return (
		<CartProvider>
			<div className="min-h-screen bg-white">
				{/* Header */}
				<header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center py-4">
							<div className="flex items-center">
								<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
								<span className="text-xl font-bold text-gray-900">
									StreamLine
								</span>
							</div>

							<nav className="hidden md:flex space-x-8">
								<Link
									href="#home"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Home
								</Link>
								<Link
									href="#features"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Features
								</Link>
								<Link
									href="#products"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Products
								</Link>
								<Link
									href="#testimonials"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Testimonials
								</Link>
								<Link
									href="#contact"
									className="text-gray-600 hover:text-gray-900 transition-colors"
								>
									Contact
								</Link>
							</nav>

							<div className="flex items-center space-x-4">
								<CartIcon />
								<Button className="hidden sm:inline-flex">Shop Now</Button>
								<Button variant="ghost" size="icon" className="md:hidden">
									<Menu className="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>
				</header>

				{/* Hero Section */}
				<section
					id="home"
					className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							<div>
								<Badge className="mb-4" variant="secondary">
									New Collection Available
								</Badge>
								<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
									Upgrade Your Gear with{" "}
									<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
										StreamLine
									</span>
								</h1>
								<p className="text-xl text-gray-600 mb-8 max-w-xl">
									Premium tech accessories designed to enhance your productivity
									and elevate your workspace experience.
								</p>
								<div className="flex flex-col sm:flex-row gap-4">
									<Button size="lg" className="text-lg px-8 py-3">
										Browse Products
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="text-lg px-8 py-3"
									>
										Watch Demo
									</Button>
								</div>
							</div>
							<div className="relative">
								<Image
									src="/placeholder.svg?height=500&width=600"
									alt="StreamLine Products"
									width={600}
									height={500}
									className="w-full h-auto rounded-lg shadow-2xl"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-16 bg-gray-50">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Why Choose StreamLine?
							</h2>
							<p className="text-lg text-gray-600 max-w-2xl mx-auto">
								We&apos;re committed to delivering exceptional value and service
								with every purchase
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{[
								{
									title: "Fast Shipping",
									description:
										"Free shipping on orders over $50. Get your gear delivered in 2-3 business days.",
									icon: <Truck className="h-8 w-8 text-blue-600" />,
								},
								{
									title: "Premium Materials",
									description:
										"Only the highest quality materials and components in every product we sell.",
									icon: <Award className="h-8 w-8 text-blue-600" />,
								},
								{
									title: "Hassle-Free Returns",
									description:
										"30-day return policy. Not satisfied? Return it for a full refund, no questions asked.",
									icon: <RotateCcw className="h-8 w-8 text-blue-600" />,
								},
								{
									title: "24/7 Customer Support",
									description:
										"Our expert support team is available around the clock to help with any questions.",
									icon: <Headphones className="h-8 w-8 text-blue-600" />,
								},
							].map((feature, index) => (
								<Card
									key={index}
									className="text-center hover:shadow-lg transition-shadow"
								>
									<CardHeader>
										<div className="flex justify-center mb-4">
											{feature.icon}
										</div>
										<CardTitle>{feature.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription>{feature.description}</CardDescription>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Product Carousel */}
				<section id="products">
					<ProductCarousel />
				</section>

				{/* Testimonials Section */}
				<section id="testimonials" className="py-16 bg-gray-50">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								What Our Customers Say
							</h2>
							<p className="text-lg text-gray-600">
								Join thousands of satisfied customers worldwide
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									quote:
										"The build quality is exceptional. My StreamLine headset has been my daily driver for over a year now.",
									author: "Alex Chen",
									role: "Software Developer",
									avatar: "/placeholder.svg?height=60&width=60",
									rating: 5,
								},
								{
									quote:
										"Fast shipping, great customer service, and products that actually live up to the hype. Highly recommend!",
									author: "Sarah Johnson",
									role: "Content Creator",
									avatar: "/placeholder.svg?height=60&width=60",
									rating: 5,
								},
								{
									quote:
										"StreamLine has completely transformed my home office setup. Everything just works perfectly together.",
									author: "Michael Rodriguez",
									role: "Marketing Manager",
									avatar: "/placeholder.svg?height=60&width=60",
									rating: 5,
								},
							].map((testimonial, index) => (
								<Card key={index} className="hover:shadow-lg transition-shadow">
									<CardHeader>
										<div className="flex mb-2">
											{[...Array(testimonial.rating)].map((_, i) => (
												<Star
													key={i}
													className="h-5 w-5 fill-yellow-400 text-yellow-400"
												/>
											))}
										</div>
									</CardHeader>
									<CardContent>
										<p className="text-gray-600 mb-4">
											&quot;{testimonial.quote}&quot;
										</p>
										<div className="flex items-center">
											<Image
												src={testimonial.avatar || "/placeholder.svg"}
												alt={testimonial.author}
												width={48}
												height={48}
												className="w-12 h-12 rounded-full mr-4"
											/>
											<div>
												<p className="font-semibold">{testimonial.author}</p>
												<p className="text-sm text-gray-500">
													{testimonial.role}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Final CTA Section */}
				<section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold mb-4">
							Ready to Experience StreamLine?
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Join thousands of professionals who have upgraded their workspace
							with our premium accessories.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								variant="secondary"
								className="text-lg px-8 py-3"
							>
								Browse Products
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
							>
								Contact Sales
							</Button>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer id="contact" className="bg-gray-900 text-white py-12">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-4 gap-8">
							<div>
								<div className="flex items-center mb-4">
									<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3"></div>
									<span className="text-xl font-bold">StreamLine</span>
								</div>
								<p className="text-gray-400 mb-4">
									Premium tech accessories for the modern professional.
								</p>
								<div className="flex space-x-4">
									<Link
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<span className="sr-only">Facebook</span>📘
									</Link>
									<Link
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<span className="sr-only">Twitter</span>🐦
									</Link>
									<Link
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										<span className="sr-only">Instagram</span>📷
									</Link>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
								<ul className="space-y-2">
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											About Us
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											FAQ
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Privacy Policy
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Terms of Service
										</Link>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4">Products</h3>
								<ul className="space-y-2">
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Headsets
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Keyboards
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Mice
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Accessories
										</Link>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4">Support</h3>
								<ul className="space-y-2">
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Contact Us
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Shipping Info
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Returns
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											Warranty
										</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="border-t border-gray-800 mt-8 pt-8 text-center">
							<p className="text-gray-400">
								© {new Date().getFullYear()} StreamLine. All rights reserved.
							</p>
						</div>
					</div>
				</footer>
			</div>
		</CartProvider>
	);
}
