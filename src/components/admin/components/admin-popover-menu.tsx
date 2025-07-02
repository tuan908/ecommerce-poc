"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useGetPageSettings } from "@/lib/hooks/useGetPageSettings";
import { cn } from "@/lib/utils/styles";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setEditing, syncFromDb, togglePreview } from "@/store/slices/adminSlice";
import { EditingMode } from "@/types/admin";
import {
	ChevronRight,
	Eye,
	EyeOff,
	ImageIcon,
	Palette,
	Phone,
	Settings,
	Share2,
	Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const menuSections = [
	{
		id: "theme",
		title: "Theme Settings",
		description: "Colors & backgrounds",
		icon: Palette,
		color: "purple",
		items: [
			{key: "primaryColor", label: "Primary Color", icon: "🎨"},
			{key: "headerBackground", label: "Header Background", icon: "🏠"},
			{key: "footerBackground", label: "Footer Background", icon: "📄"},
		],
	},
	{
		id: "branding",
		title: "Branding",
		description: "Logo & images",
		icon: ImageIcon,
		color: "blue",
		items: [
			{key: "logoUrl", label: "Logo URL", icon: "🖼️"},
			{key: "thumbnailUrl", label: "Thumbnail Image", icon: "🖼️"},
		],
	},
	{
		id: "contact",
		title: "Contact Info",
		description: "Phone, email & address",
		icon: Phone,
		color: "green",
		items: [
			{key: "phone", label: "Phone Number", icon: "📞"},
			{key: "email", label: "Email Address", icon: "📧"},
			{key: "address", label: "Address", icon: "📍"},
			{key: "coordinates", label: "Map Coordinates", icon: "🗺️"},
		],
	},
	{
		id: "social",
		title: "Social Links",
		description: "Manage social media",
		icon: Share2,
		color: "orange",
		items: [{key: "links", label: "Manage Social Links", icon: "🔗"}],
	},
];

const getColorClasses = (color: string) => {
	const colors = {
		purple: "bg-purple-100 text-purple-600",
		blue: "bg-blue-100 text-blue-600",
		green: "bg-green-100 text-green-600",
		orange: "bg-orange-100 text-orange-600",
	};
	return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-600";
};

export function AdminPopoverMenu() {
	const {data, isLoadingPageSettings} = useGetPageSettings();
	const dispatch = useAppDispatch();
	const {isEditing, isPreviewMode} = useAppSelector(state => state.admin);
	const [activeSection, setActiveSection] = useState<string | null>(null);

	const handleEditClick = (mode: EditingMode, field: string) => {
		dispatch(setEditing({mode, field}));
		setActiveSection(null); // Close popover after selection
	};

	const togglePreviewState = () => {
		dispatch(togglePreview());
	};

	useEffect(() => {
		if (!isLoadingPageSettings) dispatch(syncFromDb(data!));
	}, [isLoadingPageSettings]);

	const isActive = isEditing || isPreviewMode;

	return (
		<div className="relative">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={isActive ? "default" : "ghost"}
						size="sm"
						className={cn(
							"h-9 px-3 transition-all duration-200",
							isActive
								? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
								: "hover:bg-gray-100 text-gray-600",
						)}
						aria-label="Admin editing options"
					>
						<Settings className="h-4 w-4 mr-2" />
						<span className="hidden sm:inline">Admin</span>
						{isActive && <Sparkles className="h-3 w-3 ml-1" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent align="end" className="w-80 p-0">
					<div className="p-4">
						{/* Header */}
						<div className="flex items-center justify-between mb-4">
							<div>
								<h3 className="font-semibold text-gray-900">Site Editor</h3>
								<p className="text-xs text-gray-500">Customize your website</p>
							</div>
							{isActive && (
								<Badge variant="secondary" className="text-xs">
									Active
								</Badge>
							)}
						</div>

						{/* Preview Toggle */}
						<Button
							variant="outline"
							onClick={togglePreviewState}
							className="w-full justify-start mb-4 h-auto p-3 bg-transparent"
						>
							<div
								className={`
                p-1.5 rounded-md mr-3
                ${
									isPreviewMode
										? "bg-green-100 text-green-600"
										: "bg-gray-100 text-gray-600"
								}
              `}
							>
								{isPreviewMode ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</div>
							<div className="text-left">
								<div className="font-medium text-sm">
									{isPreviewMode ? "Exit Preview" : "Preview Mode"}
								</div>
								<div className="text-xs text-gray-500">
									{isPreviewMode ? "Return to normal view" : "See changes live"}
								</div>
							</div>
						</Button>

						<Separator className="mb-4" />

						{/* Menu Sections */}
						<div className="space-y-2">
							{menuSections.map(section => {
								const IconComponent = section.icon;
								const isExpanded = activeSection === section.id;

								return (
									<div
										key={section.id}
										className="border rounded-lg overflow-hidden"
									>
										<Button
											variant="ghost"
											onClick={() =>
												setActiveSection(isExpanded ? null : section.id)
											}
											className="w-full justify-between p-3 h-auto hover:bg-gray-50"
										>
											<div className="flex items-center gap-3">
												<div
													className={`p-1.5 rounded-md ${getColorClasses(
														section.color,
													)}`}
												>
													<IconComponent className="h-4 w-4" />
												</div>
												<div className="text-left">
													<div className="font-medium text-sm">
														{section.title}
													</div>
													<div className="text-xs text-gray-500">
														{section.description}
													</div>
												</div>
											</div>
											<ChevronRight
												className={`h-4 w-4 transition-transform ${
													isExpanded ? "rotate-90" : ""
												}`}
											/>
										</Button>

										{isExpanded && (
											<div className="border-t bg-gray-50 p-2">
												{section.items.map(item => (
													<Button
														key={item.key}
														variant="ghost"
														onClick={() =>
															handleEditClick(
																section.id as EditingMode,
																item.key,
															)
														}
														className="w-full justify-start p-2 h-auto text-sm hover:bg-white"
													>
														<span className="mr-2">{item.icon}</span>
														{item.label}
													</Button>
												))}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
