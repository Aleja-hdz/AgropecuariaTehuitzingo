import React from 'react';
import './viewProduct.css';

const ViewProduct = () => {
  return (
    <div className="view-producto-container">
      <div className="view-producto-box">
        <div className="producto-img-placeholder">IMG</div>
        <div className="producto-info">
          <h2 className="producto-titulo">Nombre del producto en venta</h2>
          <p><strong>Cantidad disponible:</strong> <span className="cantidad">5</span></p>
          <p><strong>Precio:</strong> <span className="precio">$25 mxn</span></p>
          <p><strong>Detalles del producto:</strong></p>
          <p className="descripcion">
            Lorem ipsum dolor sit amet consectetur, adipiscing elit sem sapien lacus et, sociis cubilia congue sollicitudin. 
            Arcu risus sociosqu imperdiet aliquam per, etiam vel facilisis. Nisi porta ligula montes leo velit habitant fringilla 
            natoque penatibus metus venenatis aptent tempus auctor nunc lectus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
