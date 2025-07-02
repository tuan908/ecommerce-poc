"use client";

import {Badge} from "@/components/ui/badge";
import {useAppSelector} from "@/store/hooks";
import {memo} from "react";

const AdminIndicator = memo(() => {
	const {isEditing, isPreviewMode, editingMode} = useAppSelector(
		state => state.admin,
	);

	if (!isPreviewMode && !isEditing) {
		return null;
	}

	return (
		<div className="fixed top-20 right-4 z-50 space-y-2">
			{isPreviewMode && (
				<Badge
					variant="secondary"
					className="bg-blue-100 text-blue-800 border-blue-200"
				>
					Preview Mode
				</Badge>
			)}
			{isEditing && (
				<Badge
					variant="secondary"
					className="bg-orange-100 text-orange-800 border-orange-200"
				>
					Editing: {editingMode}
				</Badge>
			)}
		</div>
	);
});

AdminIndicator.displayName = "AdminIndicator";

export default AdminIndicator;
