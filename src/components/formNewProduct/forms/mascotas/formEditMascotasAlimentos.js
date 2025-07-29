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
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
    };

    // Guardar cambios
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validaciones
        if (!imageFile && !imageUrl) {
            setError('La imagen es obligatoria');
            setLoading(false);
            return;
        }
        if (!nombre.trim()) {
            setError('El nombre del producto es obligatorio');
            setLoading(false);
            return;
        }
        if (!contenidoDecimal || !contenidoMedida) {
            setError('El contenido es obligatorio para alimentos');
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
                <h1>Editar producto - Mascotas Alimentos</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    {/* Imagen */}
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

                    {/* Nombre y descripción */}
                    <div className='new-product-box1'>
                        <label>Nombre del producto <span style={{color:'red'}}>*</span></label>
                        <input 
                            className='new-product-input1' 
                            type='text' 
                            placeholder='Nombre...' 
                            value={nombre} 
                            onChange={e => setNombre(e.target.value)} 
                        />
                    </div>

                    <div className='new-product-box1'>
                        <label>Información adicional</label>
                        <input 
                            className='new-product-input1' 
                            type='text' 
                            placeholder='Detalles, uso, etc.' 
                            value={informacionAdicional} 
                            onChange={e => setInformacionAdicional(e.target.value)} 
                        />
                    </div>

                    {/* Campos específicos de alimentos */}
                    <div className='new-product-box2'>
                        <div className='new-product-box1'>
                            <label>Especie:</label>
                            <select className='new-product-opc-category' value={especieMascota} onChange={e => setEspecieMascota(e.target.value)}>
                                <option value="">-- Selecciona --</option>
                                <option value='Perro'>Perro</option>
                                <option value='Gato'>Gato</option>
                                <option value='Hamsters'>Hamsters</option>
                                <option value='Peces'>Peces</option>
                            </select>
                        </div>
                        <div className='new-product-box1'>
                            <label>Edad/Etapa de vida:</label>
                            <input className='new-product-opc-category' type="text" placeholder="Escribe la edad ..." value={etapaVida} onChange={e => setEtapaVida(e.target.value)} />
                        </div>
                    </div>

                    <div className='new-product-box2'>
                        <div className='new-product-box1'>
                            <label>Tamaño o raza: </label>
                            <select className='new-product-opc-category' value={tamanoRaza} onChange={e => setTamanoRaza(e.target.value)}>
                                <option value="">-- Selecciona --</option>
                                <option value='Razas pequeñas'>Razas pequeñas</option>
                                <option value='Medianas'>Medianas</option>
                                <option value='Grandes'>Grandes</option>
                                <option value='Ninguno'>Ninguno</option>
                            </select>
                        </div>
                        <div className='new-product-box1'>
                            <label>Presentación: </label>
                            <select className='new-product-opc-category' value={presentacion} onChange={e => setPresentacion(e.target.value)}>
                                <option value="">-- Selecciona --</option>
                                <option value='Croquetas'>Croquetas</option>
                                <option value='Latas'>Latas</option>
                                <option value='Sobres'>Sobres</option>
                                <option value='Snack'>Snack</option>
                            </select>
                        </div>
                    </div>

                    <div className='new-product-box2'>
                        <div className='new-product-box1'>
                            <label>Contenido: <span style={{color:'red'}}>*</span></label>
                            <input 
                                className='new-product-number-box' 
                                type='number' 
                                placeholder='0' 
                                value={contenidoDecimal}
                                onChange={e => setContenidoDecimal(e.target.value)}
                            />
                            <select 
                                className='new-product-opc-box' 
                                value={contenidoMedida}
                                onChange={e => setContenidoMedida(e.target.value)}
                            >
                                <option value="">-- Selecciona --</option>
                                <option value='mg'>Miligramos (mg)</option>
                                <option value='g'>Gramos (g)</option>
                                <option value='kg'>Kilogramos (kg)</option>
                                <option value='ml'>Mililitros (ml)</option>
                                <option value='L'>Litros (L)</option>
                            </select>
                        </div>
                    </div>

                    <div className='new-product-box1'>
                        <label>Marca o fabricante:</label>
                        <input className='new-product-input1' type='text' placeholder='Minino Plus... ' value={marca} onChange={e => setMarca(e.target.value)} />
                    </div>

                    <div className='new-product-box1'>
                        <label style={{fontWeight:'bold'}}>Composición nutrimental / ingredientes principales</label>
                        <textarea
                            className='new-product-input1'
                            style={{minHeight: '80px'}}
                            placeholder='Ejemplo: Proteína cruda 25%, Grasa 10%, Pollo, Arroz, Vitaminas...'
                            value={ingredientesComposicion}
                            onChange={e => setIngredientesComposicion(e.target.value)}
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