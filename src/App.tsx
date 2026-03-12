import React from 'react';
import styles from './styles.css';
import {Header} from './components/header/Header';
import {Counter} from './components/counter/Counter';
import {Logo} from './components/logo/Logo';
import {Login} from './components/login/Login';
import {Content} from './components/content/Content';
import {Tabs} from './components/tabs/Tabs';
import {Tab} from './components/tabs/Tab';

export const App: React.FC = () => {
    const tabItems = [
        {
            id: '1',
            label: 'Map',
            content: <div>Hello11111</div>
        },
        {
            id: '2',
            label: 'List',
            content: <div>Hello22222</div>
        }
    ];
    return <div className={styles.layout}>
        <Header>
            <Logo />
            <Counter counter={10} label='Active' active={false} />
            <Counter counter={10} label='Closed' active={false} />
            <Login isLogged={false} />
        </Header>
        <Content>
            <Tabs tabs={tabItems} renderFunction={(label, tabId, activeTab) => <Tab title={label} active={activeTab === tabId} />} />
        </Content>
    </div>;
};
