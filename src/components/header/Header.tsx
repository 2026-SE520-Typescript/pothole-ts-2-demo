import React from 'react';
import styles from './styles.css';

type HeaderProps = {
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({children}) => {
    return (
        <header className={styles.header}>
            {children}
        </header>
    );
};
