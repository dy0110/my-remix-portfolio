import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Spinner } from "./index";

const meta: Meta<typeof Spinner> = {
	title: "components/Spinner",
	component: Spinner,
};
export default meta;

export const Default: StoryObj<typeof Spinner> = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
	},
};
