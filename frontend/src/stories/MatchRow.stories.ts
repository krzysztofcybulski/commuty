import type {Meta, StoryObj} from '@storybook/react';
import '../index.css';
import {MatchRow} from "../components/MatchRow.tsx";

const meta = {
    title: 'Components/MatchRow',
    component: MatchRow,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof MatchRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const MatchRowExample: Story = {
    args: {
        username: 'Tomek',
        description: 'Looking for passenger',
        chosenWeekDays: [
            {
                chosenWeekDay: "MONDAY",
                isChosen: true
            },
            {
                chosenWeekDay: "TUESDAY",
                isChosen: true
            },
            {
                chosenWeekDay: "THURSDAY",
                isChosen: false
            }
        ],
        commute: {
            from: '08:00',
            to: '16:00',
            isTimeFitting: true
        }
    },
};
