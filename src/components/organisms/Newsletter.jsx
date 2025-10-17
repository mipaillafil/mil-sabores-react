import React from "react";
import NewsletterForm from "../molecules/NewsletterForm";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h2>Suscríbete a nuestro newsletter</h2>
          <p>
            Recibe recetas exclusivas, consejos de repostería y noticias sobre
            nuestros eventos
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
