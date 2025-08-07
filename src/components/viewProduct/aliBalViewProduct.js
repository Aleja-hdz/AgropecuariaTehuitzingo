import { useEffect } from 'react';
import './viewProduct.css';

const AliBalViewProduct = ({ product, onClose }) => {
  // Función para formatear las medidas con abreviaciones
  const formatMeasure = (medida) => {
    const measureMap = {
      'Miligramos': 'mg',
      'Gramos': 'gr',
      'Kilogramos': 'Kg',
      'Mililitros': 'ml',
      'Litros': 'L',
      'Unidades': 'unid',
      'Dosis': 'dosis'
    };
    return measureMap[medida] || medida;
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Ocultar el navbar cuando se abre el modal
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.add('hidden');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      
      // Mostrar el navbar cuando se cierra el modal
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('hidden');
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
              <div className="detail-section">
                <div className="detail-header">
                  <span className="detail-icon">📦</span>
                  <h3>Contenido</h3>
                </div>
                <div className="detail-content">
                  {product.contenido_decimal && product.contenido_medida ? (
                    <span className="detail-value highlight">
                      {product.contenido_decimal} {formatMeasure(product.contenido_medida)}
                    </span>
                  ) : (
                    <span className="detail-value empty">---</span>
                  )}
                </div>
              </div>

              {/* Especie */}
              <div className="detail-section">
                <div className="detail-header">
                  <span className="detail-icon">🐾</span>
                  <h3>Especie</h3>
                </div>
                <div className="detail-content">
                  <span className="detail-value">
                    {product.especie || '---'}
                  </span>
                </div>
              </div>

              {/* Marca */}
              <div className="detail-section">
                <div className="detail-header">
                  <span className="detail-icon">🏷️</span>
                  <h3>Marca</h3>
                </div>
                <div className="detail-content">
                  <span className="detail-value">
                    {product.marca || '---'}
                  </span>
                </div>
              </div>

              {/* Alimento para producción */}
              <div className="detail-section">
                <div className="detail-header">
                  <span className="detail-icon">🏭</span>
                  <h3>Alimento para producción</h3>
                </div>
                <div className="detail-content">
                  <span className={`detail-value ${product.alimento_produccion ? 'success' : 'warning'}`}>
                    {product.alimento_produccion ? 'Sí' : 'No'}
                  </span>
                </div>
              </div>

              {/* Materias primas */}
              {product.materias_primas && (
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">🌾</span>
                    <h3>Materias primas</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.materias_primas}
                    </span>
                  </div>
                </div>
              )}

              {/* Información adicional */}
              {product.informacion_adicional && (
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">ℹ️</span>
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

export default AliBalViewProduct; 