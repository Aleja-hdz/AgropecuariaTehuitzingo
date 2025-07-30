import './tableOffers.css';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import OptionsTable from '../optionsTable/optionsTable';
import FormNewOffer from '../formNewOffer/formNewOffer';

const TableOffers = ({ ofertas = [], onRefresh }) => {

  const [editOffer, setEditOffer] = useState(null);

  // Modificado: handleDelete ahora recibe también la url de la imagen
  const handleDelete = async (id, nombre, url) => {
    const confirm = window.confirm(`Eliminarás la siguiente oferta: ${nombre}`);
    if (!confirm) return;
    // Eliminar imagen del bucket si existe
    if (url) {
      try {
        // Extraer el nombre del archivo de la URL
        const parts = url.split('/');
        const fileName = parts[parts.length - 1].split('?')[0];
        const { error: storageError } = await supabase
          .storage
          .from('ofertas-img')
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
      .from('ofertas')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error al eliminar la oferta:', error.message);
    } else {
      // Refrescar datos desde el componente padre
      if (onRefresh) onRefresh();
    }
  };

  const handleEdit = (oferta) => {
    setEditOffer(oferta);
  };
  const handleCloseEdit = () => {
    setEditOffer(null);
  };




  return (
    <div className="table-container">
      <table className="table-offers">
        <thead>
          <tr>
            <th>Nombre del producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ofertas.map((oferta) => (
            <tr key={oferta.id}>
              <td>{oferta.nombre}</td>
              <td>
                <div className="table-actions">
                  <OptionsTable 
                    // Modificado: pasar url a handleDelete
                    onDelete={() => handleDelete(oferta.id, oferta.nombre, oferta.url)} 
                    offerId={oferta.id} 
                    onEdit={() => handleEdit(oferta)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editOffer && (
        <FormNewOffer 
          onClose={handleCloseEdit}
          onSave={() => { handleCloseEdit(); if (onRefresh) onRefresh(); }}
          offerData={editOffer}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default TableOffers;
