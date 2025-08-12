import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AuthProvider, useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

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
          <NavLink to="/productos">Productos</NavLink>
        </li>
        <li>
          <NavLink to="/carrito">Carrito</NavLink>
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
