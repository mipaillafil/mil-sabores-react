import React from "react";

export default function PromotionCard({
  badge,
  title,
  description,
  validity,
  buttonText,
  imageClass,
}) {
  return (
    <div className="promocion-card">
      <div className="promocion-badge">{badge}</div>
      <div className={`promocion-imagen ${imageClass}`}></div>
      <div className="promocion-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="promocion-details">
          <span className="promocion-validez">{validity}</span>
          <button className="btn-promocion">{buttonText}</button>
        </div>
      </div>
    </div>
  );
}
