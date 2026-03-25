import React, {useState, useEffect} from 'react';
import {getMapItems, MapItemsResponseType} from '../services/api/restdb';
import {Map} from '../components/map/Map';

export const MapPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [mapItems, setItems] = useState<MapItemsResponseType['data']>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getMapItems(1, 1000).then(data => {
            setItems(data.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading map...</div>;
    }

    return <Map points={mapItems} />;
};
