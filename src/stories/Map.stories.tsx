import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {MemoryRouter} from 'react-router';

import {Map} from '../components/map/Map';

const meta: Meta<typeof Map> = {
    component: Map,
    tags: ['autodocs'],
    title: 'Map',
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        points: [
            {_id: '1', lat: 50.4501, lng: 30.5234},
            {_id: '2', lat: 48.8566, lng: 2.3522},
            {_id: '3', lat: 40.7128, lng: -74.006},
        ]
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPoints: Story = {};

export const Empty: Story = {
    args: {
        points: []
    }
};

export const SinglePoint: Story = {
    args: {
        points: [
            {_id: '1', lat: 50.4501, lng: 30.5234}
        ]
    }
};
