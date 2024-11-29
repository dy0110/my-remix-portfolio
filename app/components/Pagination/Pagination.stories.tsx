import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import {
	reactRouterParameters,
	withRouter,
} from "storybook-addon-remix-react-router";

import { Pagination } from "./index";

const meta: Meta<typeof Pagination> = {
	title: "components/Pagination",
	component: Pagination,
	decorators: [withRouter],
};
export default meta;

export const Default: StoryObj<typeof Pagination> = {
	parameters: {
		reactRouter: reactRouterParameters({
			location: {
				searchParams: { tab: "activityLog", page: "1" },
			},
			routing: {
				path: "/posts",
			},
		}),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const buttons = await canvas.getAllByRole("button");
		await expect(buttons[0]).toHaveTextContent("前へ");
		await expect(buttons[1]).toHaveTextContent("次へ");
	},
};
