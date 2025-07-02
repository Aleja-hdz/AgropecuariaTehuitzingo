import './formNewOffer.css';
import { useState, useEffect } from 'react';
import ButtonSmall from '../buttonSmall/buttonSmall';

export default function FormNewOffer({ onClose }) {
    const [imagePreview, setImagePreview] = useState(null);
    
    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => setImagePreview(null);

    const handleClose = () => {
        onClose();
    };

    const handleOverlayClick = (e) => {
        // Cerrar modal solo si se hace clic en el overlay, no en el contenido
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='container-general' onClick={handleOverlayClick}>
            <div className='new-offer-container'>
                <div className='new-offer-exit'>
                    <button className='new-offer-btn-exit' onClick={handleClose}>X</button>
                </div>
                <h1>Nueva oferta</h1>

                <p className='new-offer-text'>Imagen para el producto</p>
                {!imagePreview ? (
                    <div className="file-input-container">
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="input-hidden"
                        />
                        <label htmlFor="file-upload" className="custom-file-button">
                            📷 Subir imagen
                        </label>
                    </div>
                ) : (
                    <div className='image-preview-container'>
                        <img src={imagePreview} alt="Vista previa" className='image-preview' />
                        <button onClick={removeImage} className='btn-remove-image'>
                            Volver a elegir
                        </button>
                    </div>
                )}

                <p className='new-offer-text'>Nombre del producto</p>
                <input className='new-offer-input1' type='text' placeholder='Cerdo Inicia Medicado ...' />

                <p className='new-offer-text'>Mensaje de detalles de la oferta</p>
                <input className='new-offer-input1' type='text' placeholder='En la compra de ...' />

                <div className='new-offer-prices-container'>
                    <div className='new-offer-box-price'>
                        <p>Precio anterior</p>
                        <div className='new-offer-price'>
                            <span>$</span>
                            <input className='new-offer-number-box' type='number' placeholder='0'></input>
                        </div>
                    </div>
                    <div className='new-offer-box-price'>
                        <p>Precio de oferta</p>
                        <div className='new-offer-price'>
                            <span>$</span>
                            <input className='new-offer-number-box' type='number' placeholder='0'></input>
                        </div>
                    </div>
                </div>

                <div className='new-offer-box'>
                    <label className='new-offer-text-box'>Contenido: </label>
                    <input className='new-offer-number-box' type='number' placeholder='0' />
                    <select className='new-offer-opc-box' name='Opciones'>
                        <option value=''>Miligramos</option>
                        <option value=''>Gramos</option>
                        <option value=''>Kilogramos</option>
                        <option value=''>Mililitros</option>
                        <option value=''>Litros</option>
                    </select>
                </div>

                <p className='new-offer-text'>Detalles adicionales del producto</p>
                <textarea className='new-offer-input' placeholder='Detalles del producto'></textarea>

                <div className='new-offer-btn-keep'>
                    <ButtonSmall text='Guardar' />
                </div>
            </div>
        </div>
    );
}