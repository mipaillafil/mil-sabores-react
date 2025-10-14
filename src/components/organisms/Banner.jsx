import React from "react";
import { Link } from "react-router-dom";

export default function Banner({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  className 
}) {
  return (
    <section className={`banner ${className}`}>
      <div className="banner-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {buttonText && buttonLink && (
          <div className="btn-productos">
            <Link to={buttonLink}>
              <button>{buttonText}</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
