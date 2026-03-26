import React, {Suspense, useEffect, useState} from 'react';
import styles from './styles.css';
import {Route, Routes} from 'react-router';
import {IndexPage} from './pages';
import {MapPage} from './pages/map';
import {Register} from './pages/register';
import {LoginPage} from './pages/login';
import {API} from './api';
import {appLogger} from './appLogger';
import {UserContext, UserContextType} from './context/userContext';
import {Guard} from './pages/guard';
import {jwtDecode} from 'jwt-decode';


const ListPage = React.lazy(() => import('./pages/list').then(m => ({default: m.ListPage})));

export const App: React.FC = () => {
    const [user, setUser] = useState<string | null>(null);
    const check = () => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const api = new API();
            api.check(token).then(isValid => {
                appLogger('The token is valid', isValid);
            });
            return true;
        } else {
            appLogger('No token');
        }

        return false;
    };

    useEffect(() => {
        if (check()) {
            const token = window.localStorage.getItem('token') ?? '';
            const decodedToken = jwtDecode<{login: string}>(token);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(decodedToken.login);
        }
    }, []);

    useEffect(() => {
        check();
    }, [user]);


    let userObject: UserContextType = {
        _type: 'anonymous',
        setUser: (login: string, token: string) => {
            window.localStorage.setItem('token', token);
            setUser(login);
        }
    };
    if (user) {
        userObject = {
            _type: 'registered',
            login: user,
            removeUser: () => {
                setUser(null);
                window.localStorage.removeItem('token');
            }
        };
    }


    return <Suspense fallback={<div>Oops! We did not load the component</div>}><div className={styles.layout}>
        <UserContext.Provider value={{
            ...userObject
        }}>
            <Routes>
                <Route element={<IndexPage />}>
                    <Route index element={<MapPage />} />
                    <Route path="map" element={<Guard><MapPage /></Guard>} />
                    <Route path="list" element={<Guard>
                        <ListPage />
                    </Guard>} />
                    {/*<Route path="list/page/:page?" element={<ListPage />} />*/}
                    {/*<Route path="list/page/filer_:filter/:page?" element={<ListPage />} />*/}
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </UserContext.Provider>
    </div></Suspense>;
};
