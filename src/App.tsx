import React, {useEffect, useState} from 'react';
import styles from './styles.css';
import {Route, Routes} from 'react-router';
import {IndexPage} from './pages';
import {Register} from './pages/register';
import {LoginPage} from './pages/login';
import {API} from './api';
import {appLogger} from './appLogger';
import {UserContext, UserContextType} from './context/userContext';
import {Guard} from './pages/guard';
import {jwtDecode} from 'jwt-decode';

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


    return <div className={styles.layout}>
        <UserContext.Provider value={{
            ...userObject
        }}>
            <Routes>
                <Route index element={
                    <IndexPage />
                }/>
                <Route path="/:tab" element={
                    <Guard><IndexPage /></Guard>
                }/>
                <Route path="/:tab/page/:page?" element={
                    <IndexPage />
                }/>
                <Route path="/:tab/page/filer_:filter/:page?" element={
                    <IndexPage />
                }/>
                <Route path="/register" element={
                    <Register />
                }/>
                <Route path="/login" element={
                    <LoginPage />
                }/>
            </Routes>
        </UserContext.Provider>
    </div>;
};
