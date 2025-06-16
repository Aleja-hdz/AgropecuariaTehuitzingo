import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const { name, image, description, productCount } = category;

  return (
    <div className="category-card">
      <div className="category-image">
        <img src={image} alt={name} />
      </div>
      <div className="category-content">
        <h3 className="category-name">{name}</h3>
        <p className="category-description">{description}</p>
        <div className="category-footer">
          <span className="product-count">{productCount} productos</span>
          <button className="view-category">Ver Categoría</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 