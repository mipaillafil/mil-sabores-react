import React from "react";

export default function ProductCard(props) {
  const { codigo, titulo, precio, descripcion, imgClass } = props;

  /* PARA CARGAR IMÁGENES */
  const imgMap = {
    'torta-cuadrada-chocolate': 'img/torta-chocolate.jpg',
    'torta-cuadrada-frutas': 'img/torta cuadrada.jpg',
    'torta-circular-manjar': 'img/torta manjar v2.jpg',
    'torta-circular-vainilla': 'img/torta-vainilla.jpg',
    'mousse-chocolate': 'img/mousse.jpg',
    'tiramisu': 'img/tiramisu.jpg',
    'torta-naranja-sin-azucar': 'img/torta naranja.jpg',
    'cheesecake-sin-azucar': 'img/cheesecake frutilla.webp',
    'empanada-manzana': 'img/empanada manzana.jpg',
    'tarta-santiago': 'img/tarta santiago.jpg',
    'brownie-sin-gluten': 'img/brownie.jpg',
    'pan-sin-gluten': 'img/pan sin gluten.jpg',
    'torta-vegana-chocolate': 'img/chocolate vegano.jpg',
    'galletas-avena-veganas': 'img/galleta vegana.jpg',
    'torta-cumpleanos': 'img/torta-hbd.jpg',
    'torta-boda': 'img/torta boda.jpg',
  };

  const productWithImg = {
    codigo,
    titulo,
    precio,
    descripcion,
    imgClass,
    img: imgMap[imgClass] || "",
    quantity: 1, // necesario para Cart.jsx
  };

  function addToCart() {
    const current = JSON.parse(localStorage.getItem("products")) || [];
    current.push(productWithImg);
    localStorage.setItem("products", JSON.stringify(current));
    window.dispatchEvent(new Event("cart-updated"));

    console.log("Producto agregado:", productWithImg);
  }

  return (
    <div className="producto-card">
      <div className={`producto-img ${imgClass}`}></div>

      <div className="info">
        <p className="codigo-producto">Código: {codigo}</p>
        <h3 className="titulo-producto">{titulo}</h3>
        <p className="precio">{precio}</p>
        <p className="descripcion">{descripcion}</p>

        <button onClick={addToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
