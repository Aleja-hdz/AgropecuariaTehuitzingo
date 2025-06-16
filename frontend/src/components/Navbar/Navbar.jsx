import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Agropecuaria Tehuitzingo</h1>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link">Inicio</a>
          </li>
          <li className="nav-item">
            <a href="/productos" className="nav-link">Productos</a>
          </li>
          <li className="nav-item">
            <a href="/servicios" className="nav-link">Servicios</a>
          </li>
          <li className="nav-item">
            <a href="/nosotros" className="nav-link">Nosotros</a>
          </li>
          <li className="nav-item">
            <a href="/contacto" className="nav-link">Contacto</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 