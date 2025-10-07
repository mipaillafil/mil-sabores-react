import React from "react";

export default function Categories() {
  return (
    <section className="container">
      <h2 className="titulo-seccion">Nuestras Categorías</h2>
      <div className="categorias-grid">
        <div className="categoria-card tortas-cuadradas">
          <h3>TORTAS CUADRADAS</h3>
          <p>Perfectas para ocasiones especiales</p>
        </div>
        <div className="categoria-card tortas-circulares">
          <h3>TORTAS CIRCULARES</h3>
          <p>Clásicas y deliciosas</p>
        </div>
        <div className="categoria-card postres">
          <h3>POSTRES INDIVIDUALES</h3>
          <p>Pequeños placeres para cada día</p>
        </div>
        <div className="categoria-card especial">
          <h3>PRODUCTOS ESPECIALES</h3>
          <p>Sin azúcar, sin gluten y veganos</p>
        </div>
      </div>
    </section>
  );
}
