import { useEffect } from "react";
import "./viewProductOffer.css";

export default function ViewProductOffer({ offer, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="vpo-modal-bg" onClick={handleOverlayClick}>
      <div className="vpo-modal">
        <div className="vpo-img-box">
          <img
            src={offer.url}
            alt={offer.nombre}
            className="vpo-img"
          />
          <div className="vpo-offer-badge">¡Oferta!</div>
        </div>

        <div className="vpo-info">
          <div className="vpo-header">
            <h2 className="vpo-title">{offer.nombre}</h2>
            <button className='new-offer-btn-exit' onClick={onClose}>X</button>
          </div>

          <p className="vpo-message">{offer.mensaje_promocional}</p>

          <div className="vpo-date-row">
            Vigencia: <span className="vpo-date">{offer.fecha_inicio}</span> a <span className="vpo-date">{offer.fecha_fin}</span>
          </div>

          <div className="vpo-price-container">
            <span className="vpo-old-price">${offer.precio_anterior?.toFixed(2)}</span>
            <span className="vpo-arrow">→</span>
            <span className="vpo-offer-price">${offer.precio_actual?.toFixed(2)}</span>
          </div>

          <div className="vpo-content">
            Contenido: <strong>{offer.contenido_decimal} {offer.contenido_medida}</strong>
          </div>

          <hr className="vpo-divider" />

          <div className="vpo-details">
            <span className="vpo-details-title">Detalles adicionales:</span>
            <p className="vpo-details-text">{offer.informacion_adicional}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
