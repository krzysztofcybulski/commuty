import type {Meta, StoryObj} from "@storybook/react";
import {ThreeDCardDemo} from "../components/ThreeDCardDemo.tsx";
import '../index.css'

const meta = {
    title: 'Components/ThreeDCardDemo',
    component: ThreeDCardDemo,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ThreeDCardDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const CardExample: Story = {
};
