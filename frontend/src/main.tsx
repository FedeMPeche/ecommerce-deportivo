import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.tsx';
import Navbar from './components/Navbar';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);