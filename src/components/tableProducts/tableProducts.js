import './tableProducts.css';
import OptionsTable from '../optionsTable/optionsTable';
import { useState } from 'react';
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
    if (producto.categoria === 'Mascotas') {
      // Obtener todos los datos del producto para determinar qué formulario usar
      const { data: mascotaData } = await supabase
        .from('mascotas')
        .select('*')
        .eq('id', producto.id)
        .single();
      
      if (mascotaData?.sub_categoria === 'Accesorio') {
        setEditProductType('mascotas-accesorios');
        // Usar los datos completos de mascotas
        setEditProduct(mascotaData);
      } else if (mascotaData?.sub_categoria === 'Alimento') {
        setEditProductType('mascotas-alimentos');
        // Usar los datos completos de mascotas
        setEditProduct(mascotaData);
      } else {
        setEditProductType('mascotas-general');
        setEditProduct(producto);
      }
    } else if (producto.categoria === 'Alimentos balanceados') {
      setEditProductType('alimentos-balanceados');
      setEditProduct(producto);
    } else if (producto.categoria === 'Medicamentos Veterinarios') {
      setEditProductType('medicamentos-veterinarios');
      setEditProduct(producto);
    } else {
      setEditProductType('implementos');
      setEditProduct(producto);
    }
  };

  const handleCloseEdit = () => {
    setEditProduct(null);
    setEditProductType(null);
  };

  const handleDelete = async (id, nombre, categoria, url) => {
    if (categoria !== 'Implementos' && categoria !== 'Mascotas' && categoria !== 'Alimentos balanceados' && categoria !== 'Medicamentos Veterinarios') {
      alert('Solo puedes eliminar productos de las categorías Implementos, Mascotas, Alimentos balanceados y Medicamentos Veterinarios desde aquí.');
      return;
    }
    const confirm = window.confirm(`Eliminarás el producto: ${nombre}`);
    if (!confirm) return;
    
    // Determinar el bucket según la categoría
    let bucket = '';
    let tableName = '';
    if (categoria === 'Implementos') {
      bucket = 'implementos-img';
      tableName = 'implementos';
    } else if (categoria === 'Alimentos balanceados') {
      bucket = 'alimentos-balanceados-img';
      tableName = 'alimentos_balanceados';
    } else if (categoria === 'Medicamentos Veterinarios') {
      bucket = 'medicamentos-veterinarios-img';
      tableName = 'medicamentos_veterinarios';
    } else if (categoria === 'Mascotas') {
      // Para mascotas, necesitamos obtener la subcategoría del producto
      const { data: mascotaData } = await supabase
        .from('mascotas')
        .select('sub_categoria')
        .eq('id', id)
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
    if (url) {
      try {
        // Extraer el nombre del archivo de la URL
        const parts = url.split('/');
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
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error al eliminar el producto:', error.message);
    } else {
      if (onRefresh) onRefresh();
    }
  };

  return (
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
                      onDelete={() => handleDelete(producto.id, producto.nombre, producto.categoria, producto.url)}
                      offerId={producto.id}
                      onEdit={() => handleEdit(producto)}
                    />
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editProduct && editProduct.categoria === 'Implementos' && (
        <FormImplementos
          onClose={handleCloseEdit}
          implementsData={editProduct}
          isEdit={true}
          onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
        />
      )}
      {editProduct && editProduct.categoria === 'Alimentos balanceados' && (
        <FormAlimentosBalanceados
          onClose={handleCloseEdit}
          alimentosData={editProduct}
          isEdit={true}
          onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
        />
      )}
      {editProduct && editProduct.categoria === 'Medicamentos Veterinarios' && (
        <FormMedicamentosVeterinarios
          onClose={handleCloseEdit}
          medicamentosData={editProduct}
          isEdit={true}
          onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
        />
      )}
      {editProduct && editProduct.categoria === 'Mascotas' && editProductType === 'mascotas-accesorios' && (
        <FormEditMascotasAccesorios
          onClose={handleCloseEdit}
          mascotasData={editProduct}
          onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
        />
      )}
      {editProduct && editProduct.categoria === 'Mascotas' && editProductType === 'mascotas-alimentos' && (
        <FormEditMascotasAlimentos
          onClose={handleCloseEdit}
          mascotasData={editProduct}
          onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
        />
      )}
      {editProduct && editProduct.categoria === 'Mascotas' && editProductType === 'mascotas-general' && (
        <FormMascotas
          onClose={handleCloseEdit}
          mascotasData={editProduct}
          isEdit={true}
          onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
        />
      )}
    </div>
  );
};

export default TableProducts;
