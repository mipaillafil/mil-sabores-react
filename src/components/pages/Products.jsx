import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Banner from "../organisms/Banner";
import NavCategorias from "../organisms/NavCategories";
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

const CATEGORIAS = [
  { id: "tortas-cuadradas", titulo: "Tortas Cuadradas", apiValue: "Tortas Cuadradas" },
  { id: "tortas-circulares", titulo: "Tortas Circulares", apiValue: "Tortas Circulares" },
  { id: "postres-individuales", titulo: "Postres Individuales", apiValue: "Postres Individuales" },
  { id: "productos-sin-azucar", titulo: "Productos Sin Azúcar", apiValue: "Productos Sin Azúcar" },
  { id: "pasteleria-tradicional", titulo: "Pastelería Tradicional", apiValue: "Pastelería Tradicional" },
  { id: "productos-sin-gluten", titulo: "Productos Sin Gluten", apiValue: "Productos Sin Gluten" },
  { id: "productos-veganos", titulo: "Productos Veganos", apiValue: "Productos Vegana" },
  { id: "tortas-especiales", titulo: "Tortas Especiales", apiValue: "Tortas Especiales" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts(); // GET /products
        const activos = (data || []).filter(
          (p) => p.activo === undefined || p.activo
        );
        setProducts(activos);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const renderCategory = (categoriaApi) => {
    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p className="error-message">{error}</p>;

    const filtered = products.filter((p) => p.categoria === categoriaApi);

    if (!filtered.length) {
      return <p>No hay productos disponibles en esta categoría.</p>;
    }

    return (
      <div className="productos-grid">
        {filtered.map((p) => {
          const imgClass = imgClassByNombre[p.nombre] || "producto-generico";

          return (
            <ProductCard
              key={p.id}
              codigo={p.id}
              titulo={p.nombre}
              precio={`$${Number(p.precio).toLocaleString("es-CL")}`}
              descripcion={p.descripcion || "Delicioso producto de nuestra pastelería."}
              imgClass={imgClass}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Header />
      <Banner
        className="banner-productos"
        title="Nuestros Productos"
        subtitle="Explora nuestra amplia variedad de tortas, pasteles y postres hechos con amor"
        buttonText="Ver Promociones"
        buttonLink="/promociones"
      />

      <NavCategorias />

      {CATEGORIAS.map((cat) => (
        <section
          key={cat.id}
          className="container categoria-productos"
          id={cat.id}
        >
          <h2 className="titulo-seccion">{cat.titulo}</h2>
          {renderCategory(cat.apiValue)}
        </section>
      ))}

      <Footer />
    </>
  );
}
