import React from "react";

export default function Banner() {
  return (
    <section className="banner-index">
      <div className="banner-content">
        <h1>50 años endulzando momentos</h1>
        <p>
          Descubre la tradición y el sabor de la repostería chilena con nuestras
          deliciosas tortas y postres artesanales
        </p>
        <div className="btn-productos">
          <a href="productos.html">
            <button>Ver Productos</button>
          </a>
        </div>
      </div>
    </section>
  );
}
