import { useEffect } from 'react';
import './viewProduct.css';

const MvViewProduct = ({ product, onClose }) => {
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

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="view-producto-modal-overlay" onClick={handleOverlayClick}>
      <div className="view-producto-modal-content">
        <div className="view-producto-box">
          <div className="producto-img-placeholder">
            <img 
              src={product.image} 
              alt={product.name} 
              style={{
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '8px'
              }} 
            />
          </div>
          <div className="producto-info">
            <h2 className="producto-titulo">{product.name}</h2>
            
            <div className="producto-details">
              <div className="detail-row">
                <strong>Tipo de medicamento:</strong>
                <span>{product.tipo || 'No especificado'}</span>
              </div>
              
              <div className="detail-row">
                <strong>Especie:</strong>
                <span>{product.especie || 'No especificada'}</span>
              </div>
              
              <div className="detail-row">
                <strong>Edad/Etapa de vida:</strong>
                <span>{product.edad || 'No especificada'}</span>
              </div>
              
              <div className="detail-row">
                <strong>Vía de administración:</strong>
                <span>{product.via_administracion || 'No especificada'}</span>
              </div>
              
              <div className="detail-row">
                <strong>Presentación:</strong>
                <span>{product.presentacion || 'No especificada'}</span>
              </div>
              
              <div className="detail-row">
                <strong>Marca:</strong>
                <span>{product.marca || 'No especificada'}</span>
              </div>
              
              {product.informacion_adicional && (
                <div className="detail-row">
                  <strong>Información adicional:</strong>
                  <span>{product.informacion_adicional}</span>
                </div>
              )}
              
              <div className="detail-row">
                <strong>Fecha de registro:</strong>
                <span>{formatDate(product.created_at)}</span>
              </div>
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
  );
};

export default MvViewProduct; 