import React from 'react';
import styles from './styles.css';
import {Header} from './components/header/Header';
import {Counter} from './components/counter/Counter';

export const App: React.FC = () => {
    return <div className={styles.layout}>
        <Header>
            <Counter counter={10} label='Active' />
        </Header>
    </div>;
};
