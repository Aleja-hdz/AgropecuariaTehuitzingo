import './tableOffers.css';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import OptionsTable from '../optionsTable/optionsTable';

const TableOffers = () => {

  const [ofertas, setOfertas] = useState([]);

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
                  <OptionsTable />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOffers;
