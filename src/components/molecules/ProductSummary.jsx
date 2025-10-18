import React from 'react';

const ProductSummary = ({ image, name, quantity, customization, price }) => {
  return (
    <div className="product-summary">
      <img src={image} alt={name} className="product-summary__image" />
      <div className="product-summary__info">
        <h5 className="product-summary__name">{name}</h5>
        <p className="product-summary__quantity">Cantidad: {quantity}</p>
        {customization && (
          <p className="product-summary__customization">{customization}</p>
        )}
      </div>
      <div className="product-summary__price">${price.toLocaleString()}</div>
    </div>
  );
};

export default ProductSummary;