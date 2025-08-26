import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from '../context/AuthContext'; 
import { useCart } from "../context/CartContext";  // 👈 Importamos el hook del carrito

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart(); // 👈 obtenemos el carrito del contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  // 👇 cantidad total de productos sumando las cantidades
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar">
      <div className="logo">E-Club</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/productos" key={Date.now()}>Productos</NavLink>
        </li>
        <li>
          <NavLink to="/carrito">
            Carrito {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>
        </li>

        {/* Mostrar enlace a Admin solo si es admin */}
        {user?.rol === "admin" && (
          <li>
            <NavLink to="/admin">Panel Admin</NavLink>
          </li>
        )}

        {/* Mostrar login o logout según autenticación */}
        {!isAuthenticated ? (
          <li>
            <NavLink to="/login">Ingresar</NavLink>
          </li>
        ) : (
          <>
            <li>Hola, {user?.nombre}</li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

