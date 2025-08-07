import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">E-Club</div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Inicio</NavLink></li>
        <li><NavLink to="/productos">Productos</NavLink></li>
        <li><NavLink to="/carrito">Carrito</NavLink></li>
        <li><NavLink to="/login">Ingresar</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;