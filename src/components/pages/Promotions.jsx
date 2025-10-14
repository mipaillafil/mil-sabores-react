import React from "react";
import PromotionsGrid from "../organisms/PromotionGrid";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";

export default function Promotions() {
  return (
    <>
        <Header />
        <Banner
        className="banner-promociones"
        title="Promociones Especiales"
        subtitle="Disfruta de nuestras increíbles ofertas y descuentos exclusivos"
        buttonText="Volver al inicio"
        buttonLink="/"
      />
        <PromotionsGrid />
      <Footer />
    </>
  );
}
