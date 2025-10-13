import React from "react";
import BlogCard from "../molecules/BlogCard";

const BlogGrid = () => (
  <div className="blog-grid">
    <BlogCard
      imageClass="receta-torta-chocolate"
      category="Receta - Estudiantes Duoc UC"
      title="Torta de Chocolate: El secreto del bizcocho esponjoso"
      excerpt="Los estudiantes de repostería de Duoc UC comparten su técnica infalible para lograr un bizcocho húmedo y esponjoso."
      author="Camilo Leiva"
      date="15 Marzo, 2025"
    />
    <BlogCard
      imageClass="consejo-decoracion"
      category="Consejos"
      title="5 técnicas de decoración que puedes hacer en casa"
      excerpt="Aprende técnicas profesionales de decoración de pasteles con herramientas que tienes en tu cocina."
      author="Chef Alan Brito"
      date="12 Nov, 2024"
    />
    <BlogCard
      imageClass="competencia-reposteria"
      category="Noticias - Estudiantes Duoc UC"
      title="Estudiantes de Duoc UC ganan competencia nacional de repostería"
      excerpt="El equipo de gastronomía obtuvo el primer lugar con su innovadora torta inspirada en sabores chilenos."
      author="Departamento de Comunicaciones"
      date="8 Jul, 2025"
    />
  </div>
);

export default BlogGrid;
