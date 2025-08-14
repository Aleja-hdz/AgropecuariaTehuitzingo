import { useEffect, useState } from 'react';
import './ImageViewer.css';

const ImageViewer = ({ imageUrl, imageAlt, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
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
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Tiempo de la animación de salida
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={`image-viewer-overlay ${isClosing ? 'closing' : ''}`} onClick={handleOverlayClick}>
      <div className={`image-viewer-content ${isClosing ? 'closing' : ''}`}>
        <button 
          className="image-viewer-close-btn"
          onClick={handleClose}
          aria-label="Cerrar imagen"
        >
          ×
        </button>
        <div className="image-viewer-container">
          <img 
            src={imageUrl} 
            alt={imageAlt || 'Imagen del producto'} 
            className="image-viewer-img"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
