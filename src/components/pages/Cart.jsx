import React, { useEffect, useState } from 'react'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'


export default function Cart() {
  const [products, setProducts] = useState([]);

  // Cargar productos desde localStorage al montar el componente
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Función para eliminar un producto del carrito
  const removeFromCart = (codigo) => {
    const updatedProducts = products.filter((item) => item.codigo !== codigo);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Convertir precio "$45.000" → 45000
  const parsePrecio = (precio) => {
    if (!precio) return 0;
    return parseInt(precio.replace(/\$|\./g, ''), 10);
  };

  // Calcular subtotal y total (con descuento del 30%)
  const subtotal = products.reduce((acc, item) => acc + parsePrecio(item.precio), 0);
  const descuento = subtotal * 0.3;
  const total = subtotal - descuento;

  // Formatear número en CLP
  const formatCLP = (num) =>
    num.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  return (
    <>
      <Header />

      <section className="banner-carrito">
        <div>
          <h1>Tu Carrito de Compras</h1>
        </div>
      </section>

      <div className="container">
        <div className="carrito-container">
          {/* Lista de productos */}
          <div className="carrito-items">
            <div className="carrito-header">
              <h2 className="titulo-carrito">Tus Productos</h2>
              <span>{products.length} items</span>
            </div>

            {products.length === 0 ? (
              <p>Tu carrito está vacío 🛒</p>
            ) : (
              products.map((item, index) => (
                <div key={index} className="producto-en-carrito">
                  <div className="mini-img">
                    <img src={item.img} alt={item.titulo} />
                  </div>
                  <div className="info-producto">
                    <h3>{item.titulo}</h3>
                    <p>{item.descripcion}</p>
                    <p><strong>{item.precio}</strong></p>
                  </div>
                  <button
                    className="btn-eliminar"
                    onClick={() => removeFromCart(item.codigo)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Resumen */}
          <div className="carrito-resumen">
            <h2 className="resumen-titulo">Resumen de Compra</h2>

            <div className="resumen-item">
              <span>Subtotal ({products.length} productos)</span>
              <span>{formatCLP(subtotal)}</span>
            </div>

            <div className="resumen-item">
              <span>
                Descuento <span className="descuento">-30%</span>
              </span>
              <span style={{ color: '#4CAF50' }}>-{formatCLP(descuento)}</span>
            </div>

            <div className="resumen-item">
              <span>Envío</span>
              <span style={{ color: '#4CAF50' }}>Gratis</span>
            </div>

            <div className="resumen-total">
              <span>Total</span>
              <span>{formatCLP(total)}</span>
            </div>

            <div className="cupon-descuento">
              <label htmlFor="cupon">¿Tienes un cupón?</label>
              <div className="cupon-input">
                <input type="text" id="cupon" placeholder="Ingresa tu cupón" />
                <button className="btn-cupon">Aplicar</button>
              </div>
            </div>

            <button className="btn-pago">Proceder al Pago</button>
            <a href="/productos" className="continuar-compra">
              ← Seguir comprando
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}