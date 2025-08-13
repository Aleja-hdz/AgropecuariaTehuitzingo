import { useEffect } from 'react';
import './viewProduct.css';

const MvViewProduct = ({ product, onClose }) => {
  // Función para formatear las medidas con abreviaciones
  const formatMeasure = (medida) => {
    const medidas = {
      'Kilogramos': 'kg',
      'Gramos': 'gr',
      'Litros': 'L',
      'Mililitros': 'ml',
      'Unidades': 'unid',
      'Piezas': 'pzas'
    };
    return medidas[medida] || medida;
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Desplazar el navbar cuando se abre el modal
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.add('modal-open');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      
      // Restaurar el navbar cuando se cierra el modal
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('modal-open');
      }
    };
  }, []);

  if (!product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className="view-producto-modal-overlay" onClick={handleOverlayClick}>
      <div className="view-producto-modal-content">
        <div className="view-producto-box">
          {/* Contenedor de imagen estática */}
          <div className="producto-img-container">
            <h2 className="producto-titulo">{product.name}</h2>
            <div className="producto-img-placeholder">
              <img 
                src={product.image} 
                alt={product.name} 
                style={{
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain', 
                  borderRadius: '14px'
                }} 
              />
            </div>
          </div>
          
          {/* Contenedor de información deslizable */}
          <div className="producto-info-container">
            <div className="producto-info">
              <h3 className="info-titulo">Información del producto</h3>
              
              <div className="producto-details">
                {/* Contenido */}
                {product.contenido_decimal && product.contenido_medida && (
                  <div className="detail-section">
                    <div className="detail-header">
                      <span className="detail-icon">💊</span> {/* Pill icon */}
                      <h3>Contenido</h3>
                    </div>
                    <div className="detail-content">
                      <span className="detail-value highlight">
                        {product.contenido_decimal} {formatMeasure(product.contenido_medida)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tipo de medicamento */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">🏥</span> {/* Hospital icon */}
                    <h3>Tipo de medicamento</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.tipo || '---'}
                    </span>
                  </div>
                </div>

                {/* Especie */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">🐾</span> {/* Paw icon */}
                    <h3>Especie</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.especie || '---'}
                    </span>
                  </div>
                </div>

                {/* Edad recomendada */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">📅</span> {/* Calendar icon */}
                    <h3>Edad recomendada</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.edad || '---'}
                    </span>
                  </div>
                </div>

                {/* Vía de administración */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">💉</span> {/* Syringe icon */}
                    <h3>Vía de administración</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.via_administracion || '---'}
                    </span>
                  </div>
                </div>

                {/* Presentación */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">📦</span> {/* Box icon */}
                    <h3>Presentación</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.presentacion || '---'}
                    </span>
                  </div>
                </div>

                {/* Marca */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">🏷️</span> {/* Tag icon */}
                    <h3>Marca</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.marca || '---'}
                    </span>
                  </div>
                </div>

                {/* Información adicional */}
                {product.informacion_adicional && (
                  <div className="detail-section">
                    <div className="detail-header">
                      <span className="detail-icon">ℹ️</span> {/* Info icon */}
                      <h3>Información adicional</h3>
                    </div>
                    <div className="detail-content">
                      <span className="detail-value">
                        {product.informacion_adicional}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="producto-actions">
                <button 
                  onClick={onClose}
                  className="modal-close-btn"
                >
                  Cerrar
                </button>
                <div className="whatsapp-cta">
                  <div className="whatsapp-hint">
                    <span>Toma una captura de pantalla y consultanos</span>
                    <br />
                    <span>por WhatsApp acerca del producto.</span>
                  </div>
                  <a className="whatsapp-icon-link" href="https://wa.link/hcjs0r" target="_blank" rel="noopener noreferrer">
                    <div className="whatsapp-icon" aria-label="WhatsApp" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvViewProduct; 