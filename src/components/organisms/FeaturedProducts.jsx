import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import { getProducts } from "../../services/api";

const imgClassByNombre = {
  "Torta Cuadrada de Chocolate": "torta-cuadrada-chocolate",
  "Torta Cuadrada de Frutas": "torta-cuadrada-frutas",
  "Torta Circular de Manjar": "torta-circular-manjar",
  "Torta Circular de Vainilla": "torta-circular-vainilla",
  "Mousse de Chocolate": "mousse-chocolate",
  "Tiramisú Clásico": "tiramisu",
  "Torta sin Azúcar de Naranja": "torta-naranja-sin-azucar",
  "Cheesecake Sin Azúcar": "cheesecake-sin-azucar",
  "Empanada de Manzana": "empanada-manzana",
  "Tarta de Santiago": "tarta-santiago",
  "Brownie Sin Gluten": "brownie-sin-gluten",
  "Pan Sin Gluten": "pan-sin-gluten",
  "Torta Vegana de Chocolate": "torta-vegana-chocolate",
  "Galletas Veganas de Avena": "galletas-avena-veganas",
  "Torta Especial de Cumpleaños": "torta-cumpleanos",
  "Torta Especial de Boda": "torta-boda",
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts(); // GET /products
        // Solo productos activos
        const activos = (data || []).filter(
          (p) => p.activo === undefined || p.activo
        );
        setProducts(activos);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos destacados.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const destacados = products.slice(0, 4);

  return (
    <section className="container">
      <h2 className="titulo-seccion">Productos Destacados</h2>

      <div className="productos-destacados">
        {loading && <p>Cargando productos...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading &&
          !error &&
          destacados.map((p) => {
            const imgClass = imgClassByNombre[p.nombre] || "producto-generico";

            return (
              <div className="producto-card" key={p.id}>
                <ProductCard
                  codigo={p.id}
                  titulo={p.nombre}
                  precio={`$${Number(p.precio).toLocaleString("es-CL")}`}
                  descripcion={p.descripcion || "Delicioso producto de nuestra pastelería."}
                  imgClass={imgClass}
                />
              </div>
            );
          })}

        {!loading && !error && destacados.length === 0 && (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </section>
  );
}
