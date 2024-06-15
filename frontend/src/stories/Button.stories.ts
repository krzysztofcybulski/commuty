import type { Meta, StoryObj } from '@storybook/react';
import '../index.css';
import { Button } from '../components/ContinueButton.tsx';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const ButtonExample: Story = {
  args: {
    text: 'Button',
  },
};
