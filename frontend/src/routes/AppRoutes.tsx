import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Carrito from '../pages/Carrito';
import Admin from '../pages/Admin';
import NotFound from '../pages/NotFound';
import ProductDetail from '../pages/ProductDetail';
import PrivateRoute from '../routes/PrivateRoute';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/productos/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
      <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
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
      </Routes>
    );
  };

export default AppRoutes;