import json from "@/shared/i18n/locales/vi.json";
import Link from "next/link";
import {memo} from "react";
import {footerSections} from "../../data/footers";
import Facebook from "../icons/facebook";
import Youtube from "../icons/youtube";
import Zalo from "../icons/zalo";
import Logo from "./logo";

const Footer = memo(() => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-4 gap-8">
					<div>
						<div className="mb-4">
							<Logo className="text-white" />
						</div>
						<p className="text-gray-400 mb-4">{json.common.welcome}</p>
						<div className="flex space-x-4">
							<Link
								href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<span className="sr-only">Facebook</span>
								<Facebook />
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<span className="sr-only">Zalo</span>
								<Zalo />
							</Link>
							<Link
								href="#"
								className="text-gray-400 hover:text-white transition-colors"
							>
								<span className="sr-only">Youtube</span>
								<Youtube />
							</Link>
						</div>
					</div>

					{footerSections.map((section, index) => (
						<div key={index}>
							<h3 className="text-lg font-semibold mb-4">{section.title}</h3>
							<ul className="space-y-2">
								{section.links.map((link, linkIndex) => (
									<li key={linkIndex}>
										<Link
											href={link.href}
											className="text-gray-400 hover:text-white transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="border-t border-gray-800 mt-8 pt-8 text-center">
					<p className="text-gray-400">
						© {currentYear} {json.common.appName}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
});

Footer.displayName = "Footer";
export default Footer;
