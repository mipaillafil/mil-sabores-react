import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Banner from "../organisms/Banner";
import NavCategorias from "../organisms/NavCategories";
import ProductCard from "../molecules/ProductCard";
import { apiGetPublicProducts } from "../../api";

const imgClassByNombre = {
  "Torta cuadrada de chocolate": "torta-cuadrada-chocolate",
  "Torta cuadrada de frutas": "torta-cuadrada-frutas",
  "Torta circular de manjar": "torta-circular-manjar",
  "Torta circular de vainilla": "torta-circular-vainilla",
  "Mousse de chocolate": "mousse-chocolate",
  "Tiramisú": "tiramisu",
  "Torta de naranja sin azúcar": "torta-naranja-sin-azucar",
  "Cheesecake de frutilla sin azúcar": "cheesecake-sin-azucar",
  "Empanada de manzana": "empanada-manzana",
  "Tarta de Santiago": "tarta-santiago",
  "Brownie sin gluten": "brownie-sin-gluten",
  "Pan sin gluten": "pan-sin-gluten",
  "Torta vegana de chocolate": "torta-vegana-chocolate",
  "Galletas veganas de avena": "galletas-avena-veganas",
  "Torta especial de cumpleaños": "torta-cumpleanos",
  "Torta especial de boda": "torta-boda",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGetPublicProducts()
      .then(setProducts)
      .catch(() =>
        setError("No se pudieron cargar los productos. Intenta más tarde.")
      );
  }, []);

  const byCategory = (cat) =>
    products.filter((p) => p.categoria === cat && p.activo);

  const formatCLP = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const renderCategory = (id, title, catName) => (
    <section className="container categoria-productos" id={id}>
      <h2 className="titulo-seccion">{title}</h2>
      <div className="productos-grid">
        {byCategory(catName).map((p) => (
          <ProductCard
            key={p.id}
            codigo={`P${p.id}`}
            titulo={p.nombre}
            precio={formatCLP(p.precio)}
            descripcion={p.descripcion}
            imgClass={imgClassByNombre[p.nombre] || "torta-cuadrada-chocolate"}
          />
        ))}
      </div>
    </section>
  );

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

      {error && <p className="error-message">{error}</p>}

      {renderCategory("tortas-cuadradas", "Tortas Cuadradas", "Tortas Cuadradas")}
      {renderCategory("tortas-circulares", "Tortas Circulares", "Tortas Circulares")}
      {renderCategory("postres-individuales", "Postres Individuales", "Postres individuales")}
      {renderCategory("sin-azucar", "Productos sin azúcar", "Sin azúcar")}
      {renderCategory("sin-gluten", "Productos Sin Gluten", "Productos sin gluten")}
      {renderCategory("veganos", "Productos Veganos", "Productos veganos")}
      {renderCategory("tortas-especiales", "Tortas Especiales", "Tortas especiales")}

      <Footer />
    </>
  );
}
