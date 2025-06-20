import React, { useState } from 'react';
import './offers.css';
import ViewProductOffer from '../../components/viewProductOffer/viewProductOffer';

const ofertas = [
  {}, {}, {}, {}, {}, {}, {}, {}
];

const Offers = () => {
  const [modalAbierto, setModalAbierto] = useState(false);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  return (
    <div className="offers-bg">
      <div className="offers-navbar-space" />
      <h2 className="offers-title">Ofertas</h2>
      <div className="offers-desc">
        ¡Bienvenido al rincón de los descuentos! Aquí encontrarás promociones exclusivas, productos seleccionados con precios rebajados y ofertas por tiempo limitado pensadas especialmente para ti.<br />
        Explora nuestras promociones actuales y consigue lo que necesitas al mejor precio. ¡Comprar inteligente es comprar con descuento!
      </div>
      <div className="offers-grid">
        {ofertas.map((_, idx) => (
          <div className="offer-card" key={idx}>
            <div className="offer-label">Oferta</div>
            <div className="offer-img">IMG</div>
            <div className="offer-name">Nombre producto</div>
            <div className="offer-prices">
              <span className="offer-old-price">$25</span> <span className="offer-new-price">$20</span>
            </div>
            <button className="offer-btn" onClick={abrirModal}>Ver detalles</button>
          </div>
        ))}
      </div>
      {modalAbierto && <ViewProductOffer cerrarModal={cerrarModal} />}
    </div>
  );
};

export default Offers; 