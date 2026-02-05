import clsx from "clsx";
import { tv } from "tailwind-variants";
import { GithubLine, MoonLine, SunLine } from "../Icons";

const headerStyle = tv({
	slots: {
		content: "flex items-center gap-8 justify-between",
		buttonStyle: "btn btn-ghost btn-md text-base-content",
		iconStyle: "btn btn-circle btn-sm",
	},
});

type Props = {
	className?: string;
	darkMode: boolean;
	onClickHome: () => void;
	onClickAbout: () => void;
	onClickBlog: () => void;
	onClickGithub: () => void;
	onClickMode: () => void;
};

export function Header({
	className,
	darkMode,
	onClickAbout,
	onClickBlog,
	onClickGithub,
	onClickHome,
	onClickMode,
}: Props) {
	const { content, buttonStyle, iconStyle } = headerStyle();
	return (
		<header
			className={clsx(
				"fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-16 px-6 flex items-center justify-between bg-base-100/50 backdrop-blur-md rounded-full border border-base-content/20 shadow-lg z-20 transition-all duration-300",
				className,
			)}
		>
			<div className={content()}>
				<button type="button" className={buttonStyle()} onClick={onClickHome}>
					Home
				</button>
				<button type="button" className={buttonStyle()} onClick={onClickAbout}>
					About
				</button>
				<button type="button" className={buttonStyle()} onClick={onClickBlog}>
					Blog
				</button>
			</div>
			<div className={content()}>
				<button type="button" className={iconStyle()} onClick={onClickGithub}>
					<GithubLine className="text-base-content" />
				</button>
				<button type="button" className={iconStyle()} onClick={onClickMode}>
					{darkMode ? (
						<SunLine className="text-base-content" />
					) : (
						<MoonLine className="text-base-content" />
					)}
				</button>
			</div>
		</header>
	);
}
