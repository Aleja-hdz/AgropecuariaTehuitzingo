import './formNewOffer.css';
import { useState, useEffect } from 'react';
import ButtonSmall from '../buttonSmall/buttonSmall';
import { supabase } from '../../lib/supabaseClient';

export default function FormNewOffer({ onClose }) {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [nameOffer, setNameOffer] = useState('');
    const [messageOffer, setMessageOffer] = useState('');
    const [previousPrice, setPreviousPrice] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [contentNumber, setContentNumber] = useState('');
    const [contentExtent, setContentExtent] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

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

        try {
            const url = await uploadImageToSupabase();
            if (!url) {
                alert('No se pudo subir la imagen.');
                return;
            }

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
            onClose();
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
    };

    const removeImage = () => setImagePreview(null);

    const handleClose = () => onClose();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
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
                <input className='new-offer-input1' type='text' placeholder='Cerdo Inicia Medicado ...' value={nameOffer} onChange={(e) => setNameOffer(e.target.value)} />

                <p className='new-offer-text'>Mensaje de oferta</p>
                <input className='new-offer-input1' type='text' placeholder='En la compra de ...' value={messageOffer} onChange={(e) => setMessageOffer(e.target.value)} />

                <div className='new-offer-prices-container'>
                    <div className='new-offer-box-price'>
                        <p>Precio anterior</p>
                        <div className='new-offer-price'>
                            <span>$</span>
                            <input className='new-offer-number-box' type='number' placeholder='0' value={previousPrice} onChange={(e) => setPreviousPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className='new-offer-box-price'>
                        <p>Precio de oferta</p>
                        <div className='new-offer-price'>
                            <span>$</span>
                            <input className='new-offer-number-box' type='number' placeholder='0' value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='new-offer-prices-container'>
                    <div className='new-offer-box-price'>
                        <p>Fecha de inicio</p>
                        <div className='new-offer-price'>
                            <input className='new-offer-number-box' type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                    </div>
                    <div className='new-offer-box-price'>
                        <p>Fecha de fin</p>
                        <div className='new-offer-price'>
                            <input className='new-offer-number-box' type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='new-offer-box'>
                    <label className='new-offer-text-box'>Contenido: </label>
                    <input className='new-offer-number-box' type='number' placeholder='0' value={contentNumber} onChange={(e) => setContentNumber(e.target.value)} />
                    <select className='new-offer-opc-box' name='Opciones' value={contentExtent} onChange={(e) => setContentExtent(e.target.value)}>
                        <option value=''>-- Selecciona --</option>
                        <option value='mg'>Miligramos (mg)</option>
                        <option value='g'>Gramos (g)</option>
                        <option value='kg'>Kilogramos (kg)</option>
                        <option value='ml'>Mililitros (ml)</option>
                        <option value='L'>Litros (L)</option>
                    </select>
                </div>

                <p className='new-offer-text'>Detalles adicionales del producto (opcional)</p>
                <textarea className='new-offer-input' placeholder='Detalles del producto' value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} />

                <div className='new-offer-btn-keep'>
                    <ButtonSmall text='Guardar' onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
}
