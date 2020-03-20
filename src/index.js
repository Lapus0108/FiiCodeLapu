import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import cartReducer from "./Componente/cartReducer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import "./fonts/Retroholic-Demo.ttf";

const store = createStore(cartReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
