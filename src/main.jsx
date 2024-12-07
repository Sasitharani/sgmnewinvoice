import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'; // Ensure the path is correct and consistent
import App from './App';
import './index.css'; // Ensure the path to your CSS file is correct


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
