import React from "react";
import BlogCard from "../molecules/BlogCard";

const BlogGrid = ({ activeFilter }) => {
  const posts = [
    {
      imageClass: "receta-torta-chocolate",
      dataCategory: "recetas estudiantes",
      category: "Receta - Estudiantes Duoc UC",
      title: "Torta de Chocolate: El secreto del bizcocho esponjoso",
      excerpt:
        "Los estudiantes de repostería de Duoc UC comparten su técnica infalible para lograr un bizcocho de chocolate húmedo y esponjoso.",
      author: "Camilo Leiva",
      date: "15 Marzo, 2025",
    },
    {
      imageClass: "consejo-decoracion",
      dataCategory: "consejos",
      category: "Consejos",
      title: "5 técnicas de decoración que puedes hacer en casa",
      excerpt:
        "Aprende técnicas profesionales de decoración de pasteles con herramientas que tienes en tu cocina.",
      author: "Chef Alan Brito",
      date: "12 Nov, 2024",
    },
    {
      imageClass: "competencia-reposteria",
      dataCategory: "noticias estudiantes",
      category: "Noticias - Estudiantes Duoc UC",
      title: "Estudiantes de Duoc UC ganan competencia nacional de repostería",
      excerpt:
        "El equipo de gastronomía obtuvo el primer lugar con su innovadora torta inspirada en sabores chilenos.",
      author: "Departamento de Comunicaciones",
      date: "8 Jul, 2025",
    },
    {
      imageClass: "receta-vegana",
      dataCategory: "recetas",
      category: "Recetas",
      title: "Brownie vegano: Delicioso y sin ingredientes animales",
      excerpt:
        "Una receta fácil y deliciosa para disfrutar del chocolate sin lácteos ni huevos. Perfecta para intolerancias.",
      author: "Fernando Sepulveda",
      date: "10 Abr, 2025",
    },
    {
      imageClass: "tendencias-reposteria",
      dataCategory: "consejos estudiantes",
      category: "Consejos - Estudiantes Duoc UC",
      title:
        "Las tendencias en repostería para 2025 según nuestros estudiantes",
      excerpt:
        "Los futuros chefs analizan lo que se viene en el mundo de la pastelería: sabores, texturas y técnicas.",
      author: "Estudiantes de Gastronomía",
      date: "1 Mar, 2025",
    },
    {
      imageClass: "evento-taller",
      dataCategory: "noticias",
      category: "Noticias",
      title: "Taller gratuito de decoración de cupcakes este sábado",
      excerpt:
        "Inscríbete en nuestro taller presencial donde aprenderás técnicas básicas de decoración. Cupos limitados.",
      author: "Equipo Mil Sabores",
      date: "28 May, 2025",
    },
  ];

  //filtro dinamico
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    const categories = post.dataCategory.split(" ");
    return categories.includes(activeFilter);
  });

  return (
    <div className="blog-grid">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => <BlogCard key={index} {...post} />)
      ) : (
        <p>No hay publicaciones en esta categoría.</p>
      )}
    </div>
  );
};

export default BlogGrid;