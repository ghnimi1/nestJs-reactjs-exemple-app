import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import ProviderContext from './context/GlobalWrapper';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ProviderContext>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ProviderContext>
  </BrowserRouter>
);

