import type {
    Meta,
    StoryObj
} from '@storybook/react-webpack5';

import {Tabs} from '../components/tabs/Tabs';
import React from 'react';

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    tags: ['autodocs'],
    title: 'Tabs',
    args: {
        tabs: [
            {
                id: '1',
                label: 'Tab1',
                content: <div>Hello11111</div>
            },
            {
                id: '2',
                label: 'Tab2',
                content: <div>Hello22222</div>
            },
            {
                id: '3',
                label: 'Tab3',
                content: <div>Hello33333</div>
            }
        ]
    } satisfies Partial<React.ComponentProps<typeof Tabs>>
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};



