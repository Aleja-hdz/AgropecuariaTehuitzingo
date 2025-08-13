import { useEffect, useState } from 'react';
import './viewProduct.css';

const ViewProduct = ({ product, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Ocultar el navbar cuando se abre el modal
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.add('hidden');
    }

    // Agregar listener para cerrar con Escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
      
      // Mostrar el navbar cuando se cierra el modal
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.remove('hidden');
      }
    };
  }, []);

  if (!product) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Tiempo de la animación de salida
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      handleClose();
    }
  };

  return (
    <div className={`view-producto-modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleOverlayClick}>
      <div className={`view-producto-modal-content ${isClosing ? 'closing' : ''}`}>
        <div className="view-producto-box">
          <div className="producto-img-placeholder">
            <img src={product.image} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
          </div>
          <div className="producto-info">
            <h2 className="producto-titulo">{product.name}</h2>
            <p><strong>Cantidad disponible:</strong> <span className="cantidad">{product.stock}</span></p>
            <p><strong>Precio:</strong> <span className="precio">{product.price}</span></p>
            <p><strong>Detalles del producto:</strong></p>
            <p className="descripcion">{product.description}</p>
            <button 
              onClick={handleClose}
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

export default ViewProduct;
