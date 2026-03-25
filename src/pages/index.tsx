import React, {useState, useEffect, useContext} from 'react';
import {Tabs} from '../components/tabs/Tabs';
import {useNavigate, useParams} from 'react-router';
import {getMapItems, MapItemsResponseType} from '../services/api/restdb';
import {Tab} from '../components/tabs/Tab';
import {Header} from '../components/header/Header';
import {Logo} from '../components/logo/Logo';
import {Counter} from '../components/counter/Counter';
import {Login} from '../components/login/Login';
import {Content} from '../components/content/Content';
import {UserContext} from '../context/userContext';
import {PotholeList} from '../components/pothole-list/PotholeList';
import {Map} from '../components/map/Map';

export const IndexPage: React.FC = () => {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(true);
    const params = useParams<{page: string, tab: string, filter?: string}>();
    const userContext = useContext(UserContext);

    const [mapItemPagenation, setMapItemPagenation] = useState<MapItemsResponseType['totals']>({
        count: 0,
        max: 0,
        skip: 0,
        total: 0,
    });
    const currentPage = Number(params.page ?? 1);

    const [mapItems, setItems] = useState<MapItemsResponseType['data']>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getMapItems(currentPage).then(data => {
            setItems(data.data);

            setMapItemPagenation(data.totals);
            setLoading(false);
        });

    }, [currentPage]);

    const maxPages = Math.ceil(mapItemPagenation.total / mapItemPagenation.max);

    const pages = [];
    for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
    }


    const tabItems = [
        {
            id: 'map',
            label: 'Map',
            content: loading ? <div>Loading map...</div> : <Map points={mapItems} />,
            activeTab: false,
        },
        {
            id: 'list',
            label: 'List',
            activeTab: false,
            content: <PotholeList loading={loading} items={mapItems} pages={pages} currentPage={currentPage} />
        }
    ];

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
            <Tabs onTabChange={(tabId) => {
                const newURL = `/${tabId}`;
                navigation(newURL);
            }} tabs={tabItems} activeTabId={params.tab ?? 'map'} renderFunction={(label, tabId, activeTab) => <Tab title={label} active={activeTab === tabId} />} />
        </Content>
    </>);
};
