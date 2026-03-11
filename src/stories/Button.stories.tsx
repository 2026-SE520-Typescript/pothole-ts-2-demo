import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../components/button/Button';


const meta: Meta<typeof Button> = {
    component: Button,
    tags: ['autodocs'],
    title: 'Button',
    args: {
        children: 'Click me',
        layout: 'fitContent'
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FitContent: Story = {};

export const FillAll: Story = {
    args: {
        layout: 'fillAll'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true
    }
};


