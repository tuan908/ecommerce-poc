import {client} from "@/backend/client";
import {RootState} from "@/store";
import type {
	BrandingSettings,
	ContactSettings,
	SocialSettings,
	ThemeSettings,
} from "@/types/admin";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const updateThemeThunk = createAsyncThunk(
	"admin/updateThemeSettings",
	async (theme: ThemeSettings, {getState}) => {
		const currentState = getState() as RootState;
		const response = await client["page-settings"][":id"].$put({
			json: {
				pageSettingId: currentState.admin.settingId,
				data: {...currentState.admin.settings, theme: {...theme}},
			},
			param: {id: currentState.admin.settingId},
		});

		const responseJson = await response.json();
		return responseJson.data?.data!;
	},
);

export const updateBrandingThunk = createAsyncThunk(
	"admin/updateBrandingSettings",
	async (branding: BrandingSettings, {getState}) => {
		const currentState = getState() as RootState;
		const response = await client["page-settings"][":id"].$put({
			json: {
				pageSettingId: currentState.admin.settingId,
				data: {...currentState.admin.settings, branding: {...branding}},
			},
			param: {id: currentState.admin.settingId},
		});

		const responseJson = await response.json();
		return responseJson.data?.data!;
	},
);

export const updateContactThunk = createAsyncThunk(
	"admin/updateContactSettings",
	async (contact: ContactSettings, {getState}) => {
		const currentState = getState() as RootState;
		const response = await client["page-settings"][":id"].$put({
			json: {
				pageSettingId: currentState.admin.settingId,
				data: {...currentState.admin.settings, contact: {...contact}},
			},
			param: {id: currentState.admin.settingId},
		});

		const responseJson = await response.json();
		return responseJson.data?.data!;
	},
);

export const updateSocialThunk = createAsyncThunk(
	"admin/updateSocialSettings",
	async (social: SocialSettings, {getState}) => {
		const currentState = getState() as RootState;
		const response = await client["page-settings"][":id"].$put({
			json: {
				pageSettingId: currentState.admin.settingId,
				data: {...currentState.admin.settings, social: {...social}},
			},
			param: {id: currentState.admin.settingId},
		});

		const responseJson = await response.json();
		return responseJson.data?.data!;
	},
);
