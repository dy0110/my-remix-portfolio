import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { TopPageCard } from "./index";

const meta: Meta<typeof TopPageCard> = {
	title: "components/TopPageCard",
	component: TopPageCard,
	args: {
		text: "テキスト",
		buttonText: "Button",
		onClick: fn(),
	},
};
export default meta;

export const Default: StoryObj<typeof TopPageCard> = {
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByText("テキスト")).toHaveTextContent("テキスト");
		const button = await canvas.getByRole("button");
		await expect(button).toHaveTextContent("Button");
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
