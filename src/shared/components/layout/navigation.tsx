import Link from "next/link";
import {memo} from "react";
import {navigationItems} from "../../data/navigations";

const Navigation = memo(() => {
	return (
		<nav className="hidden md:flex space-x-8">
			{navigationItems.map(item => (
				<Link
					key={item.href}
					href={item.href}
					className="text-white hover:text-gray-900 transition-colors"
				>
					{item.label}
				</Link>
			))}
		</nav>
	);
});

Navigation.displayName = "Navigation";
export default Navigation;
