import React, {useContext} from 'react';
import {UserContext} from '../context/userContext';
import {Link} from 'react-router';

type GuardType = {
    children: React.ReactNode;
}

export const Guard: React.FC<GuardType> = ({children}) => {
    const userContext = useContext(UserContext);

    return userContext._type === 'anonymous' ? <div>Forbidden <Link to={'/'}>Main page</Link></div> : children;
};
