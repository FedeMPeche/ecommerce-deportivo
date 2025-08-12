import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Productos from './pages/Productos';
import Login from './pages/Login';
import Register from './pages/Register';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <Productos />
              </PrivateRoute>
            }
          />
          <Route
            path="/productos/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Carrito />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />

          {/* Ruta fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
