"use client";

import {AdminPopoverMenu} from "@/components/admin/components/admin-popover-menu";
import {Button} from "@/components/ui/button";
import {navigationItems} from "@/lib/data/navigations";
import {useAppSelector} from "@/store/hooks";
import {Menu, X} from "lucide-react";
import Link from "next/link";
import {memo, useState} from "react";
// Alternative: import { AdminPopoverMenu } from "./admin-popover-menu"

const Header = memo(() => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const logoUrl = useAppSelector(
		state => state.admin.settings.branding.logoUrl,
	);
	const headerBg = useAppSelector(
		state => state.admin.settings.theme.headerBackground,
	);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header
			className="shadow-sm border-b sticky top-0 z-50"
			style={{backgroundColor: headerBg}}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo/Brand */}
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-r rounded-lg flex items-center justify-center">
								<img src={logoUrl} alt="Logo" />
							</div>
							<span className="text-xl font-bold text-gray-900 hidden sm:block">
								Your Brand
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navigationItems.map(item => (
							<Link
								key={item.href}
								href={item.href}
								className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group"
							>
								{item.label}
								<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full" />
							</Link>
						))}
					</nav>

					{/* Right Side Actions */}
					<div className="flex items-center space-x-4">
						{/* Admin Panel - Desktop */}
						<div className="hidden md:block">
							<AdminPopoverMenu />
							{/* Alternative: <AdminPopoverMenu /> */}
						</div>

						{/* Mobile Menu Button */}
						<Button
							variant="ghost"
							size="sm"
							className="md:hidden"
							onClick={toggleMobileMenu}
							aria-label="Toggle mobile menu"
						>
							{isMobileMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden border-t bg-white">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigationItems.map(item => (
								<Link
									key={item.href}
									href={item.href}
									className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}

							{/* Admin Panel - Mobile */}
							<div className="px-3 py-2 border-t mt-2 pt-3">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-gray-500">
										Admin Tools
									</span>
									<AdminPopoverMenu />
									{/* Alternative: <AdminPopoverMenu /> */}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
});

Header.displayName = "HeaderFixed";

export default Header;
