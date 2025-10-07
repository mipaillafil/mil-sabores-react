import React from 'react'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'


export default function Cart() {
    const products=JSON.parse(localStorage.getItem('products')) || []


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
          <div className="carrito-items">
            <div className="carrito-header">
              <h2 className="titulo-carrito">Tus Productos</h2>
              <span>{products.length} items</span>
            </div>

            {/* Aquí irían los productos renderizados dinámicamente */}
            {/* Ejemplo:
              products.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))
            */}

          </div>

          <div className="carrito-resumen">
            <h2 className="resumen-titulo">Resumen de Compra</h2>

            <div className="resumen-item">
              <span>Subtotal ({products.length} productos)</span>
              <span>$0</span> {/* Reemplazar con subtotal dinámico */}
            </div>

            <div className="resumen-item">
              <span>Descuento <span className="descuento">-30%</span></span>
              <span style={{ color: '#4CAF50' }}>-$0</span> {/* Descuento dinámico */}
            </div>

            <div className="resumen-item">
              <span>Envío</span>
              <span style={{ color: '#4CAF50' }}>Gratis</span>
            </div>

            <div className="resumen-total">
              <span>Total</span>
              <span>$0 CLP</span> {/* Total dinámico */}
            </div>

            <div className="cupon-descuento">
              <label htmlFor="cupon">¿Tienes un cupón?</label>
              <div className="cupon-input">
                <input type="text" id="cupon" placeholder="Ingresa tu cupón" />
                <button className="btn-cupon">Aplicar</button>
              </div>
            </div>

            <button className="btn-pago">Proceder al Pago</button>
            <a href="productos.html" className="continuar-compra">← Seguir comprando</a>
          </div>
        </div>
      </div>
    </>
  )
}
