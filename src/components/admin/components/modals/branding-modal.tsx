"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	closeEditing,
	getBranding,
	getEditingState,
	getPreviewState,
	updateBranding,
} from "@/store/slices/adminSlice";
import { updateBrandingThunk } from "@/store/slices/thunk/adminThunk";
import Image from "next/image";

export function BrandingModal() {
	const dispatch = useAppDispatch();
	const brandingState = useAppSelector(getBranding);
	const editState = useAppSelector(getEditingState);
	const [formData, setFormData] = useState(brandingState);
	const isPreviewMode = useAppSelector(getPreviewState);

	const isOpen = editState.isEditing && editState.editingMode === "branding";
	const field = editState.editingField;

	useEffect(() => {
		setFormData(brandingState);
	}, [brandingState]);

	const handleSave = () => {
		dispatch(updateBranding(formData));
		if (!isPreviewMode) dispatch(updateBrandingThunk(formData));
		dispatch(closeEditing());
	};

	const handleClose = () => {
		setFormData(brandingState);
		dispatch(closeEditing());
	};

	const getTitle = () => {
		switch (field) {
			case "logoUrl":
				return "Edit Logo";
			case "thumbnailUrl":
				return "Edit Thumbnail Image";
			default:
				return "Edit Branding";
		}
	};

	const renderField = () => {
		switch (field) {
			case "logoUrl":
				return (
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="logoUrl">Logo URL</Label>
							<Input
								id="logoUrl"
								type="url"
								value={formData.logoUrl}
								onChange={e =>
									setFormData({...formData, logoUrl: e.target.value})
								}
								placeholder="https://example.com/logo.png"
							/>
						</div>
						{formData.logoUrl && (
							<div className="space-y-2">
								<Label>Preview</Label>
								<div className="border rounded p-4 bg-gray-50">
									<Image
										src={formData.logoUrl || "/placeholder.svg"}
										alt="Logo preview"
										width={120}
										height={40}
										className="max-h-10 w-auto"
									/>
								</div>
							</div>
						)}
					</div>
				);
			case "thumbnailUrl":
				return (
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="thumbnailUrl">Thumbnail Image URL</Label>
							<Input
								id="thumbnailUrl"
								type="url"
								value={formData.thumbnailUrl}
								onChange={e =>
									setFormData({...formData, thumbnailUrl: e.target.value})
								}
								placeholder="https://example.com/thumbnail.jpg"
							/>
						</div>
						{formData.thumbnailUrl && (
							<div className="space-y-2">
								<Label>Preview</Label>
								<div className="border rounded p-4 bg-gray-50">
									<Image
										src={formData.thumbnailUrl || "/placeholder.svg"}
										alt="Thumbnail preview"
										width={200}
										height={200}
										className="max-w-32 max-h-32 object-cover rounded"
									/>
								</div>
							</div>
						)}
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
