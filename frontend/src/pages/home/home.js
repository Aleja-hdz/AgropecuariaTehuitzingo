import React, { useRef } from 'react';
import './home.css';
import '../about/about.css';
import '../services/services.css';
import '../contact/contact.css';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';

const servicios = [
  {
    titulo: 'Consultas veterinarias',
    descripcion: 'Atención médica profesional para mascotas y animales de producción. Diagnóstico, tratamiento y seguimiento personalizado.',
  },
  {
    titulo: 'Cirugías',
    descripcion: 'Procedimientos quirúrgicos con equipo especializado y personal capacitado para el bienestar de tus animales.',
  },
  {
    titulo: 'Vacunación y desparasitación',
    descripcion: 'Aplicación de vacunas y desparasitantes para prevenir enfermedades y mantener la salud de tus animales.',
  },
];

const Home = () => {
  const inicioRef = useRef(null);
  const nosotrosRef = useRef(null);
  const serviciosRef = useRef(null);
  const contactoRef = useRef(null);

  return (
    <div>
      {/* INICIO */}
      <section ref={inicioRef} id="inicio" className="main-content">
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
      </section>

      {/* NOSOTROS */}
      <section ref={nosotrosRef} id="nosotros" className="about-bg">
        <h1 className="about-title">Nosotros</h1>
        <div className="about-history">
          <h3 className="about-subtitle">Historia</h3>
          <p className="about-history-text">
            En Agropecuaria Tehuitzingo, trabajamos con pasión y compromiso por el bienestar animal. Somos un negocio dedicado a la atención médico-veterinaria, la venta de alimentos balanceados y medicamentos, tanto para mascotas como para animales de producción.
          </p>
        </div>
        <div className="about-main-row">
          <div className="about-col">
            <h4 className="about-col-title">Misión</h4>
            <p>
              Brindar servicios veterinarios de calidad, ofreciendo atención médica integral, productos confiables y asesoramiento personalizado para el cuidado de mascotas y animales de producción, comprometidos con el bienestar animal y la satisfacción de nuestros clientes.
            </p>
          </div>
          <div className="about-img-placeholder">IMG</div>
          <div className="about-col">
            <h4 className="about-col-title">Visión</h4>
            <p>
              Ser una veterinaria-agropecuaria reconocida en la región por su excelencia profesional, confianza y compromiso con la salud animal, ampliando constantemente nuestros servicios y manteniéndonos a la vanguardia en atención, confianza y formación.
            </p>
          </div>
        </div>
        <div className="about-distrib-title">Nuestros distribuidores</div>
        <div className="about-distrib-row">
          <div className="about-distrib-placeholder"></div>
          <div className="about-distrib-placeholder"></div>
          <div className="about-distrib-placeholder"></div>
          <div className="about-distrib-placeholder"></div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section ref={serviciosRef} id="servicios" className="services-bg">
        <h1 className="services-title">Servicios</h1>
        <div className="services-zigzag">
          {servicios.map((serv, idx) => (
            <div className={`service-zigzag-row ${idx % 2 === 0 ? '' : 'reverse'}`} key={idx}>
              <div className="service-zigzag-text">
                <div className="service-zigzag-title">{serv.titulo}</div>
                <div className="service-zigzag-desc">{serv.descripcion}</div>
              </div>
              <div className="service-zigzag-img">IMG</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section ref={contactoRef} id="contacto" className="contact-bg">
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
      </section>
    </div>
  );
};

export default Home;
