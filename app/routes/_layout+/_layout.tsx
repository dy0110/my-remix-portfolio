import { Outlet, useNavigate } from "@remix-run/react";
import { useCallback } from "react";
// eslint-disable-next-line import/no-named-as-default
import Particles from "react-tsparticles";
import { $path } from "remix-routes";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useSnapshot } from "valtio";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { store } from "~/valtio/store";

export default function _layout() {
	const navigate = useNavigate();
	const mode = useSnapshot(store).darkMode;
	const particlesInit = useCallback(async (engine: Engine) => {
		await loadSlim(engine);
	}, []);

	return (
		<div
			className="w-full h-screen flex flex-col absolute"
			data-theme={mode ? "dark" : "retro"}
		>
			<Header
				className="sticky top-0 z-10"
				darkMode={mode}
				onClickAbout={() => {
					navigate($path("/about"));
				}}
				onClickBlog={() => {}}
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
			<Particles
				id="tsparticles"
				init={particlesInit}
				options={{
					fpsLimit: 120,
					interactivity: {
						events: {
							onHover: {
								enable: true,
								mode: "bubble",
							},
							resize: true,
						},
						modes: {
							push: {
								quantity: 4,
							},
							repulse: {
								distance: 200,
								duration: 0.4,
							},
							bubble: {
								size: 8,
								color: {
									value: mode ? "FFFFFF" : "#db2777",
								},
							},
						},
					},
					particles: {
						color: {
							value: "random",
						},
						links: {
							color: {
								value: "random",
							},
							enable: true,
							opacity: 0.8,
							width: 2,
						},
						move: {
							direction: "none",
							enable: true,
							outModes: {
								default: "bounce",
							},
							random: false,
							speed: 5,
							straight: false,
						},
						number: {
							density: {
								enable: true,
								area: 800,
							},
							value: 80,
						},
						opacity: {
							value: 0.5,
						},
						shape: {
							type: "circle",
						},
						size: {
							value: { min: 1, max: 5 },
						},
					},
					detectRetina: true,
				}}
			/>
			<div
				className="flex justify-center h-screen w-full py-4"
				data-theme={mode ? "dark" : "retro"}
			>
				<Outlet />
			</div>
			<div className="z-10">
				<Footer />
			</div>
		</div>
	);
}
