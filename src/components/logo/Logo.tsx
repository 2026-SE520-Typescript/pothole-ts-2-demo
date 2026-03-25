import React from 'react';
import styles from './styles.css';
import {Link} from 'react-router';

export const Logo = () => {
    return <Link className={styles.logo} to='/'>Pothole</Link>;
};
