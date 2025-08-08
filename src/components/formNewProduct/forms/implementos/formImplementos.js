import ButtonSmall from "../../../buttonSmall/buttonSmall";
import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function FormImplementos({ onClose, implementsData, isEdit, onSave }) {

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(implementsData?.url || '');
  const [nameImplement, setNameImplement] = useState(implementsData?.nombre || '');
  const [typeAnimal, setTypeAnimal] = useState(implementsData?.tipo_animal || '');
  const [is, setIs] = useState(implementsData?.que_es || '');
  const [recomendations, setRecomendations] = useState(implementsData?.recomendaciones_uso || '');
  const [additionalDetails, setAdditionalDetails] = useState(implementsData?.informacion_adicional || '');
  const [presentaciones, setPresentaciones] = useState(implementsData?.presentaciones_disponibles || '');
  const [marca, setMarca] = useState(implementsData?.marca_distribuidor || '');
  
  // Estados para validaciones
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  // Agregado: Sincronizar los campos con implementsData al cambiar
  useEffect(() => {
    setImageUrl(implementsData?.url || '');
    setNameImplement(implementsData?.nombre || '');
    setTypeAnimal(implementsData?.tipo_animal || '');
    setIs(implementsData?.que_es || '');
    setRecomendations(implementsData?.recomendaciones_uso || '');
    setAdditionalDetails(implementsData?.informacion_adicional || '');
    setPresentaciones(implementsData?.presentaciones_disponibles || '');
    setMarca(implementsData?.marca_distribuidor || '');
    setImagePreview(implementsData?.url || null);
  }, [implementsData]);

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
    
    // Validar imagen del producto
    if (!imageFile && !imageUrl) {
      newErrors.image = 'La imagen del producto es obligatoria';
    }
    
    // Validar nombre del producto
    if (!nameImplement.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio';
    }
    
    // Validar ¿Qué es?
    if (!is) {
      newErrors.whatIs = 'Debe seleccionar qué es el implemento';
    }
    
    // Validar ¿Para qué animal?
    if (!typeAnimal) {
      newErrors.animalType = 'Debe seleccionar para qué animal es el implemento';
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

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    // Agregar error si no hay imagen
    if (!imageUrl) {
      setErrors(prev => ({ ...prev, image: 'La imagen del producto es obligatoria' }));
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
        .from('implementos-img')
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

  const uploadImageToSupabase = async () => {
    if (!imageFile) return;

    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data, error } = await supabase
        .storage
        .from('implementos-img')
        .upload(fileName, imageFile);

    if (error) {
        console.error("Error al subir imagen:", error);
        return null;
    }

    const { data: publicUrl } = supabase
        .storage
        .from('implementos-img')
        .getPublicUrl(fileName);

    setImageUrl(publicUrl.publicUrl);
    return publicUrl.publicUrl;
  };

  // Función para limpiar errores cuando el usuario empiece a escribir
  const handleInputChange = (setter, fieldName, value) => {
    setter(value);
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
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
          if (isEdit && implementsData && imageFile && implementsData.url) {
              previousImageUrl = implementsData.url;
          }
          
          if (imageFile) {
              const uploadedUrl = await uploadImageToSupabase();
              if (!uploadedUrl) {
                  alert('No se pudo subir la imagen.');
                  return;
              }
              url = uploadedUrl;
          }
          
          if (isEdit && implementsData) {
              const { error } = await supabase.from('implementos').update({
                  url: url,
                  nombre: nameImplement,
                  tipo_animal: typeAnimal,
                  que_es: is,
                  recomendaciones_uso: recomendations,
                  informacion_adicional: additionalDetails,
                  presentaciones_disponibles: presentaciones,
                  marca_distribuidor: marca,
              }).eq('id', implementsData.id);
              if (error) {
                  console.error(error);
                  alert('Error al actualizar producto en Supabase');
                  return;
              }
              
              // Eliminar imagen anterior si se subió una nueva
              if (previousImageUrl) {
                  await deletePreviousImage(previousImageUrl);
              }
              
              alert('¡Producto actualizado con éxito!');
              if (onSave) onSave();
              onClose();
          } else {
              // Crear nuevo producto
              const { error } = await supabase.from('implementos').insert({
                  url: url,
                  nombre: nameImplement,
                  tipo_animal: typeAnimal,
                  que_es: is,
                  recomendaciones_uso: recomendations,
                  informacion_adicional: additionalDetails,
                  presentaciones_disponibles: presentaciones,
                  marca_distribuidor: marca,
              });
              if (error) {
                  console.error(error);
                  alert('Error al guardar el producto en Supabase');
                  return;
              }
              alert('¡Producto guardado con éxito!');
              resetForm();
              if (onSave) onSave();
              onClose();
          }
      } catch (err) {
          console.error('Error inesperado:', err);
          alert('Error inesperado al guardar el producto.');
      }
  };

  const resetForm = () => {
      setImageFile(null);
      setImagePreview(null);
      setImageUrl('');
      setNameImplement('');
      setTypeAnimal('');
      setIs('');
      setRecomendations('');
      setAdditionalDetails('');
      setPresentaciones('');
      setMarca('');
      setErrors({});
      setShowErrors(false);
  };

    return (
        <div className='container-general' onClick={e => { if (e.target.className === 'container-general') onClose(); }}>
            <div className='new-product-container'>
                <div className='new-product-exit'>
                    <button className='new-product-btn-exit' onClick={onClose}>X</button>
                </div>
                <h1>{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>
                <p className='new-product-text'>Imagen para el producto *</p>
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
                
                <p className='new-product-text'>Nombre del producto *</p>
                <input 
                    className={`new-product-input1 ${showErrors && errors.name ? 'error-input' : ''}`} 
                    type='text' 
                    placeholder='Cerdo Inicia Medicado ...' 
                    value={nameImplement} 
                    onChange={(e) => handleInputChange(setNameImplement, 'name', e.target.value)}
                />
                {showErrors && errors.name && <p className="error-message">{errors.name}</p>}
                
                <div className='new-product-box2'>
                  <div className='new-product-box1'>
                    <label>¿Qué es? *</label>
                    <select 
                        className={`new-product-opc-category ${showErrors && errors.whatIs ? 'error-input' : ''}`} 
                        name="Opciones" 
                        value={is} 
                        onChange={(e) => handleInputChange(setIs, 'whatIs', e.target.value)}
                    >
                        <option value="">-- Selecciona --</option>
                        <option value='Comedero'>Comedero</option>
                        <option value='Bebedero'>Bebedero</option>
                        <option value='Montura'>Montura</option>
                        <option value='Cuerda'>Cuerda</option>
                        <option value='Deslanador'>Deslanador</option>
                    </select>
                    {showErrors && errors.whatIs && <p className="error-message">{errors.whatIs}</p>}
                  </div>
                  <div className='new-product-box1'>
                    <label>¿Para qué animal? *</label>
                    <select 
                        className={`new-product-opc-category ${showErrors && errors.animalType ? 'error-input' : ''}`} 
                        name="Opciones" 
                        value={typeAnimal} 
                        onChange={(e) => handleInputChange(setTypeAnimal, 'animalType', e.target.value)}
                    >
                        <option value="">-- Selecciona --</option>
                        <option value='Gallos'>Gallos</option>
                        <option value='Pollos'>Pollos</option>
                        <option value='Caballos'>Caballos</option>
                        <option value='Vacas'>Vacas</option>
                        <option value='Cerdos'>Cerdos</option>
                        <option value='Ovejas'>Ovejas</option>
                    </select>
                    {showErrors && errors.animalType && <p className="error-message">{errors.animalType}</p>}
                  </div>
                </div>
                <p style={styles.p}>Recomendaciones de uso (opcional): </p>
                <input 
                    type='text' 
                    placeholder='Recomendado para  ...' 
                    className='new-product-input1' 
                    value={recomendations} 
                    onChange={(e) => setRecomendations(e.target.value)}
                />
                <div style={styles.divUso}></div>
                
                <p className='new-product-text'>Presentaciones disponibles (opcional):</p>
                <input 
                    type='text' 
                    placeholder='Presentaciones de 1k, 3k y 5k ...' 
                    className='new-product-input1' 
                    value={presentaciones} 
                    onChange={(e) => setPresentaciones(e.target.value)}
                />
                
                <p className='new-product-text'>Marca o distribuidor (opcional):</p>
                <input 
                    type='text' 
                    placeholder='Marca o distribuidor ...' 
                    className='new-product-input1' 
                    value={marca} 
                    onChange={(e) => setMarca(e.target.value)}
                />
                
                <p className='new-product-text-box'>Detalles del producto (opcional):</p>
                <textarea 
                    className='new-product-input' 
                    placeholder='Detalles del producto ...' 
                    value={additionalDetails} 
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                ></textarea>
                <div className='new-product-btn-keep'>
                    <ButtonSmall text='Guardar' onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    );
}

const styles = {
    p: {
    marginBottom: '5px',
  },

  divUso: {
    marginBottom: '-15px',
  },
}