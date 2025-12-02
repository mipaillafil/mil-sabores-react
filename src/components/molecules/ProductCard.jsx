import React from "react";
import "../pages/Products.css";

export default function ProductCard(props) {
  const { codigo, titulo, precio, descripcion, imgClass } = props;

  // Mapa para guardar la ruta real de la imagen
  // (se usa para el carrito)
  const imgMap = {
    "torta-cuadrada-chocolate": "/img/torta_chocolate.jpg",
    "torta-cuadrada-frutas": "/img/torta_cuadrada.jpg",
    "torta-circular-manjar": "/img/torta_manjar_v2.jpg",
    "torta-circular-vainilla": "/img/torta_vainilla.jpg",
    "mousse-chocolate": "/img/mousse.jpg",
    "tiramisu": "/img/tiramisu.jpg",
    "torta-naranja-sin-azucar": "/img/torta_naranja.jpg",
    "cheesecake-sin-azucar": "/img/cheesecake_frutilla.webp",
    "empanada-manzana": "/img/empanada_manzana.jpg",
    "tarta-santiago": "/img/tarta_santiago.jpg",
    "brownie-sin-gluten": "/img/brownie.jpg",
    "pan-sin-gluten": "/img/pan_sin_gluten.jpg",
    "torta-vegana-chocolate": "/img/chocolate_vegano.jpg",
    "galletas-avena-veganas": "/img/galleta_vegana.jpg",
    "torta-cumpleanos": "/img/torta_hbd.jpg",
    "torta-boda": "/img/torta_boda.jpg",
  };


  const productWithImg = {
    ...props,
    img: imgMap[imgClass] || "",
  };

  function addToCart() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(productWithImg);
    localStorage.setItem("products", JSON.stringify(products));
    console.log(products);
  }

  return (
    <div className="producto-card">
      {/* AQUÍ NO PONEMOS <img>, sólo un DIV con background */}
      <div className={`producto-img ${imgClass}`}></div>

      <div className="info">
        <p className="codigo-producto">Código: {codigo}</p>
        <h3 className="titulo-producto">{titulo}</h3>
        <p className="precio">{precio}</p>
        <p className="descripcion">{descripcion}</p>
        <button onClick={addToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
}
