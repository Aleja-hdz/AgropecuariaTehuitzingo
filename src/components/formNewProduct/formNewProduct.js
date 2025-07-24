import './formNewProduct.css';
import { useState, useEffect } from 'react';
import ButtonSmall from '../buttonSmall/buttonSmall';
import FormAlimentosBalanceados from './forms/alimentosBalanceados/formAlimentosBalanceados';
import FormMedicamentosVeterinarios from './forms/medicamentosVeterinarios/formMedicamentosVeterinarios';
import FormMascotas from './forms/mascotas/formMascotas';
import FormImplementos from './forms/implementos/formImplementos';

export default function FormNewProduct({ onClose }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [opcCategory, setOpcCategory] = useState("");

    //Para seleccionar categoria de producto a usar y mostrar sus respectivos formularios
    const renderForm = () => {
        switch (opcCategory){
            case 'Alimentos balanceados':
                return(
                    <FormAlimentosBalanceados />
                );
            case 'Medicamentos veterinarios':
                return(
                    <FormMedicamentosVeterinarios />
                );
            case 'Mascotas':
                return(
                    <FormMascotas />
                );
            case 'Implementos':
                return(
                    <FormImplementos />
                );
            default:
                return(' ');
        }
    }

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
            <div className='new-product-container'>
                <div className='new-product-exit'>
                    <button className='new-product-btn-exit' onClick={handleClose}>X</button>
                </div>
                <h1>Nuevo producto</h1>

                <div className='new-product-category'>
                    <label>Categoría del producto: </label>
                    <select className='new-product-opc-category' value={opcCategory} onChange={(e) => setOpcCategory(e.target.value)}>
                        <option value="">-- Selecciona --</option>
                        <option value='Alimentos balanceados'>Alimentos balanceados</option>
                        <option value='Medicamentos veterinarios'>Medicamentos veterinarios</option>
                        <option value='Mascotas'>Mascotas</option>
                        <option value='Implementos'>Implementos</option>
                    </select>
                </div>

                {opcCategory && (
                    <>
                        <p className='new-product-text'>Imagen para el producto</p>
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

                        <p className='new-product-text'>Nombre del producto</p>
                        <input className='new-product-input1' type='text' placeholder='Cerdo Inicia Medicado ...' />

                        <div className='new-product-box'>
                            <label className='new-product-text-box'>Contenido: </label>
                            <input className='new-product-number-box' type='number' placeholder='0' />
                            <select className='new-product-opc-box'>
                                <option value="">-- Selecciona --</option>
                                <option value=''>Miligramos</option>
                                <option value=''>Gramos</option>
                                <option value=''>Kilogramos</option>
                                <option value=''>Mililitros</option>
                                <option value=''>Litros</option>
                            </select>
                        </div>

                        <div className='new-product-forms'>
                            {renderForm()}
                        </div>

                        <p className='new-product-text-box'>Detalles del producto:</p>
                        <textarea className='new-product-input' placeholder='Detalles del producto ...'></textarea>

                        <div className='new-product-btn-keep'>
                            <ButtonSmall text='Guardar' />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
