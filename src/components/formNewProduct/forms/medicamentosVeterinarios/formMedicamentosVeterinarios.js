import ButtonSmall from "../../../buttonSmall/buttonSmall";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function FormMedicamentosVeterinarios({ onClose, medicamentosData, isEdit, onSave }) {

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [especies, setEspecies] = useState([]);
  const [edad, setEdad] = useState('');
  const [viaAdministracion, setViaAdministracion] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [marca, setMarca] = useState('');
  const [contenidoDecimal, setContenidoDecimal] = useState('');
  const [contenidoMedida, setContenidoMedida] = useState('');
  const [informacionAdicional, setInformacionAdicional] = useState('');
  
  // Estados para validaciones
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función para cargar datos del producto de manera segura
  const loadProductData = useCallback(async (productId) => {
    if (!productId || !isEdit) return;
    
    try {
      setIsLoading(true);
      
      
      // Obtener datos frescos de la base de datos
      const { data, error } = await supabase
        .from('medicamentos_veterinarios')
        .select('*')
        .eq('id', productId)
        .single();
      
      if (error) {
        console.error('Error al cargar datos del producto:', error);
        alert('Error al cargar los datos del producto. Por favor, inténtalo de nuevo.');
        return;
      }
      
      if (!data) {
        console.error('No se encontraron datos para el producto ID:', productId);
        alert('No se encontró el producto. Por favor, verifica que exista.');
        return;
      }
      
      // Validar que los datos correspondan al producto correcto
      if (data.id !== productId) {
        console.error('ID del producto no coincide. Esperado:', productId, 'Recibido:', data.id);
        alert('Error: Los datos del producto no coinciden. Por favor, inténtalo de nuevo.');
        return;
      }
      
      
      
      // Cargar datos en el estado
      setImageUrl(data.url || '');
      setImagePreview(data.url || null);
      setNombre(data.nombre || '');
      setTipo(data.tipo || '');
      
      // Manejar especies de manera segura
      const especieValue = data.especie;
      if (Array.isArray(especieValue)) {
        setEspecies(especieValue);
      } else if (typeof especieValue === 'string' && especieValue.trim().length > 0) {
        setEspecies(especieValue.split(',').map((s) => s.trim()).filter(Boolean));
      } else {
        setEspecies([]);
      }
      
      setEdad(data.edad || '');
      setViaAdministracion(data.via_administracion || '');
      setPresentacion(data.presentacion || '');
      setMarca(data.marca || '');
      setContenidoDecimal(data.contenido_decimal || '');
      setContenidoMedida(data.contenido_medida || '');
      setInformacionAdicional(data.informacion_adicional || '');
      
    } catch (err) {
      console.error('Error inesperado al cargar datos:', err);
      alert('Error inesperado al cargar los datos del producto.');
    } finally {
      setIsLoading(false);
    }
  }, [isEdit]);

  // Cargar datos cuando se abre el formulario en modo edición
  useEffect(() => {
    if (isEdit && medicamentosData?.id) {
      loadProductData(medicamentosData.id);
    } else if (!isEdit) {
      // Resetear formulario para nuevo producto
      resetForm();
    }
  }, [isEdit, medicamentosData?.id, loadProductData]);

  // Sincronizar campos cuando medicamentosData cambie (solo para nuevo producto)
  useEffect(() => {
    if (!isEdit && medicamentosData) {
      setImageUrl(medicamentosData?.url || '');
      setNombre(medicamentosData?.nombre || '');
      setTipo(medicamentosData?.tipo || '');
      const especieValue = medicamentosData?.especie;
      if (Array.isArray(especieValue)) {
        setEspecies(especieValue);
      } else if (typeof especieValue === 'string' && especieValue.trim().length > 0) {
        setEspecies(especieValue.split(',').map((s) => s.trim()).filter(Boolean));
      } else {
        setEspecies([]);
      }
      setEdad(medicamentosData?.edad || '');
      setViaAdministracion(medicamentosData?.via_administracion || '');
      setPresentacion(medicamentosData?.presentacion || '');
      setMarca(medicamentosData?.marca || '');
      setContenidoDecimal(medicamentosData?.contenido_decimal || '');
      setContenidoMedida(medicamentosData?.contenido_medida || '');
      setInformacionAdicional(medicamentosData?.informacion_adicional || '');
      setImagePreview(medicamentosData?.url || null);
    }
  }, [isEdit, medicamentosData]);

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
    
    // Validar tipo de medicamento
    if (!tipo) {
      newErrors.tipo = 'Debe seleccionar el tipo de medicamento';
    }
    
    // Validar especie
    if (!especies || especies.length === 0) {
      newErrors.especie = 'Debe seleccionar al menos una especie';
    }
    
    // Validar edad
    if (!edad.trim()) {
      newErrors.edad = 'La edad/etapa de vida es obligatoria';
    }
    
    // Validar vía de administración
    if (!viaAdministracion) {
      newErrors.viaAdministracion = 'Debe seleccionar la vía de administración';
    }
    
    // Validar presentación
    if (!presentacion) {
      newErrors.presentacion = 'Debe seleccionar la presentación';
    }
    
    // Validar marca
    if (!marca.trim()) {
      newErrors.marca = 'La marca es obligatoria';
    }
    
    // Validar contenido decimal
    if (!contenidoDecimal || contenidoDecimal <= 0) {
      newErrors.contenidoDecimal = 'El contenido es obligatorio y debe ser mayor a 0';
    }
    
    // Validar medida del contenido
    if (!contenidoMedida) {
      newErrors.contenidoMedida = 'La medida del contenido es obligatoria';
    }
    
    // informacion_adicional es opcional, no necesita validación
    
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
        .from('medicamentos-veterinarios-img')
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
      
      
      
      const { data, error } = await supabase
          .storage
          .from('medicamentos-veterinarios-img')
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

      

      const { data: publicUrl } = supabase
          .storage
          .from('medicamentos-veterinarios-img')
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

  const handleEspeciesChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setEspecies(selectedValues);
    if (errors.especie) {
      setErrors(prev => ({ ...prev, especie: null }));
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Prevenir envío si está cargando
      if (isLoading) {
        alert('Por favor espera a que se carguen los datos del producto.');
        return;
      }
      
      // Validar formulario antes de enviar
      if (!validateForm()) {
        setShowErrors(true);
        return;
      }
      
      try {
          let url = imageUrl;
          let previousImageUrl = null;
          
          // Si estamos editando y hay una nueva imagen, guardar la URL anterior
          if (isEdit && medicamentosData && imageFile && medicamentosData.url) {
              previousImageUrl = medicamentosData.url;
          }
          
          if (imageFile) {
      
              const uploadedUrl = await uploadImageToSupabase();
              if (!uploadedUrl) {
                  alert('No se pudo subir la imagen. Verifica que el archivo sea válido y que tengas permisos.');
                  return;
              }
              url = uploadedUrl;
      
          }
          
          if (isEdit && medicamentosData) {
              // Verificar que el producto aún existe antes de actualizar
              const { data: existingProduct, error: checkError } = await supabase
                .from('medicamentos_veterinarios')
                .select('id')
                .eq('id', medicamentosData.id)
                .single();
              
              if (checkError || !existingProduct) {
                alert('El producto ya no existe o ha sido eliminado. Por favor, recarga la página.');
                return;
              }
              
              const { error } = await supabase.from('medicamentos_veterinarios').update({
                  url: url,
                  nombre: nombre,
                  tipo: tipo,
                  especie: especies.join(','),
                  edad: edad,
                  via_administracion: viaAdministracion,
                  presentacion: presentacion,
                  marca: marca,
                  contenido_decimal: contenidoDecimal,
                  contenido_medida: contenidoMedida,
                  informacion_adicional: informacionAdicional,
              }).eq('id', medicamentosData.id);
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
              const { error } = await supabase.from('medicamentos_veterinarios').insert({
                  categoria: 'Medicamentos Veterinarios',
                  url: url,
                  nombre: nombre,
                  tipo: tipo,
                  especie: especies.join(','),
                  edad: edad,
                  via_administracion: viaAdministracion,
                  presentacion: presentacion,
                  marca: marca,
                  contenido_decimal: contenidoDecimal,
                  contenido_medida: contenidoMedida,
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
      setTipo('');
      setEspecies([]);
      setEdad('');
      setViaAdministracion('');
      setPresentacion('');
      setMarca('');
      setContenidoDecimal('');
      setContenidoMedida('');
      setInformacionAdicional('');
      setErrors({});
      setShowErrors(false);
  };

    return (
        <div className='container-general' onClick={e => { if (e.target.className === 'container-general') onClose(); }}>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div className='new-product-container'>
                <div className='new-product-exit'>
                    <button className='new-product-btn-exit' onClick={onClose}>X</button>
                </div>
                <h1>{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>
                
                {/* Indicador de carga */}
                {isLoading && (
                    <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: '#666',
                        fontSize: '16px'
                    }}>
                        <div style={{
                            display: 'inline-block',
                            width: '20px',
                            height: '20px',
                            border: '3px solid #f3f3f3',
                            borderTop: '3px solid #3498db',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginRight: '10px'
                        }}></div>
                        Cargando datos del producto...
                    </div>
                )}
                
                {!isLoading && (
                    <>
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
                            placeholder='Desparasitante Bayer...' 
                            value={nombre} 
                            onChange={(e) => handleInputChange(setNombre, 'nombre', e.target.value)}
                        />
                        {showErrors && errors.nombre && <p className="error-message">{errors.nombre}</p>}
                        
                        <p style={{fontSize:'13px', fontWeight:'400'}} className='new-product-text'>NOTA: Si desea agregar más de una especie, precione la tecla "ctrl" y seleccione las especies.</p>
                        <div style={{gap:'15px'}} className='new-product-box2'>
                            <div className='new-product-box1'>
                                <label>Tipo de medicamento: *</label>
                                <select 
                                    className={`new-product-opc-category ${showErrors && errors.tipo ? 'error-input' : ''}`} 
                                    value={tipo} 
                                    onChange={(e) => handleInputChange(setTipo, 'tipo', e.target.value)}
                                >
                                    <option value="">-- Selecciona --</option>
                                    <option value='Analgésico'>Analgésico</option>
                                    <option value='Antihelmínticos'>Antihelmínticos</option>
                                    <option value='Antibiótico'>Antibiótico</option>
                                    <option value='Antimicóticos'>Antimicóticos</option>
                                    <option value='Antimicrobianos'>Antimicrobianos</option>
                                    <option value='Antiparásito'>Antiparásito</option>
                                    <option value='Antiséptico'>Antiséptico</option>
                                    <option value='Antiinflamatorio'>Antiinflamatorio</option>
                                    <option value='Biológicos'>Biológicos</option>
                                    <option value='Cardiología'>Cardiología</option>
                                    <option value='Dermatología'>Dermatología</option>
                                    <option value='Desinfectante'>Desinfectante</option>
                                    <option value='Desparasitante'>Desparasitante</option>
                                    <option value='Electrolitos'>Electrolitos</option>
                                    <option value='Endocrinología'>Endocrinología</option>
                                    <option value='Farmacéutico'>Farmacéutico</option>
                                    <option value='Gastroenterología'>Gastroenterología</option>
                                    <option value='Gastrointestinal'>Gastrointestinal</option>
                                    <option value='Hormonal'>Hormonal</option>
                                    <option value='Locomoción'>Locomoción</option>
                                    <option value='Manejo de heridas'>Manejo de heridas</option>
                                    <option value='Multivitamínico'>Multivitamínico</option>
                                    <option value='Nutrición'>Nutrición</option>
                                    <option value='Pomada'>Pomada</option>
                                    <option value='Renal'>Renal</option>
                                    <option value='Respiratorio'>Respiratorio</option>
                                    <option value='Solución'>Solución</option>
                                    <option value='Suplementos'>Suplementos</option>
                                    <option value='Vacunas'>Vacunas</option>
                                    <option value='Vitaminas'>Vitaminas</option>
                                </select>
                                {showErrors && errors.tipo && <p className="error-message">{errors.tipo}</p>}
                            </div>
                            <div className='new-product-box1'>
                                <label>Especies: *</label>
                                <select 
                                    multiple
                                    className={`new-product-opc-category ${showErrors && errors.especie ? 'error-input' : ''}`} 
                                    value={especies} 
                                    onChange={handleEspeciesChange}
                                >
                                    <option value='Bovinos'>Bovinos</option>
                                    <option value='Equinos'>Equinos</option>
                                    <option value='Porcinos'>Porcinos</option>
                                    <option value='Caprinos'>Caprinos</option>
                                    <option value='Ovinos'>Ovinos</option>
                                    <option value='Aviar'>Aviar</option>
                                    <option value='Canino'>Canino</option>
                                    <option value='Felino'>Felino</option>
                                    <option value='Aquacultura'>Aquacultura</option>
                                    <option value='Apícola'>Apícola</option>
                                    <option value='Roedores'>Roedores</option>
                                    <option value='Reptilia'>Reptilia</option>
                                    <option value='Cúnicos'>Cúnicos</option>
                                    <option value='Aves ornamentales'>Aves ornamentales</option>
                                </select>
                                {showErrors && errors.especie && <p className="error-message">{errors.especie}</p>}
                            </div>
                        </div>
                        
                        <div className='new-product-box' style={{marginTop: '-10px'}}>
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
                                <option value='Unidades'>Unidades</option>
                                <option value='Tabletas'>Tabletas</option>
                                <option value='Dosis'>Dosis</option>
                            </select>
                        </div>
                        {showErrors && errors.contenidoDecimal && <p className="error-message">{errors.contenidoDecimal}</p>}
                        {showErrors && errors.contenidoMedida && <p className="error-message">{errors.contenidoMedida}</p>}
                        
                        <div className='new-product-box2' style={{marginTop: '-8px'}}>
                            <div className='new-product-box1'>
                                <label>Vía de administración: *</label>
                                <select 
                                    className={`new-product-opc-category ${showErrors && errors.viaAdministracion ? 'error-input' : ''}`} 
                                    value={viaAdministracion} 
                                    onChange={(e) => handleInputChange(setViaAdministracion, 'viaAdministracion', e.target.value)}
                                >
                                    <option value="">-- Selecciona --</option>
                                    <option value='Oral'>Oral</option>
                                    <option value='Inyectable'>Inyectable</option>
                                    <option value='Tópica'>Tópica</option>
                                    <option value='Intranasal'>Intranasal</option>
                                    <option value='Ocular'>Ocular</option>
                                    <option value='Cutánea'>Cutánea</option>
                                    <option value='Subcutánea'>Subcutánea</option>
                                    <option value='Intramuscular'>Intramuscular</option>
                                    <option value='Intravenosa'>Intravenosa</option>
                                </select>
                                {showErrors && errors.viaAdministracion && <p className="error-message">{errors.viaAdministracion}</p>}
                            </div>
                            <div className='new-product-box1'>
                                <label>Presentación: *</label>
                                <select 
                                    className={`new-product-opc-category ${showErrors && errors.presentacion ? 'error-input' : ''}`} 
                                    value={presentacion} 
                                    onChange={(e) => handleInputChange(setPresentacion, 'presentacion', e.target.value)}
                                >
                                    <option value="">-- Selecciona --</option>
                                    <option value='Frasco'>Frasco</option>
                                    <option value='Ampolleta'>Ampolleta</option>
                                    <option value='Blister'>Blister</option>
                                    <option value='Sobres'>Sobres</option>
                                    <option value='Jeringa'>Jeringa</option>
                                    <option value='Pomada'>Pomada</option>
                                    <option value='Gotas'>Gotas</option>
                                    <option value='Tabletas'>Tabletas</option>
                                    <option value='Cápsulas'>Cápsulas</option>
                                    <option value='Solución'>Solución</option>
                                    <option value='Suspensión'>Suspensión</option>
                                    <option value='Polvo soluble'>Polvo soluble</option>
                                    <option value='Shampoo'>Shampoo</option>
                                    <option value='Spray'>Spray</option>
                                    <option value='Pasta'>Pasta</option>
                                </select>
                            </div>
                        </div>
                        {showErrors && errors.presentacion && <p className="error-message">{errors.presentacion}</p>}
                        
                        <p className='new-product-text'>Edad/Etapa de vida: *</p>
                        <input 
                            className={`new-product-input1 ${showErrors && errors.edad ? 'error-input' : ''}`} 
                            type='text' 
                            placeholder='Cachorro, Adulto, Senior...' 
                            value={edad} 
                            onChange={(e) => handleInputChange(setEdad, 'edad', e.target.value)}
                        />
                        {showErrors && errors.edad && <p className="error-message">{errors.edad}</p>}
                        
                        <p className='new-product-text'>Marca: *</p>
                        <select 
                            className={`new-product-input1 ${showErrors && errors.marca ? 'error-input' : ''}`} 
                            value={marca} 
                            onChange={(e) => handleInputChange(setMarca, 'marca', e.target.value)}
                        >
                            <option value="">-- Selecciona --</option>
                            <option value='AGROVET'>AGROVET</option>
                            <option value='ARANDA'>ARANDA</option>
                            <option value='Aranda Pets'>Aranda Pets</option>
                            <option value='Dechra'>Dechra</option>
                            <option value='Laboratorios Pier'>Laboratorios Pier</option>
                            <option value='PANAVET'>PANAVET</option>
                            <option value='PROVETMEX'>PROVETMEX</option>
                            <option value='Riverfarma'>Riverfarma</option>
                            <option value='Sanfer'>Sanfer</option>
                            <option value='Zoetis'>Zoetis</option>
                        </select>
                        {showErrors && errors.marca && <p className="error-message">{errors.marca}</p>}
                        
                        <p className='new-product-text'>Información adicional (opcional):</p>
                        <textarea 
                            className='new-product-input' 
                            placeholder='Información adicional del medicamento...' 
                            value={informacionAdicional} 
                            onChange={(e) => setInformacionAdicional(e.target.value)}
                        ></textarea>
                        
                        <div className='new-product-btn-keep'>
                            <ButtonSmall text='Guardar' onClick={handleSubmit}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}