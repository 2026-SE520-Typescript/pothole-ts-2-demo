import React from 'react';
import {Link} from 'react-router';
import {MapItemsResponseType} from '../../services/api/restdb';
import {PageItem, Pagination} from '../pagination/Pagination';
import styles from './styles.css';

type PotholeListProps = {
    loading: boolean;
    items: MapItemsResponseType['data'];
    pages: number[];
    currentPage: number;
};

export const PotholeList: React.FC<PotholeListProps> = ({loading, items, pages, currentPage}) => {
    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div>
            <div className={styles.list}>
                {items.map(item => (
                    <div className={styles.item} key={item._id}>{item.title}</div>
                ))}
            </div>
            <div className={styles.paginationWrapper}>
                <Pagination>
                    {pages.map(page => (
                        <Link key={page} to={`/list/page/${page}`}>
                            <PageItem isActive={page === currentPage}>{page}</PageItem>
                        </Link>
                    ))}
                </Pagination>
            </div>
        </div>
    );
};
