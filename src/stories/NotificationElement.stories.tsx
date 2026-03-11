import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {NotificationElement} from '../components/notification-element/NotificationElement';


const meta: Meta<typeof NotificationElement> = {
    component: NotificationElement,
    tags: ['autodocs'],
    title: 'NotificationElement',
    args: {
        message: 'Something happened',
        level: 'info'
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Warning: Story = {
    args: {
        level: 'warning',
        message: 'Be careful'
    }
};

export const Error: Story = {
    args: {
        level: 'error',
        message: 'Something went wrong'
    }
};


