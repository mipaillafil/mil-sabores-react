import React from "react";


export default function ProductCard(props){
  const{codigo, titulo, precio, descripcion, imgClass}=props

  function addToCart(){
    const products=JSON.parse(localStorage.getItem('products')) || []
    products.push(props)
    localStorage.setItem('products',JSON.stringify(products))
    console.log(products)
  }


  return (
    <div className="producto-card">
      <div className={`producto-img ${imgClass}`}></div>
      <div className="info">
        <p className="codigo-producto">Código: {codigo}</p>
        <h3 className="titulo-producto">{titulo}</h3>
        <p className="precio">{precio}</p>
        <p className="descripcion">{descripcion}</p>
        <button onClick={()=>addToCart()}>Agregar al carrito</button>
      </div>
    </div>
  );
}
