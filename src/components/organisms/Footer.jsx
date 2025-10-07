import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Pastelería Mil Sabores</h3>
            <p>
              50 años endulzando momentos especiales con la mejor repostería
              chilena.
            </p>
            <div className="social-icons">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">X</a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li>
                <a href="index.html">Inicio</a>
              </li>
              <li>
                <a href="productos.html">Productos</a>
              </li>
              <li>
                <a href="promociones.html">Promociones</a>
              </li>
              <li>
                <a href="blog.html">Blog</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contáctanos</h3>
            <p>Dirección: Av. Dulce 123, Santiago</p>
            <p>Teléfono: +56 2 2345 6789</p>
            <p>Email: info@milsabores.cl</p>
          </div>
        </div>
        <div className="copyright">
          <p>
            &copy; 2025 Pastelería Mil Sabores - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
