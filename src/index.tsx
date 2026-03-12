import React from 'react';
import ReactDOM, {Container} from 'react-dom/client';
import {App} from './App';
import Type from 'typebox';
import Compile from 'typebox/compile';
import Value from 'typebox/value';


const root = ReactDOM.createRoot(
    document.getElementById('root') as Container
);

root.render(<App />);

const schema = Type.Object({
    a: Type.Number()
});

type T = Type.Static<typeof schema>


const a = Compile(schema);
try {
    const errors = Value.Errors(schema, {a: '1'});
    console.log(errors);
    console.log(a.Parse({a: 'some value'}));
    console.log(a.Check({a: 'some value'}));
} catch (err) {
    console.log(err);
}


