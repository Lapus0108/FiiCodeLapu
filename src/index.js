import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import "./assets/fonts/Retroholic-Demo.ttf";
import {store, persistor} from './Reducers/configStore'
import {PersistGate} from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState(), "dispatch"))

const Piazeta = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

ReactDOM.render(<Piazeta />, document.getElementById('root'));
