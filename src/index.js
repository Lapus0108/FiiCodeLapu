import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from '../src/Componente/login-reducers/index.js';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import "./fonts/Retroholic-Demo.ttf";

const store = createStore(rootReducer);

console.log(store.getState(), "initial")

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState(), "dispatch"))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
