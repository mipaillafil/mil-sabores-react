import React from "react";

import { Link } from "react-router-dom";
import PromotionsGrid from "../organisms/PromotionGrid";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import Banner from "../organisms/Banner";

export default function Promotions() {
  return (
    <>
        <Header />
        <Banner />
        <PromotionsGrid />
      <Footer />
    </>
  );
}
