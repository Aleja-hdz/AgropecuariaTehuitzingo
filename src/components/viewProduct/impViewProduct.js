import { useEffect, useState } from 'react';
import './viewProduct.css';
import ImageViewer from './ImageViewer';

const ImpViewProduct = ({ product, onClose }) => {
  const [showImageViewer, setShowImageViewer] = useState(false);
  
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

  const handleImageClick = () => {
    setShowImageViewer(true);
  };

  return (
    <div className="view-producto-modal-overlay" onClick={handleOverlayClick}>
      <div className="view-producto-modal-content">
        <div className="view-producto-box">
          {/* Contenedor de imagen estática */}
          <div className="producto-img-container">
            <h2 className="producto-titulo">{product.nombre || product.name}</h2>
            <div className="producto-img-placeholder" onClick={handleImageClick} style={{cursor: 'pointer'}}>
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
                {/* ¿Qué es? */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">🔧</span> {/* Tool icon */}
                    <h3>¿Qué es?</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.que_es || '---'}
                    </span>
                  </div>
                </div>

                {/* Para qué tipo de animal */}
                <div className="detail-section">
                  <div className="detail-header">
                    <span className="detail-icon">🐾</span> {/* Paw icon */}
                    <h3>Para qué tipo de animal</h3>
                  </div>
                  <div className="detail-content">
                    <span className="detail-value">
                      {product.tipo_animal || '---'}
                    </span>
                  </div>
                </div>

                                 {/* Animales especiales */}
                 {product.animales_especiales && (
                   <div className="detail-section">
                     <div className="detail-header">
                       <span className="detail-icon">⭐</span> {/* Star icon */}
                       <h3>Producto especial para</h3>
                     </div>
                     <div className="detail-content">
                       <span className="detail-value">
                         {product.animales_especiales}
                       </span>
                     </div>
                   </div>
                 )}

                {/* Marca o distribuidor */}
                {product.marca_distribuidor && (
                  <div className="detail-section">
                    <div className="detail-header">
                      <span className="detail-icon">🏷️</span> {/* Label icon */}
                      <h3>Marca o distribuidor</h3>
                    </div>
                    <div className="detail-content">
                      <span className="detail-value">
                        {product.marca_distribuidor}
                      </span>
                    </div>
                  </div>
                )}

                {/* Presentaciones disponibles */}
                {product.presentaciones_disponibles && (
                  <div className="detail-section">
                    <div className="detail-header">
                      <span className="detail-icon">📦</span> {/* Package icon */}
                      <h3>Presentaciones disponibles</h3>
                    </div>
                    <div className="detail-content">
                      <span className="detail-value">
                        {product.presentaciones_disponibles}
                      </span>
                    </div>
                  </div>
                )}

                {/* Recomendaciones de uso */}
                {product.recomendaciones_uso && (
                  <div className="detail-section">
                    <div className="detail-header">
                      <span className="detail-icon">📋</span> {/* Clipboard icon */}
                      <h3>Recomendaciones de uso</h3>
                    </div>
                    <div className="detail-content">
                      <span className="detail-value">
                        {product.recomendaciones_uso}
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
      {showImageViewer && (
        <ImageViewer 
          imageUrl={product.url || product.image || 'https://via.placeholder.com/200x200?text=Sin+Imagen'} 
          imageAlt={product.nombre || product.name} 
          onClose={() => setShowImageViewer(false)} 
        />
      )}
    </div>
  );
};

export default ImpViewProduct; 