import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import {App} from './App';
import {init} from './services/api/restdb';
import {BrowserRouter} from 'react-router';


const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

init(fetch, 'https://mapstorage-7e78.restdb.io', '66294ad01b8daa76982dfc73');

root.render(<BrowserRouter basename={'/'}><App /></BrowserRouter>);

// Initialize the API

