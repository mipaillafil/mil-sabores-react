import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="img/logo.png" alt="Logo Pasteleria Mil Sabores" />
          </div>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/promociones">Promociones</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>
          <div className="btn-sesion">
            <Link to="/inicio-sesion">
              <button>Iniciar Sesión</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
