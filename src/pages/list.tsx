import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {getMapItems, MapItemsResponseType} from '../services/api/restdb';
import {PotholeList} from '../components/pothole-list/PotholeList';

export const ListPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();
    const params = useParams<{page: string}>();
    const currentPage = Number(params.page ?? 1);

    const [mapItemPagenation, setMapItemPagenation] = useState<MapItemsResponseType['totals']>({
        count: 0,
        max: 0,
        skip: 0,
        total: 0,
    });

    const [mapItems, setItems] = useState<MapItemsResponseType['data']>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getMapItems(currentPage).then(data => {
            setItems(data.data);
            setMapItemPagenation(data.totals);
            setLoading(false);
        }).catch(error => {
            setError(error.message);
        });
    }, [currentPage]);

    const maxPages = Math.ceil(mapItemPagenation.total / mapItemPagenation.max);

    const pages = [];
    for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
    }

    if (error) {
        return <div>Oops! Something is wrong. {error}</div>;
    }

    return <PotholeList loading={loading} items={mapItems} pages={pages} currentPage={currentPage} />;
};
