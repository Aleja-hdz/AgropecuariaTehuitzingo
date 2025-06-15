import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const { name, price, image, description, stock, specifications } = product;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-body">
          <div className="modal-image">
            <img src={image} alt={name} />
          </div>
          
          <div className="modal-info">
            <h2 className="modal-title">{name}</h2>
            <p className="modal-description">{description}</p>
            
            <div className="modal-price">
              <span className="price-label">Precio:</span>
              <span className="price-value">${price}</span>
            </div>
            
            <div className="modal-stock">
              <span className="stock-label">Stock disponible:</span>
              <span className="stock-value">{stock} unidades</span>
            </div>
            
            {specifications && (
              <div className="modal-specifications">
                <h3>Especificaciones</h3>
                <ul>
                  {specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="modal-actions">
              <button className="modal-button primary">Agregar al Carrito</button>
              <button className="modal-button secondary">Comprar Ahora</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 