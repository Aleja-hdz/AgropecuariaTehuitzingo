import React from 'react';
import './services.css';

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

const Services = () => {
  return (
    <div className="services-bg">
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
    </div>
  );
};

export default Services; 