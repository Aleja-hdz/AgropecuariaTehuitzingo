import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Asesoría Agrícola',
      description: 'Ofrecemos asesoría especializada en cultivos, manejo de suelos y técnicas de producción agrícola.',
      icon: '🌱',
      features: [
        'Análisis de suelos',
        'Planificación de cultivos',
        'Control de plagas',
        'Optimización de recursos'
      ]
    },
    {
      id: 2,
      title: 'Venta de Insumos',
      description: 'Amplio catálogo de productos agrícolas y pecuarios de las mejores marcas del mercado.',
      icon: '🛒',
      features: [
        'Semillas certificadas',
        'Fertilizantes',
        'Herramientas',
        'Equipos de riego'
      ]
    },
    {
      id: 3,
      title: 'Servicio Técnico',
      description: 'Mantenimiento y reparación de maquinaria agrícola y equipos de riego.',
      icon: '🔧',
      features: [
        'Mantenimiento preventivo',
        'Reparaciones',
        'Instalaciones',
        'Capacitación'
      ]
    },
    {
      id: 4,
      title: 'Capacitación',
      description: 'Programas de capacitación para mejorar las técnicas de producción y manejo de cultivos.',
      icon: '📚',
      features: [
        'Talleres prácticos',
        'Cursos especializados',
        'Asesoría personalizada',
        'Material didáctico'
      ]
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="section-description">
          Ofrecemos una amplia gama de servicios para apoyar a los productores agrícolas
          en su desarrollo y crecimiento.
        </p>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="service-button">Más Información</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 