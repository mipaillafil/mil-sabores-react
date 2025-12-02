import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { useAuth } from "../../services/AuthContext";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/Inicio-Sesion");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Header />
      <section className="perfil-usuario">
        <div className="container perfil-container">
          <div className="perfil-header-box">
            <h1>Mi Cuenta</h1>
            <p>{user.nombre || user.name || "Usuario Mil Sabores"}</p>
            <p className="perfil-email">{user.email}</p>
          </div>

          <div className="perfil-list">
            <PerfilItem
              titulo="Mis Pedidos"
              descripcion="Revisa el historial de tus pedidos"
            />
            <PerfilItem
              titulo="Mis Favoritos"
              descripcion="Tus productos favoritos guardados"
            />
            <PerfilItem
              titulo="Direcciones"
              descripcion="Gestiona tus direcciones de entrega"
            />
            <PerfilItem
              titulo="Método de Pago"
              descripcion="Tarjetas y formas de pago"
            />
            <PerfilItem
              titulo="Configuración"
              descripcion="Ajustes de la aplicación"
            />
            <PerfilItem
              titulo="Ayuda y Soporte"
              descripcion="Centro de ayuda y contacto"
            />
          </div>

          <div className="perfil-contacto">
            <p>📞 +56 9 12345678</p>
            <p>📧 info@milsabores.cl</p>
            <p>📍 Av. Principal 123, Santiago</p>
            <p>🕒 Lun-Vie: 9:00 - 20:00</p>
          </div>

          <button className="logout-big-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

const PerfilItem = ({ titulo, descripcion }) => (
  <div className="perfil-item">
    <div>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
    <span className="perfil-chevron">›</span>
  </div>
);

export default UserProfile;