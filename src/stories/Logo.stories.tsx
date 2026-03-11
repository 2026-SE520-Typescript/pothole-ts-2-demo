import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Logo} from '../components/logo/Logo';


const meta: Meta<typeof Logo> = {
    component: Logo,
    tags: ['autodocs'],
    title: 'Logo',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};


