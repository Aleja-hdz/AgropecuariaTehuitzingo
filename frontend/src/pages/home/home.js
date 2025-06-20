import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className="main-content">
      <div className="main-left">
        <div className="main-title">Agropecuaria Tehuitzingo</div>
        <div className="main-desc">
          Nos dedicamos a la venta y distribución de alimentos balanceados para tus animales, así como de accesorios y consultas a tus animales.<br />
          Puedes visitarnos en físico en nuestra sucursal o navegar en nuestra web y conocer todos nuestros productos.<br />
          Ganarnos tu confianza es nuestro mayor objetivo.
        </div>
        <div className="main-buttons">
          <button className="main-btn">Regístrate</button>
          <button className="main-btn">Iniciar sesión</button>
        </div>
      </div>
      <div className="main-right">
        <div className="img-placeholder">IMG</div>
      </div>
    </div>
  );
};

export default Home;
