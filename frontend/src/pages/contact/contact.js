import React from 'react';
import './contact.css';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-bg">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contáctanos</h2>
          <div className="contact-info-item">
            <MapPin size={22} />
            <span>Carretera Internacional S/N, sección 1ra, Tehuitzingo, Puebla</span>
          </div>
          <div className="contact-info-item">
            <Mail size={22} />
            <span>agropecuariatehuitzingo@gmail.com</span>
          </div>
          <div className="contact-info-item">
            <Phone size={22} />
            <span>274-741-13-74</span>
          </div>
          <div className="contact-info-copy">©2025 Todos los derechos reservados<br />|| Agropecuaria Tehuitzingo</div>
        </div>
        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellidos" />
          </div>
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Teléfono" />
          <input type="text" placeholder="Asunto" />
          <button type="submit">Enviar</button>
        </form>
        <div className="contact-menu">
          <ul>
            <li>Inicio</li>
            <li>Nosotros</li>
            <li>Servicios</li>
            <li>Contáctanos</li>
            <li>Productos</li>
            <li>Ofertas</li>
          </ul>
          <div className="contact-social">
            <FaWhatsapp size={22} />
            <FaFacebook size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 