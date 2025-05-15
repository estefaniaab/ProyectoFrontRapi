import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux'; // Importa Provider
import { store } from './store/store';   // Importa tu store

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>{/* Envolvemos Router con Provider */}
    <Router>
      <App />
    </Router>
    </Provider>
  </React.StrictMode>
);
