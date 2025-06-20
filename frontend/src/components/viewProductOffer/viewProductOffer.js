import React from "react";
import "./viewProductOffer.css";

const ViewProductOffer = ({ cerrarModal }) => {
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
          <i className="fas fa-times"></i>
        </button>
        <div className="vpo-img-box">
          <span>IMG</span>
        </div>
        <div className="vpo-info">
          <h2 className="vpo-title">Nombre del producto en venta</h2>
          <div className="vpo-date-row">
            <span>Del <span className="vpo-date">05/06/2025</span> al <span className="vpo-date">05/06/2025</span></span>
          </div>
          <div className="vpo-price-row">
            <span>Precio anterior: <span className="vpo-old-price">$25 mxn</span></span>
          </div>
          <div className="vpo-price-row">
            <span>Precio de oferta: <span className="vpo-offer-price">$25 mxn</span></span>
          </div>
          <hr className="vpo-divider" />
          <div className="vpo-stock">Cantidad disponible: <span className="vpo-stock-num">5</span></div>
          <div className="vpo-details">
            <span className="vpo-details-title">Detalles del producto:</span>
            <p className="vpo-details-text">
              Lorem ipsum dolor sit amet consectetur, adipiscing elit sem sapien lacus et, sociis cubilia congue sollicitudin. Arcu risus sociosqu imperdiet aliquam per, etiam vel facilisis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductOffer;
