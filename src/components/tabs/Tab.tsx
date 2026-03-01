import React from 'react';
import styles from './tab.css';
import classnames from 'classnames';

type TabProps = {
    title: string
    active: boolean
}
export const Tab: React.FC<TabProps> = ({title, active}) => {
    return (
        <div className={classnames(styles.tab, {
            [styles.inactiveTab]: !active
        })}>
            {title}
        </div>
    );
};

