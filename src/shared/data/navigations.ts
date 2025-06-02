import json from "@/shared/i18n/locales/vi.json";
import {NavigationItem} from "../types";

export const navigationItems: NavigationItem[] = [
	{href: "#home", label: json.navigation.home},
	{href: "#products", label: json.navigation.products},
	{href: "#testimonials", label: json.navigation.testimonials},
	{href: "#contact", label: json.navigation.contact},
];
