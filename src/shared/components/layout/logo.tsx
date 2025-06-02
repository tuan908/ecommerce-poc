import json from "@/shared/i18n/locales/vi.json";
import Image from "next/image";
import Link from "next/link";
import {memo} from "react";

interface LogoProps {
	className?: string;
}

const Logo = memo(({className = ""}: LogoProps) => {
	return (
		<Link href="/" className={`flex items-center ${className}`}>
			<Image
				src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/490730333_654545987198402_3800013081983338165_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGmP30J_-mQoKSWlRcAtLK1UO_z9Ba8ZXtQ7_P0Frxle1bJ8VD8CnTX11lvA5LwKkATI6D9T2wS3g56fwWdkWqp&_nc_ohc=jCKCd9LFOhsQ7kNvwFTZ5rm&_nc_oc=AdmrXYpo1xYBsZkG9KVBg_qa4ImPjmWlUD5xoHWTfwQdaA6UrTylPhfcH8GzBBIUzEQ&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=GZ03hLiEApUTHQFBP_IomA&oh=00_AfL_bYENJBa_sNuR-IgsYP7IzNUsoql184pR0mijHgaAmw&oe=6842FDE9"
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
