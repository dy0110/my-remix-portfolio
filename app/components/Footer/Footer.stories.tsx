import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Footer } from "./index";

const meta: Meta<typeof Footer> = {
	title: "components/Footer",
	component: Footer,
};
export default meta;

export const Default: StoryObj<typeof Footer> = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(
			canvas.getByText("Copyright © 2024 - All right reserved by dy0110"),
		).toHaveTextContent("Copyright © 2024 - All right reserved by dy0110");
	},
};
