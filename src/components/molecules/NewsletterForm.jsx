import React from "react";

const NewsletterForm = () => {
  return (
    <form className="newsletter-form">
      <input type="email" placeholder="Tu correo electrónico" required />
      <button type="submit">Suscribirme</button>
    </form>
  );
};

export default NewsletterForm;