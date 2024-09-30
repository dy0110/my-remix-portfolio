import clsx from "clsx";

type Props = {
	className?: string;
};

export function Footer({ className }: Props) {
	return (
		<footer
			className={clsx(
				"w-full !h-[48px] flex items-center justify-center bg-base-100 border-solid border-t border-base-content",
				className,
			)}
		>
			<span className="text-sm font-normal text-base-content">
				Copyright © 2024 - All right reserved by dy0110
			</span>
		</footer>
	);
}
