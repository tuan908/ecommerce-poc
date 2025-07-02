"use client";

import {navigationItems} from "@/lib/data/navigations";
import Link from "next/link";
import {memo} from "react";

interface NavigationProps {
	className?: string;
	orientation?: "horizontal" | "vertical";
	onItemClick?: () => void;
	showActiveIndicator?: boolean;
}

const Navigation = memo(
	({
		className = "",
		orientation = "horizontal",
		onItemClick,
		showActiveIndicator = true,
	}: NavigationProps) => {
		const baseClasses =
			orientation === "horizontal"
				? "flex space-x-8"
				: "flex flex-col space-y-1";

		return (
			<nav className={`${baseClasses} ${className}`}>
				{navigationItems.map(item => (
					<Link
						key={item.href}
						href={item.href}
						className={`
            text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium
            ${orientation === "horizontal" && showActiveIndicator ? "relative group" : ""}
            ${orientation === "vertical" ? "px-3 py-2 rounded-md hover:bg-gray-50" : ""}
          `}
						onClick={onItemClick}
					>
						{item.label}
						{orientation === "horizontal" && showActiveIndicator && (
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
						)}
					</Link>
				))}
			</nav>
		);
	},
);

Navigation.displayName = "Navigation";

export default Navigation;
