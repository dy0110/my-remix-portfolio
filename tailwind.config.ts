import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sansJp: ['"Noto Sans JP"'],
			},
		},
	},
	plugins: [],
} satisfies Config;
