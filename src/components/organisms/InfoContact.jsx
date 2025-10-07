import React from 'react';

export default function InfoContact() {
  return (
    <div className="info-contacto">
      <h2>Información de Contacto</h2>

      <div className="info-item">
        <div className="info-icono">📍</div>
        <div className="info-contenido">
          <h3>Dirección</h3>
          <p>Av. Dulce 123, Providencia <br />Santiago, Chile</p>
        </div>
      </div>

      <div className="info-item">
        <div className="info-icono">📞</div>
        <div className="info-contenido">
          <h3>Teléfonos</h3>
          <p>+56 2 2345 6789 <br />+56 9 8765 4321 (WhatsApp)</p>
        </div>
      </div>

      <div className="info-item">
        <div className="info-icono">✉️</div>
        <div className="info-contenido">
          <h3>Email</h3>
          <p>
            <a href="mailto:info@milsabores.cl">info@milsabores.cl</a><br />
            <a href="mailto:pepidos@milsabores.cl">pedidos@milsabores.cl</a>
          </p>
        </div>
      </div>

      <div className="info-item">
        <div className="info-icono">🕒</div>
        <div className="info-contenido">
          <h3>Horario de Atención</h3>
          <p>
            Lunes a Viernes: 9:00 - 20:00 <br />
            Sábados: 10:00 - 18:00 <br />
            Domingos: 11:00 - 15:00
          </p>
        </div>
      </div>

      <div className="redes-sociales">
        <h3>Síguenos en Redes Sociales</h3>
        <div className="icono-redes">
          <a href="#" title="Facebook">f</a>
          <a href="#" title="Instagram">i</a>
          <a href="#" title="X">x</a>
        </div>
      </div>
    </div>
  );
};


