"use client";

import json from "@/i18n/locales/vi.json";
import {footerSections} from "@/lib/data/footers";
import {useAppSelector} from "@/store/hooks";
import {Mail, MapPin, Phone} from "lucide-react";
import Link from "next/link";
import {memo} from "react";
import Facebook from "./icons/facebook";
import Youtube from "./icons/youtube";
import Zalo from "./icons/zalo";
import Logo from "./logo";

const FooterWithContact = memo(() => {
	const uiState = useAppSelector(state => state.admin.settings);
	const currentYear = new Date().getFullYear();

	// Get social links from admin settings
	const getSocialLink = (platform: string) => {
		const link = uiState.social.links.find(link => link.platform === platform);
		return link?.url || "#";
	};

	return (
		<footer
			className="text-white py-12"
			style={{
				backgroundColor: uiState.theme.footerBackground.startsWith("#")
					? uiState.theme.footerBackground
					: undefined,
				backgroundImage: !uiState.theme.footerBackground.startsWith("#")
					? `url(${uiState.theme.footerBackground})`
					: undefined,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Overlay for better text readability when using background images */}
			{!uiState.theme.footerBackground.startsWith("#") && (
				<div className="absolute inset-0 bg-gray-900/80" />
			)}

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="grid md:grid-cols-4 gap-8">
					{/* Company Info Section */}
					<div className="md:col-span-1">
						<div className="mb-4">
							<Logo className="text-white" />
						</div>
						<p className="text-gray-300 mb-6 text-sm leading-relaxed">
							{json.common.welcome}
						</p>

						{/* Social Media Links */}
						<div className="space-y-3">
							<h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
								{json.footer?.socialMedia || "Follow Us"}
							</h4>
							<div className="flex space-x-4">
								<Link
									href={
										getSocialLink("facebook") ||
										process.env.NEXT_PUBLIC_FACEBOOK_URL ||
										"#"
									}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Facebook"
									className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
								>
									<span className="sr-only">Facebook</span>
									<Facebook />
								</Link>
								<Link
									href={getSocialLink("zalo") || "#"}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Zalo"
									className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
								>
									<span className="sr-only">Zalo</span>
									<Zalo />
								</Link>
								<Link
									href={getSocialLink("youtube") || "#"}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Youtube"
									className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
								>
									<span className="sr-only">Youtube</span>
									<Youtube />
								</Link>
							</div>
						</div>
					</div>

					{/* Contact Information Section */}
					<div className="md:col-span-1">
						<h3 className="text-lg font-semibold mb-4 text-white">
							{json.footer?.contact || "Contact Info"}
						</h3>
						<div className="space-y-3">
							{/* Phone */}
							{uiState.contact.phone && (
								<div className="flex items-start space-x-3">
									<Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
									<div>
										<Link
											href={`tel:${uiState.contact.phone.replace(/\s/g, "")}`}
											className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
										>
											{uiState.contact.phone}
										</Link>
									</div>
								</div>
							)}

							{/* Email */}
							{uiState.contact.email && (
								<div className="flex items-start space-x-3">
									<Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
									<div>
										<Link
											href={`mailto:${uiState.contact.email}`}
											className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
										>
											{uiState.contact.email}
										</Link>
									</div>
								</div>
							)}

							{/* Address */}
							{uiState.contact.address && (
								<div className="flex items-start space-x-3">
									<MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
									<div>
										<address className="text-gray-300 text-sm not-italic leading-relaxed">
											{uiState.contact.address}
										</address>
									</div>
								</div>
							)}

							{/* Map Link (if coordinates are available) */}
							{uiState.contact.latitude && uiState.contact.longitude && (
								<div className="mt-3">
									<Link
										href={`https://www.google.com/maps?q=${uiState.contact.latitude},${uiState.contact.longitude}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
									>
										<MapPin className="h-3 w-3 mr-1" />
										{json.footer?.viewMap || "View on Map"}
									</Link>
								</div>
							)}
						</div>
					</div>

					{/* Footer Sections */}
					{footerSections.map((section, index) => (
						<div key={index} className="md:col-span-1">
							<h3 className="text-lg font-semibold mb-4 text-white">
								{section.title}
							</h3>
							<ul className="space-y-2">
								{section.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<Link
											href={link.href}
											className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Section */}
				<div className="border-t border-gray-700 mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-gray-400 text-sm">
							© {currentYear} {json.common.appName}.{" "}
							{json.footer?.allRightsReserved || "All rights reserved."}
						</p>

						{/* Additional Links */}
						<div className="flex space-x-6 text-sm">
							<Link
								href="/privacy"
								className="text-gray-400 hover:text-white transition-colors duration-200"
							>
								{json.footer?.privacy || "Privacy Policy"}
							</Link>
							<Link
								href="/terms"
								className="text-gray-400 hover:text-white transition-colors duration-200"
							>
								{json.footer?.terms || "Terms of Service"}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
});

FooterWithContact.displayName = "FooterWithContact";

export default FooterWithContact;
