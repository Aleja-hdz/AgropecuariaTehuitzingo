import { useState } from 'react';
import FormRawMaterials from '../formRawMaterials';
import { supabase } from '../../../../lib/supabaseClient';
import ButtonLong from '../../../buttonLong/buttonLong';

export default function FormAlimentosBalanceados({ onSave, onClose }) {
    const [esAlimentoProduccion, setEsAlimentoProduccion] = useState('');
    const [especie, setEspecie] = useState('');
    const [marca, setMarca] = useState('');
    const [nombre, setNombre] = useState('');
    const [detalles, setDetalles] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [opcRawMaterials, setOpcRaewMaterials] = useState(false);
    
    // Estados para manejo de imágenes
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    // Para mostrar el formulario de materias primas si se selecciona la opción
    const renderFormRawMaterials = () => opcRawMaterials ? <FormRawMaterials /> : <></>;

    // Manejo de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file?.type.startsWith('image/')) {
            setError('Solo se permiten imágenes');
            return;
        }
        setError('');
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
        setImageFile(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
    };

    // Subida de imagen a Supabase
    const uploadImageToSupabase = async () => {
        if (!imageFile) return null;
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data, error } = await supabase.storage.from('alimentos-balanceados-img').upload(fileName, imageFile);
        if (error) {
            setError('Error al subir la imagen');
            return null;
        }
        const { data: publicUrl } = supabase.storage.from('alimentos-balanceados-img').getPublicUrl(fileName);
        return publicUrl.publicUrl;
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        // Validación básica
        if (!nombre || !especie || !marca) {
            setError('Por favor, completa todos los campos obligatorios.');
            setLoading(false);
            return;
        }

        // Validación de imagen
        if (!imageFile && !imageUrl) {
            setError('La imagen es obligatoria');
            setLoading(false);
            return;
        }

        let url = imageUrl;
        
        // Subir imagen si hay una nueva
        if (imageFile) {
            const uploadedUrl = await uploadImageToSupabase();
            if (!uploadedUrl) {
                setLoading(false);
                return;
            }
            url = uploadedUrl;
        }

        // Insertar en Supabase
        const { error } = await supabase
            .from('alimentos_balanceados')
            .insert([
                {
                    nombre,
                    especie,
                    marca,
                    es_produccion: esAlimentoProduccion,
                    detalles,
                    url: url,
                }
            ]);
        if (error) {
            setError('Error al guardar: ' + error.message);
        } else {
            setSuccess('¡Producto guardado exitosamente!');
            if (onSave) onSave();
            // Limpiar formulario
            setNombre('');
            setEspecie('');
            setMarca('');
            setEsAlimentoProduccion('');
            setDetalles('');
            setImagePreview(null);
            setImageFile(null);
            setImageUrl('');
            setOpcRaewMaterials(false);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleGuardar}>
            <br></br>
            
            {/* Sección de imagen */}
            <div className='new-product-box1'>
                <label>Imagen del producto <span style={{color:'red'}}>*</span></label>
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
                        <button type="button" onClick={removeImage} className='btn-remove-image'>
                            Volver a elegir
                        </button>
                    </div>
                )}
            </div>

            <div className='new-product-box1'>
                <label>Nombre del producto:</label>
                <input className='new-product-input1' type='text' value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>
            <div className='new-product-box1'>
                <label>¿Es alimento para producción?</label>
                <div className='new-product-box2'>
                    <div className='new-product-box3'>
                        <label>Si</label>
                        <input 
                            type='radio' 
                            name='alimentoProduccion' 
                            value='Si'
                            checked={esAlimentoProduccion === 'Si'}
                            onChange={(e) => setEsAlimentoProduccion(e.target.value)}
                        />
                    </div>
                    <div className='new-product-box3'>
                        <label>No</label>
                        <input 
                            type='radio' 
                            name='alimentoProduccion' 
                            value='No'
                            checked={esAlimentoProduccion === 'No'}
                            onChange={(e) => setEsAlimentoProduccion(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='new-product-box2'>
                <div className='new-product-box1'>
                    <label>Especie:</label>
                    <select 
                        className='new-product-opc-category'
                        value={especie}
                        onChange={(e) => setEspecie(e.target.value)}
                        required
                    >
                        <option value="">-- Selecciona --</option>
                        <option value='Bovinos'>Bovinos</option>
                        <option value='Equinos'>Equinos</option>
                        <option value='Porcinos'>Porcinos</option>
                        <option value='Caprinos'>Caprinos</option>
                        <option value='Ovinos'>Ovinos</option>
                        <option value='Aves'>Aves</option>
                        <option value='Aquacultura'>Aquacultura</option>
                    </select>
                </div>
                <div className='new-product-box1'>
                    <label>Marca:</label>
                    <select 
                        className='new-product-opc-category'
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    >
                        <option value="">-- Selecciona --</option>
                        <option value='Unión'>Unión</option>
                        <option value='Apiaba'>Apiaba</option>
                        <option value='Fasa'>Fasa</option>
                        <option value='Nutre bien'>Nutre bien</option>
                    </select>
                </div>
            </div>
            <div className='new-product-box1'>
                <label>Detalles:</label>
                <textarea 
                    value={detalles} 
                    onChange={e => setDetalles(e.target.value)} 
                    style={{minHeight: '100px', resize: 'vertical'}}
                />
            </div>
            {/* Aquí puedes dejar la lógica de materias primas si la necesitas */}
            <div className='new-product-box1'>
                <label>¿Deseas añadir sus materias primas?</label>
                <div className='new-product-box2'>
                    <div className='new-product-box3'>
                        <label>Si</label>
                        <input type='radio' name='materiasPrimas' value='true' onChange={() => setOpcRaewMaterials(true)} checked={opcRawMaterials === true}/>
                    </div>
                    <div className='new-product-box3'>
                        <label>No</label>
                        <input type='radio' name='materiasPrimas' value='false' onChange={() => setOpcRaewMaterials(false)} checked={opcRawMaterials === false}/>
                    </div>
                </div>
            </div>
            <div className='new-product-forms'>
                {opcRawMaterials ? <FormRawMaterials /> : null}
            </div>
            {error && <div style={{color:'red'}}>{error}</div>}
            {success && <div style={{color:'green'}}>{success}</div>}
            <div style={{marginTop:'1rem', display: 'flex', justifyContent: 'center'}}>
                <ButtonLong text={loading ? 'Guardando...' : 'Guardar'} type='submit' disabled={loading} />
            </div>
        </form>
    );
}