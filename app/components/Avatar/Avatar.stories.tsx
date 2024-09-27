import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Avatar } from "./index";

const meta: Meta<typeof Avatar> = {
	title: "components/Avatar",
	component: Avatar,
	args: {
		src: "https://picsum.photos/id/237/240/240",
	},
};
export default meta;

export const Default: StoryObj<typeof Avatar> = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByRole("img")).toBeInTheDocument();
	},
};
