import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";

import { Header } from "./index";

const meta: Meta<typeof Header> = {
	title: "components/Header",
	component: Header,
	args: {
		darkMode: true,
		onClickAbout: fn(),
		onClickBlog: fn(),
		onClickGithub: fn(),
		onClickHome: fn(),
		onClickMode: fn(),
	},
};
export default meta;

export const Default: StoryObj<typeof Header> = {
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const buttons = await canvas.getAllByRole("button");
		await expect(buttons[0]).toHaveTextContent("Home");
		await userEvent.click(buttons[0]);
		await expect(args.onClickHome).toHaveBeenCalled();
		await expect(buttons[1]).toHaveTextContent("About");
		await userEvent.click(buttons[1]);
		await expect(args.onClickAbout).toHaveBeenCalled();
		await expect(buttons[2]).toHaveTextContent("Blog");
		await userEvent.click(buttons[2]);
		await expect(args.onClickBlog).toHaveBeenCalled();
		await expect(buttons[3]).toBeInTheDocument();
		await userEvent.click(buttons[3]);
		await expect(args.onClickGithub).toHaveBeenCalled();
		await expect(buttons[4]).toBeInTheDocument();
		await userEvent.click(buttons[4]);
		await expect(args.onClickMode).toHaveBeenCalled();
	},
};
