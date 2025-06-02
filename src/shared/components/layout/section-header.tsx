import {memo} from "react";

interface SectionHeaderProps {
	title: string;
	description?: string;
	className?: string;
}

const SectionHeader = memo(
	({title, description, className = ""}: SectionHeaderProps) => {
		return (
			<div className={`text-center mb-12 ${className}`}>
				<h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
				{description && (
					<p className="text-lg text-gray-200 max-w-2xl mx-auto">
						{description}
					</p>
				)}
			</div>
		);
	},
);

SectionHeader.displayName = "SectionHeader";
export default SectionHeader;
