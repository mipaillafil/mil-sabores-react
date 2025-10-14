import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [promoVisible, setPromoVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [errores, setErrores] = useState([]);

  const [formData, setFormData] = useState({
    mail: "",
    nombre: "",
    usuario: "",
    cumpleanios: "",
    clave1: "",
    clave2: "",
    promo: "",
    tyc: false,
    newsletter: false,
  });

  // 🧮 Evaluar fuerza de la contraseña
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setFormData({ ...formData, clave1: value });

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (value.length === 0) setStrength("");
    else if (score <= 1) setStrength("weak");
    else if (score === 2) setStrength("medium");
    else setStrength("strong");
  };

  // 📋 Control de inputs
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Validación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!formData.mail) newErrors.push("El email es obligatorio");
    if (!formData.nombre) newErrors.push("El nombre completo es obligatorio");
    if (!formData.usuario) newErrors.push("El usuario es obligatorio");
    if (!formData.clave1) newErrors.push("La contraseña es obligatoria");
    if (formData.clave1.length < 8)
      newErrors.push("La contraseña debe tener al menos 8 caracteres");
    if (formData.clave1 !== formData.clave2)
      newErrors.push("Las contraseñas no coinciden");
    if (!formData.tyc)
      newErrors.push("Debes aceptar los términos y condiciones");

    if (newErrors.length > 0) {
      setErrores(newErrors);
      setTimeout(() => setErrores([]), 5000);
    } else {
      alert("¡Cuenta creada exitosamente! Bienvenido/a a Pastelería Mil Sabores");
      setFormData({
        mail: "",
        nombre: "",
        usuario: "",
        cumpleanios: "",
        clave1: "",
        clave2: "",
        promo: "",
        tyc: false,
        newsletter: false,
      });
      setPassword("");
      setStrength("");
      setPromoVisible(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-header">
        <div className="logo">
          <img src="/imagenes/logo.png" alt="Logo Pastelería Mil Sabores" />
        </div>
        <h1>Crear Cuenta</h1>
        <p>Únete a nuestra comunidad dulce y descubre promociones exclusivas</p>
      </div>

      <form className="registro-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mail">Email *</label>
          <input
            type="email"
            name="mail"
            id="mail"
            placeholder="juan@mail.com"
            value={formData.mail}
            onChange={handleChange}
          />
          <div className="form-note">Usaremos este email para contactarte</div>
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo *</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Juan Pérez"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="usuario">Usuario *</label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            placeholder="juanito"
            value={formData.usuario}
            onChange={handleChange}
          />
          <div className="form-note">Este será tu nombre de usuario único</div>
        </div>

        <div className="form-group">
          <label htmlFor="cumpleanios">Fecha de Nacimiento</label>
          <input
            type="date"
            name="cumpleanios"
            id="cumpleanios"
            value={formData.cumpleanios}
            onChange={handleChange}
          />
          <div className="form-note">
            ¡Te enviaremos una sorpresa en tu cumpleaños!
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="clave1">Contraseña *</label>
          <input
            type="password"
            name="clave1"
            id="clave1"
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="password-strength">
            <div className={`password-strength-bar ${strength}`}></div>
          </div>
          <div className="form-note">
            Mínimo 8 caracteres con letras y números
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="clave2">Confirmar Contraseña *</label>
          <input
            type="password"
            name="clave2"
            id="clave2"
            placeholder="••••••••"
            value={formData.clave2}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="promo-toggle"
          onClick={() => setPromoVisible(!promoVisible)}
        >
          {promoVisible
            ? "Ocultar código promocional"
            : "¿Tienes un código promocional? ¡Aplicar aquí!"}
        </button>

        {promoVisible && (
          <div className="form-group" id="codigo-promocional">
            <label htmlFor="promo">Código Promocional</label>
            <input
              type="text"
              name="promo"
              id="promo"
              placeholder="Ej: FELICES50"
              value={formData.promo}
              onChange={handleChange}
            />
            <div className="form-note">
              Códigos válidos: FELICES50, ESTUDIANTE, MAYORES50
            </div>
          </div>
        )}

        <label className="checkbox-container">
          <input
            type="checkbox"
            name="tyc"
            id="tyc"
            checked={formData.tyc}
            onChange={handleChange}
          />
          <span className="checkbox-text">
            Acepto los <Link to="#">Términos y Condiciones</Link> y la{" "}
            <Link to="#">Política de Privacidad</Link>
          </span>
        </label>

        <label className="checkbox-container">
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          <span className="checkbox-text">
            Deseo recibir promociones y novedades por email
          </span>
        </label>

        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-reset"
            onClick={() => {
              setFormData({
                mail: "",
                nombre: "",
                usuario: "",
                cumpleanios: "",
                clave1: "",
                clave2: "",
                promo: "",
                tyc: false,
                newsletter: false,
              });
              setPassword("");
              setStrength("");
              setPromoVisible(false);
            }}
          >
            Limpiar
          </button>
          <button type="submit" className="btn btn-submit">
            Crear Cuenta
          </button>
        </div>
      </form>

      {errores.length > 0 && (
        <div id="errores">
          {errores.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="login-redirect">
        <p>
          ¿Ya tienes una cuenta? <Link to="/Inicio-Sesion">Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  );
}
