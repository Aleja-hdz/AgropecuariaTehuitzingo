import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { name, price, image, description, stock } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-details">
          <span className="product-price">${price}</span>
          <span className="product-stock">Stock: {stock}</span>
        </div>
        <button className="product-button">Ver Detalles</button>
      </div>
    </div>
  );
};

export default ProductCard; 