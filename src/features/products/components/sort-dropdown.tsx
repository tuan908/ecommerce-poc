"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
	value: string;
	onChange: (value: string) => void;
}

const sortOptions = [
	{value: "relevance", label: "Relevance"},
	{value: "price-low-high", label: "Price: Low to High"},
	{value: "price-high-low", label: "Price: High to Low"},
	{value: "name-asc", label: "Name: A to Z"},
	{value: "name-desc", label: "Name: Z to A"},
	{value: "rating", label: "Highest Rated"},
	{value: "newest", label: "Newest First"},
	{value: "best-selling", label: "Best Selling"},
];

export function SortDropdown({value, onChange}: SortDropdownProps) {
	return (
		<div className="flex items-center gap-2">
			<span className="text-sm font-medium text-gray-700 whitespace-nowrap">
				Sort by:
			</span>
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="w-48">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{sortOptions.map(option => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
