import { useEffect } from 'react';
import './viewProduct.css';

const MascAliViewProduct = ({ product, onClose }) => {
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
            <h2 className="producto-titulo">{product.nombre || product.name}</h2>
            <div className="producto-img-placeholder">
              <img 
                src={product.url || product.image || 'https://via.placeholder.com/200x200?text=Sin+Imagen'} 
                alt={product.nombre || product.name} 
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
                {/* Especie */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">🐾</span> {/* Paw icon */}
                    <h3>Especie</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.especie_mascota || '---'}
                    </span>
                  </div>
                </div>

                {/* Etapa de vida */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">📅</span> {/* Calendar icon */}
                    <h3>Etapa de vida</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.etapa_vida || '---'}
                    </span>
                  </div>
                </div>

                {/* Tamaño/Raza */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">📏</span> {/* Ruler icon */}
                    <h3>Tamaño/Raza</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.tamano_raza || '---'}
                    </span>
                  </div>
                </div>

                {/* Presentación */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">📦</span> {/* Package icon */}
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

                {/* Contenido */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">⚖️</span> {/* Scale icon */}
                    <h3>Contenido</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.contenido_decimal && product.contenido_medida 
                        ? `${product.contenido_decimal} ${product.contenido_medida}`
                        : '---'
                      }
                    </span>
                  </div>
                </div>

                {/* Composición/Ingredientes */}
                {product.ingredientes_composicion_nutrimental && (
                  <div className="detail-section">
                    <div className="detail-header">
                      <span className="detail-icon">🥘</span> {/* Pot icon */}
                      <h3>Composición nutrimental / Ingredientes</h3>
                    </div>
                    <div className="detail-content">
                      <span className="detail-value">
                        {product.ingredientes_composicion_nutrimental}
                      </span>
                    </div>
                  </div>
                )}

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
              
              <button 
                onClick={onClose}
                className="modal-close-btn"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MascAliViewProduct; 