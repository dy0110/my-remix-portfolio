import clsx from "clsx";

type Props = {
	className?: string;
};

export function Footer({ className }: Props) {
	return (
		<footer
			className={clsx(
				"w-full flex items-center justify-center z-20 pb-2",
				className,
			)}
		>
			<span className="text-xs font-light text-base-content/50">
				Copyright © 2025 - All right reserved by dy0110
			</span>
		</footer>
	);
}
