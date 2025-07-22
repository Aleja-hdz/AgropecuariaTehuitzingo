import { useEffect, useState } from "react";
import "./viewProductOffer.css";
import { SupabaseClient } from "@supabase/supabase-js";

const ViewProductOffer = ({ offer, onClose }) => {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOverlayClick = (e) => {
    // Cerrar modal solo si se hace clic en el overlay, no en el contenido
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="vpo-modal-bg" onClick={handleOverlayClick}>
      <div className="vpo-modal">
        <div className="vpo-img-box">
          <img 
            src={offer?.image || "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"} 
            alt={offer?.name || "Producto"} 
            style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}}
          />
        </div>
        <div className="vpo-info">
          <button className="vpo-close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
          <h2 className="vpo-title">{offer?.name || "Nombre del producto en venta"}</h2>
          <div className="vpo-date-row">
            <span>Del <span className="vpo-date">{offer?.startDate || "05/06/2025"}</span> al <span className="vpo-date">{offer?.endDate || "15/06/2025"}</span></span>
          </div>
          <div className="vpo-price-row">
            <span>Precio anterior: <span className="vpo-old-price">{offer?.pricePrevious || "$35 mxn"}</span></span>
          </div>
          <div className="vpo-price-row">
            <span>Precio de oferta: <span className="vpo-offer-price">{offer?.priceOffer || "$25 mxn"}</span></span>
          </div>
          <hr className="vpo-divider" />
          <div className="vpo-stock">Cantidad disponible: <span className="vpo-stock-num">{offer?.stock || "5"}</span></div>
          <div className="vpo-details">
            <span className="vpo-details-title">Detalles del producto:</span>
            <p className="vpo-details-text">
              {offer?.description || "Lorem ipsum dolor sit amet consectetur, adipiscing elit sem sapien lacus et, sociis cubilia congue sollicitudin. Arcu risus sociosqu imperdiet aliquam per, etiam vel facilisis."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductOffer;
