import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import ButtonSmall from '../../../buttonSmall/buttonSmall';

export default function FormEditMascotasAlimentos({ onClose, mascotasData, onSave }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Estado para campos de la tabla mascotas
    const [nombre, setNombre] = useState('');
    const [informacionAdicional, setInformacionAdicional] = useState('');

    // Estado para campos de la tabla alimentos_mascotas
    const [contenidoDecimal, setContenidoDecimal] = useState('');
    const [contenidoMedida, setContenidoMedida] = useState('');
    const [especieMascota, setEspecieMascota] = useState('');
    const [etapaVida, setEtapaVida] = useState('');
    const [tamanoRaza, setTamanoRaza] = useState('');
    const [presentacion, setPresentacion] = useState('');
    const [marca, setMarca] = useState('');
    const [ingredientesComposicion, setIngredientesComposicion] = useState('');
    
    // Estados para validaciones
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);

    // Cargar datos del producto al inicializar
    useEffect(() => {
        if (mascotasData) {
            console.log('Datos de mascotas recibidos:', mascotasData);
            
            // Cargar datos de la tabla mascotas
            setNombre(mascotasData.nombre || '');
            setInformacionAdicional(mascotasData.informacion_adicional || '');
            setImageUrl(mascotasData.url || '');
            setImagePreview(mascotasData.url || null);

            // Cargar datos de la tabla alimentos_mascotas
            loadAlimentoData(mascotasData.id);
        }
    }, [mascotasData]);

    // Función para cargar datos específicos del alimento
    const loadAlimentoData = async (mascotaId) => {
        try {
            const { data, error } = await supabase
                .from('alimentos_mascotas')
                .select('*')
                .eq('id', mascotaId)
                .single();

            if (error) {
                console.error('Error al cargar datos del alimento:', error);
                return;
            }

            if (data) {
                console.log('Datos de alimento cargados:', data);
                setContenidoDecimal(data.contenido_decimal?.toString() || '');
                setContenidoMedida(data.contenido_medida || '');
                setEspecieMascota(data.especie_mascota || '');
                setEtapaVida(data.etapa_vida || '');
                setTamanoRaza(data.tamano_raza || '');
                setPresentacion(data.presentacion || '');
                setMarca(data.marca || '');
                setIngredientesComposicion(data.ingredientes_composicion_nutrimental || '');
            }
        } catch (err) {
            console.error('Error inesperado al cargar datos del alimento:', err);
        }
    };

    // Función para validar campos obligatorios
    const validateForm = () => {
        const newErrors = {};
        
        // Validar imagen del producto
        if (!imageFile && !imageUrl) {
            newErrors.image = 'La imagen del producto es obligatoria';
        }
        
        // Validar nombre del producto
        if (!nombre.trim()) {
            newErrors.name = 'El nombre del producto es obligatorio';
        }
        
        // Validaciones específicas para alimentos
        if (!especieMascota) {
            newErrors.especie = 'La especie es obligatoria';
        }
        if (!etapaVida.trim()) {
            newErrors.etapaVida = 'La edad/etapa de vida es obligatoria';
        }
        if (!tamanoRaza) {
            newErrors.tamanoRaza = 'El tamaño o raza es obligatorio';
        }
        if (!presentacion) {
            newErrors.presentacion = 'La presentación es obligatoria';
        }
        if (!contenidoDecimal || contenidoDecimal <= 0) {
            newErrors.contenidoDecimal = 'El contenido es obligatorio y debe ser mayor a 0';
        }
        if (!contenidoMedida) {
            newErrors.contenidoMedida = 'La medida del contenido es obligatoria';
        }
        if (!marca.trim()) {
            newErrors.marca = 'La marca o fabricante es obligatoria';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Función para eliminar imagen anterior del bucket
    const deletePreviousImage = async (imageUrl) => {
        if (!imageUrl) {
            console.log('No hay URL de imagen anterior para eliminar');
            return;
        }
        
        try {
            // Extraer el nombre del archivo de la URL
            const parts = imageUrl.split('/');
            const fileName = parts[parts.length - 1].split('?')[0];
            
            console.log('Intentando eliminar archivo:', fileName);
            
            const { error } = await supabase
                .storage
                .from('mascotas-alimentos-img')
                .remove([fileName]);
                
            if (error) {
                console.error('Error al eliminar imagen anterior:', error);
            } else {
                console.log('Imagen anterior eliminada exitosamente:', fileName);
            }
        } catch (err) {
            console.error('Error al procesar eliminación de imagen anterior:', err);
        }
    };

    // Subida de imagen a Supabase
    const uploadImageToSupabase = async () => {
        if (!imageFile) return null;
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data, error } = await supabase.storage.from('mascotas-alimentos-img').upload(fileName, imageFile);
        if (error) {
            setError('Error al subir la imagen');
            return null;
        }
        const { data: publicUrl } = supabase.storage.from('mascotas-alimentos-img').getPublicUrl(fileName);
        return publicUrl.publicUrl;
    };

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
        // Limpiar error de imagen si se selecciona una
        if (errors.image) {
            setErrors(prev => ({ ...prev, image: null }));
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
        // Agregar error si no hay imagen
        if (!imageUrl) {
            setErrors(prev => ({ ...prev, image: 'La imagen del producto es obligatoria' }));
        }
    };

    // Función para limpiar errores cuando el usuario empiece a escribir
    const handleInputChange = (setter, fieldName, value) => {
        setter(value);
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: null }));
        }
    };

    // Guardar cambios
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validar formulario antes de enviar
        if (!validateForm()) {
            setShowErrors(true);
            setLoading(false);
            return;
        }

        let url = imageUrl;
        let previousImageUrl = null;

        // Si hay una nueva imagen, guardar la URL anterior
        if (imageFile && mascotasData.url) {
            previousImageUrl = mascotasData.url;
            console.log('URL anterior guardada para eliminación:', previousImageUrl);
        }

        if (imageFile) {
            const uploadedUrl = await uploadImageToSupabase();
            if (!uploadedUrl) {
                setLoading(false);
                return;
            }
            url = uploadedUrl;
        }

        try {
            // Actualizar tabla mascotas
            const { error: mascotaError } = await supabase
                .from('mascotas')
                .update({
                    url,
                    nombre,
                    informacion_adicional: informacionAdicional
                })
                .eq('id', mascotasData.id);

            if (mascotaError) {
                console.error('Error al actualizar producto:', mascotaError);
                setError('Error al actualizar producto');
                setLoading(false);
                return;
            }

            // Actualizar tabla alimentos_mascotas
            const { error: alimentoError } = await supabase
                .from('alimentos_mascotas')
                .update({
                    contenido_decimal: parseFloat(contenidoDecimal),
                    contenido_medida: contenidoMedida,
                    especie_mascota: especieMascota,
                    etapa_vida: etapaVida,
                    tamano_raza: tamanoRaza,
                    presentacion,
                    marca,
                    ingredientes_composicion_nutrimental: ingredientesComposicion
                })
                .eq('id', mascotasData.id);

            if (alimentoError) {
                console.error('Error al actualizar datos del alimento:', alimentoError);
                setError('Error al actualizar datos del alimento');
                setLoading(false);
                return;
            }

            // Eliminar imagen anterior si se subió una nueva
            if (previousImageUrl) {
                console.log('Eliminando imagen anterior:', previousImageUrl);
                await deletePreviousImage(previousImageUrl);
            }

            alert('¡Producto actualizado con éxito!');
            if (onSave) onSave();
            onClose();

        } catch (err) {
            console.error('Error inesperado:', err);
            setError('Error inesperado al actualizar el producto');
            setLoading(false);
        }
    };

    return (
        <div className='container-general' onClick={e => { if (e.target.className === 'container-general') onClose && onClose(); }}>
            <div className='new-product-container'>
                <div className='new-product-exit'>
                    <button className='new-product-btn-exit' onClick={onClose}>X</button>
                </div>
                <h1>Editar producto</h1>
                <form onSubmit={handleSubmit}>
                    {/* Imagen */}
                    <div className='new-product-box1'>
                        <label>Imagen del producto *</label>
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
                        {showErrors && errors.image && <p className="error-message">{errors.image}</p>}
                    </div>

                    {/* Nombre y descripción */}
                    <div className='new-product-box1'>
                        <label>Nombre del producto *</label>
                        <input 
                            className={`new-product-input1 ${showErrors && errors.name ? 'error-input' : ''}`} 
                            type='text' 
                            placeholder='Nombre...' 
                            value={nombre} 
                            onChange={(e) => handleInputChange(setNombre, 'name', e.target.value)} 
                        />
                        {showErrors && errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div className='new-product-box1'>
                        <label>Información adicional (opcional)</label>
                        <input 
                            className='new-product-input1' 
                            type='text' 
                            placeholder='Detalles, uso, etc.' 
                            value={informacionAdicional} 
                            onChange={(e) => setInformacionAdicional(e.target.value)} 
                        />
                    </div>

                    {/* Campos específicos de alimentos */}
                    <div className='new-product-box2'>
                        <div className='new-product-box1'>
                            <label>Especie *</label>
                            <select 
                                className={`new-product-opc-category ${showErrors && errors.especie ? 'error-input' : ''}`} 
                                value={especieMascota} 
                                onChange={(e) => handleInputChange(setEspecieMascota, 'especie', e.target.value)}
                            >
                                <option value="">-- Selecciona --</option>
                                <option value='Perro'>Perro</option>
                                <option value='Gato'>Gato</option>
                                <option value='Hamsters'>Hamsters</option>
                                <option value='Peces'>Peces</option>
                            </select>
                            {showErrors && errors.especie && <p className="error-message">{errors.especie}</p>}
                        </div>
                        <div className='new-product-box1'>
                            <label>Edad/Etapa de vida *</label>
                            <input 
                                className={`new-product-opc-category ${showErrors && errors.etapaVida ? 'error-input' : ''}`} 
                                type="text" 
                                placeholder="Escribe la edad ..." 
                                value={etapaVida} 
                                onChange={(e) => handleInputChange(setEtapaVida, 'etapaVida', e.target.value)} 
                            />
                            {showErrors && errors.etapaVida && <p className="error-message">{errors.etapaVida}</p>}
                        </div>
                    </div>

                    <div className='new-product-box2'>
                        <div className='new-product-box1'>
                            <label>Tamaño o raza *</label>
                            <select 
                                className={`new-product-opc-category ${showErrors && errors.tamanoRaza ? 'error-input' : ''}`} 
                                value={tamanoRaza} 
                                onChange={(e) => handleInputChange(setTamanoRaza, 'tamanoRaza', e.target.value)}
                            >
                                <option value="">-- Selecciona --</option>
                                <option value='Razas pequeñas'>Razas pequeñas</option>
                                <option value='Medianas'>Medianas</option>
                                <option value='Grandes'>Grandes</option>
                                <option value='Ninguno'>Ninguno</option>
                            </select>
                            {showErrors && errors.tamanoRaza && <p className="error-message">{errors.tamanoRaza}</p>}
                        </div>
                        <div className='new-product-box1'>
                            <label>Presentación *</label>
                            <select 
                                className={`new-product-opc-category ${showErrors && errors.presentacion ? 'error-input' : ''}`} 
                                value={presentacion} 
                                onChange={(e) => handleInputChange(setPresentacion, 'presentacion', e.target.value)}
                            >
                                <option value="">-- Selecciona --</option>
                                <option value='Croquetas'>Croquetas</option>
                                <option value='Latas'>Latas</option>
                                <option value='Sobres'>Sobres</option>
                                <option value='Snack'>Snack</option>
                            </select>
                            {showErrors && errors.presentacion && <p className="error-message">{errors.presentacion}</p>}
                        </div>
                    </div>

                    <div className='new-product-box2'>
                        <div className='new-product-box1'>
                            <label>Contenido *</label>
                            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                                <input 
                                    className={`new-product-number-box ${showErrors && errors.contenidoDecimal ? 'error-input' : ''}`} 
                                    type='number' 
                                    placeholder='0' 
                                    value={contenidoDecimal}
                                    onChange={(e) => handleInputChange(setContenidoDecimal, 'contenidoDecimal', e.target.value)}
                                />
                                <select 
                                    className={`new-product-opc-box ${showErrors && errors.contenidoMedida ? 'error-input' : ''}`} 
                                    value={contenidoMedida}
                                    onChange={(e) => handleInputChange(setContenidoMedida, 'contenidoMedida', e.target.value)}
                                >
                                    <option value="">-- Selecciona --</option>
                                    <option value='mg'>Miligramos (mg)</option>
                                    <option value='g'>Gramos (g)</option>
                                    <option value='kg'>Kilogramos (kg)</option>
                                    <option value='ml'>Mililitros (ml)</option>
                                    <option value='L'>Litros (L)</option>
                                </select>
                            </div>
                            {(showErrors && errors.contenidoDecimal) && <p className="error-message">{errors.contenidoDecimal}</p>}
                            {(showErrors && errors.contenidoMedida) && <p className="error-message">{errors.contenidoMedida}</p>}
                        </div>
                    </div>

                    <div className='new-product-box1'>
                        <label>Marca o fabricante *</label>
                        <input 
                            className={`new-product-input1 ${showErrors && errors.marca ? 'error-input' : ''}`} 
                            type='text' 
                            placeholder='Minino Plus... ' 
                            value={marca} 
                            onChange={(e) => handleInputChange(setMarca, 'marca', e.target.value)} 
                        />
                        {showErrors && errors.marca && <p className="error-message">{errors.marca}</p>}
                    </div>

                    <div className='new-product-box1'>
                        <label>Composición nutrimental / ingredientes principales (opcional)</label>
                        <textarea
                            className='new-product-input'
                            style={{minHeight: '200px'}}
                            placeholder='Ejemplo: Proteína cruda 25%, Grasa 10%, Pollo, Arroz, Vitaminas...'
                            value={ingredientesComposicion}
                            onChange={(e) => setIngredientesComposicion(e.target.value)}
                        />
                    </div>

                    {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
                    
                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                        <ButtonSmall type="submit" text={'Guardar'} disabled={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
} 