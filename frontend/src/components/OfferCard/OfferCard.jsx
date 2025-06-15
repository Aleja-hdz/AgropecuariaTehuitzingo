import React from 'react';
import './OfferCard.css';

const OfferCard = ({ offer }) => {
  const { title, description, discount, validUntil, image } = offer;

  return (
    <div className="offer-card">
      <div className="offer-badge">Oferta Especial</div>
      <div className="offer-image">
        <img src={image} alt={title} />
      </div>
      <div className="offer-content">
        <h3 className="offer-title">{title}</h3>
        <p className="offer-description">{description}</p>
        <div className="offer-details">
          <span className="offer-discount">{discount}% OFF</span>
          <span className="offer-validity">Válido hasta: {validUntil}</span>
        </div>
        <button className="offer-button">Aprovechar Oferta</button>
      </div>
    </div>
  );
};

export default OfferCard; 