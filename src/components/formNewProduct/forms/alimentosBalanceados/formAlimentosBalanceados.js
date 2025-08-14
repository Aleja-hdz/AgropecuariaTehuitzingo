import ButtonSmall from "../../../buttonSmall/buttonSmall";
import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function FormAlimentosBalanceados({ onClose, alimentosData, isEdit, onSave }) {
  // Estados para los campos del formulario
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(alimentosData?.url || '');
  const [nombre, setNombre] = useState(alimentosData?.nombre || '');
  const [alimentoProduccion, setAlimentoProduccion] = useState(alimentosData?.alimento_produccion || false);
  const [contenidoDecimal, setContenidoDecimal] = useState(alimentosData?.contenido_decimal || '');
  const [contenidoMedida, setContenidoMedida] = useState(alimentosData?.contenido_medida || '');
  const [especie, setEspecie] = useState(alimentosData?.especie || '');
  const [marca, setMarca] = useState(alimentosData?.marca || '');
  const [materiasPrimas, setMateriasPrimas] = useState(alimentosData?.materias_primas || '');
  const [informacionAdicional, setInformacionAdicional] = useState(alimentosData?.informacion_adicional || '');
  
  // Estados para validaciones
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  // Sincronizar los campos con alimentosData al cambiar
  useEffect(() => {
    setImageUrl(alimentosData?.url || '');
    setNombre(alimentosData?.nombre || '');
    setAlimentoProduccion(alimentosData?.alimento_produccion || false);
    setContenidoDecimal(alimentosData?.contenido_decimal || '');
    setContenidoMedida(alimentosData?.contenido_medida || '');
    setEspecie(alimentosData?.especie || '');
    setMarca(alimentosData?.marca || '');
    setMateriasPrimas(alimentosData?.materias_primas || '');
    setInformacionAdicional(alimentosData?.informacion_adicional || '');
    setImagePreview(alimentosData?.url || null);
  }, [alimentosData]);

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
    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es obligatorio';
    }
    
    // Validar contenido decimal
    if (!contenidoDecimal) {
      newErrors.contenidoDecimal = 'El contenido es obligatorio';
    }
    
    // Validar medida del contenido
    if (!contenidoMedida) {
      newErrors.contenidoMedida = 'Debe seleccionar la medida del contenido';
    }
    
    // Validar especie
    if (!especie) {
      newErrors.especie = 'Debe seleccionar la especie';
    }
    
    // Validar marca
    if (!marca) {
      newErrors.marca = 'Debe seleccionar la marca';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    // Validar que se seleccionó un archivo
    if (!file) {
      alert("Por favor selecciona una imagen");
      return;
    }
    
    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten archivos de imagen (JPG, PNG, GIF, etc.)");
      return;
    }
    
    // Validar tamaño del archivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      alert("La imagen es demasiado grande. El tamaño máximo permitido es 5MB");
      return;
    }
    
    // Validar extensiones específicas
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Formato de imagen no soportado. Usa JPG, PNG, GIF o WebP");
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
        .from('alimentos-balanceados-img')
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
    if (!imageFile) {
      console.error("No hay archivo de imagen para subir");
      return null;
    }

    try {
      // Verificar que el usuario esté autenticado
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Debes estar autenticado para subir imágenes");
        return null;
      }

      // Crear nombre único para el archivo
      const fileExtension = imageFile.name.split('.').pop().toLowerCase();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExtension}`;
      
      console.log("Intentando subir imagen:", fileName);
      
      const { data, error } = await supabase
          .storage
          .from('alimentos-balanceados-img')
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

      if (error) {
          console.error("Error al subir imagen:", error);
          
          // Manejar errores específicos
          if (error.message.includes('bucket')) {
            alert("Error: El bucket de almacenamiento no está configurado correctamente");
          } else if (error.message.includes('size')) {
            alert("Error: El archivo es demasiado grande");
          } else if (error.message.includes('type')) {
            alert("Error: Tipo de archivo no permitido");
          } else if (error.message.includes('unauthorized')) {
            alert("Error: No tienes permisos para subir archivos");
          } else {
            alert(`Error al subir imagen: ${error.message}`);
          }
          return null;
      }

      console.log("Imagen subida exitosamente:", data);

      const { data: publicUrl } = supabase
          .storage
          .from('alimentos-balanceados-img')
          .getPublicUrl(fileName);

      setImageUrl(publicUrl.publicUrl);
      return publicUrl.publicUrl;
      
    } catch (err) {
      console.error("Error inesperado al subir imagen:", err);
      alert("Error inesperado al subir la imagen. Intenta de nuevo.");
      return null;
    }
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
          if (isEdit && alimentosData && imageFile && alimentosData.url) {
              previousImageUrl = alimentosData.url;
          }
          
          if (imageFile) {
              console.log("Iniciando subida de imagen...");
              const uploadedUrl = await uploadImageToSupabase();
              if (!uploadedUrl) {
                  alert('No se pudo subir la imagen. Verifica que el archivo sea válido y que tengas permisos.');
                  return;
              }
              url = uploadedUrl;
              console.log("Imagen subida exitosamente:", url);
          }
          
          if (isEdit && alimentosData) {
              const { error } = await supabase.from('alimentos_balanceados').update({
                  url: url,
                  nombre: nombre,
                  alimento_produccion: alimentoProduccion,
                  contenido_decimal: contenidoDecimal,
                  contenido_medida: contenidoMedida,
                  especie: especie,
                  marca: marca,
                  materias_primas: materiasPrimas,
                  informacion_adicional: informacionAdicional,
              }).eq('id', alimentosData.id);
              if (error) {
                  console.error('Error al actualizar producto:', error);
                  alert(`Error al actualizar producto: ${error.message}`);
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
              const { error } = await supabase.from('alimentos_balanceados').insert({
                  categoria: 'Alimentos balanceados',
                  url: url,
                  nombre: nombre,
                  alimento_produccion: alimentoProduccion,
                  contenido_decimal: contenidoDecimal,
                  contenido_medida: contenidoMedida,
                  especie: especie,
                  marca: marca,
                  materias_primas: materiasPrimas,
                  informacion_adicional: informacionAdicional,
              });
              if (error) {
                  console.error('Error al guardar producto:', error);
                  alert(`Error al guardar el producto: ${error.message}`);
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
      setNombre('');
      setAlimentoProduccion(false);
      setContenidoDecimal('');
      setContenidoMedida('');
      setEspecie('');
      setMarca('');
      setMateriasPrimas('');
      setInformacionAdicional('');
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
                  className={`new-product-input1 ${showErrors && errors.nombre ? 'error-input' : ''}`} 
                  type='text' 
                  placeholder='Cerdo Inicia Medicado ...' 
                  value={nombre} 
                  onChange={(e) => handleInputChange(setNombre, 'nombre', e.target.value)}
              />
              {showErrors && errors.nombre && <p className="error-message">{errors.nombre}</p>}
              
            <div className='new-product-box1' style={{marginBottom: '-15px'}}> 
                  <label>¿Es alimento para producción?</label>
                <div className='new-product-box2'>
                    <div className='new-product-box3'>
                        <label>Si</label>
                        <input 
                            type='radio' 
                            name='alimentoProduccion' 
                              value={true}
                              checked={alimentoProduccion === true}
                              onChange={(e) => setAlimentoProduccion(true)}
                        />
                    </div>
                    <div className='new-product-box3'>
                        <label>No</label>
                        <input 
                            type='radio' 
                            name='alimentoProduccion' 
                              value={false}
                              checked={alimentoProduccion === false}
                              onChange={(e) => setAlimentoProduccion(false)}
                        />
                    </div>
                </div>
            </div>
              
              <div className='new-product-box'>
                  <label className='new-product-text-box'>Contenido: *</label>
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
                      <option value='Miligramos'>Miligramos</option>
                      <option value='Gramos'>Gramos</option>
                      <option value='Kilogramos'>Kilogramos</option>
                      <option value='Mililitros'>Mililitros</option>
                      <option value='Litros'>Litros</option>
                  </select>
              </div>
              {showErrors && (errors.contenidoDecimal || errors.contenidoMedida) && (
                  <p className="error-message">{errors.contenidoDecimal || errors.contenidoMedida}</p>
              )}
              
              <div className='new-product-box'>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginTop: '5px'}}>
                      <div style={{ flex: 1 }}>
                          <label className='new-product-text-box'>Especie: *</label>
                          <select 
                              style={{marginTop: '10px'}}   
                              className={`new-product-opc-box ${showErrors && errors.especie ? 'error-input' : ''}`}
                              value={especie}
                              onChange={(e) => handleInputChange(setEspecie, 'especie', e.target.value)}
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
                          {showErrors && errors.especie && <p className="error-message">{errors.especie}</p>}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                          <label className='new-product-text-box'>Marca: *</label>
                          <select 
                              style={{marginTop: '10px'}}   
                              className={`new-product-opc-box ${showErrors && errors.marca ? 'error-input' : ''}`}
                              value={marca}
                              onChange={(e) => handleInputChange(setMarca, 'marca', e.target.value)}
                          >
                              <option value="">-- Selecciona --</option>
                              <option value='Unión'>Unión</option>
                              <option value='Apiaba'>Apiaba</option>
                              <option value='Fasa'>Fasa</option>
                              <option value='Nutre bien'>Nutre bien</option>
                          </select>
                          {showErrors && errors.marca && <p className="error-message">{errors.marca}</p>}
                      </div>
                  </div>
              </div>
              
              <div className='new-product-box' style={{marginBottom: '-10px'}}>
                  <p className='new-product-text' style={{marginBottom: '-5px', marginTop: '5px'}}>Materias primas (opcional):</p>
                  <input 
                      type='text' 
                      placeholder='Materias primas del producto ...' 
                      className='new-product-input1' 
                      value={materiasPrimas} 
                      onChange={(e) => setMateriasPrimas(e.target.value)}
                  />
              </div>
              
              <p className='new-product-text-box'>Detalles del producto (opcional):</p>
              <textarea 
                  className='new-product-input' 
                  placeholder='Detalles del producto ...' 
                  value={informacionAdicional} 
                  onChange={(e) => setInformacionAdicional(e.target.value)}
              ></textarea>
              
              <div className='new-product-btn-keep'>
                  <ButtonSmall text='Guardar' onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
    );
}