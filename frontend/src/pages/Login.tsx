import React, { useState } from "react";
import { loginUser } from "../utils/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);
      setAuthData(data.token, data.user); // actualiza contexto
      alert("Inicio de sesión exitoso.");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión.");
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tenés cuenta? <a href="/register">Registrate aquí</a>
      </p>
    </div>
  );
};

export default Login;


