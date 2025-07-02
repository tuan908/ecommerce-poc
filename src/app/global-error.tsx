"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {AlertTriangle, ExternalLink, Home, RefreshCw} from "lucide-react";

interface GlobalErrorProps {
	error: Error & {digest?: string};
	reset: () => void;
}

export default function GlobalError({error, reset}: GlobalErrorProps) {
	return (
		<html>
			<body>
				<div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
					<div className="max-w-2xl w-full">
						{/* Critical Error Header */}
						<div className="text-center mb-8">
							<div className="flex justify-center mb-6">
								<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
									<AlertTriangle className="w-12 h-12 text-red-600" />
								</div>
							</div>

							<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Critical System Error
							</h1>
							<p className="text-lg text-gray-600 mb-2">
								We're experiencing a serious technical issue.
							</p>
							<p className="text-gray-500">
								Our development team has been automatically notified and is
								working on a fix.
							</p>
						</div>

						{/* Error Card */}
						<Card className="mb-8 border-red-200">
							<CardContent className="p-6">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									What happened?
								</h2>
								<div className="space-y-3 text-sm text-gray-600">
									<p>
										A critical error occurred that prevented the application
										from loading properly. This is likely a temporary issue with
										our servers.
									</p>
									<p>
										<strong>What you can do:</strong>
									</p>
									<ul className="list-disc list-inside space-y-1 ml-4">
										<li>Wait a few minutes and try refreshing the page</li>
										<li>Clear your browser cache and cookies</li>
										<li>Try accessing the site from a different browser</li>
										<li>Contact our support team if the issue persists</li>
									</ul>
								</div>

								{/* Error Details for Development */}
								{process.env.NODE_ENV === "development" && (
									<div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
										<h3 className="font-medium text-red-800 mb-2">
											Development Error Details:
										</h3>
										<code className="text-xs text-red-700 break-all block">
											{error.message}
										</code>
										{error.digest && (
											<div className="mt-2 text-xs text-red-600">
												<strong>Error ID:</strong> {error.digest}
											</div>
										)}
									</div>
								)}
							</CardContent>
						</Card>

						{/* Emergency Contact */}
						<Card className="mb-8">
							<CardContent className="p-6">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									Emergency Contact
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="p-4 bg-gray-50 rounded-lg">
										<h3 className="font-medium text-gray-900 mb-1">
											Technical Support
										</h3>
										<p className="text-sm text-gray-600 mb-2">
											For critical system issues
										</p>
										<a
											href="mailto:emergency@example.com"
											className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
										>
											emergency@example.com
											<ExternalLink className="w-3 h-3" />
										</a>
									</div>
									<div className="p-4 bg-gray-50 rounded-lg">
										<h3 className="font-medium text-gray-900 mb-1">
											Phone Support
										</h3>
										<p className="text-sm text-gray-600 mb-2">
											24/7 emergency line
										</p>
										<a
											href="tel:1900xxxx"
											className="text-sm text-emerald-600 hover:text-emerald-700"
										>
											1900-xxxx
										</a>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								onClick={reset}
								className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
							>
								<RefreshCw className="w-4 h-4" />
								Try Again
							</Button>

							<Button
								onClick={() => (window.location.href = "/")}
								variant="outline"
								className="flex items-center gap-2"
							>
								<Home className="w-4 h-4" />
								Go to Homepage
							</Button>
						</div>

						{/* Status Footer */}
						<div className="mt-8 text-center">
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm">
								<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
								<span>System administrators have been notified</span>
							</div>

							<div className="mt-4 text-xs text-gray-500">
								<p>Error occurred at {new Date().toLocaleString()}</p>
								{error.digest && (
									<p className="mt-1">Reference ID: {error.digest}</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
