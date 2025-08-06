import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#2E7D32', color: 'white' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/carrito">Carrito</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}