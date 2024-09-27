import type { Preview } from "@storybook/react";
import type { ThemeConfig } from "storybook-addon-data-theme-switcher";
import "../app/tailwind.css";

export const globalTypes = {
	dataTheme: {
		defaultValue: "light",
	},
	dataThemes: {
		defaultValue: {
			list: [
				{ name: "light", dataTheme: "light" },
				{ name: "cupcake", dataTheme: "cupcake" },
				{ name: "dark", dataTheme: "dark" },
				{ name: "cmyk", dataTheme: "cmyk" },
				{ name: "retro", dataTheme: "retro" },
			],
			dataAttribute: "data-theme",
			clearable: true,
			toolbar: {
				title: "Change data-theme attribute",
				icon: "paintbrush",
			},
		} satisfies ThemeConfig,
	},
};

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
