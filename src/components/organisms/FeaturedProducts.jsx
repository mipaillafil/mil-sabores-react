// src/components/organisms/FeaturedProducts.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import { getProducts } from "../../services/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // mapa nombre -> imgClass para reutilizar tus imágenes locales
  const nameToImgClass = {
    "Torta cuadrada de chocolate": "torta-cuadrada-chocolate",
    "Torta cuadrada de frutas": "torta-cuadrada-frutas",
    "Torta circular de manjar": "torta-circular-manjar",
    "Torta circular de vainilla": "torta-circular-vainilla",
    "Mousse de chocolate": "mousse-chocolate",
    "Tiramisú clásico": "tiramisu",
    "Torta sin azúcar de naranja": "torta-naranja-sin-azucar",
    "Cheesecake sin azúcar": "cheesecake-sin-azucar",
    "Empanada de manzana": "empanada-manzana",
    "Tarta de Santiago": "tarta-santiago",
    "Brownie sin gluten": "brownie-sin-gluten",
    "Pan sin gluten": "pan-sin-gluten",
    "Torta vegana de chocolate": "torta-vegana-chocolate",
    "Galletas veganas de avena": "galletas-avena-veganas",
    "Torta especial de cumpleaños": "torta-cumpleanos",
    "Torta especial de boda": "torta-boda",
  };

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar los productos");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="container">
        <h2 className="titulo-seccion">Productos Destacados</h2>
        <p>Cargando productos...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container">
        <h2 className="titulo-seccion">Productos Destacados</h2>
        <p>{error}</p>
      </section>
    );
  }

  // si quieres solo algunos destacados, por ahora tomamos los 3 primeros
  const destacados = products.slice(0, 3);

  return (
    <section className="container">
      <h2 className="titulo-seccion">Productos Destacados</h2>
      <div className="productos-destacados">
        {destacados.map((p) => (
          <div className="producto-card" key={p.id}>
            <ProductCard
              codigo={p.id}
              titulo={p.nombre}
              precio={`$${p.precio.toLocaleString("es-CL")}`}
              descripcion={p.descripcion}
              imgClass={nameToImgClass[p.nombre] || "torta-cuadrada-chocolate"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
