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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {
	closeEditing,
	getEditingState,
	getPreviewState,
	getSocials,
	updateSocial,
} from "@/store/slices/adminSlice";
import {updateSocialThunk} from "@/store/slices/thunk/adminThunk";
import {SocialLink} from "@/types/admin";
import {
	Facebook,
	Instagram,
	Linkedin,
	Plus,
	Trash2,
	Twitter,
	Youtube,
} from "lucide-react";
import {useEffect, useState} from "react";

const socialPlatforms = [
	{value: "facebook", label: "Facebook", icon: Facebook},
	{value: "twitter", label: "Twitter", icon: Twitter},
	{value: "instagram", label: "Instagram", icon: Instagram},
	{value: "linkedin", label: "LinkedIn", icon: Linkedin},
	{value: "youtube", label: "YouTube", icon: Youtube},
] as const;

export function SocialModal() {
	const dispatch = useAppDispatch();
	const editState = useAppSelector(getEditingState);
	const socialState = useAppSelector(getSocials);
	const [formData, setFormData] = useState(socialState);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const isPreviewMode = useAppSelector(getPreviewState);

	const isOpen = editState.isEditing && editState.editingMode === "social";

	useEffect(() => {
		setFormData(socialState);
		setErrors({});
	}, [socialState]);

	const validateUrls = () => {
		const newErrors: Record<string, string> = {};

		formData.links.forEach((link, index) => {
			if (link.url && !isValidUrl(link.url)) {
				newErrors[`url-${index}`] = "Please enter a valid URL";
			}
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const isValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const handleSave = () => {
		if (validateUrls()) {
			dispatch(updateSocial(formData));
			if (!isPreviewMode) dispatch(updateSocialThunk(formData));
			dispatch(closeEditing());
		}
	};

	const handleClose = () => {
		setFormData(socialState);
		setErrors({});
		dispatch(closeEditing());
	};

	const addLink = () => {
		const newLink: SocialLink = {
			id: Date.now().toString(),
			platform: "facebook",
			url: "",
		};
		setFormData({
			...formData,
			links: [...formData.links, newLink],
		});
	};

	const removeLink = (id: string) => {
		setFormData({
			...formData,
			links: formData.links.filter(link => link.id !== id),
		});
	};

	const updateLink = (id: string, updates: Partial<SocialLink>) => {
		setFormData({
			...formData,
			links: formData.links.map(link =>
				link.id === id ? {...link, ...updates} : link,
			),
		});
	};

	const getPlatformIcon = (platform: string) => {
		const platformData = socialPlatforms.find(p => p.value === platform);
		return platformData?.icon || Facebook;
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Social Links</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					{formData.links.map((link, index) => {
						const IconComponent = getPlatformIcon(link.platform);
						return (
							<div key={link.id} className="border rounded-lg p-4 space-y-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<IconComponent className="h-4 w-4" />
										<span className="font-medium">Social Link {index + 1}</span>
									</div>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => removeLink(link.id)}
										className="text-red-500 hover:text-red-700"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>

								<div className="space-y-2">
									<Label>Platform</Label>
									<Select
										value={link.platform}
										onValueChange={(value: any) =>
											updateLink(link.id, {platform: value})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{socialPlatforms.map(platform => {
												const Icon = platform.icon;
												return (
													<SelectItem
														key={platform.value}
														value={platform.value}
													>
														<div className="flex items-center gap-2">
															<Icon className="h-4 w-4" />
															{platform.label}
														</div>
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>URL</Label>
									<Input
										type="url"
										value={link.url}
										onChange={e => updateLink(link.id, {url: e.target.value})}
										placeholder={`https://${link.platform}.com/yourprofile`}
										className={errors[`url-${index}`] ? "border-red-500" : ""}
									/>
									{errors[`url-${index}`] && (
										<p className="text-sm text-red-500">
											{errors[`url-${index}`]}
										</p>
									)}
								</div>
							</div>
						);
					})}

					<Button
						variant="outline"
						onClick={addLink}
						className="w-full bg-transparent"
					>
						<Plus className="h-4 w-4 mr-2" />
						Add Social Link
					</Button>

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
