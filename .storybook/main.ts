import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../app/**/*.mdx",
		"../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"@storybook/addon-backgrounds",
		"storybook-addon-remix-react-router",
		"storybook-addon-data-theme-switcher",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {
			builder: {
				viteConfigPath: "vite-sb.config.ts",
			},
		},
	},
};
export default config;
