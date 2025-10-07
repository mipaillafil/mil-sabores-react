import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Banner from "../organisms/Banner";
import Categories from "../organisms/Categories";
import FeaturedProducts from "../organisms/FeaturedProducts";
import Promotions from "../organisms/Promotions";

export default function Home() {
  return (
    <>
      <Header />         
        <Banner />
        <Categories />
        <FeaturedProducts />
        <Promotions />
      <Footer />           
    </>
  );
}
