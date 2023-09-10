import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { store } from './App/store';

import './index.css';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
