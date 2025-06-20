import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-bg">
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
    </div>
  );
};

export default About; 