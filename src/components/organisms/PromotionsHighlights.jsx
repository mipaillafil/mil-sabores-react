import React from "react";

export default function PromotionsHighlights() {
  return (
    <section className="promociones">
      <section className="container">
        <h2 className="titulo-seccion">Promociones Especiales</h2>
        <div className="promociones-cards">
          <div className="promocion-card">
            <h3>50% de Descuento</h3>
            <p>Para usuarios mayores de 50 años en todos nuestros productos</p>
          </div>
          <div className="promocion-card">
            <h3>10% de Descuento</h3>
            <p>
              Regístrate con el código "FELICES50" y disfruta de un descuento
              permanente
            </p>
          </div>
          <div className="promocion-card">
            <h3>Tortas Gratis para Estudiantes</h3>
            <p>
              Estudiantes de Duoc UC reciben torta gratis en su cumpleaños al
              registrarse con correo institucional
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
