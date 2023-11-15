import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Authentication } from './Components/Context/Authentication';
import { ProductCart } from './Components/Context/ProductCart';
import { GlobalSearch } from './Components/Context/GlobalSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Disable right-click on the entire document
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  toast.error("Website Content Is Protected.", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authentication>
    <GlobalSearch>
      <ProductCart>
        <React.StrictMode>
        <ToastContainer />
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
