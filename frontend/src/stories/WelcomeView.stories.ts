import type {Meta, StoryObj} from "@storybook/react";
import '../index.css'
import {WelcomeView} from "../views/WelcomeView.tsx";

const meta = {
    title: 'Views/WelcomeView',
    component: WelcomeView,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof WelcomeView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const WelcomeViewExample: Story = {};
