import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { ContentCard } from "./index";

const meta: Meta<typeof ContentCard> = {
	title: "components/ContentCard",
	component: ContentCard,
	args: {
		title: "タイトル",
		date: "2020/8/1",
		tags: ["React.js", "Node.js", "Typescript"],
		onClick: fn(),
	},
};
export default meta;

export const Default: StoryObj<typeof ContentCard> = {
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByText("タイトル")).toHaveTextContent("タイトル");
		await expect(canvas.getByText("2020/8/1")).toHaveTextContent("2020/8/1");
		await expect(canvas.getByText("React.js")).toHaveTextContent("React.js");
		await expect(canvas.getByText("Node.js")).toHaveTextContent("Node.js");
		await expect(canvas.getByText("Typescript")).toHaveTextContent(
			"Typescript",
		);
		const button = await canvas.getByRole("button");
		await expect(button).toHaveTextContent("全文を見る");
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
