export interface ThemeSettings {
	primaryColor: string;
	headerBackground: string;
	footerBackground: string;
}

export interface BrandingSettings {
	logoUrl: string;
	thumbnailUrl: string;
}

export interface ContactSettings {
	phone: string;
	email: string;
	address: string;
	latitude: string;
	longitude: string;
}

export interface SocialLink {
	id: string;
	platform:
		| "facebook"
		| "twitter"
		| "instagram"
		| "linkedin"
		| "youtube"
		| "zalo"
		| "tiktok";
	url: string;
}

export interface SocialSettings {
	links: SocialLink[];
}

export interface AdminSettings {
	theme: ThemeSettings;
	branding: BrandingSettings;
	contact: ContactSettings;
	social: SocialSettings;
}

export type EditingMode = "theme" | "branding" | "contact" | "social" | null;
export type EditingField = string | null;
