"use client";

import json from "@/i18n/locales/vi.json";
import {useAppSelector} from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import {memo} from "react";

interface LogoProps {
	className?: string;
}

const Logo = memo(({className = ""}: LogoProps) => {
	const logoSrc = useAppSelector(
		state => state.admin.settings.branding.logoUrl,
	);
	return (
		<Link href="/" className={`flex items-center ${className}`}>
			<Image
				src={logoSrc}
				alt="Logo"
				width={40}
				height={40}
				className="mr-2 rounded-full"
			/>
			<span className="text-xl font-bold text-white">
				{json.common.appName}
			</span>
		</Link>
	);
});

Logo.displayName = "Logo";
export default Logo;
