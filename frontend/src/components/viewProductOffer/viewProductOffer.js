import React from "react";
import "./viewProductOffer.css";

const ViewProductOffer = ({ cerrarModal, nombre, img, precio, cantidad, detalles, fechaInicio, fechaFin, precioAnterior, esOferta }) => {
  // Cierra el modal si se hace click en el fondo
  const handleBgClick = (e) => {
    if (e.target.classList.contains('vpo-modal-bg')) {
      cerrarModal();
    }
  };

  return (
    <div className="vpo-modal-bg" onClick={handleBgClick}>
      <div className="vpo-modal" onClick={e => e.stopPropagation()}>
        <button className="vpo-close-btn" onClick={cerrarModal}>
          <span style={{fontSize: '1.5rem', color: '#e53935'}}>×</span>
        </button>
        <div className="vpo-img-box">
          {img ? <img src={img} alt={nombre} style={{width: '100%', height: '100%', objectFit: 'contain'}} /> : <span>IMG</span>}
        </div>
        <div className="vpo-info">
          <h2 className="vpo-title">{nombre}</h2>
          {esOferta && fechaInicio && fechaFin && (
            <div className="vpo-date-row">
              <span>Del <span className="vpo-date">{fechaInicio}</span> al <span className="vpo-date">{fechaFin}</span></span>
            </div>
          )}
          {esOferta && precioAnterior && (
            <div className="vpo-price-row">
              <span>Precio anterior: <span className="vpo-old-price">${precioAnterior} mxn</span></span>
            </div>
          )}
          <div className="vpo-price-row">
            <span>Precio{esOferta ? ' de oferta' : ''}: <span className="vpo-offer-price">${precio} mxn</span></span>
          </div>
          <hr className="vpo-divider" />
          <div className="vpo-stock">Cantidad disponible: <span className="vpo-stock-num">{cantidad}</span></div>
          <div className="vpo-details">
            <span className="vpo-details-title">Detalles del producto:</span>
            <p className="vpo-details-text">{detalles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductOffer;
