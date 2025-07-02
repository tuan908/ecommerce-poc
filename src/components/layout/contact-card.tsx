"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useAppSelector} from "@/store/hooks";
import {Clock, Mail, MapPin, Phone} from "lucide-react";
import Link from "next/link";
import {memo} from "react";

interface ContactCardProps {
	title?: string;
	showMap?: boolean;
	className?: string;
	variant?: "default" | "compact" | "inline";
}

const ContactCard = memo(
	({
		title = "Contact Information",
		showMap = true,
		className = "",
		variant = "default",
	}: ContactCardProps) => {
		const contact = useAppSelector(state => state.admin.settings.contact);

		if (variant === "inline") {
			return (
				<div className={`space-y-3 ${className}`}>
					{contact.phone && (
						<div className="flex items-center space-x-3">
							<Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
							<Link
								href={`tel:${contact.phone.replace(/\s/g, "")}`}
								className="text-gray-700 hover:text-blue-600 transition-colors"
							>
								{contact.phone}
							</Link>
						</div>
					)}

					{contact.email && (
						<div className="flex items-center space-x-3">
							<Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
							<Link
								href={`mailto:${contact.email}`}
								className="text-gray-700 hover:text-blue-600 transition-colors"
							>
								{contact.email}
							</Link>
						</div>
					)}

					{contact.address && (
						<div className="flex items-start space-x-3">
							<MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
							<address className="text-gray-700 not-italic">
								{contact.address}
							</address>
						</div>
					)}
				</div>
			);
		}

		if (variant === "compact") {
			return (
				<div className={`bg-gray-50 rounded-lg p-4 space-y-3 ${className}`}>
					<h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
					<div className="space-y-2 text-sm">
						{contact.phone && (
							<div className="flex items-center space-x-2">
								<Phone className="h-3 w-3 text-gray-400" />
								<Link
									href={`tel:${contact.phone.replace(/\s/g, "")}`}
									className="text-gray-600 hover:text-blue-600"
								>
									{contact.phone}
								</Link>
							</div>
						)}
						{contact.email && (
							<div className="flex items-center space-x-2">
								<Mail className="h-3 w-3 text-gray-400" />
								<Link
									href={`mailto:${contact.email}`}
									className="text-gray-600 hover:text-blue-600"
								>
									{contact.email}
								</Link>
							</div>
						)}
					</div>
				</div>
			);
		}

		return (
			<Card className={className}>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Phone className="h-5 w-5 text-blue-600" />
						<span>{title}</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Phone */}
					{contact.phone && (
						<div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
							<div className="p-2 bg-blue-100 rounded-full">
								<Phone className="h-4 w-4 text-blue-600" />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-900">Phone</p>
								<Link
									href={`tel:${contact.phone.replace(/\s/g, "")}`}
									className="text-blue-600 hover:text-blue-700 transition-colors"
								>
									{contact.phone}
								</Link>
							</div>
						</div>
					)}

					{/* Email */}
					{contact.email && (
						<div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
							<div className="p-2 bg-green-100 rounded-full">
								<Mail className="h-4 w-4 text-green-600" />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-900">Email</p>
								<Link
									href={`mailto:${contact.email}`}
									className="text-green-600 hover:text-green-700 transition-colors"
								>
									{contact.email}
								</Link>
							</div>
						</div>
					)}

					{/* Address */}
					{contact.address && (
						<div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
							<div className="p-2 bg-orange-100 rounded-full">
								<MapPin className="h-4 w-4 text-orange-600" />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-900">Address</p>
								<address className="text-gray-600 not-italic text-sm">
									{contact.address}
								</address>
							</div>
						</div>
					)}

					{/* Business Hours (you can add this to admin settings later) */}
					<div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
						<div className="p-2 bg-purple-100 rounded-full">
							<Clock className="h-4 w-4 text-purple-600" />
						</div>
						<div>
							<p className="text-sm font-medium text-gray-900">
								Business Hours
							</p>
							<p className="text-gray-600 text-sm">
								Mon - Fri: 9:00 AM - 6:00 PM
							</p>
							<p className="text-gray-600 text-sm">Sat: 9:00 AM - 2:00 PM</p>
						</div>
					</div>

					{/* Map Link */}
					{showMap && contact.latitude && contact.longitude && (
						<Link
							href={`https://www.google.com/maps?q=${contact.latitude},${contact.longitude}`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							<MapPin className="h-4 w-4 mr-2" />
							View on Google Maps
						</Link>
					)}
				</CardContent>
			</Card>
		);
	},
);

ContactCard.displayName = "ContactCard";

export default ContactCard;
