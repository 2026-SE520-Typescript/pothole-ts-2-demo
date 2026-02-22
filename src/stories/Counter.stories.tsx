import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Counter} from '../components/counter/Counter';


const meta: Meta<typeof Counter> = {
    component: Counter,
    tags: ['autodocs'],
    title: 'Counter',
    args: {
        label: 'Counter',
        counter: 1
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};



