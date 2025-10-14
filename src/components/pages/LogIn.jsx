import React from "react";
import { Link } from "react-router-dom";


export default function LogIn() {
  return (
    <div className="log-in">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <img src="/imagenes/logo.png" alt="Logo Pastelería Mil Sabores" />
          </div>
          <h1>Pastelería Mil Sabores</h1>
          <p>Ingresa tus credenciales para acceder</p>
        </div>

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
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
              required
            />
          </div>

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
            <Link to="/Registrarse">
              ¿No tienes una cuenta? <strong>Registrarse</strong>
            </Link>
            <Link to="/">
              <strong>Volver a la página principal</strong>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
