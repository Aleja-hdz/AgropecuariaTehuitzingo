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
    
    // Estados para validaciones
    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);

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

    // Ocultar navbar cuando se abre el modal
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      
      // Ocultar el navbar cuando se abre el modal
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.add('hidden');
      }
      
      return () => {
        document.body.style.overflow = 'unset';
        
        // Mostrar el navbar cuando se cierra el modal
        const navbar = document.querySelector('.navbar');
        if (navbar) {
          navbar.classList.remove('hidden');
        }
      };
    }, []);

    // Función para validar campos obligatorios
    const validateForm = () => {
      const newErrors = {};
      
      // Validar selección de tipo de producto
      if (!opcProduct) {
        newErrors.productType = 'Debe seleccionar si es Alimento o Accesorio';
      }
      
      // Validar imagen del producto
      if (!imageFile && !imageUrl) {
        newErrors.image = 'La imagen del producto es obligatoria';
      }
      
      // Validar nombre del producto
      if (!nombre.trim()) {
        newErrors.name = 'El nombre del producto es obligatorio';
      }
      
      // Validaciones específicas para alimentos
      if (opcProduct === 'Alimento') {
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
      }
      
      // Validaciones específicas para accesorios
      if (opcProduct === 'Accesorio') {
        if (!queEs.trim()) {
          newErrors.queEs = 'El campo "¿Qué es?" es obligatorio';
        }
        if (!tipoAnimal.trim()) {
          newErrors.tipoAnimal = 'El tipo de animal es obligatorio';
        }
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

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
                // Imagen eliminada exitosamente
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

    // Función para limpiar errores cuando el usuario empiece a escribir
    const handleInputChange = (setter, fieldName, value) => {
      setter(value);
      if (errors[fieldName]) {
        setErrors(prev => ({ ...prev, [fieldName]: null }));
      }
    };

    // Guardar producto
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
        setErrors({});
        setShowErrors(false);
    };

    return (
        <div className='container-general' onClick={e => { if (e.target.className === 'container-general') onClose && onClose(); }}>
            <div className='new-product-container'>
                <div className='new-product-exit'>
                    <button className='new-product-btn-exit' onClick={onClose}>X</button>
                </div>
                <h1>{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className='new-product-box1'>
                        <label>¿Qué es? *</label>
                        <div className='new-product-box2'>
                            <div className='new-product-box3'>
                                <label>Alimento</label>
                                <input 
                                    type='radio' 
                                    name='producto' 
                                    value='Alimento'
                                    checked={opcProduct === 'Alimento'}
                                    onChange={(e) => handleInputChange(setOpcProduct, 'productType', e.target.value)}
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
                                    onChange={(e) => handleInputChange(setOpcProduct, 'productType', e.target.value)}
                                    disabled={isEdit}
                                />
                            </div>
                        </div>
                        {showErrors && errors.productType && <p className="error-message">{errors.productType}</p>}
                    </div>
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
                    {/* Subformularios dinámicos */}
                    {opcProduct === 'Alimento' && (
                        <>
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
                        </>
                    )}
                    {opcProduct === 'Accesorio' && (
                        <>
                            <div className='new-product-box1'>
                                <label>¿Qué es? *</label>
                                <input 
                                    className={`new-product-input1 ${showErrors && errors.queEs ? 'error-input' : ''}`} 
                                    type='text' 
                                    placeholder='Collar, Juguete, etc.' 
                                    value={queEs} 
                                    onChange={(e) => handleInputChange(setQueEs, 'queEs', e.target.value)} 
                                />
                                {showErrors && errors.queEs && <p className="error-message">{errors.queEs}</p>}
                            </div>
                            <div className='new-product-box1'>
                                <label>Tipo de animal *</label>
                                <input 
                                    className={`new-product-input1 ${showErrors && errors.tipoAnimal ? 'error-input' : ''}`} 
                                    type='text' 
                                    placeholder='Perro, Gato, etc.' 
                                    value={tipoAnimal} 
                                    onChange={(e) => handleInputChange(setTipoAnimal, 'tipoAnimal', e.target.value)} 
                                />
                                {showErrors && errors.tipoAnimal && <p className="error-message">{errors.tipoAnimal}</p>}
                            </div>
                            <div className='new-product-box1'>
                                <label>Recomendaciones de uso (opcional)</label>
                                <input 
                                    type='text' 
                                    placeholder='Recomendado para  ...' 
                                    className='new-product-input1' 
                                    value={recomendacionesUso} 
                                    onChange={(e) => setRecomendacionesUso(e.target.value)} 
                                />
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
