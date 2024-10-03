import { useSnapshot } from "valtio";
import { store } from "~/valtio/store";

export function Spinner() {
	const mode = useSnapshot(store).darkMode;
	return (
		<div
			className="w-full h-screen flex justify-center items-center"
			data-theme={mode ? "dark" : "retro"}
		>
			{/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
			{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
			<span
				// biome-ignore lint/a11y/useSemanticElements: <explanation>
				// biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
				role="progressbar"
				className="loading loading-ring loading-lg text-primary"
			></span>
		</div>
	);
}
