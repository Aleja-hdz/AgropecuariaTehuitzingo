import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import ButtonSmall from '../../../buttonSmall/buttonSmall';

export default function FormEditMascotasAccesorios({ onClose, mascotasData, onSave }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Estado para campos de la tabla mascotas
    const [nombre, setNombre] = useState('');
    const [informacionAdicional, setInformacionAdicional] = useState('');

    // Estado para campos de la tabla accesorios_mascotas
    const [queEs, setQueEs] = useState('');
    const [tipoAnimal, setTipoAnimal] = useState('');
    const [recomendacionesUso, setRecomendacionesUso] = useState('');

    // Cargar datos del producto al inicializar
    useEffect(() => {
        if (mascotasData) {
            console.log('Datos de mascotas recibidos:', mascotasData);
            
            // Cargar datos de la tabla mascotas
            setNombre(mascotasData.nombre || '');
            setInformacionAdicional(mascotasData.informacion_adicional || '');
            setImageUrl(mascotasData.url || '');
            setImagePreview(mascotasData.url || null);

            // Cargar datos de la tabla accesorios_mascotas
            loadAccesorioData(mascotasData.id);
        }
    }, [mascotasData]);

    // Función para cargar datos específicos del accesorio
    const loadAccesorioData = async (mascotaId) => {
        try {
            const { data, error } = await supabase
                .from('accesorios_mascotas')
                .select('*')
                .eq('id', mascotaId)
                .single();

            if (error) {
                console.error('Error al cargar datos del accesorio:', error);
                return;
            }

            if (data) {
                console.log('Datos de accesorio cargados:', data);
                setQueEs(data.que_es || '');
                setTipoAnimal(data.tipo_animal || '');
                setRecomendacionesUso(data.recomendaciones_uso || '');
            }
        } catch (err) {
            console.error('Error inesperado al cargar datos del accesorio:', err);
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
                .from('mascotas-accesorios-img')
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
        const { data, error } = await supabase.storage.from('mascotas-accesorios-img').upload(fileName, imageFile);
        if (error) {
            setError('Error al subir la imagen');
            return null;
        }
        const { data: publicUrl } = supabase.storage.from('mascotas-accesorios-img').getPublicUrl(fileName);
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

            // Actualizar tabla accesorios_mascotas
            const { error: accesorioError } = await supabase
                .from('accesorios_mascotas')
                .update({
                    que_es: queEs,
                    tipo_animal: tipoAnimal,
                    recomendaciones_uso: recomendacionesUso
                })
                .eq('id', mascotasData.id);

            if (accesorioError) {
                console.error('Error al actualizar datos del accesorio:', accesorioError);
                setError('Error al actualizar datos del accesorio');
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
                <h1>Editar producto - Mascotas Accesorios</h1>
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

                    {/* Campos específicos de accesorios */}
                    <div className='new-product-box1'>
                        <label>¿Qué es?</label>
                        <input 
                            className='new-product-input1' 
                            type='text' 
                            placeholder='Collar, Juguete, etc.' 
                            value={queEs} 
                            onChange={e => setQueEs(e.target.value)} 
                        />
                    </div>

                    <div className='new-product-box1'>
                        <label>Tipo de animal:</label>
                        <input 
                            className='new-product-input1' 
                            type='text' 
                            placeholder='Perro, Gato, etc.' 
                            value={tipoAnimal} 
                            onChange={e => setTipoAnimal(e.target.value)} 
                        />
                    </div>

                    <div className='new-product-box1'>
                        <label>Recomendaciones de uso (opcional):</label>
                        <input 
                            type='text' 
                            placeholder='Recomendado para  ...' 
                            className='new-product-input1' 
                            value={recomendacionesUso} 
                            onChange={e => setRecomendacionesUso(e.target.value)} 
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