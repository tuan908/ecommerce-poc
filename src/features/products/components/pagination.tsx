"use client";

import {Button} from "@/shared/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import {ChevronLeft, ChevronRight, MoreHorizontal} from "lucide-react";
import type {PaginationState} from "../types";

interface PaginationProps {
	pagination: PaginationState;
	onPageChange: (page: number) => void;
	onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function Pagination({
	pagination,
	onPageChange,
	onItemsPerPageChange,
}: PaginationProps) {
	const {currentPage, itemsPerPage, totalItems} = pagination;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "...", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(
					1,
					"...",
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				);
			} else {
				pages.push(
					1,
					"...",
					currentPage - 1,
					currentPage,
					currentPage + 1,
					"...",
					totalPages,
				);
			}
		}

		return pages;
	};

	if (totalPages <= 1) return null;

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
			{/* Results Info */}
			<div className="text-sm text-gray-600">
				Showing {startItem}–{endItem} of {totalItems} products
			</div>

			{/* Pagination Controls */}
			<div className="flex items-center gap-2">
				{/* Previous Button */}
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="flex items-center gap-1"
				>
					<ChevronLeft className="w-4 h-4" />
					Previous
				</Button>

				{/* Page Numbers */}
				<div className="flex items-center gap-1">
					{getPageNumbers().map((page, index) => (
						<div key={index}>
							{page === "..." ? (
								<div className="px-3 py-2">
									<MoreHorizontal className="w-4 h-4 text-gray-400" />
								</div>
							) : (
								<Button
									variant={currentPage === page ? "default" : "outline"}
									size="sm"
									onClick={() => onPageChange(page as number)}
									className="min-w-[40px]"
								>
									{page}
								</Button>
							)}
						</div>
					))}
				</div>

				{/* Next Button */}
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="flex items-center gap-1"
				>
					Next
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>

			{/* Items Per Page */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-gray-600 whitespace-nowrap">Show:</span>
				<Select
					value={itemsPerPage.toString()}
					onValueChange={value => onItemsPerPageChange(Number(value))}
				>
					<SelectTrigger className="w-20">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="12">12</SelectItem>
						<SelectItem value="24">24</SelectItem>
						<SelectItem value="48">48</SelectItem>
						<SelectItem value="96">96</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
