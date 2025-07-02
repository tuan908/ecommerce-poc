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
	getContact,
	getEditingState,
	getPreviewState,
	updateContact,
} from "@/store/slices/adminSlice";
import {updateContactThunk} from "@/store/slices/thunk/adminThunk";
import {useEffect, useState} from "react";

export function ContactModal() {
	const dispatch = useAppDispatch();
	const contactState = useAppSelector(getContact);
	const editingState = useAppSelector(getEditingState);
	const [formData, setFormData] = useState(contactState);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const isPreviewMode = useAppSelector(getPreviewState);

	const isOpen =
		editingState.isEditing && editingState.editingMode === "contact";
	const field = editingState.editingField;

	useEffect(() => {
		setFormData(contactState);
		setErrors({});
	}, [contactState]);

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (field === "phone" && formData.phone) {
			const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
			if (!phoneRegex.test(formData.phone.replace(/[\s\-$$$$]/g, ""))) {
				newErrors.phone = "Please enter a valid phone number";
			}
		}

		if (field === "email" && formData.email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formData.email)) {
				newErrors.email = "Please enter a valid email address";
			}
		}

		if (field === "coordinates") {
			if (
				formData.latitude &&
				(isNaN(Number(formData.latitude)) ||
					Math.abs(Number(formData.latitude)) > 90)
			) {
				newErrors.latitude = "Latitude must be between -90 and 90";
			}
			if (
				formData.longitude &&
				(isNaN(Number(formData.longitude)) ||
					Math.abs(Number(formData.longitude)) > 180)
			) {
				newErrors.longitude = "Longitude must be between -180 and 180";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSave = () => {
		if (validateForm()) {
			dispatch(updateContact(formData));
			if (!isPreviewMode) dispatch(updateContactThunk(formData));
			dispatch(closeEditing());
		}
	};

	const handleClose = () => {
		setFormData(contactState);
		setErrors({});
		dispatch(closeEditing());
	};

	const getTitle = () => {
		switch (field) {
			case "phone":
				return "Edit Phone Number";
			case "email":
				return "Edit Email Address";
			case "address":
				return "Edit Address";
			case "coordinates":
				return "Edit Map Coordinates";
			default:
				return "Edit Contact Info";
		}
	};

	const renderField = () => {
		switch (field) {
			case "phone":
				return (
					<div className="space-y-2">
						<Label htmlFor="phone">Phone Number</Label>
						<Input
							id="phone"
							type="tel"
							value={formData.phone}
							onChange={e => setFormData({...formData, phone: e.target.value})}
							placeholder="+1 (555) 123-4567"
							className={errors.phone ? "border-red-500" : ""}
						/>
						{errors.phone && (
							<p className="text-sm text-red-500">{errors.phone}</p>
						)}
					</div>
				);
			case "email":
				return (
					<div className="space-y-2">
						<Label htmlFor="email">Email Address</Label>
						<Input
							id="email"
							type="email"
							value={formData.email}
							onChange={e => setFormData({...formData, email: e.target.value})}
							placeholder="contact@example.com"
							className={errors.email ? "border-red-500" : ""}
						/>
						{errors.email && (
							<p className="text-sm text-red-500">{errors.email}</p>
						)}
					</div>
				);
			case "address":
				return (
					<div className="space-y-2">
						<Label htmlFor="address">Address</Label>
						<Input
							id="address"
							type="text"
							value={formData.address}
							onChange={e =>
								setFormData({...formData, address: e.target.value})
							}
							placeholder="123 Main St, City, State 12345"
						/>
					</div>
				);
			case "coordinates":
				return (
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="latitude">Latitude</Label>
							<Input
								id="latitude"
								type="number"
								step="any"
								value={formData.latitude}
								onChange={e =>
									setFormData({...formData, latitude: e.target.value})
								}
								placeholder="40.7128"
								className={errors.latitude ? "border-red-500" : ""}
							/>
							{errors.latitude && (
								<p className="text-sm text-red-500">{errors.latitude}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="longitude">Longitude</Label>
							<Input
								id="longitude"
								type="number"
								step="any"
								value={formData.longitude}
								onChange={e =>
									setFormData({...formData, longitude: e.target.value})
								}
								placeholder="-74.0060"
								className={errors.longitude ? "border-red-500" : ""}
							/>
							{errors.longitude && (
								<p className="text-sm text-red-500">{errors.longitude}</p>
							)}
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
