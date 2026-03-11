import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Login} from '../components/login/Login';


const meta: Meta<typeof Login> = {
    component: Login,
    tags: ['autodocs'],
    title: 'Login',
    args: {
        isLogged: false
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
    args: {
        isLogged: true
    }
};


