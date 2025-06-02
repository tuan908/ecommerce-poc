import json from "@/shared/i18n/locales/vi.json";
import {FooterSection} from "../types";

export const footerSections: FooterSection[] = [
	{
		title: "Quick Links",
		links: [
			{href: "#", label: json.navigation.about},
			{href: "#", label: json.navigation.faq},
			{href: "#", label: json.navigation.privacyPolicy},
			{href: "#", label: json.navigation.termsOfService},
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
			{href: "#", label: json.navigation.contact},
			{href: "#", label: json.navigation.shippingInfo},
			{href: "#", label: json.navigation.returnPolicy},
			{href: "#", label: json.navigation.warranty},
		],
	},
];
