import {createContext} from 'react';

export type UserContextType = {
    _type: 'registered'
    login: string
    removeUser: () => void
} | {
    _type: 'anonymous'
    setUser: (login: string, token: string) => void
}


export const UserContext = createContext<UserContextType>({
    _type: 'anonymous',
    setUser: () => {}
});
