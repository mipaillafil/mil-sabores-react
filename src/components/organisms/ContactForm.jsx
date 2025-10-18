import React from 'react'

export default function ContactForm() {
  return (
    <div className="form-contacto">
      <h2>Envíanos un Mensaje</h2>
      <form id="contactoForm" aria-label="contactForm">
        <div className="form-row">
          <label htmlFor="nombre">Nombre completo *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
          />
        </div>

        <div className="form-row">
          <label htmlFor="asunto">Asunto *</label>
          <select
            name="asunto"
            id="asunto"
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="pedido">Realizar pedido</option>
            <option value="consulta">Consulta general</option>
            <option value="personalizar">Personalización de productos</option>
            <option value="cotizar">Cotización para eventos</option>
            <option value="reclamo">Reclamo o sugerencia</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="mensaje">Mensaje *</label>
          <textarea
            name="mensaje"
            id="mensaje"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn-submit">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

