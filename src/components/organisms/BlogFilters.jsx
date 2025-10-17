import React from "react";


/*const BlogFilters = () => (
  <div className="blog-filters">
    <button className="filter-btn active" data-filter="all">Todos</button>
    <button className="filter-btn" data-filter="recetas">Recetas</button>
    <button className="filter-btn" data-filter="consejos">Consejos</button>
    <button className="filter-btn" data-filter="noticias">Noticias</button>
    <button className="filter-btn" data-filter="estudiantes">Estudiantes Duoc UC</button>
  </div>
);*/

export default function BlogFilters({activeFilter, onFilterChange}){
  const filters = [
    {label: "Todos", value: "all"},
    {label: "Recetas", value: "recetas"},
    {label: "Consejos", value: "consejos"},
    {label: "Noticias", value: "noticias"},
    {label: "Estudiantes Duoc UC", value: "estudiantes"},
  ];

    return (
    <div className="blog-filters">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${activeFilter === f.value ? "active" : ""}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
