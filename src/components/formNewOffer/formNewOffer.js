import './formNewOffer.css';
import { useState, useEffect } from 'react';
import ButtonSmall from '../buttonSmall/buttonSmall';
import { supabase } from '../../lib/supabaseClient';

export default function FormNewOffer({ onClose, offerData, isEdit, onSave }) {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(offerData?.url || '');
    const [nameOffer, setNameOffer] = useState(offerData?.nombre || '');
    const [messageOffer, setMessageOffer] = useState(offerData?.mensaje_promocional || '');
    const [previousPrice, setPreviousPrice] = useState(offerData?.precio_anterior || '');
    const [currentPrice, setCurrentPrice] = useState(offerData?.precio_actual || '');
    const [startDate, setStartDate] = useState(offerData?.fecha_inicio || '');
    const [endDate, setEndDate] = useState(offerData?.fecha_fin || '');
    const [contentNumber, setContentNumber] = useState(offerData?.contenido_decimal || '');
    const [contentExtent, setContentExtent] = useState(offerData?.contenido_medida || '');
    const [additionalDetails, setAdditionalDetails] = useState(offerData?.informacion_adicional || '');
    const [imagePreview, setImagePreview] = useState(offerData?.url || null);
    
    // Estados para validaciones
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);

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

    // Función para validar campos obligatorios
    const validateForm = () => {
        const newErrors = {};
        
        // Validar imagen del producto
        if (!imageFile && !imageUrl) {
            newErrors.image = 'La imagen del producto es obligatoria';
        }
        
        // Validar nombre del producto
        if (!nameOffer.trim()) {
            newErrors.name = 'El nombre del producto es obligatorio';
        }
        
        // Validar precio anterior
        if (!previousPrice || previousPrice <= 0) {
            newErrors.previousPrice = 'El precio anterior es obligatorio y debe ser mayor a 0';
        }
        
        // Validar precio de oferta
        if (!currentPrice || currentPrice <= 0) {
            newErrors.currentPrice = 'El precio de oferta es obligatorio y debe ser mayor a 0';
        }
        
        // Validar fecha de inicio
        if (!startDate) {
            newErrors.startDate = 'La fecha de inicio es obligatoria';
        }
        
        // Validar fecha de fin
        if (!endDate) {
            newErrors.endDate = 'La fecha de fin es obligatoria';
        }
        
        // Validar contenido decimal
        if (!contentNumber || contentNumber <= 0) {
            newErrors.contentNumber = 'El contenido es obligatorio y debe ser mayor a 0';
        }
        
        // Validar medida del contenido
        if (!contentExtent) {
            newErrors.contentExtent = 'La medida del contenido es obligatoria';
        }
        
        // Validar que la fecha de fin sea posterior a la de inicio
        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
            newErrors.dateRange = 'La fecha de fin debe ser posterior a la fecha de inicio';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file?.type.startsWith("image/")) {
            alert("Solo se permiten imágenes");
            return;
        }
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setImageFile(file);
            // Limpiar error de imagen si se selecciona una
            if (errors.image) {
                setErrors(prev => ({ ...prev, image: null }));
            }
        }
    };

    // Función para eliminar imagen anterior del bucket
    const deletePreviousImage = async (imageUrl) => {
        if (!imageUrl) return;
        
        try {
            // Extraer el nombre del archivo de la URL
            const parts = imageUrl.split('/');
            const fileName = parts[parts.length - 1].split('?')[0];
            
            const { error } = await supabase
                .storage
                .from('ofertas-img')
                .remove([fileName]);
                
            if (error) {
                console.error('Error al eliminar imagen anterior:', error);
            } else {
                console.log('Imagen anterior eliminada exitosamente');
            }
        } catch (err) {
            console.error('Error al procesar eliminación de imagen anterior:', err);
        }
    };

    const uploadImageToSupabase = async () => {
        if (!imageFile) return;

        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data, error } = await supabase
            .storage
            .from('ofertas-img')
            .upload(fileName, imageFile);

        if (error) {
            console.error("Error al subir imagen:", error);
            return null;
        }

        const { data: publicUrl } = supabase
            .storage
            .from('ofertas-img')
            .getPublicUrl(fileName);

        setImageUrl(publicUrl.publicUrl);
        return publicUrl.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar formulario antes de enviar
        if (!validateForm()) {
            setShowErrors(true);
            return;
        }
        
        try {
            let url = imageUrl;
            let previousImageUrl = null;
            
            // Si estamos editando y hay una nueva imagen, guardar la URL anterior
            if (isEdit && offerData && imageFile && offerData.url) {
                previousImageUrl = offerData.url;
            }
            
            if (imageFile) {
                const uploadedUrl = await uploadImageToSupabase();
                if (!uploadedUrl) {
                    alert('No se pudo subir la imagen.');
                    return;
                }
                url = uploadedUrl;
            }
            
            if (isEdit && offerData) {
                // Actualizar oferta existente
                const { error } = await supabase.from('ofertas').update({
                    url: url,
                    nombre: nameOffer,
                    mensaje_promocional: messageOffer,
                    precio_anterior: previousPrice === '' ? null : Number(previousPrice),
                    precio_actual: currentPrice === '' ? null : Number(currentPrice),
                    fecha_inicio: startDate,
                    fecha_fin: endDate,
                    contenido_decimal: contentNumber === '' ? null : parseInt(contentNumber),
                    contenido_medida: contentExtent,
                    informacion_adicional: additionalDetails,
                }).eq('id', offerData.id);
                if (error) {
                    console.error(error);
                    alert('Error al actualizar la oferta en Supabase');
                    return;
                }
                
                // Eliminar imagen anterior si se subió una nueva
                if (previousImageUrl) {
                    await deletePreviousImage(previousImageUrl);
                }
                
                alert('¡Oferta actualizada con éxito!');
                if (onSave) onSave();
                onClose();
            } else {
                // Crear nueva oferta
                const { error } = await supabase.from('ofertas').insert({
                    url: url,
                    nombre: nameOffer,
                    mensaje_promocional: messageOffer,
                    precio_anterior: previousPrice === '' ? null : Number(previousPrice),
                    precio_actual: currentPrice === '' ? null : Number(currentPrice),
                    fecha_inicio: startDate,
                    fecha_fin: endDate,
                    contenido_decimal: contentNumber === '' ? null : parseInt(contentNumber),
                    contenido_medida: contentExtent,
                    informacion_adicional: additionalDetails,
                });
                if (error) {
                    console.error(error);
                    alert('Error al guardar la oferta en Supabase');
                    return;
                }
                alert('¡Oferta guardada con éxito!');
                resetForm();
                if (onSave) onSave();
                onClose();
            }
        } catch (err) {
            console.error('Error inesperado:', err);
            alert('Error inesperado al guardar la oferta.');
        }
    };

    const resetForm = () => {
        setImageFile(null);
        setImagePreview(null);
        setImageUrl('');
        setNameOffer('');
        setMessageOffer('');
        setPreviousPrice('');
        setCurrentPrice('');
        setStartDate('');
        setEndDate('');
        setContentNumber('');
        setContentExtent('');
        setAdditionalDetails('');
        setErrors({});
        setShowErrors(false);
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
        // Agregar error si no hay imagen
        if (!imageUrl) {
            setErrors(prev => ({ ...prev, image: 'La imagen del producto es obligatoria' }));
        }
    };

    const handleClose = () => onClose();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    // Función para limpiar errores cuando el usuario empiece a escribir
    const handleInputChange = (setter, fieldName, value) => {
        setter(value);
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: null }));
        }
    };

    return (
        <div className='container-general' onClick={handleOverlayClick}>
            <div className='new-offer-container'>
                <div className='new-offer-exit'>
                    <button className='new-offer-btn-exit' onClick={handleClose}>X</button>
                </div>
                <h1>{isEdit ? 'Editar oferta' : 'Nueva oferta'}</h1>

                <p className='new-offer-text'>Imagen para el producto *</p>
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
                {showErrors && errors.image && <p className="error-message">{errors.image}</p>}

                <p className='new-offer-text'>Nombre del producto *</p>
                <input 
                    className={`new-offer-input1 ${showErrors && errors.name ? 'error-input' : ''}`} 
                    type='text' 
                    placeholder='Cerdo Inicia Medicado ...' 
                    value={nameOffer} 
                    onChange={(e) => handleInputChange(setNameOffer, 'name', e.target.value)} 
                />
                {showErrors && errors.name && <p className="error-message">{errors.name}</p>}

                <p className='new-offer-text'>Mensaje de oferta (opcional)</p>
                <input 
                    className='new-offer-input1' 
                    type='text' 
                    placeholder='En la compra de ...' 
                    value={messageOffer} 
                    onChange={(e) => setMessageOffer(e.target.value)} 
                />

                <div className='new-offer-prices-container'>
                    <div className='new-offer-box-price'>
                        <p>Precio anterior *</p>
                        <div className='new-offer-price'>
                            <span>$</span>
                            <input 
                                className={`new-offer-number-box ${showErrors && errors.previousPrice ? 'error-input' : ''}`} 
                                type='number' 
                                placeholder='0' 
                                value={previousPrice} 
                                onChange={(e) => handleInputChange(setPreviousPrice, 'previousPrice', e.target.value)} 
                            />
                        </div>
                        {showErrors && errors.previousPrice && <p className="error-message">{errors.previousPrice}</p>}
                    </div>
                    <div className='new-offer-box-price'>
                        <p>Precio de oferta *</p>
                        <div className='new-offer-price'>
                            <span>$</span>
                            <input 
                                className={`new-offer-number-box ${showErrors && errors.currentPrice ? 'error-input' : ''}`} 
                                type='number' 
                                placeholder='0' 
                                value={currentPrice} 
                                onChange={(e) => handleInputChange(setCurrentPrice, 'currentPrice', e.target.value)} 
                            />
                        </div>
                        {showErrors && errors.currentPrice && <p className="error-message">{errors.currentPrice}</p>}
                    </div>
                </div>

                <div className='new-offer-prices-container'>
                    <div className='new-offer-box-price'>
                        <p>Fecha de inicio *</p>
                        <div className='new-offer-price'>
                            <input 
                                className={`new-offer-number-box ${showErrors && errors.startDate ? 'error-input' : ''}`} 
                                type='date' 
                                value={startDate} 
                                onChange={(e) => handleInputChange(setStartDate, 'startDate', e.target.value)} 
                            />
                        </div>
                        {showErrors && errors.startDate && <p className="error-message">{errors.startDate}</p>}
                    </div>
                    <div className='new-offer-box-price'>
                        <p>Fecha de fin *</p>
                        <div className='new-offer-price'>
                            <input 
                                className={`new-offer-number-box ${showErrors && errors.endDate ? 'error-input' : ''}`} 
                                type='date' 
                                value={endDate} 
                                onChange={(e) => handleInputChange(setEndDate, 'endDate', e.target.value)} 
                            />
                        </div>
                        {showErrors && errors.endDate && <p className="error-message">{errors.endDate}</p>}
                    </div>
                </div>
                {showErrors && errors.dateRange && <p className="error-message">{errors.dateRange}</p>}

                <div className='new-offer-box'>
                    <label className='new-offer-text-box'>Contenido *</label>
                    <input 
                        className={`new-offer-number-box ${showErrors && errors.contentNumber ? 'error-input' : ''}`} 
                        type='number' 
                        placeholder='0' 
                        value={contentNumber} 
                        onChange={(e) => handleInputChange(setContentNumber, 'contentNumber', e.target.value)} 
                    />
                    <select 
                        className={`new-offer-opc-box ${showErrors && errors.contentExtent ? 'error-input' : ''}`} 
                        name='Opciones' 
                        value={contentExtent} 
                        onChange={(e) => handleInputChange(setContentExtent, 'contentExtent', e.target.value)}
                    >
                        <option value=''>-- Selecciona --</option>
                        <option value='mg'>Miligramos (mg)</option>
                        <option value='g'>Gramos (g)</option>
                        <option value='kg'>Kilogramos (kg)</option>
                        <option value='ml'>Mililitros (ml)</option>
                        <option value='L'>Litros (L)</option>
                    </select>
                </div>
                {(showErrors && errors.contentNumber) && <p className="error-message">{errors.contentNumber}</p>}
                {(showErrors && errors.contentExtent) && <p className="error-message">{errors.contentExtent}</p>}

                <p className='new-offer-text'>Detalles adicionales del producto (opcional)</p>
                <textarea className='new-offer-input' placeholder='Detalles del producto' value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} />

                <div className='new-offer-btn-keep'>
                    <ButtonSmall text='Guardar' onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
