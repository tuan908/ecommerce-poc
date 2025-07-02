"use client";

import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {
	closeEditing,
	getEditingState,
	getPreviewState,
	getTheme,
	updateTheme,
} from "@/store/slices/adminSlice";
import {updateThemeThunk} from "@/store/slices/thunk/adminThunk";
import {useEffect, useState} from "react";

export function ThemeModal() {
	const dispatch = useAppDispatch();
	const themeState = useAppSelector(getTheme);
	const editState = useAppSelector(getEditingState);
	const [formData, setFormData] = useState(themeState);
	const isPreviewMode = useAppSelector(getPreviewState);

	const isOpen = editState.isEditing && editState.editingMode === "theme";
	const field = editState.editingField;

	useEffect(() => {
		setFormData(themeState);
	}, [themeState]);

	const handleSave = () => {
		dispatch(updateTheme(formData));
		if (!isPreviewMode) dispatch(updateThemeThunk(formData));
		dispatch(closeEditing());
	};

	const handleClose = () => {
		setFormData(themeState); // Reset form
		dispatch(closeEditing());
	};

	const getTitle = () => {
		switch (field) {
			case "primaryColor":
				return "Edit Primary Color";
			case "headerBackground":
				return "Edit Header Background";
			case "footerBackground":
				return "Edit Footer Background";
			default:
				return "Edit Theme";
		}
	};

	const renderField = () => {
		switch (field) {
			case "primaryColor":
				return (
					<div className="space-y-2">
						<Label htmlFor="primaryColor">Primary Color</Label>
						<div className="flex gap-2">
							<Input
								id="primaryColor"
								type="color"
								value={formData.primaryColor}
								onChange={e =>
									setFormData({...formData, primaryColor: e.target.value})
								}
								className="w-16 h-10 p-1 border rounded"
							/>
							<Input
								type="text"
								value={formData.primaryColor}
								onChange={e =>
									setFormData({...formData, primaryColor: e.target.value})
								}
								placeholder="#1f5d59"
								className="flex-1"
							/>
						</div>
					</div>
				);
			case "headerBackground":
				return (
					<div className="space-y-2">
						<Label htmlFor="headerBackground">Header Background</Label>
						<div className="flex gap-2">
							<Input
								id="headerBackground"
								type="color"
								value={formData.headerBackground}
								onChange={e =>
									setFormData({...formData, headerBackground: e.target.value})
								}
								className="w-16 h-10 p-1 border rounded"
							/>
							<Input
								type="text"
								value={formData.headerBackground}
								onChange={e =>
									setFormData({...formData, headerBackground: e.target.value})
								}
								placeholder="#ffffff or image URL"
								className="flex-1"
							/>
						</div>
					</div>
				);
			case "footerBackground":
				return (
					<div className="space-y-2">
						<Label htmlFor="footerBackground">Footer Background</Label>
						<div className="flex gap-2">
							<Input
								id="footerBackground"
								type="color"
								value={formData.footerBackground}
								onChange={e =>
									setFormData({...formData, footerBackground: e.target.value})
								}
								className="w-16 h-10 p-1 border rounded"
							/>
							<Input
								type="text"
								value={formData.footerBackground}
								onChange={e =>
									setFormData({...formData, footerBackground: e.target.value})
								}
								placeholder="#f8f9fa or image URL"
								className="flex-1"
							/>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{getTitle()}</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{renderField()}

					<div className="flex justify-end gap-2 pt-4">
						<Button variant="outline" onClick={handleClose}>
							Cancel
						</Button>
						<Button onClick={handleSave}>Save Changes</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
