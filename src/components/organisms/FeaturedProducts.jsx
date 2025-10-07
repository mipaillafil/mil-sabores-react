import React from "react";
import ProductCard from "../molecules/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="container">
      <h2 className="titulo-seccion">Productos Destacados</h2>
      <div className="productos-destacados">
        <div className="producto-card">
            <ProductCard
              codigo="TC001"
              titulo="Torta Cuadrada de Chocolate"
              precio="$45.000"
              descripcion="Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."
              imgClass="torta-cuadrada-chocolate"
            />
        </div>

        <div className="producto-card">
          <ProductCard
            codigo="TT002"
            titulo="Torta Circular de Vainilla"
            precio="$42.000"
            descripcion="Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión."
            imgClass="torta-circular-vainilla"
          />
        </div>

        <div className="producto-card">
         <ProductCard
            codigo="PI001"
            titulo="Mousse de Chocolate"
            precio="$5.000"
            descripcion="Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate."
            imgClass="mousse-chocolate"
          />
        </div>
      </div>
    </section>
  );
}
