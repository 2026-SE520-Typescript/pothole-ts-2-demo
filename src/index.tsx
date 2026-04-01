import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import {App} from './App';
import {init} from './services/api/restdb';
import {BrowserRouter} from 'react-router';


const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

init(fetch, 'https://mapstorage-7e78.restdb.io', process.env.API_KEY ?? '');

root.render(<BrowserRouter  basename={process.env.BASE_URL ? process.env.BASE_URL : '/'}><App /></BrowserRouter>);

// Initialize the API

