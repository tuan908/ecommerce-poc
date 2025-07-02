"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setEditing, togglePreview} from "@/store/slices/adminSlice";
import {EditingMode} from "@/types/admin";
import {
	Eye,
	EyeOff,
	ImageIcon,
	Palette,
	Phone,
	Settings,
	Share2,
	Sparkles,
} from "lucide-react";

export function AdminEditMenuFixed() {
	const dispatch = useAppDispatch();
	const {isEditing, isPreviewMode} = useAppSelector(state => state.admin);

	const handleEditClick = (mode: EditingMode, field: string) => {
		dispatch(setEditing({mode, field}));
	};

	const togglePreviewState = () => {
		dispatch(togglePreview());
	};

	const isActive = isEditing || isPreviewMode;

	return (
		<div className="relative">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={isActive ? "default" : "ghost"}
						size="sm"
						className={`
              h-9 px-3 transition-all duration-200
              ${isActive ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md" : "hover:bg-gray-100 text-gray-600"}
            `}
						aria-label="Admin editing options"
					>
						<Settings className="h-4 w-4 mr-2" />
						<span className="hidden sm:inline">Admin</span>
						{isActive && <Sparkles className="h-3 w-3 ml-1" />}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-72 p-2">
					{/* Header */}
					<div className="px-2 py-1.5 border-b mb-2">
						<div className="flex items-center justify-between">
							<span className="font-semibold text-sm text-gray-900">
								Site Editor
							</span>
							{isActive && (
								<Badge variant="secondary" className="text-xs">
									Active
								</Badge>
							)}
						</div>
					</div>

					{/* Preview Toggle */}
					<DropdownMenuItem
						onClick={togglePreviewState}
						className="flex items-center gap-3 p-3 rounded-md cursor-pointer"
					>
						<div
							className={`
              p-1.5 rounded-md
              ${isPreviewMode ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}
            `}
						>
							{isPreviewMode ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</div>
						<div className="flex-1">
							<div className="font-medium text-sm">
								{isPreviewMode ? "Exit Preview" : "Preview Mode"}
							</div>
							<div className="text-xs text-gray-500">
								{isPreviewMode ? "Return to normal view" : "See changes live"}
							</div>
						</div>
					</DropdownMenuItem>

					<DropdownMenuSeparator className="my-2" />

					{/* Theme Settings Section */}
					<DropdownMenuLabel className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
						<Palette className="h-3 w-3" />
						Theme Settings
					</DropdownMenuLabel>

					<DropdownMenuItem
						onClick={() => handleEditClick("theme", "primaryColor")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
						<span className="text-sm">Primary Color</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => handleEditClick("theme", "headerBackground")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<div className="w-4 h-4 rounded bg-gray-200 border"></div>
						<span className="text-sm">Header Background</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => handleEditClick("theme", "footerBackground")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<div className="w-4 h-4 rounded bg-gray-100 border"></div>
						<span className="text-sm">Footer Background</span>
					</DropdownMenuItem>

					<DropdownMenuSeparator className="my-2" />

					{/* Branding Section */}
					<DropdownMenuLabel className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
						<ImageIcon className="h-3 w-3" />
						Branding
					</DropdownMenuLabel>

					<DropdownMenuItem
						onClick={() => handleEditClick("branding", "logoUrl")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<ImageIcon className="h-4 w-4 text-gray-400" />
						<span className="text-sm">Logo URL</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => handleEditClick("branding", "thumbnailUrl")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<ImageIcon className="h-4 w-4 text-gray-400" />
						<span className="text-sm">Thumbnail Image</span>
					</DropdownMenuItem>

					<DropdownMenuSeparator className="my-2" />

					{/* Contact Info Section */}
					<DropdownMenuLabel className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
						<Phone className="h-3 w-3" />
						Contact Info
					</DropdownMenuLabel>

					<DropdownMenuItem
						onClick={() => handleEditClick("contact", "phone")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<Phone className="h-4 w-4 text-gray-400" />
						<span className="text-sm">Phone Number</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => handleEditClick("contact", "email")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<span className="text-sm ml-7">Email Address</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => handleEditClick("contact", "address")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<span className="text-sm ml-7">Address</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => handleEditClick("contact", "coordinates")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<span className="text-sm ml-7">Map Coordinates</span>
					</DropdownMenuItem>

					<DropdownMenuSeparator className="my-2" />

					{/* Social Links Section */}
					<DropdownMenuLabel className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
						<Share2 className="h-3 w-3" />
						Social Media
					</DropdownMenuLabel>

					<DropdownMenuItem
						onClick={() => handleEditClick("social", "links")}
						className="flex items-center gap-3 p-2 ml-2 rounded-md cursor-pointer"
					>
						<Share2 className="h-4 w-4 text-gray-400" />
						<span className="text-sm">Manage Social Links</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
