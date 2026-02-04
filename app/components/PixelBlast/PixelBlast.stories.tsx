import type { Meta, StoryObj } from "@storybook/react";
import { PixelBlast } from "./index";

const meta: Meta<typeof PixelBlast> = {
	title: "components/PixelBlast",
	component: PixelBlast,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["square", "circle", "triangle", "diamond"],
			description: "The shape of the pixels",
		},
		pixelSize: {
			control: { type: "range", min: 1, max: 20, step: 1 },
			description: "Size of each pixel",
		},
		color: {
			control: "color",
			description: "Base color of the effect",
		},
		patternScale: {
			control: { type: "range", min: 0.1, max: 10, step: 0.1 },
			description: "Scale of the noise pattern",
		},
		patternDensity: {
			control: { type: "range", min: 0, max: 5, step: 0.1 },
			description: "Density of the pattern",
		},
		liquid: {
			control: "boolean",
			description: "Enable liquid/touch effect",
		},
		liquidStrength: {
			control: { type: "range", min: 0, max: 1, step: 0.01 },
			if: { arg: "liquid" },
		},
		liquidRadius: {
			control: { type: "range", min: 0.1, max: 5, step: 0.1 },
			if: { arg: "liquid" },
		},
		liquidWobbleSpeed: {
			control: { type: "range", min: 0, max: 10, step: 0.1 },
			if: { arg: "liquid" },
		},
		enableRipples: {
			control: "boolean",
			description: "Enable click ripple effects",
		},
		rippleIntensityScale: {
			control: { type: "range", min: 0, max: 5, step: 0.1 },
			if: { arg: "enableRipples" },
		},
		rippleThickness: {
			control: { type: "range", min: 0.01, max: 1, step: 0.01 },
			if: { arg: "enableRipples" },
		},
		rippleSpeed: {
			control: { type: "range", min: 0.01, max: 2, step: 0.01 },
			if: { arg: "enableRipples" },
		},
		speed: {
			control: { type: "range", min: 0, max: 2, step: 0.01 },
			description: "Animation speed",
		},
		noiseAmount: {
			control: { type: "range", min: 0, max: 1, step: 0.01 },
			description: "Amount of noise overlay",
		},
		pixelSizeJitter: {
			control: { type: "range", min: 0, max: 1, step: 0.01 },
			description: "Random variation in pixel size",
		},
		edgeFade: {
			control: { type: "range", min: 0, max: 1, step: 0.01 },
			description: "Fade effect at edges",
		},
		transparent: {
			control: "boolean",
			description: "Whether background is transparent or black",
		},
		antialias: {
			control: "boolean",
		},
		autoPauseOffscreen: {
			control: "boolean",
		},
	},
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof PixelBlast>;

export const Default: Story = {
	args: {
		variant: "square",
		pixelSize: 3,
		color: "#B19EEF",
		patternScale: 2,
		patternDensity: 1,
		liquid: false,
		enableRipples: true,
		speed: 0.5,
		transparent: false, // Set to false for visibility in Storybook by default, or provide a background
		className: "w-full h-screen bg-black", // Helper class to see it clearly if transparent is true
	},
	render: (args) => (
		<div style={{ width: "100%", height: "100vh", position: "relative" }}>
			<PixelBlast {...args} />
		</div>
	),
};

export const LiquidMode: Story = {
	args: {
		...Default.args,
		liquid: true,
		liquidStrength: 0.1,
		liquidRadius: 1,
		liquidWobbleSpeed: 4.5,
		variant: "circle",
	},
	render: (args) => (
		<div style={{ width: "100%", height: "100vh", position: "relative" }}>
			<PixelBlast {...args} />
		</div>
	),
};
