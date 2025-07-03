import type {AdminSettings, EditingField, EditingMode} from "@/types/admin";
import {
	createSelector,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import {
	updateBrandingThunk,
	updateContactThunk,
	updateSocialThunk,
	updateThemeThunk,
} from "./thunk/adminThunk";

export interface AdminState {
	settingId: string;
	settings: AdminSettings;
	isEditing: boolean;
	editingMode: EditingMode;
	editingField: EditingField;
	isPreviewMode: boolean;
}

const initialState: AdminState = {
	settingId: "",
	settings: {
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
				{id: "1", platform: "facebook", url: "https://facebook.com/example"},
				{id: "2", platform: "twitter", url: "https://twitter.com/example"},
			],
		},
	},
	isEditing: false,
	editingMode: null,
	editingField: null,
	isPreviewMode: false,
};

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		syncFromDb(
			state,
			action: PayloadAction<{id: string; data: AdminSettings}>,
		) {
			state.settings = action.payload.data;
			state.settingId = action.payload.id;
		},
		setEditing(
			state,
			action: PayloadAction<{mode: EditingMode; field: EditingField}>,
		) {
			state.isEditing = true;
			state.editingMode = action.payload.mode;
			state.editingField = action.payload.field;
		},
		updateTheme(state, action: PayloadAction<AdminSettings["theme"]>) {
			state.settings.theme = {...state.settings.theme, ...action.payload};
		},
		updateBranding(state, action: PayloadAction<AdminSettings["branding"]>) {
			state.settings.branding = {
				...state.settings.branding,
				...action.payload,
			};
		},
		updateContact(state, action: PayloadAction<AdminSettings["contact"]>) {
			state.settings.contact = {...state.settings.contact, ...action.payload};
		},
		updateSocial(state, action: PayloadAction<AdminSettings["social"]>) {
			state.settings.social = {...state.settings.social, ...action.payload};
		},
		togglePreview(state) {
			state.isPreviewMode = !state.isPreviewMode;
		},
		closeEditing(state) {
			state.isEditing = false;
			state.editingMode = null;
			state.editingField = null;
		},
	},
	selectors: {
		// Các selector đơn giản (trả về primitive values) giữ nguyên
		getTheme: state => state.settings.theme,
		getBranding: state => state.settings.branding,
		getContact: state => state.settings.contact,
		getSocials: state => state.settings.social,
		getPreviewState: state => state.isPreviewMode,

		// Các selector cơ bản để tạo memoized selector
		getIsEditing: state => state.isEditing,
		getEditingMode: state => state.editingMode,
		getEditingField: state => state.editingField,
	},
	extraReducers(builder) {
		builder
			.addCase(updateThemeThunk.fulfilled, (state, action) => {
				state.settings.theme = action.payload.theme;
			})
			.addCase(updateBrandingThunk.fulfilled, (state, action) => {
				state.settings.branding = action.payload.branding;
			})
			.addCase(updateContactThunk.fulfilled, (state, action) => {
				state.settings.contact = action.payload.contact;
			})
			.addCase(updateSocialThunk.fulfilled, (state, action) => {
				state.settings.social = action.payload.social;
			});
	},
});

export const {
	closeEditing,
	setEditing,
	togglePreview,
	updateBranding,
	updateContact,
	updateSocial,
	updateTheme,
	syncFromDb,
} = adminSlice.actions;

// Tạo memoized selector bên ngoài slice
export const getEditingState = createSelector(
	[
		adminSlice.selectors.getIsEditing,
		adminSlice.selectors.getEditingMode,
		adminSlice.selectors.getEditingField,
	],
	(isEditing, editingMode, editingField) => ({
		isEditing,
		editingMode,
		editingField,
	}),
);

export const {getBranding, getContact, getPreviewState, getSocials, getTheme} =
	adminSlice.selectors;
export default adminSlice;
