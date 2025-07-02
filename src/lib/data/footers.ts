import json from "@/i18n/locales/vi.json";
import {FooterSection} from "@/types";

export const footerSections: FooterSection[] = [
	{
		title: "Quick Links",
		links: [
			{href: "/about", label: json.navigation.about},
			{href: "/faq", label: json.navigation.faq},
			{href: "/privacy-policy", label: json.navigation.privacyPolicy},
			{href: "/terms-of-service", label: json.navigation.termsOfService},
		],
	},
	{
		title: "Products",
		links: [
			{href: "#", label: "Headsets"},
			{href: "#", label: "Keyboards"},
			{href: "#", label: "Mice"},
			{href: "#", label: "Accessories"},
		],
	},
	{
		title: json.navigation.support,
		links: [
			{href: "/contact", label: json.navigation.contact},
			{href: "/shipping-info", label: json.navigation.shippingInfo},
			{href: "/return-policy", label: json.navigation.returnPolicy},
			{href: "/warranty", label: json.navigation.warranty},
		],
	},
];
