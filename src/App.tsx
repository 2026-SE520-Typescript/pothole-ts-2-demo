import React from 'react';
import styles from './styles.css';
import {Route, Routes} from 'react-router';
import {IndexPage} from './pages';

export const App: React.FC = () => {

    return <div className={styles.layout}>
        <Routes>
            <Route index element={
                <IndexPage />
            }/>
            <Route path="/:tab" element={
                <IndexPage />
            }/>
            <Route path="/:tab/page/:page?" element={
                <IndexPage />
            }/>
            <Route path="/:tab/page/filer_:filter/:page?" element={
                <IndexPage />
            }/>
        </Routes>
    </div>;
};
