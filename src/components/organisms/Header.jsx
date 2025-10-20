import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="img/logo.png" alt="Logo Pasteleria Mil Sabores" />
          </div>
          
          {/* Navegación Desktop */}
          <nav className="nav-desktop">
            <Link to="/" onClick={closeMenu}>Inicio</Link>
            <Link to="/productos" onClick={closeMenu}>Productos</Link>
            <Link to="/promociones" onClick={closeMenu}>Promociones</Link>
            <Link to="/blog" onClick={closeMenu}>Blog</Link>
            <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
          </nav>

          <div className="header-actions">
            <div className="carrito-icono">
              <Link to="/Carrito">🛒</Link>
            </div>
            
            <div className="btn-sesion">
              <Link to="/Inicio-Sesion">
                <button>Iniciar Sesión</button>
              </Link>
            </div>

            {/* Botón Hamburguesa */}
            <button 
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Menú"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Navegación Móvil */}
        <nav className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Inicio</Link>
          <Link to="/productos" onClick={closeMenu}>Productos</Link>
          <Link to="/promociones" onClick={closeMenu}>Promociones</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
        </nav>
      </div>
    </header>
  );
}