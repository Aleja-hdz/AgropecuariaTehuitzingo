import { useEffect } from 'react';
import './viewProduct.css';

const MascAccViewProduct = ({ product, onClose }) => {
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
          <div className="producto-img-placeholder">
            <img 
              src={product.url || product.image || 'https://via.placeholder.com/200x200?text=Sin+Imagen'} 
              alt={product.nombre || product.name} 
              style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} 
            />
          </div>
          <div className="producto-info">
            <h2 className="producto-titulo">{product.nombre || product.name}</h2>
            
            {/* Información básica */}
            <div style={{ marginBottom: '15px' }}>
              <p><strong>¿Qué es?:</strong> <span className="cantidad">{product.que_es || 'No especificado'}</span></p>
              <p><strong>Tipo de animal:</strong> <span className="precio">{product.tipo_animal || 'No especificado'}</span></p>
            </div>

            {/* Recomendaciones de uso */}
            {product.recomendaciones_uso && (
              <div style={{ marginBottom: '15px' }}>
                <p><strong>Recomendaciones de uso:</strong></p>
                <p className="descripcion">{product.recomendaciones_uso}</p>
              </div>
            )}

            {/* Información adicional */}
            {product.informacion_adicional && (
              <div style={{ marginBottom: '15px' }}>
                <p><strong>Detalles del producto:</strong></p>
                <p className="descripcion">{product.informacion_adicional}</p>
              </div>
            )}

            {/* Fecha de creación */}
            {product.created_at && (
              <div style={{ marginBottom: '15px' }}>
                <p><strong>Fecha de registro:</strong> <span className="descripcion">
                  {new Date(product.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span></p>
              </div>
            )}

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

export default MascAccViewProduct; 