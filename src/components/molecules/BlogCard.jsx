import React from "react";

const BlogCard = ({ imageClass, category, title, excerpt, author, date }) => (
  <article className="blog-card">
    <div className={`blog-image ${imageClass}`}></div>
    <div className="blog-content">
      <span className="blog-category">{category}</span>
      <h3>{title}</h3>
      <p className="blog-excerpt">{excerpt}</p>
      <div className="blog-meta">
        <span className="blog-author">Por: {author}</span>
        <span className="blog-date">{date}</span>
      </div>
      <a href="#" className="blog-read-more">Leer más</a>
    </div>
  </article>
);

export default BlogCard;
