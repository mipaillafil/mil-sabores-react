import React from "react";

import Header from "../organisms/Header";
import Banner from "../organisms/Banner";
import BlogFilters from "../organisms/BlogFilters";
import BlogGrid from "../organisms/BlogGrid";
import NewsletterForm from "../molecules/NewsLetterForm";
import Footer from "../organisms/Footer";


const Blog = () => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <section className="container">
          <BlogFilters />
          <BlogGrid />
        </section>
        <NewsletterForm />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
