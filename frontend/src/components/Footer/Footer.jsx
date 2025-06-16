import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Agropecuaria Tehuitzingo</h3>
          <p>Tu aliado en el campo</p>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Dirección: Calle Principal #123</p>
          <p>Teléfono: (123) 456-7890</p>
          <p>Email: info@agropecuariatehuitzingo.com</p>
        </div>

        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Agropecuaria Tehuitzingo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer; 