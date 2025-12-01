import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiLogin } from "../../api";
import { useAuth } from "../../AuthContext";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await apiLogin(email, password);
      // data = { token, user }
      login(data);

      if (data.user.rol === "ADMIN") {
        navigate("/Perfil-Admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="log-in">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <img src="/img/logo.png" alt="Logo Pastelería Mil Sabores" />
          </div>
          <h1>Pastelería Mil Sabores</h1>
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        <form
          className="login-form"
          data-testid="login-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" id="remember" />
              <span className="checkmark"></span>
              Recordarme
            </label>
          </div>

          <div className="separator"></div>

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>

          <div className="login-links">
            <Link to="#">¿Olvidaste tu contraseña?</Link>
            <Link to="/Registrarse">Crear cuenta</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
