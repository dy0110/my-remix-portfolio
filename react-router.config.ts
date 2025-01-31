import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/remix/vite";

export default {
	ssr: false,
	presets: [vercelPreset()],
} satisfies Config;
