import type { Preview } from "@storybook/react";
import "../app/tailwind.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "white",
			values: [
				{
					name: "white",
					value: "#FFFFFF",
				},
				{
					name: "gray",
					value: "#F8F8F8",
				},
			],
		},
	},
};

export default preview;
