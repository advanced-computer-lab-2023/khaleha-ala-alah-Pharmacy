import React from 'react';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import './index.scss';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render( <Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter>
</Provider>)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
