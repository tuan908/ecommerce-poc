"use client";

import {Button} from "@/components/ui/button";
import CartIcon from "@/shared/components/layout/cart-icon";
import {Menu} from "lucide-react";
import {memo} from "react";
import Logo from "./logo";
import Navigation from "./navigation";

interface HeaderProps {
	className?: string;
}

const Header = memo(({className = ""}: HeaderProps) => {
	return (
		<header
			className={`sticky top-0 z-50 bg-[#1f5d59]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1f5d59]/90 border-b ${className}`}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<Logo />
					<Navigation />

					<div className="flex items-center space-x-4">
						<CartIcon />
						<Button className="hidden sm:inline-flex">Mua ngay</Button>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
});

Header.displayName = "Header";
export default Header;
