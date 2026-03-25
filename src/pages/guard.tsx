import React, {useContext} from 'react';
import {UserContext} from '../context/userContext';
import {Link} from 'react-router';
import styles from './guard.css';

type GuardType = {
    children: React.ReactNode;
}

export const Guard: React.FC<GuardType> = ({children}) => {
    const userContext = useContext(UserContext);

    if (userContext._type === 'anonymous') {
        return (
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Forbidden</h1>
                    <p className={styles.message}>You need to be logged in to view this page.</p>
                    <Link className={styles.link} to={'/'}>Main page</Link>
                </div>
            </div>
        );
    }

    return children;
};
