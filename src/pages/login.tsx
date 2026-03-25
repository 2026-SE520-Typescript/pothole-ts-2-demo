import React, {useState, FormEventHandler, useContext} from 'react';
import {Header} from '../components/header/Header';
import {Logo} from '../components/logo/Logo';
import {Counter} from '../components/counter/Counter';
import {Login} from '../components/login/Login';

import {API} from '../api';
import {useNavigate} from 'react-router';
import {UserContext} from '../context/userContext';
import styles from './login.css';

export const LoginPage: React.FC = () => {
    const [login, setLogin] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const navigation = useNavigate();
    const userContext = useContext(UserContext);

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const api = new API();
        api.login(login, pass).then(token => {
            if (userContext._type === 'anonymous') {
                userContext.setUser(login, token.jwt);
                navigation('/');
            } else {
                navigation('/');
            }
        });
    };

    return (<>
        <Header>
            <Logo />
            <Counter counter={10} label='Active' active={false} />
            <Counter counter={10} label='Closed' active={false} />
            <Login isLogged={false} />
        </Header>
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Login</h1>
                <form className={styles.form} onSubmit={onSubmit}>
                    <label className={styles.field}>
                        Login
                        <input className={styles.input} defaultValue={login} onChange={event => setLogin(event.target.value)} />
                    </label>
                    <label className={styles.field}>
                        Password
                        <input className={styles.input} defaultValue={pass} type='password' onChange={event => setPass(event.target.value)} />
                    </label>
                    <button className={styles.submit} type='submit'>Log In</button>
                </form>
            </div>
        </div>
    </>);
};
