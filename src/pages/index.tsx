import React, { useState, useEffect } from 'react';
import {Tabs} from '../components/tabs/Tabs';
import {Link, useNavigate, useParams} from 'react-router';
import {getMapItems, MapItemsResponseType} from '../services/api/restdb';
import {PageItem, Pagination} from '../components/pagination/Pagination';
import {Tab} from '../components/tabs/Tab';
import {Header} from '../components/header/Header';
import {Logo} from '../components/logo/Logo';
import {Counter} from '../components/counter/Counter';
import {Login} from '../components/login/Login';
import {Content} from '../components/content/Content';

export const IndexPage: React.FC = () => {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(true);
    const params = useParams<{page: string, tab: string, filter?: string}>();

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
            content: <div>Hello11111</div>,
            activeTab: false,
        },
        {
            id: 'list',
            label: 'List',
            activeTab: false,
            content: loading ? <>loading...</> : <div>
                {mapItems.map(item => {
                    return (<div key={item._id}>{item.title}</div>);
                })}
                <Pagination>
                    {pages.map(page => {
                        return (
                            <Link key={page} to={`/list/page/${page}`}><PageItem isActive={page === currentPage}>{page}</PageItem></Link>
                        );
                    })}
                </Pagination>
            </div>
        }
    ];

    return (<>
        <Header>
            <Logo />
            <Counter counter={10} label='Active' active={false} />
            <Counter counter={10} label='Closed' active={false} />
            <Login isLogged={false} />
        </Header>
        <Content>
            <Tabs onTabChange={(tabId) => {
                const newURL = `/${tabId}`;
                navigation(newURL);
            }} tabs={tabItems} activeTabId={params.tab ?? 'map'} renderFunction={(label, tabId, activeTab) => <Tab title={label} active={activeTab === tabId} />} />
        </Content>
    </>);
};
