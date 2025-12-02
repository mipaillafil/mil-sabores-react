// src/components/organisms/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleUserMenu = () => setShowUserMenu((v) => !v);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  const calcCartCount = () => {
    try {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const count = products.reduce(
        (acc, p) => acc + (p.quantity || 1),
        0
      );
      setCartCount(count);
      return count;
    } catch {
      setCartCount(0);
      return 0;
    }
  };

  // Cargar contador al montar + escuchar eventos de actualización
  useEffect(() => {
    calcCartCount();

    const handleCartUpdated = (e) => {
      if (e.detail?.count != null) {
        setCartCount(e.detail.count);
      } else {
        calcCartCount();
      }
    };

    const handleStorage = (e) => {
      if (e.key === "products") calcCartCount();
    };

    window.addEventListener("cart-updated", handleCartUpdated);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // cerrar menú usuario si hago click fuera
  useEffect(() => {
    const handleClickOutside = () => setShowUserMenu(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="container">
        <div className="header-content">
          {/* LOGO */}
          <div className="logo">
            <img src="/img/logo.png" alt="Logo Pasteleria Mil Sabores" />
          </div>

          {/* NAV DESKTOP */}
          <nav className="nav-desktop">
            <Link to="/" onClick={closeMenu}>Inicio</Link>
            <Link to="/productos" onClick={closeMenu}>Productos</Link>
            <Link to="/promociones" onClick={closeMenu}>Promociones</Link>
            <Link to="/blog" onClick={closeMenu}>Blog</Link>
            <Link to="/contacto" onClick={closeMenu}>Contacto</Link>
          </nav>

          <div className="header-actions">
            {/* CARRITO */}
            <div className="carrito-icono">
              <Link to="/Carrito" className="cart-link">
                🛒
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </div>

            {/* SI NO ESTÁ LOGUEADO → botón iniciar sesión */}
            {!user && (
              <div className="btn-sesion">
                <Link to="/Inicio-Sesion">
                  <button>Iniciar Sesión</button>
                </Link>
              </div>
            )}

            {/* SI ESTÁ LOGUEADO → ICONO DE USUARIO */}
            {user && (
              <div className="user-menu-wrapper">
                <div
                  className="user-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUserMenu();
                  }}
                >
                  👤
                </div>

                {showUserMenu && (
                  <div
                    className="user-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="user-name">
                      {user.nombre || user.name || "Usuario"}
                    </p>
                    <p className="user-email">{user.email}</p>

                    <Link
                      to="/Perfil-Usuario"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mi Perfil
                    </Link>

                    <Link
                      to="/Mis-Pedidos"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mis pedidos
                    </Link>

                    <button onClick={handleLogout} className="logout-btn">
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* HAMBURGUESA */}
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

        {/* NAV MOBILE */}
        <nav className={`nav-mobile ${isMenuOpen ? "active" : ""}`}>
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
