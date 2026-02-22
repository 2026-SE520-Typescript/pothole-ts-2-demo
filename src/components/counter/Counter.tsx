import React from 'react';
import styles from './styles.css';
import classnames from 'classnames';

type CounterProps = {
    label: string;
    counter: number;
    active?: boolean;
}
export const Counter: React.FC<CounterProps> = ({label, counter, active}) => {
    return (
        <div className={classnames(styles.labeledCounter, {
            [styles.labeledCounterActive]: active,
        })}>
            <div className={styles.label}>{label}</div>
            <div className={styles.counter}>{counter}</div>
        </div>
    );
};
