import {zValidator} from "@hono/zod-validator";
import {eq} from "drizzle-orm";
import {Hono} from "hono";
import {z} from "zod";
import {
	PageSetting,
	PageSettingInsert,
} from "../config/database/schema/page-settings";
import {createSuccessResponse} from "../utils/response";

const PageSettingSchema = z.custom<PageSettingInsert>();

const pageSettingController = new Hono()
	.get("/", async c => {
		const db = c.get("db");

		const [pageSetting] = await db
			.select({id: PageSetting.pageSettingId, data: PageSetting.data})
			.from(PageSetting)
			.limit(1);

		return c.json(pageSetting);
	})
	.post("/", zValidator("json", PageSettingSchema), async c => {
		const db = c.get("dbConnectionManager");
		const body = c.req.valid("json");
		const txResult = await db.withTransaction(async tx => {
			const [result] = await tx
				.insert(PageSetting)
				.values({data: body.data})
				.returning({id: PageSetting.pageSettingId, data: PageSetting.data});
			return result;
		});
		return c.json(createSuccessResponse(txResult.data));
	})
	.put("/:id", zValidator("json", PageSettingSchema), async c => {
		const db = c.get("dbConnectionManager");
		const body = c.req.valid("json");
		const txResult = await db.withTransaction(async tx => {
			const [result] = await tx
				.update(PageSetting)
				.set({data: body.data})
				.where(eq(PageSetting.pageSettingId, body.pageSettingId!))
				.returning({id: PageSetting.pageSettingId, data: PageSetting.data});
			return result;
		});
		return c.json(createSuccessResponse(txResult.data));
	});

export default pageSettingController;
