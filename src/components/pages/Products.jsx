import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Banner from "../organisms/Banner";
import NavCategorias from "../organisms/NavCategories";
import ProductCard from "../molecules/ProductCard";
import { getProducts } from "../../services/api";
import "./Products.css";


const imgClassByNombre = {
  "torta cuadrada de chocolate": "torta-cuadrada-chocolate",
  "torta cuadrada de frutas": "torta-cuadrada-frutas",
  "torta circular de manjar": "torta-circular-manjar",
  "torta circular de vainilla": "torta-circular-vainilla",
  "mousse de chocolate": "mousse-chocolate",
  "tiramisú clasico": "tiramisu",
  "tiramisu clasico": "tiramisu",
  "torta sin azúcar de naranja": "torta-naranja-sin-azucar",
  "torta sin azucar de naranja": "torta-naranja-sin-azucar",
  "cheesecake sin azúcar": "cheesecake-sin-azucar",
  "cheesecake sin azucar": "cheesecake-sin-azucar",
  "empanada de manzana": "empanada-manzana",
  "tarta de santiago": "tarta-santiago",
  "brownie sin gluten": "brownie-sin-gluten",
  "pan sin gluten": "pan-sin-gluten",
  "torta vegana de chocolate": "torta-vegana-chocolate",
  "galletas veganas de avena": "galletas-avena-veganas",
  "torta especial de cumpleaños": "torta-cumpleanos",
  "torta especial de cumpleanos": "torta-cumpleanos",
  "torta especial de boda": "torta-boda",
};

// helper: normaliza texto (minúsculas, sin tildes)
const normalize = (str = "") =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const getImgClassForName = (nombre) => {
  const key = normalize(nombre);
  return imgClassByNombre[key] || "producto-generico";
};

const CATEGORIAS = [
  { id: "tortas-cuadradas", titulo: "Tortas Cuadradas", apiValue: "Tortas Cuadradas" },
  { id: "tortas-circulares", titulo: "Tortas Circulares", apiValue: "Tortas Circulares" },
  { id: "postres-individuales", titulo: "Postres Individuales", apiValue: "Postres Individuales" },
  { id: "productos-sin-azucar", titulo: "Productos Sin Azúcar", apiValue: "Productos Sin Azúcar" },
  { id: "pasteleria-tradicional", titulo: "Pastelería Tradicional", apiValue: "Pastelería Tradicional" },
  { id: "productos-sin-gluten", titulo: "Productos Sin Gluten", apiValue: "Productos Sin Gluten" },
  { id: "productos-veganos", titulo: "Productos Veganos", apiValue: "Productos Veganos" },
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

    // 👇 comparamos categorías normalizadas (sin tildes, minúsculas)
    const filtered = products.filter(
      (p) => normalize(p.categoria) === normalize(categoriaApi)
    );

    if (!filtered.length) {
      return <p>No hay productos disponibles en esta categoría.</p>;
    }

    return (
      <div className="productos-grid">
        {filtered.map((p) => {
          const imgClass = getImgClassForName(p.nombre);

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
