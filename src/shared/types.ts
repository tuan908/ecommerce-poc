export interface NavigationItem {
	href: string;
	label: string;
}

export interface Feature {
	title: string;
	description: string;
	icon: React.ReactNode;
}

export interface Testimonial {
	quote: string;
	author: string;
	role: string;
	avatar: string;
	rating: number;
}

export interface FooterSection {
	title: string;
	links: {href: string; label: string}[];
}
