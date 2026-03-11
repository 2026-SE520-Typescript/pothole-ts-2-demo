import React from 'react';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Pagination, PageItem} from '../components/pagination/Pagination';


const PaginationDemo: React.FC = () => {
    return <Pagination>
        <PageItem isActive={false}>1</PageItem>
        <PageItem isActive={true}>2</PageItem>
        <PageItem isActive={false}>3</PageItem>
    </Pagination>;
};

const meta: Meta<typeof Pagination> = {
    component: PaginationDemo,
    tags: ['autodocs'],
    title: 'Pagination',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};


