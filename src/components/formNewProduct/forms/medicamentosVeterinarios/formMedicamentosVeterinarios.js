import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import ButtonSmall from '../../../buttonSmall/buttonSmall';

export default function FormMedicamentosVeterinarios({ onSave, onClose, medicamentosData, isEdit = false }) {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [especie, setEspecie] = useState('');
    const [edad, setEdad] = useState('');
    const [via, setVia] = useState('');
    const [presentacion, setPresentacion] = useState('');
    const [marca, setMarca] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    // Estados para manejo de imágenes
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    // Cargar datos existentes si estamos en modo edición
    useEffect(() => {
        if (isEdit && medicamentosData) {
            setNombre(medicamentosData.nombre || '');
            setTipo(medicamentosData.tipo || '');
            setEspecie(medicamentosData.especie || '');
            setEdad(medicamentosData.edad || '');
            setVia(medicamentosData.via_administracion || '');
            setPresentacion(medicamentosData.presentacion || '');
            setMarca(medicamentosData.marca || '');
            setImageUrl(medicamentosData.url || '');
            if (medicamentosData.url) {
                setImagePreview(medicamentosData.url);
            }
        }
    }, [isEdit, medicamentosData]);

    // Manejo de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) {
            setError('Por favor selecciona una imagen');
            return;
        }
        
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            setError('Solo se permiten archivos de imagen (JPG, PNG, GIF, etc.)');
            return;
        }
        
        // Validar tamaño (máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB en bytes
        if (file.size > maxSize) {
            setError('La imagen debe ser menor a 5MB');
            return;
        }
        
        // Validar extensiones permitidas
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            setError('Formato de imagen no soportado. Usa JPG, PNG, GIF o WebP');
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
        setImageUrl('');
    };

    // Subida de imagen a Supabase
    const uploadImageToSupabase = async () => {
        if (!imageFile) return null;
        
        try {
            const fileName = `${Date.now()}_${imageFile.name}`;
            console.log('Subiendo imagen:', fileName);
            
            const { data, error } = await supabase.storage
                .from('medicamentos-veterinarios-img')
                .upload(fileName, imageFile);
                
            if (error) {
                console.error('Error al subir imagen:', error);
                setError(`Error al subir la imagen: ${error.message}`);
                return null;
            }
            
            console.log('Imagen subida exitosamente:', data);
            
            const { data: publicUrl } = supabase.storage
                .from('medicamentos-veterinarios-img')
                .getPublicUrl(fileName);
                
            console.log('URL pública generada:', publicUrl.publicUrl);
            return publicUrl.publicUrl;
            
        } catch (err) {
            console.error('Error inesperado al subir imagen:', err);
            setError(`Error inesperado al subir la imagen: ${err.message}`);
            return null;
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
                console.log('Imagen anterior eliminada exitosamente');
            }
        } catch (err) {
            console.error('Error al procesar eliminación de imagen anterior:', err);
        }
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        if (!nombre || !tipo || !especie || !presentacion) {
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

        try {
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

            const productData = {
                categoria: 'Medicamentos veterinarios',
                url: url,
                nombre,
                tipo: tipo,
                especie,
                edad: edad,
                via_administracion: via,
                presentacion,
                marca: marca,
                fecha_registro: new Date().toISOString(),
            };

            console.log('Intentando guardar en la base de datos con estos datos:', productData);

            let result;
            if (isEdit && medicamentosData) {
                // Modo edición - actualizar registro existente
                result = await supabase
                    .from('medicamentos_veterinarios')
                    .update(productData)
                    .eq('id', medicamentosData.id);
            } else {
                // Modo creación - insertar nuevo registro
                result = await supabase
                    .from('medicamentos_veterinarios')
                    .insert([productData]);
            }
            
            if (result.error) {
                console.error('Error completo de Supabase:', result.error);
                setError('Error al guardar: ' + result.error.message);
            } else {
                setSuccess(isEdit ? '¡Producto actualizado exitosamente!' : '¡Producto guardado exitosamente!');
                if (onSave) onSave();
                // Limpiar formulario solo si no estamos en modo edición
                if (!isEdit) {
                    setNombre('');
                    setTipo('');
                    setEspecie('');
                    setEdad('');
                    setVia('');
                    setPresentacion('');
                    setMarca('');
                    setImagePreview(null);
                    setImageFile(null);
                    setImageUrl('');
                }
                onClose();
            }
        } catch (err) {
            console.error('Error inesperado:', err);
            setError('Error inesperado: ' + err.message);
        }
        
        setLoading(false);
    };

    return (
        <div className='container-general' onClick={e => { if (e.target.className === 'container-general') onClose(); }}>
            <div className='new-product-container'>
                <div className='new-product-exit'>
                    <button className='new-product-btn-exit' onClick={onClose}>X</button>
                </div>
                <h1>{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>
                
                {/* Sección de imagen */}
                <p className='new-product-text'>Imagen del producto</p>
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

                <p className='new-product-text'>Nombre del producto</p>
                <input className='new-product-input1' type='text' value={nombre} onChange={e => setNombre(e.target.value)} required />
                
                <div className='new-product-box2'>
                    <div className='new-product-box1'>
                        <label>¿Qué tipo de medicamento es? </label>
                        <select className='new-product-opc-category' value={tipo} onChange={e => setTipo(e.target.value)} required>
                            <option value=''>-- Selecciona --</option>
                            <option value='Desparasitante'>Desparasitante</option>
                            <option value='Vitaminas'>Vitaminas</option>
                            <option value='Suplementos'>Suplementos</option>
                            <option value='Vacunas'>Vacunas</option>
                        </select>
                    </div>
                    <div className='new-product-box1'>
                        <label>Especie:</label>
                        <select className='new-product-opc-category' value={especie} onChange={e => setEspecie(e.target.value)} required>
                            <option value=''>-- Selecciona --</option>
                            <option value='Perro'>Perro</option>
                            <option value='Gato'>Gato</option>
                            <option value='Gallos'>Gallos</option>
                            <option value='Caballo'>Caballo</option>
                            <option value='Cerdo'>Cerdo</option>
                            <option value='Conejo'>Conejo</option>
                            <option value='Vacas'>Vacas</option>
                        </select>
                    </div>
                </div>
                
                <div className='new-product-box2'>
                    <div className='new-product-box1'>
                        <label>Edad/Etapa de vida:</label>
                        <input className='new-product-opc-category' type="text" value={edad} onChange={e => setEdad(e.target.value)} placeholder="Escribe la edad ..." />
                    </div>
                    <div className='new-product-box1'>
                        <label>Vía de administración: </label>
                        <select className='new-product-opc-category' value={via} onChange={e => setVia(e.target.value)}>
                            <option value=''>-- Selecciona --</option>
                            <option value='Oral'>Oral</option>
                            <option value='Inyectable'>Inyectable</option>
                            <option value='Tópica'>Tópica</option>
                            <option value='Intranasal'>Intranasal</option>
                            <option value='Ocular'>Ocular</option>
                        </select>
                    </div>
                </div>
                
                <div className='new-product-box2'>
                    <div className='new-product-box1'>
                        <label>Presentación: </label>
                        <select className='new-product-opc-category' value={presentacion} onChange={e => setPresentacion(e.target.value)} required>
                            <option value=''>-- Selecciona --</option>
                            <option value='Frasco'>Frasco</option>
                            <option value='Ampolleta'>Ampolleta</option>
                            <option value='Blister'>Blister</option>
                            <option value='Sobres'>Sobres</option>
                        </select>
                    </div>
                    <div className='new-product-box1'>
                        <label>Marca o fabricante: </label>
                        <input className='new-product-input1' type='text' value={marca} onChange={e => setMarca(e.target.value)} placeholder='Bayer Animal Health ... ' />
                    </div>
                </div>
                
                {error && <div style={{color:'red', marginBottom: '10px'}}>{error}</div>}
                {success && <div style={{color:'green', marginBottom: '10px'}}>{success}</div>}
                
                <div className='new-product-btn-keep'>
                    <ButtonSmall text={loading ? (isEdit ? 'Actualizando...' : 'Guardando...') : (isEdit ? 'Actualizar' : 'Guardar')} onClick={handleGuardar} disabled={loading} />
                </div>
            </div>
        </div>
    );
}