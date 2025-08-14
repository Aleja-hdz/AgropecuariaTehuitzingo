import ButtonSmall from "../../../buttonSmall/buttonSmall";
import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { runSupabaseDiagnostics, testImageUpload } from "../../../../utils/supabaseDiagnostics";

export default function FormImplementos({ onClose, implementsData, isEdit, onSave }) {

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(implementsData?.url || '');
  const [nameImplement, setNameImplement] = useState(implementsData?.nombre || '');
  const [typeAnimal, setTypeAnimal] = useState(implementsData?.tipo_animal || '');
  const [is, setIs] = useState(implementsData?.que_es || '');
  const [recomendations, setRecomendations] = useState(implementsData?.recomendaciones_uso || '');
  const [additionalDetails, setAdditionalDetails] = useState(implementsData?.informacion_adicional || '');
  const [presentacionesDisponibles, setPresentacionesDisponibles] = useState(implementsData?.presentaciones_disponibles || '');
  const [marcaDistribuidor, setMarcaDistribuidor] = useState(implementsData?.marca_distribuidor || '');
  
  // Estados para validaciones
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  // Agregado: Sincronizar los campos con implementsData al cambiar
  useEffect(() => {
    setImageUrl(implementsData?.url || '');
    setNameImplement(implementsData?.nombre || '');
    setTypeAnimal(implementsData?.tipo_animal || '');
    setIs(implementsData?.que_es || '');
    setRecomendations(implementsData?.recomendaciones_uso || '');
    setAdditionalDetails(implementsData?.informacion_adicional || '');
    setPresentacionesDisponibles(implementsData?.presentaciones_disponibles || '');
    setMarcaDistribuidor(implementsData?.marca_distribuidor || '');
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
    
    // Validar presentaciones disponibles
    if (!presentacionesDisponibles.trim()) {
      newErrors.presentacionesDisponibles = 'Las presentaciones disponibles son obligatorias';
    }
    
    // Validar marca distribuidor
    if (!marcaDistribuidor) {
      newErrors.marcaDistribuidor = 'Debe seleccionar la marca o distribuidor';
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

  // Función para verificar la configuración de Supabase
  const checkSupabaseConfig = async () => {
    try {
      // Verificar autenticación
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Error de autenticación:", authError);
        return { success: false, message: "Error de autenticación" };
      }
      
      if (!user) {
        return { success: false, message: "Usuario no autenticado" };
      }
      
      // Verificar que el bucket existe (intentando listar archivos)
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .from('implementos-img')
        .list('', { limit: 1 });
      
      if (bucketError) {
        console.error("Error al verificar bucket:", bucketError);
        return { success: false, message: "Bucket no configurado correctamente" };
      }
      
      return { success: true, message: "Configuración correcta" };
    } catch (err) {
      console.error("Error al verificar configuración:", err);
      return { success: false, message: "Error de conexión" };
    }
  };

  // Función para ejecutar diagnóstico completo
  const runDiagnostics = async () => {
    console.log("🔧 Iniciando diagnóstico de Supabase...");
    setDiagnosticResult("Ejecutando diagnóstico...");
    
    try {
      const diagnostics = await runSupabaseDiagnostics();
      setDiagnosticResult(diagnostics);
      
      if (diagnostics.errors.length > 0) {
        console.error("❌ Errores encontrados:", diagnostics.errors);
        alert(`Se encontraron ${diagnostics.errors.length} errores. Revisa la consola para más detalles.`);
      } else {
        console.log("✅ Diagnóstico completado sin errores");
        alert("Diagnóstico completado. No se encontraron errores.");
      }
      
      // Probar subida de imagen si todo está bien
      if (diagnostics.auth?.success && diagnostics.storage?.['implementos-img']?.success) {
        console.log("🧪 Probando subida de imagen...");
        const uploadTest = await testImageUpload();
        if (uploadTest.success) {
          console.log("✅ Prueba de subida exitosa");
        } else {
          console.error("❌ Prueba de subida falló:", uploadTest.error);
        }
      }
      
    } catch (err) {
      console.error("❌ Error en diagnóstico:", err);
      setDiagnosticResult({ error: err.message });
      alert(`Error en diagnóstico: ${err.message}`);
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
    if (!imageFile) {
      console.error("No hay archivo de imagen para subir");
      return null;
    }

    setIsUploading(true);
    
    try {
      // Verificar configuración antes de subir
      const configCheck = await checkSupabaseConfig();
      if (!configCheck.success) {
        alert(`Error de configuración: ${configCheck.message}`);
        return null;
      }

      // Crear nombre único para el archivo
      const fileExtension = imageFile.name.split('.').pop().toLowerCase();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExtension}`;
      
      console.log("Intentando subir imagen:", fileName);
      
      const { data, error } = await supabase
          .storage
          .from('implementos-img')
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
          .from('implementos-img')
          .getPublicUrl(fileName);

      setImageUrl(publicUrl.publicUrl);
      return publicUrl.publicUrl;
      
    } catch (err) {
      console.error("Error inesperado al subir imagen:", err);
      alert("Error inesperado al subir la imagen. Intenta de nuevo.");
      return null;
    } finally {
      setIsUploading(false);
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
          if (isEdit && implementsData && imageFile && implementsData.url) {
              previousImageUrl = implementsData.url;
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
          
          if (isEdit && implementsData) {
              const { error } = await supabase.from('implementos').update({
                  url: url,
                  nombre: nameImplement,
                  tipo_animal: typeAnimal,
                  que_es: is,
                  recomendaciones_uso: recomendations,
                  informacion_adicional: additionalDetails,
                  presentaciones_disponibles: presentacionesDisponibles,
                  marca_distribuidor: marcaDistribuidor,
              }).eq('id', implementsData.id);
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
              const { error } = await supabase.from('implementos').insert({
                  url: url,
                  nombre: nameImplement,
                  tipo_animal: typeAnimal,
                  que_es: is,
                  recomendaciones_uso: recomendations,
                  informacion_adicional: additionalDetails,
                  presentaciones_disponibles: presentacionesDisponibles,
                  marca_distribuidor: marcaDistribuidor,
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
      setNameImplement('');
      setTypeAnimal('');
      setIs('');
      setRecomendations('');
      setAdditionalDetails('');
      setPresentacionesDisponibles('');
      setMarcaDistribuidor('');
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
                        <option value='Gallos y pollos'>Gallos y pollos</option>
                        <option value='Caballos'>Caballos</option>
                        <option value='Vacas'>Vacas</option>
                        <option value='Cerdos'>Cerdos</option>
                        <option value='Ovejas'>Ovejas</option>
                    </select>
                    {showErrors && errors.animalType && <p className="error-message">{errors.animalType}</p>}
                  </div>
                                 </div>
                 
                 <div className='new-product-box'>
                     <label className='new-product-text-box'>Marca o distribuidor: *</label>
                     <select 
                         className={`new-product-opc-box ${showErrors && errors.marcaDistribuidor ? 'error-input' : ''}`}
                         value={marcaDistribuidor}
                         onChange={(e) => handleInputChange(setMarcaDistribuidor, 'marcaDistribuidor', e.target.value)}
                     >
                         <option value="">-- Selecciona --</option>
                         <option value='Implementos Lopez'>Implementos Lopez</option>
                         <option value='Comprovet'>Comprovet</option>
                     </select>
                 </div>
                 {showErrors && errors.marcaDistribuidor && <p className="error-message">{errors.marcaDistribuidor}</p>}
                 
                 <p className='new-product-text'>Presentaciones disponibles *</p>
                 <input 
                     className={`new-product-input1 ${showErrors && errors.presentacionesDisponibles ? 'error-input' : ''}`} 
                     type='text' 
                     placeholder='Ej: 1kg, 5kg, 10kg...' 
                     value={presentacionesDisponibles} 
                     onChange={(e) => handleInputChange(setPresentacionesDisponibles, 'presentacionesDisponibles', e.target.value)}
                 />
                 {showErrors && errors.presentacionesDisponibles && <p className="error-message">{errors.presentacionesDisponibles}</p>}
                 
                 <p style={styles.p}>Recomendaciones de uso (opcional): </p>
                 <input 
                     type='text' 
                     placeholder='Recomendado para  ...' 
                     className='new-product-input1' 
                     value={recomendations} 
                     onChange={(e) => setRecomendations(e.target.value)}
                 />
                 <div style={styles.divUso}></div>
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