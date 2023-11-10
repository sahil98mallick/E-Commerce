import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Authentication } from './Components/Context/Authentication';
import { ProductCart } from './Components/Context/ProductCart';
import { GlobalSearch } from './Components/Context/GlobalSearch';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authentication>
    <GlobalSearch>
      <ProductCart>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProductCart>
    </GlobalSearch>
  </Authentication>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
