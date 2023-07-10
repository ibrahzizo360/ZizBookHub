import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
    <BrowserRouter>
    <ToastContainer />
      <App />
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

