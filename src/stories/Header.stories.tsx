import React from 'react';
import type {
    Meta,
    StoryObj
} from '@storybook/react-webpack5';

import {Header} from '../components/header/Header';


const HeaderDemo: React.FC = () => {
    return <Header>
        Content
    </Header>;
};

const meta: Meta<typeof Header> = {
    component: HeaderDemo,
    tags: ['autodocs'],
    title: 'Header',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};



