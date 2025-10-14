import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Banner from "../organisms/Banner";
import Categories from "../organisms/Categories";
import FeaturedProducts from "../organisms/FeaturedProducts";
import PromotionsHighlights from "../organisms/PromotionsHighlights";

export default function Home() {
  return (
    <>
      <Header />         
        <Banner
        className="banner-index"
        title="50 años endulzando momentos"
        subtitle="Descubre la tradición y el sabor de la repostería chilena con nuestras deliciosas tortas y postres artesanales"
        buttonText="Ver Productos"
        buttonLink="/productos"
      />
        <Categories />
        <FeaturedProducts />
        <PromotionsHighlights />
      <Footer />           
    </>
  );
}
