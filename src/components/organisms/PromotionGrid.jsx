import React from "react";
import PromotionCard from "../molecules/PromotionCard";

export default function PromotionsGrid() {
  const promociones = [
    {
      badge: "50% OFF",
      title: "50% de Descuento",
      description: "Para usuarios mayores de 50 años en todos nuestros productos",
      validity: "Válido hasta: 31/12/2025",
      buttonText: "Aprovechar Oferta",
      imageClass: "descuento-mayores",
    },
    {
      badge: "10% OFF",
      title: "10% de Descuento Permanente",
      description:
        'Regístrate con el código "FELICES50" y disfruta de un descuento permanente',
      validity: "Válido siempre",
      buttonText: "Usar Código",
      imageClass: "descuento-registro",
    },
    {
      badge: "GRATIS",
      title: "Torta Gratis para Estudiantes",
      description:
        "Estudiantes de Duoc UC reciben torta gratis en su cumpleaños al registrarse con correo institucional",
      validity: "Para estudiantes Duoc UC",
      buttonText: "Reclamar",
      imageClass: "torta-cumpleanos",
    },
    {
      badge: "2x1",
      title: "2x1 en Cupcakes",
      description:
        "Todos los martes disfruta de 2x1 en nuestra selección de cupcakes artesanales",
      validity: "Todos los martes",
      buttonText: "Ver Cupcakes",
      imageClass: "oferta-2x1",
    },
    {
      badge: "15% OFF",
      title: "15% en Productos Veganos",
      description:
        "Descuento especial en toda nuestra línea de productos veganos y sin gluten",
      validity: "Válido hasta: 30/11/2025",
      buttonText: "Ver Productos",
      imageClass: "descuento-vegano",
    },
    {
      badge: "ENVÍO GRATIS",
      title: "Envío Gratis en Santiago",
      description:
        "En compras superiores a $30.000 recibes envío gratis a todo Santiago",
      validity: "Siempre",
      buttonText: "Hacer Pedido",
      imageClass: "envio-gratis",
    },
  ];

  return (
    <section className="container">
      <h2 className="titulo-seccion">Ofertas Destacadas</h2>
      <div className="promociones-wrapper">
        <div className="promociones-container">
          <div className="promociones-grid">
            {promociones.map((promo, i) => (
              <PromotionCard key={i} {...promo} />
            ))}
          </div>
          <div className="promociones-navigation">
            <button className="nav-btn prev-btn" disabled>
              ←
            </button>
            <button className="nav-btn next-btn">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
