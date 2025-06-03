"use client";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {Filter, X} from "lucide-react";
import {useState} from "react";
import type {FilterState} from "../types";

interface FilterSidebarProps {
	filters: FilterState;
	onFiltersChange: (filters: FilterState) => void;
	categories: string[];
	priceRange: [number, number];
	isOpen: boolean;
	onToggle: () => void;
}

export function FilterSidebar({
	filters,
	onFiltersChange,
	categories,
	priceRange,
	isOpen,
	onToggle,
}: FilterSidebarProps) {
	const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

	const handleCategoryChange = (category: string, checked: boolean) => {
		const newCategories = checked
			? [...filters.category, category]
			: filters.category.filter(c => c !== category);

		onFiltersChange({...filters, category: newCategories});
	};

	const handleAvailabilityChange = (availability: string, checked: boolean) => {
		const newAvailability = checked
			? [...filters.availability, availability]
			: filters.availability.filter(a => a !== availability);

		onFiltersChange({...filters, availability: newAvailability});
	};

	const handlePriceRangeChange = (value: number[]) => {
		setLocalPriceRange([value[0], value[1]]);
	};

	const handlePriceRangeCommit = () => {
		onFiltersChange({...filters, priceRange: localPriceRange});
	};

	const handleRatingChange = (rating: number) => {
		onFiltersChange({...filters, rating});
	};

	const clearAllFilters = () => {
		onFiltersChange({
			category: [],
			priceRange: priceRange,
			rating: 0,
			availability: [],
			search: "",
			sortBy: "relevance",
		});
		setLocalPriceRange(priceRange);
	};

	const activeFiltersCount =
		filters.category.length +
		filters.availability.length +
		(filters.rating > 0 ? 1 : 0) +
		(filters.priceRange[0] !== priceRange[0] ||
		filters.priceRange[1] !== priceRange[1]
			? 1
			: 0);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	return (
		<>
			{/* Mobile Filter Toggle */}
			<div className="lg:hidden mb-4">
				<Button
					onClick={onToggle}
					variant="outline"
					className="w-full justify-between"
				>
					<div className="flex items-center gap-2">
						<Filter className="w-4 h-4" />
						Filters
						{activeFiltersCount > 0 && (
							<Badge variant="secondary" className="ml-2">
								{activeFiltersCount}
							</Badge>
						)}
					</div>
				</Button>
			</div>

			{/* Filter Sidebar */}
			<div
				className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 lg:relative lg:transform-none lg:shadow-none lg:w-full
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
			>
				<div className="h-full overflow-y-auto p-4 lg:p-0">
					{/* Mobile Header */}
					<div className="flex items-center justify-between mb-6 lg:hidden">
						<h2 className="text-lg font-semibold">Filters</h2>
						<Button variant="ghost" size="sm" onClick={onToggle}>
							<X className="w-4 h-4" />
						</Button>
					</div>

					{/* Clear All Filters */}
					{activeFiltersCount > 0 && (
						<div className="mb-6">
							<Button
								variant="outline"
								size="sm"
								onClick={clearAllFilters}
								className="w-full"
							>
								Clear All Filters ({activeFiltersCount})
							</Button>
						</div>
					)}

					<div className="space-y-6">
						{/* Categories */}
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="text-sm font-medium">
									Categories
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{categories.map(category => (
									<div key={category} className="flex items-center space-x-2">
										<Checkbox
											id={`category-${category}`}
											checked={filters.category.includes(category)}
											onCheckedChange={checked =>
												handleCategoryChange(category, checked as boolean)
											}
										/>
										<Label
											htmlFor={`category-${category}`}
											className="text-sm font-normal cursor-pointer"
										>
											{category}
										</Label>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Price Range */}
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="text-sm font-medium">
									Price Range
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<Slider
									value={localPriceRange}
									onValueChange={handlePriceRangeChange}
									onValueCommit={handlePriceRangeCommit}
									max={priceRange[1]}
									min={priceRange[0]}
									step={5000}
									className="w-full"
								/>
								<div className="flex items-center justify-between text-sm text-gray-600">
									<span>{formatCurrency(localPriceRange[0])}</span>
									<span>{formatCurrency(localPriceRange[1])}</span>
								</div>
								<div className="flex gap-2">
									<Input
										type="number"
										placeholder="Min"
										value={localPriceRange[0]}
										onChange={e => {
											const value = Number(e.target.value);
											setLocalPriceRange([value, localPriceRange[1]]);
										}}
										onBlur={handlePriceRangeCommit}
										className="text-xs"
									/>
									<Input
										type="number"
										placeholder="Max"
										value={localPriceRange[1]}
										onChange={e => {
											const value = Number(e.target.value);
											setLocalPriceRange([localPriceRange[0], value]);
										}}
										onBlur={handlePriceRangeCommit}
										className="text-xs"
									/>
								</div>
							</CardContent>
						</Card>

						{/* Rating */}
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="text-sm font-medium">Rating</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{[4, 3, 2, 1].map(rating => (
									<div key={rating} className="flex items-center space-x-2">
										<Checkbox
											id={`rating-${rating}`}
											checked={filters.rating === rating}
											onCheckedChange={checked =>
												handleRatingChange(checked ? rating : 0)
											}
										/>
										<Label
											htmlFor={`rating-${rating}`}
											className="text-sm font-normal cursor-pointer flex items-center gap-1"
										>
											{rating}+ Stars
										</Label>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Availability */}
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="text-sm font-medium">
									Availability
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{[
									{value: "in-stock", label: "In Stock"},
									{value: "pre-order", label: "Pre-order"},
									{value: "out-of-stock", label: "Out of Stock"},
								].map(availability => (
									<div
										key={availability.value}
										className="flex items-center space-x-2"
									>
										<Checkbox
											id={`availability-${availability.value}`}
											checked={filters.availability.includes(
												availability.value,
											)}
											onCheckedChange={checked =>
												handleAvailabilityChange(
													availability.value,
													checked as boolean,
												)
											}
										/>
										<Label
											htmlFor={`availability-${availability.value}`}
											className="text-sm font-normal cursor-pointer"
										>
											{availability.label}
										</Label>
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={onToggle}
				/>
			)}
		</>
	);
}
