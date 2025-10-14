import React, { useRef, useState, useEffect } from "react";
import PromotionCard from "../molecules/PromotionCard";

export default function PromotionsGrid() {
  const promocionesContainerRef = useRef(null);
  const [canScroll, setCanScroll] = useState(true);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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

  // 🧠 Función para actualizar el estado de los botones
  const updateButtonStates = () => {
    const container = promocionesContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const start = scrollLeft <= 0;
    const end = scrollLeft >= scrollWidth - clientWidth - 10;

    setAtStart(start);
    setAtEnd(end);
  };

  // 🎢 Scroll suave
  const smoothScroll = (direction) => {
    if (!canScroll || !promocionesContainerRef.current) return;

    setCanScroll(false);
    const scrollAmount = promocionesContainerRef.current.clientWidth * 0.8;

    promocionesContainerRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });

    setTimeout(() => setCanScroll(true), 500);
  };

  // 🎯 Efectos y listeners
  useEffect(() => {
    const container = promocionesContainerRef.current;
    if (!container) return;

    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateButtonStates, 100);
    };

    const handleResize = () => {
      setTimeout(updateButtonStates, 200);
    };

    const handleKeydown = (e) => {
      if (e.key === "ArrowLeft") {
        smoothScroll("prev");
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        smoothScroll("next");
        e.preventDefault();
      }
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeydown);

    updateButtonStates(); // Estado inicial

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [canScroll]);

  // 🧱 Render del componente
  return (
    <section className={`container promociones-wrapper ${!atStart ? "scroll-start" : ""} ${!atEnd ? "scroll-end" : ""}`}>
      <h2 className="titulo-seccion">Ofertas Destacadas</h2>

      <div className="promociones-container" ref={promocionesContainerRef}>
        <div className="promociones-grid">
          {promociones.map((promo, i) => (
            <PromotionCard key={i} {...promo} />
          ))}
        </div>
      </div>

      <div className="promociones-navigation">
        <button
          className="nav-btn prev-btn"
          onClick={() => smoothScroll("prev")}
          disabled={atStart}
        >
          ←
        </button>
        <button
          className="nav-btn next-btn"
          onClick={() => smoothScroll("next")}
          disabled={atEnd}
        >
          →
        </button>
      </div>
    </section>
  );
}
