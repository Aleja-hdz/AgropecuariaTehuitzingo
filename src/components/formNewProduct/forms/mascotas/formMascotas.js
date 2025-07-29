import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import ButtonSmall from '../../../buttonSmall/buttonSmall'

export default function FormMascotas({ onClose, mascotasData, isEdit, onSave }) {
    const [opcProduct, setOpcProduct] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(mascotasData?.url || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Estado general para campos comunes
    const [nombre, setNombre] = useState(mascotasData?.nombre || '');
    const [informacionAdicional, setInformacionAdicional] = useState(mascotasData?.informacion_adicional || '');

    // Estado para Alimento
    const [especieMascota, setEspecieMascota] = useState('');
    const [etapaVida, setEtapaVida] = useState('');
    const [tamanoRaza, setTamanoRaza] = useState('');
    const [presentacion, setPresentacion] = useState('');
    const [marca, setMarca] = useState('');
    const [ingredientesComposicion, setIngredientesComposicion] = useState('');
    const [contenidoDecimal, setContenidoDecimal] = useState('');
    const [contenidoMedida, setContenidoMedida] = useState('');

    // Estado para Accesorio
    const [queEs, setQueEs] = useState('');
    const [tipoAnimal, setTipoAnimal] = useState('');
    const [recomendacionesUso, setRecomendacionesUso] = useState('');

    // Sincronizar datos de edición
    useEffect(() => {
      if (mascotasData && isEdit) {
        setOpcProduct(mascotasData.sub_categoria || '');
        setNombre(mascotasData.nombre || '');
        setInformacionAdicional(mascotasData.informacion_adicional || '');
        setImageUrl(mascotasData.url || '');
        setImagePreview(mascotasData.url || null);
        
        // Cargar datos específicos según subcategoría
        if (mascotasData.sub_categoria === 'Alimento') {
          // Aquí necesitarías cargar los datos de la tabla alimentos_mascotas
          // Por ahora se pueden dejar vacíos
        } else if (mascotasData.sub_categoria === 'Accesorio') {
          // Aquí necesitarías cargar los datos de la tabla accesorios_mascotas
          // Por ahora se pueden dejar vacíos
        }
      }
    }, [mascotasData, isEdit]);

    // Imagen
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
    // Función para eliminar imagen anterior del bucket
    const deletePreviousImage = async (imageUrl, bucket) => {
        if (!imageUrl) return;
        
        try {
            // Extraer el nombre del archivo de la URL
            const parts = imageUrl.split('/');
            const fileName = parts[parts.length - 1].split('?')[0];
            
            const { error } = await supabase
                .storage
                .from(bucket)
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

    const uploadImageToSupabase = async (bucket) => {
        if (!imageFile) return null;
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { data, error } = await supabase.storage.from(bucket).upload(fileName, imageFile);
        if (error) {
            setError('Error al subir la imagen');
            return null;
        }
        const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(fileName);
        return publicUrl.publicUrl;
    };

    // Guardar producto
    const handleSubmit = async (e) => {
      console.log('Enviando formulario...')
        e.preventDefault();
        setError('');
        setLoading(true);
        // Validaciones
        if (!opcProduct) {
            setError('Selecciona si es Alimento o Accesorio');
            setLoading(false);
            return;
        }
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
        
        // Validaciones específicas para alimentos
        if (opcProduct === 'Alimento') {
            if (!contenidoDecimal || !contenidoMedida) {
                setError('El contenido es obligatorio para alimentos');
                setLoading(false);
                return;
            }
        }
        
        let url = imageUrl;
        let bucket = opcProduct === 'Alimento' ? 'mascotas-alimentos-img' : 'mascotas-accesorios-img';
        let previousImageUrl = null;
        let previousBucket = null;
        
        // Si estamos editando y hay una nueva imagen, guardar la URL anterior
        if (isEdit && mascotasData && imageFile && mascotasData.url) {
            previousImageUrl = mascotasData.url;
            // Determinar el bucket anterior basado en la subcategoría existente
            if (mascotasData.sub_categoria === 'Alimento') {
                previousBucket = 'mascotas-alimentos-img';
            } else if (mascotasData.sub_categoria === 'Accesorio') {
                previousBucket = 'mascotas-accesorios-img';
            }
        }
        
        if (imageFile) {
            const uploadedUrl = await uploadImageToSupabase(bucket);
            if (!uploadedUrl) {
                setLoading(false);
                return;
            }
            url = uploadedUrl;
        }
        
        if (isEdit && mascotasData) {
            // Actualizar producto existente
            const { error: updateError } = await supabase.from('mascotas').update({
                url,
                nombre,
                informacion_adicional: informacionAdicional
            }).eq('id', mascotasData.id);
            
            if (updateError) {
                console.error('Error al actualizar producto:', updateError);
                setError('Error al actualizar producto');
                setLoading(false);
                return;
            }
            
            // Eliminar imagen anterior si se subió una nueva
            if (previousImageUrl && previousBucket) {
                await deletePreviousImage(previousImageUrl, previousBucket);
            }
            
            alert('¡Producto actualizado con éxito!');
            if (onSave) onSave();
            onClose();
        } else {
            // Crear nuevo producto
            const { data: mascotaData, error: mascotaError } = await supabase.from('mascotas').insert({
                categoria: 'Mascotas',
                sub_categoria: opcProduct,
                url,
                nombre,
                informacion_adicional: informacionAdicional
            }).select('id').single();
            
            if (mascotaError || !mascotaData) {
                setError('Error al guardar el producto general');
                setLoading(false);
                return;
            }
            
            const id = mascotaData.id;
            
            // Insertar en tabla hija
            if (opcProduct === 'Alimento') {
                const { error: alimentoError } = await supabase.from('alimentos_mascotas').insert({
                    id,
                    contenido_decimal: parseFloat(contenidoDecimal),
                    contenido_medida: contenidoMedida,
                    especie_mascota: especieMascota,
                    etapa_vida: etapaVida,
                    tamano_raza: tamanoRaza,
                    presentacion,
                    marca,
                    ingredientes_composicion_nutrimental: ingredientesComposicion
                });
                if (alimentoError) {
                    console.error('Error al guardar los datos de alimento:', alimentoError);
                    setError('Error al guardar los datos de alimento');
                    setLoading(false);
                    return;
                }
            } else if (opcProduct === 'Accesorio') {
                const { error: accesorioError } = await supabase.from('accesorios_mascotas').insert({
                    id,
                    que_es: queEs,
                    tipo_animal: tipoAnimal,
                    recomendaciones_uso: recomendacionesUso
                });
                if (accesorioError) {
                    console.error('Error al guardar los datos de accesorio:', accesorioError);
                    setError('Error al guardar los datos de accesorio');
                    setLoading(false);
                    return;
                }
            }
            
            alert('¡Producto guardado con éxito!');
            resetForm();
            if (onSave) onSave();
            onClose();
        }
    };

    const resetForm = () => {
        setOpcProduct('');
        setImagePreview(null);
        setImageFile(null);
        setImageUrl('');
        setNombre('');
        setInformacionAdicional('');
        setEspecieMascota('');
        setEtapaVida('');
        setTamanoRaza('');
        setPresentacion('');
        setMarca('');
        setIngredientesComposicion('');
        setContenidoDecimal('');
        setContenidoMedida('');
        setQueEs('');
        setTipoAnimal('');
        setRecomendacionesUso('');
    };

    return (
        <div className='container-general' onClick={e => { if (e.target.className === 'container-general') onClose && onClose(); }}>
            <div className='new-product-container'>
                <div className='new-product-exit'>
                    <button className='new-product-btn-exit' onClick={onClose}>X</button>
                </div>
                <h1>{isEdit ? 'Editar producto - Mascotas' : 'Nuevo producto - Mascotas'}</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className='new-product-box1'>
                        <label>¿Qué es?</label>
                        <div className='new-product-box2'>
                            <div className='new-product-box3'>
                                <label>Alimento</label>
                                <input 
                                    type='radio' 
                                    name='producto' 
                                    value='Alimento'
                                    checked={opcProduct === 'Alimento'}
                                    onChange={(e) => setOpcProduct(e.target.value)}
                                    disabled={isEdit}
                                />
                            </div>
                            <div className='new-product-box3'>
                                <label>Accesorio</label>
                                <input 
                                    type='radio' 
                                    name='producto' 
                                    value='Accesorio'
                                    checked={opcProduct === 'Accesorio'}
                                    onChange={(e) => setOpcProduct(e.target.value)}
                                    disabled={isEdit}
                                />
                            </div>
                        </div>
                    </div>
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
                        <input className='new-product-input1' type='text' placeholder='Nombre...' value={nombre} onChange={e => setNombre(e.target.value)} />
                    </div>
                    <div className='new-product-box1'>
                        <label>Información adicional</label>
                        <input className='new-product-input1' type='text' placeholder='Detalles, uso, etc.' value={informacionAdicional} onChange={e => setInformacionAdicional(e.target.value)} />
                    </div>
                    {/* Subformularios dinámicos */}
                    {opcProduct === 'Alimento' && (
                        <>
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
                        </>
                    )}
                    {opcProduct === 'Accesorio' && (
                        <>
                            <div className='new-product-box1'>
                                <label>¿Qué es?</label>
                                <input className='new-product-input1' type='text' placeholder='Collar, Juguete, etc.' value={queEs} onChange={e => setQueEs(e.target.value)} />
                            </div>
                            <div className='new-product-box1'>
                                <label>Tipo de animal:</label>
                                <input className='new-product-input1' type='text' placeholder='Perro, Gato, etc.' value={tipoAnimal} onChange={e => setTipoAnimal(e.target.value)} />
                            </div>
                            <div className='new-product-box1'>
                                <label>Recomendaciones de uso (opcional):</label>
                                <input type='text' placeholder='Recomendado para  ...' className='new-product-input1' value={recomendacionesUso} onChange={e => setRecomendacionesUso(e.target.value)} />
                            </div>
                        </>
                    )}
                    {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                        <ButtonSmall type="submit" text={'Guardar'} disabled={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
}
