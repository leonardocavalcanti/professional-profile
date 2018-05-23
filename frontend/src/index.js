import 'babel-polyfill';

import { Provider } from 'react-redux'
import configureStore from './store'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
