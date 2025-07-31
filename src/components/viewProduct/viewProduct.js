import { useEffect } from 'react';
import './viewProduct.css';

const ViewProduct = ({ product, onClose }) => {
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
            <img src={product.image} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
          </div>
          <div className="producto-info">
            <h2 className="producto-titulo">{product.name}</h2>
            <p><strong>Cantidad disponible:</strong> <span className="cantidad">{product.stock}</span></p>
            <p><strong>Precio:</strong> <span className="precio">{product.price}</span></p>
            <p><strong>Detalles del producto:</strong></p>
            <p className="descripcion">{product.description}</p>
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

export default ViewProduct;
