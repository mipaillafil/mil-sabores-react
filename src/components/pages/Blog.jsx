import React, { useState } from "react";

import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import BlogFilters from "../organisms/BlogFilters";
import BlogGrid from "../organisms/BlogGrid";
import Newsletter from "../organisms/Newsletter";
import Footer from "../organisms/Footer";


const Blog = () => {
  const [filter, setFilter] = useState("all"); // este es el filtro global
  return (
    <>
      <Header />
      <main>
         <Banner
        className="banner-blog"
        title="Blog de Repostería"
        subtitle="Consejos, recetas y noticias de los estudiantes de gastronomía de Duoc UC"
        buttonText="Volver al inicio"
        buttonLink="/"
      />
        <section className="container">
          <BlogFilters activeFilter={filter} onFilterChange={setFilter}/>
          <BlogGrid activeFilter={filter}/>
        </section>
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
