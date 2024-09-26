import { tv } from "tailwind-variants";
import { GithubLine, MoonLine } from "../Icons";

const headerStyle = tv({
	slots: {
		content: "flex items-center gap-8 justify-between",
		buttonStyle: "btn btn-ghost btn-md",
		iconStyle: "btn btn-circle btn-sm",
	},
});

type Props = {
	onClickHome: () => void;
	onClickAbout: () => void;
	onClickBlog: () => void;
	onClickGithub: () => void;
	onClickMode: () => void;
};

export function Header({
	onClickAbout,
	onClickBlog,
	onClickGithub,
	onClickHome,
	onClickMode,
}: Props) {
	const { content, buttonStyle, iconStyle } = headerStyle();
	return (
		<header className="h-[84px] w-full py-1 px-7 flex items-center justify-between bg-base-100 drop-shadow-md">
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
					<MoonLine className="text-base-content" />
				</button>
			</div>
		</header>
	);
}
