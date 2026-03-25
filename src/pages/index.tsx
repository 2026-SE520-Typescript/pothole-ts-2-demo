import React, {useContext} from 'react';
import {Tabs} from '../components/tabs/Tabs';
import {Outlet, useNavigate, useParams} from 'react-router';
import {Tab} from '../components/tabs/Tab';
import {Header} from '../components/header/Header';
import {Logo} from '../components/logo/Logo';
import {Counter} from '../components/counter/Counter';
import {Login} from '../components/login/Login';
import {Content} from '../components/content/Content';
import {UserContext} from '../context/userContext';

const tabItems = [
    {id: 'map', label: 'Map', activeTab: false, content: null},
    {id: 'list', label: 'List', activeTab: false, content: null},
];

export const IndexPage: React.FC = () => {
    const navigation = useNavigate();
    const params = useParams<{tab: string}>();
    const userContext = useContext(UserContext);

    const loginOnClick = () => {
        if (userContext._type === 'registered') {
            userContext.removeUser();
        } else {
            navigation('/login');
        }
    };
    const login = userContext._type === 'anonymous' ? '' : userContext.login;

    return (<>
        <Header>
            <Logo />
            <Counter counter={10} label='Active' active={false} />
            <Counter counter={10} label='Closed' active={false} />
            <div>{login}</div>
            <Login onClick={loginOnClick} isLogged={userContext._type === 'registered'} />
        </Header>
        <Content>
            <Tabs
                onTabChange={(tabId) => navigation(`/${tabId}`)}
                tabs={tabItems}
                activeTabId={params.tab ?? 'map'}
                renderFunction={(label, tabId, activeTab) => <Tab title={label} active={activeTab === tabId} />}
            />
            <Outlet />
        </Content>
    </>);
};
