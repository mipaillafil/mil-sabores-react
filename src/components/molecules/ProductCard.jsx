import React from "react";

export default function ProductCard({ codigo, titulo, precio, descripcion, imgClass }) {
  return (
    <div className="producto-card">
      <div className={`producto-img ${imgClass}`}></div>
      <div className="info">
        <p className="codigo-producto">Código: {codigo}</p>
        <h3 className="titulo-producto">{titulo}</h3>
        <p className="precio">{precio}</p>
        <p className="descripcion">{descripcion}</p>
        <button className="carrito">Agregar al carrito</button>
      </div>
    </div>
  );
}
