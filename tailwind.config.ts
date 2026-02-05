import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const retro = themes.retro;

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sansJp: ['"M PLUS 1p"'],
			},
		},
	},
	daisyui: {
		themes: [
			"dark",
			{
				retro: {
					...retro,
					"base-content": colors.slate[700],
				},
			},
		],
	},
	plugins: [daisyui],
} satisfies Config;
