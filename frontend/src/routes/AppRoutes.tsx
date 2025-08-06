import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import Products from '../pages/Products.tsx';
import Login from '../pages/Login.tsx';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}