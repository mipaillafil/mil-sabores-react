import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Leer cantidad de productos en el carrito desde localStorage
  useEffect(() => {
    const updateCount = () => {
      const items = JSON.parse(localStorage.getItem("products")) || [];
      setCartCount(items.length);
    };

    updateCount();

    // Escuchar cambios del carrito (evento custom y storage)
    window.addEventListener("cart-updated", updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener("cart-updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

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
            {/* CARRITO CON BURBUJA */}
            <div className="carrito-icono">
              <Link to="/Carrito" className="cart-link" aria-label="Carrito" onClick={closeMenu}>
                🛒
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </div>

            {/* SI HAY USUARIO → PERFIL, SI NO → BOTÓN INICIAR SESIÓN */}
            {user ? (
              <div className="user-menu">
                <Link to="/Perfil-Usuario" className="user-pill" onClick={closeMenu}>
                  <span className="user-avatar">
                    {user.nombre?.[0] ||
                      user.name?.[0] ||
                      user.email?.[0]?.toUpperCase() ||
                      "👤"}
                  </span>
                  <span className="user-name">
                    {user.nombre || user.name || user.email}
                  </span>
                </Link>
                <button className="logout-btn" onClick={logout}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="btn-sesion">
                <Link to="/Inicio-Sesion" onClick={closeMenu}>
                  <button>Iniciar Sesión</button>
                </Link>
              </div>
            )}

            {/* Botón Hamburguesa */}
            <button
              className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
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
        <nav className={`nav-mobile ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>Inicio</Link>
          <Link to="/productos" onClick={closeMenu}>Productos</Link>
          <Link to="/promociones" onClick={closeMenu}>Promociones</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
          <Link to="/Carrito" onClick={closeMenu}>Carrito</Link>

          {user ? (
            <Link to="/Perfil-Usuario" onClick={closeMenu}>Mi Perfil</Link>
          ) : (
            <Link to="/Inicio-Sesion" onClick={closeMenu}>Iniciar Sesión</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
