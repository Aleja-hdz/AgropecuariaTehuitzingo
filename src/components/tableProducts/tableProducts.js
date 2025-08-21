import './tableProducts.css';
import OptionsTable from '../optionsTable/optionsTable';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FormImplementos from '../formNewProduct/forms/implementos/formImplementos';
import FormAlimentosBalanceados from '../formNewProduct/forms/alimentosBalanceados/formAlimentosBalanceados';
import FormMedicamentosVeterinarios from '../formNewProduct/forms/medicamentosVeterinarios/formMedicamentosVeterinarios';
import FormMascotas from '../formNewProduct/forms/mascotas/formMascotas';
import FormEditMascotasAccesorios from '../formNewProduct/forms/mascotas/formEditMascotasAccesorios';
import FormEditMascotasAlimentos from '../formNewProduct/forms/mascotas/formEditMascotasAlimentos';
import { supabase } from '../../lib/supabaseClient';

const TableProducts = ({ productos = [], onRefresh }) => {
  const productosData = productos.length > 0 ? productos : [
  ];

  const [editProduct, setEditProduct] = useState(null);
  const [editProductType, setEditProductType] = useState(null);





  const handleEdit = async (producto) => {
    try {
      // Usar originalId si existe, sino usar id (para compatibilidad)
      const productId = producto.originalId || producto.id;
      
      if (producto.categoria === 'Mascotas') {
        // Obtener todos los datos del producto para determinar qué formulario usar
        const { data: mascotaData, error: mascotaError } = await supabase
          .from('mascotas')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (mascotaError) {
          console.error('Error al obtener datos de mascota:', mascotaError);
          alert('Error al cargar los datos del producto. Por favor, inténtalo de nuevo.');
          return;
        }
        
        if (!mascotaData) {
          alert('No se encontró el producto. Por favor, verifica que exista.');
          return;
        }

        
        if (mascotaData?.sub_categoria === 'Accesorio') {
          setEditProductType('mascotas-accesorios');
          setEditProduct(mascotaData);
        } else if (mascotaData?.sub_categoria === 'Alimento') {
          setEditProductType('mascotas-alimentos');
          setEditProduct(mascotaData);
        } else {
          setEditProductType('mascotas-general');
          setEditProduct(mascotaData);
        }
      } else if (producto.categoria === 'Alimentos balanceados') {
        // Obtener todos los datos del alimento balanceado
        const { data: alimentoData, error: alimentoError } = await supabase
          .from('alimentos_balanceados')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (alimentoError) {
          console.error('Error al obtener datos del alimento:', alimentoError);
          alert('Error al cargar los datos del producto. Por favor, inténtalo de nuevo.');
          return;
        }
        
        if (!alimentoData) {
          alert('No se encontró el producto. Por favor, verifica que exista.');
          return;
        }

        
        setEditProductType('alimentos-balanceados');
        setEditProduct(alimentoData);
      } else if (producto.categoria === 'Medicamentos Veterinarios') {
        // Obtener todos los datos del medicamento veterinario
        const { data: medicamentoData, error: medicamentoError } = await supabase
          .from('medicamentos_veterinarios')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (medicamentoError) {
          console.error('Error al obtener datos del medicamento:', medicamentoError);
          alert('Error al cargar los datos del producto. Por favor, inténtalo de nuevo.');
          return;
        }
        
        if (!medicamentoData) {
          alert('No se encontró el producto. Por favor, verifica que exista.');
          return;
        }

        
        setEditProductType('medicamentos-veterinarios');
        setEditProduct(medicamentoData);
      } else if (producto.categoria === 'Implementos') {
        // Obtener todos los datos del implemento
        const { data: implementoData, error: implementoError } = await supabase
          .from('implementos')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (implementoError) {
          console.error('Error al obtener datos del implemento:', implementoError);
          alert('Error al cargar los datos del producto. Por favor, inténtalo de nuevo.');
          return;
        }
        
        if (!implementoData) {
          alert('No se encontró el producto. Por favor, verifica que exista.');
          return;
        }

        setEditProductType('implementos');
        setEditProduct(implementoData);

      }
    } catch (err) {
      console.error('Error inesperado al editar producto:', err);
      alert('Error inesperado al cargar los datos del producto. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCloseEdit = () => {
    setEditProduct(null);
    setEditProductType(null);
  };

  const handleDelete = async (producto) => {
    if (producto.categoria !== 'Implementos' && producto.categoria !== 'Mascotas' && producto.categoria !== 'Alimentos balanceados' && producto.categoria !== 'Medicamentos Veterinarios') {
      alert('Solo puedes eliminar productos de las categorías Implementos, Mascotas, Alimentos balanceados y Medicamentos Veterinarios desde aquí.');
      return;
    }
    const confirm = window.confirm(`Eliminarás el producto: ${producto.nombre}`);
    if (!confirm) return;
    
    // Determinar el bucket según la categoría
    let bucket = '';
    let tableName = '';
    if (producto.categoria === 'Implementos') {
      bucket = 'implementos-img';
      tableName = 'implementos';
    } else if (producto.categoria === 'Alimentos balanceados') {
      bucket = 'alimentos-balanceados-img';
      tableName = 'alimentos_balanceados';
    } else if (producto.categoria === 'Medicamentos Veterinarios') {
      bucket = 'medicamentos-veterinarios-img';
      tableName = 'medicamentos_veterinarios';
    } else if (producto.categoria === 'Mascotas') {
      // Para mascotas, necesitamos obtener la subcategoría del producto
      // Usar originalId si existe, sino usar id (para compatibilidad)
      const productId = producto.originalId || producto.id;
      const { data: mascotaData } = await supabase
        .from('mascotas')
        .select('sub_categoria')
        .eq('id', productId)
        .single();
      
      if (mascotaData?.sub_categoria === 'Alimento') {
        bucket = 'mascotas-alimentos-img';
      } else if (mascotaData?.sub_categoria === 'Accesorio') {
        bucket = 'mascotas-accesorios-img';
      } else {
        bucket = 'mascotas-alimentos-img'; // Por defecto
      }
      tableName = 'mascotas';
    }
    
    // Eliminar imagen del bucket si existe
    if (producto.url) {
      try {
        // Extraer el nombre del archivo de la URL
        const parts = producto.url.split('/');
        const fileName = parts[parts.length - 1].split('?')[0];
        const { error: storageError } = await supabase
          .storage
          .from(bucket)
          .remove([fileName]);
        if (storageError) {
          console.error('Error al eliminar la imagen del bucket:', storageError.message);
        }
      } catch (err) {
        console.error('Error al procesar la eliminación de la imagen:', err);
      }
    }
    
    // Eliminar registro de la base de datos
    // Usar originalId si existe, sino usar id (para compatibilidad)
    const productId = producto.originalId || producto.id;
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', productId);
    if (error) {
      console.error('Error al eliminar el producto:', error.message);
    } else {
      if (onRefresh) onRefresh();
    }
  };

  // Función para renderizar modales usando portal
  const renderModal = () => {
    if (!editProduct) {
      return null;
    }

    const modalContent = (
      <>
        {(editProduct.categoria === 'Implementos' || editProduct.categoria === '"Implementos"') && (
          <FormImplementos
            onClose={handleCloseEdit}
            implementsData={editProduct}
            isEdit={true}
            onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
          />
        )}
        {(editProduct.categoria === 'Alimentos balanceados' || editProduct.categoria === '"Alimentos balanceados"') && (
          <FormAlimentosBalanceados
            onClose={handleCloseEdit}
            alimentosData={editProduct}
            isEdit={true}
            onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
          />
        )}
        {(editProduct.categoria === 'Medicamentos Veterinarios' || editProduct.categoria === '"Medicamentos Veterinarios"') && (
          <FormMedicamentosVeterinarios
            onClose={handleCloseEdit}
            medicamentosData={editProduct}
            isEdit={true}
            onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
          />
        )}
        {(editProduct.categoria === 'Mascotas' || editProduct.categoria === '"Mascotas"') && editProductType === 'mascotas-accesorios' && (
          <FormEditMascotasAccesorios
            onClose={handleCloseEdit}
            mascotasData={editProduct}
            onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
          />
        )}
        {(editProduct.categoria === 'Mascotas' || editProduct.categoria === '"Mascotas"') && editProductType === 'mascotas-alimentos' && (
          <FormEditMascotasAlimentos
            onClose={handleCloseEdit}
            mascotasData={editProduct}
            onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
          />
        )}
        {(editProduct.categoria === 'Mascotas' || editProduct.categoria === '"Mascotas"') && editProductType === 'mascotas-general' && (
          <FormMascotas
            onClose={handleCloseEdit}
            mascotasData={editProduct}
            isEdit={true}
            onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
          />
        )}
      </>
    );

    // Renderizar el modal en el body del documento usando portal
    return ReactDOM.createPortal(modalContent, document.body);
  };

  return (
    <>

      <div className="table-container">
        <table className="table-products">
          <thead>
            <tr>
              <th>Nombre del producto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosData.map((producto, i) => (
              <tr key={producto.id || i}>
                <td>{producto.nombre ? producto.nombre : producto}</td>
                <td>
                  <div className="table-actions">
                    {(producto.categoria === 'Implementos' || producto.categoria === 'Mascotas' || producto.categoria === 'Alimentos balanceados' || producto.categoria === 'Medicamentos Veterinarios') ? (
                      <OptionsTable
                        onDelete={() => handleDelete(producto)}
                        onEdit={() => handleEdit(producto)}
                      />
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Renderizar modales usando portal */}
      {renderModal()}
    </>
  );
};

export default TableProducts;
