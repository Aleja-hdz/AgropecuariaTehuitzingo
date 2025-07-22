import './tableOffers.css';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import OptionsTable from '../optionsTable/optionsTable';
import FormNewOffer from '../formNewOffer/formNewOffer';

const TableOffers = () => {

  const [ofertas, setOfertas] = useState([]);
  const [editOffer, setEditOffer] = useState(null);

  const fetchOfertas = async () => {
    const { data, error } = await supabase
      .from('ofertas')
      .select('*')
      .order('id', { ascending: false });

    if (error){
      console.error('Error al obtener ofertas:', error.message);
    }
    else {
      setOfertas(data);
    }
  };

  const handleDelete = async (id, nombre) => {
    const confirm = window.confirm(`Eliminarás la siguiente oferta: ${nombre}`);
    if (!confirm) return;
    const { error } = await supabase
      .from('ofertas')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error al eliminar la oferta:', error.message);
    } else {
      setOfertas(ofertas.filter(oferta => oferta.id !== id));
    }
  };

  const handleEdit = (oferta) => {
    setEditOffer(oferta);
  };
  const handleCloseEdit = () => {
    setEditOffer(null);
  };


  useEffect(() => {
      fetchOfertas();
  }, []);

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
                    onDelete={() => handleDelete(oferta.id, oferta.nombre)} 
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
          offerData={editOffer}
          isEdit={true}
          onSave={() => { setEditOffer(null); fetchOfertas(); }}
        />
      )}
    </div>
  );
};

export default TableOffers;
