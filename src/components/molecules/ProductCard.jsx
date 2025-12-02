import React from "react";

export default function ProductCard(props) {
  const { codigo, titulo, precio, descripcion, imgClass } = props;

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
    "producto-generico": "/img/postres.jpg"
  };

  const imageSrc = imgMap[imgClass] || imgMap["producto-generico"];

  function addToCart() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({
      codigo,
      titulo,
      precio,
      descripcion,
      img: imageSrc,
    });

    localStorage.setItem("products", JSON.stringify(products));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <div className="producto-card">
      {/* Imagen que respeta el cuadro */}
      <div className="producto-img-wrapper">
        <img src={imageSrc} alt={titulo} className="producto-img-real" />
      </div>

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
