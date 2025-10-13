import React from "react";

const BlogFilters = () => (
  <div className="blog-filters">
    <button className="filter-btn active" data-filter="all">Todos</button>
    <button className="filter-btn" data-filter="recetas">Recetas</button>
    <button className="filter-btn" data-filter="consejos">Consejos</button>
    <button className="filter-btn" data-filter="noticias">Noticias</button>
    <button className="filter-btn" data-filter="estudiantes">Estudiantes Duoc UC</button>
  </div>
);

export default BlogFilters;
