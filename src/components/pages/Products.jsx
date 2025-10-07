import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Banner from "../organisms/Banner";
import NavCategorias from "../organisms/NavCategories";
import ProductCard from "../molecules/ProductCard";

export default function Products() {
  return (
    <>
      <Header />
      <Banner />
      <NavCategorias />

      <section className="container categoria-productos" id="tortas-cuadradas">
        <h2 className="titulo-seccion">Tortas Cuadradas</h2>
        <div className="productos-grid">
          <ProductCard
            codigo="TC001"
            titulo="Torta Cuadrada de Chocolate"
            precio="$45.000"
            descripcion="Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."
            imgClass="torta-cuadrada-chocolate"
          />
          <ProductCard
            codigo="TC002"
            titulo="Torta Cuadrada de Frutas"
            precio="$50.000"
            descripcion="Exquisita torta con frutas frescas de la estación, bañada en gelatina brillante. Perfecta para celebraciones."
            imgClass="torta-cuadrada-frutas"
          />
        </div>
      </section>
      <section className="container categoria-productos" id="tortas-circulares">
        <h2 className="titulo-seccion">Tortas Circulares</h2>
        <div className="productos-grid">
        <ProductCard
            codigo="TT001"
            titulo="Torta Circular de Manjar"
            precio="$40.000"
            descripcion="Bizcocho de vainilla relleno con manjar casero y cubierto con crema chantillí. Un clásico de la repostería chilena."
            imgClass="torta-circular-manjar"
          />
          <ProductCard
            codigo="TT002"
            titulo="Torta Circular de Vainilla"
            precio="$42.000"
            descripcion="Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión."
            imgClass="torta-circular-vainilla"
          />
          </div>
      </section>
       <section className="container categoria-productos" id="postres-individuales">
        <h2 className="titulo-seccion">Postres Individuales</h2>
        <div className="productos-grid">
        <ProductCard
            codigo="PI001"
            titulo="Mousse de Chocolate"
            precio="$5.000"
            descripcion="Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate."
            imgClass="mousse-chocolate"
          />
          <ProductCard
            codigo="PI002"
            titulo="Tiramisú Clásico"
            precio="$5.500"
            descripcion="Clásico italiano con capas de bizcocho de soletilla embebido en café y crema de mascarpone. Espolvoreado con cacao."
            imgClass="tiramisu"
          />
          </div>
      </section>
      <section className="container categoria-productos" id="sin-azucar">
        <h2 className="titulo-seccion">Productos Sin Azúcar</h2>
        <div className="productos-grid">
        <ProductCard
            codigo="PSA001"
            titulo="Torta sin Azúcar de Naranja"
            precio="$48.000"
            descripcion="Torta esponjosa de naranja endulzada naturalmente, ideal para personas que cuidan su consumo de azúcar."
            imgClass="torta-naranja-sin-azucar"
          />
          <ProductCard
            codigo="PSA002"
            titulo="Cheesecake Sin Azúcar"
            precio="$47.000"
            descripcion="Delicioso cheesecake con base de nueces, endulzado con stevia. Opción saludable sin sacrificar el sabor."
            imgClass="cheesecake-sin-azucar"
          />
          </div>
      </section>
      <section className="container categoria-productos" id="tradicional">
        <h2 className="titulo-seccion">Pastelería Tradicional</h2>
        <div className="productos-grid">
        <ProductCard
            codigo="PT001"
            titulo="Empanada de Manzana"
            precio="$3.000"
            descripcion="Empanada de hojaldre rellena de manzana canela. Perfecta para acompañar el té o café de la tarde."
            imgClass="empanada-manzana"
          />
          <ProductCard
            codigo="PT002"
            titulo="Tarta de Santiago"
            precio="$6.000"
            descripcion="Tarta tradicional de almendras con una crujiente textura y sabor intenso. Espolvoreada con azúcar glass."
            imgClass="tarta-santiago"
          />
          </div>
      </section>
      <section className="container categoria-productos" id="sin-gluten">
        <h2 className="titulo-seccion">Productos Sin Gluten</h2>
        <div className="productos-grid">
        <ProductCard
            codigo="PG001"
            titulo="Brownie Sin Gluten"
            precio="$4.000"
            descripcion="Brownie de chocolate intenso, elaborado con harina de almendras. Para celíacos y amantes del chocolate."
            imgClass="brownie-sin-gluten"
          />
          <ProductCard
            codigo="PG002"
            titulo="Pan Sin Gluten"
            precio="$3.500"
            descripcion="Pan elaborado con harina de arroz y tapioca, esponjoso y perfecto para desayunos y meriendas."
            imgClass="pan-sin-gluten"
          />
          </div>
      </section>
      <section className="container categoria-productos" id="veganos">
        <h2 className="titulo-seccion">Productos Veganos</h2>
        <div className="productos-grid">
        <ProductCard
            codigo="PV001"
            titulo="Torta Vegana de Chocolate"
            precio="$50.000"
            descripcion="Torta de chocolate sin ingredientes de origen animal. Elaborada con sustitutos veganos manteniendo el sabor intenso."
            imgClass="torta-vegana-chocolate"
          />
          <ProductCard
            codigo="PV002"
            titulo="Galletas Veganas de Avena"
            precio="$4.500"
            descripcion="Galletas crujientes de avena con pasas y canela. Sin lácteos ni huevos, perfectas para una merienda saludable."
            imgClass="galletas-avena-veganas"
          />
          </div>
      </section>
      <section className="container categoria-productos" id="tortas-especiales">
        <h2 className="titulo-seccion">Tortas Especiales</h2>
        <div className="productos-grid">
        <ProductCard
            codigo="TE001"
            titulo="Torta Especial de Cumpleaños"
            precio="$55.000"
            descripcion="Torta decorada para celebraciones especiales, personalizable con colores, mensajes y decoraciones temáticas."
            imgClass="torta-cumpleanos"
          />
          <ProductCard
            codigo="TE002"
            titulo="Galletas Veganas de Avena"
            precio="$60.00"
            descripcion="Elegante torta nupcial de varios pisos, con decoración refinada y sabores exquisitos para el día especial."
            imgClass="torta-boda"
          />
          </div>
      </section>


      {/* Repetir secciones con ProductCard para cada categoría */}
      {/* ...Tortas Circulares, Postres Individuales, Sin Azúcar, etc. */}

      <Footer />
    </>
  );
}
