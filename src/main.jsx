import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

// Добавляем Redux Store в window, чтобы Cypress мог его тестировать
if (window.Cypress) {
  window.store = store;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <App />
</Provider>
</React.StrictMode>
);
