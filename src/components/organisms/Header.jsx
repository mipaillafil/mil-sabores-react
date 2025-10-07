import React from "react";

export default function Header() {
  return (
    <>
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="img/logo.png" alt="Logo Pasteleria Mil Sabores" />
            </div>
            <nav>
              <a href="index.html">Inicio</a>
              <a href="productos.html">Productos</a>
              <a href="promociones.html">Promociones</a>
              <a href="blog.html">Blog</a>
              <a href="contacto.html">Contacto</a>
            </nav>
            <div className="btn-sesion">
              <a href="inicio_sesion.html">
                <button>Iniciar Sesión</button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
