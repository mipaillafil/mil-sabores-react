import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    mail: '',
    nombre: '',
    usuario: '',
    cumpleanios: '',
    clave1: '',
    clave2: '',
    promo: '',
    tyc: false,
    newsletter: false
  });

  const [errors, setErrors] = useState([]);
  const [showPromo, setShowPromo] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Validar fuerza de contraseña en tiempo real
    if (name === 'clave1') {
      validatePasswordStrength(value);
    }
  };

  const validatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthClass = () => {
    if (formData.clave1.length === 0) return '';
    if (passwordStrength <= 1) return 'strength-weak';
    if (passwordStrength <= 2) return 'strength-medium';
    return 'strength-strong';
  };

  const validateForm = () => {
    const newErrors = [];

    if (!formData.mail) newErrors.push('El email es obligatorio');
    if (!formData.nombre) newErrors.push('El nombre completo es obligatorio');
    if (!formData.usuario) newErrors.push('El usuario es obligatorio');
    if (!formData.clave1) newErrors.push('La contraseña es obligatoria');
    if (formData.clave1.length < 8) newErrors.push('La contraseña debe tener al menos 8 caracteres');
    if (formData.clave1 !== formData.clave2) newErrors.push('Las contraseñas no coinciden');
    if (!formData.tyc) newErrors.push('Debes aceptar los términos y condiciones');

    // Validación de email básica
    if (formData.mail && !/\S+@\S+\.\S+/.test(formData.mail)) {
      newErrors.push('El formato del email no es válido');
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (formErrors.length > 0) {
      setErrors(formErrors);
      setTimeout(() => setErrors([]), 5000);
    } else {
      // Simulación de registro exitoso
      alert('¡Cuenta creada exitosamente! Bienvenido/a a Pastelería Mil Sabores');
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      mail: '',
      nombre: '',
      usuario: '',
      cumpleanios: '',
      clave1: '',
      clave2: '',
      promo: '',
      tyc: false,
      newsletter: false
    });
    setPasswordStrength(0);
    setErrors([]);
  };

  const togglePromo = () => {
    setShowPromo(!showPromo);
  };

  return (
    <div className="registro-wrapper">
      <div className="registro-container">
        <div className="registro-header">
          <div className="logo">
            <img src="/img/logo.png" alt="Logo Pastelería Mil Sabores" />
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
            <div className="form-note">¡Te enviaremos una sorpresa en tu cumpleaños!</div>
          </div>

          <div className="form-group">
            <label htmlFor="clave1">Contraseña *</label>
            <input
              type="password"
              name="clave1"
              id="clave1"
              placeholder="••••••••"
              value={formData.clave1}
              onChange={handleInputChange}
            />
            <div className="password-strength">
              <div
                className={`password-strength-bar ${getPasswordStrengthClass()}`}
                style={{ width: formData.clave1.length === 0 ? '0%' : `${(passwordStrength / 4) * 100}%` }}
              ></div>
            </div>
            <div className="form-note">Mínimo 8 caracteres con letras y números</div>
          </div>

          <div className="form-group">
            <label htmlFor="clave2">Confirmar Contraseña *</label>
            <input
              type="password"
              name="clave2"
              id="clave2"
              placeholder="••••••••"
              value={formData.clave2}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="button"
            className="promo-toggle"
            onClick={togglePromo}
          >
            {showPromo ? 'Ocultar código promocional' : '¿Tienes un código promocional? ¡Aplicar aquí!'}
          </button>

          {showPromo && (
            <div className="form-group">
              <label htmlFor="promo">Código Promocional</label>
              <input
                type="text"
                name="promo"
                id="promo"
                placeholder="Ej: FELICES50"
                value={formData.promo}
                onChange={handleInputChange}
              />
              <div className="form-note">Códigos válidos: FELICES50, ESTUDIANTE, MAYORES50</div>
            </div>
          )}

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="tyc"
              id="tyc"
              checked={formData.tyc}
              onChange={handleInputChange}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">
              Acepto los <a href="#" onClick={(e) => e.preventDefault()}>Términos y Condiciones</a> y la <a href="#" onClick={(e) => e.preventDefault()}>Política de Privacidad</a>
            </span>
          </label>

          <label className="checkbox-container">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-text">
              Deseo recibir promociones y novedades por email
            </span>
          </label>

          <div className="form-buttons">
            <button type="button" className="btn btn-reset" onClick={handleReset}>
              Limpiar
            </button>
            <button type="submit" className="btn btn-submit">
              Crear Cuenta
            </button>
          </div>
        </form>

        <div className="login-redirect">
           <p>¿Ya tienes una cuenta? <Link to="/Inicio-Sesion">Iniciar Sesión</Link></p>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="error-message">
          {errors.map((error, index) => (
            <p key={index}>⚠️ {error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignUp;