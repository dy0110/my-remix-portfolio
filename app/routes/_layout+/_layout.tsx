import hljs from "highlight.js";
import kotlin from "highlight.js/lib/languages/kotlin";
import rust from "highlight.js/lib/languages/rust";
import typescript from "highlight.js/lib/languages/typescript";
import { Outlet, useNavigate } from "react-router";
import { $path } from "safe-routes";
import { useSnapshot } from "valtio";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { PixelBlast } from "~/components/PixelBlast";
import { store } from "~/valtio/store";
import "highlight.js/styles/github-dark.min.css";

export default function _layout() {
	const navigate = useNavigate();
	const mode = useSnapshot(store).darkMode;

	hljs.registerLanguage("typescript", typescript);
	hljs.registerLanguage("rust", rust);
	hljs.registerLanguage("kotlin", kotlin);

	return (
		<div
			className="w-full min-h-screen flex flex-col relative z-0"
			data-theme={mode ? "dark" : "retro"}
		>
			<Header
				darkMode={mode}
				onClickAbout={() => {
					navigate($path("/about"));
				}}
				onClickBlog={() => {
					navigate($path("/posts"));
				}}
				onClickGithub={() => {
					window.open("https://github.com/dy0110");
				}}
				onClickHome={() => {
					navigate($path("/"));
				}}
				onClickMode={() => {
					store.darkMode = !mode;
				}}
			/>
			<PixelBlast
				className="fixed inset-0 -z-10"
				variant="diamond"
				pixelSize={8}
				color={mode ? "#793ef9" : "#ef9995"}
				speed={2}
				patternScale={8}
				edgeFade={0.1}
			/>
			<main className="flex justify-center items-start min-h-screen w-full pt-28 pb-12 px-4">
				<Outlet />
			</main>
			<div className="z-10">
				<Footer />
			</div>
		</div>
	);
}
