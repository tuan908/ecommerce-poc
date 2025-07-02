import {AdminSettings} from "@/types/admin";
import {jsonb, uuid} from "drizzle-orm/pg-core";
import {pgTableWithAudit} from "./base/helpers";

export const PageSetting = pgTableWithAudit("t_page_setting", {
	pageSettingId: uuid("page_setting_id").primaryKey().defaultRandom(),
	data: jsonb("data")
		.$type<AdminSettings>()
		.notNull()
		.default({
			theme: {
				primaryColor: "#1f5d59",
				headerBackground: "#ffffff",
				footerBackground: "#f8f9fa",
			},
			branding: {
				logoUrl: "/placeholder.svg?height=40&width=120",
				thumbnailUrl: "/placeholder.svg?height=200&width=200",
			},
			contact: {
				phone: "+1 (555) 123-4567",
				email: "contact@example.com",
				address: "123 Main St, City, State 12345",
				latitude: "40.7128",
				longitude: "-74.0060",
			},
			social: {
				links: [
					{
						id: "1",
						platform: "facebook",
						url: "https://facebook.com/example",
					},
					{id: "2", platform: "twitter", url: "https://twitter.com/example"},
				],
			},
		}),
});

export type PageSettingInsert = typeof PageSetting.$inferInsert;
export type PageSettingSelect = typeof PageSetting.$inferSelect;
