import './tableOffers.css';
import OptionsTable from '../optionsTable/optionsTable';

const TableOffers = ({ ofertas = [] }) => {
  // Si no se pasan ofertas, usar los datos de ejemplo
  const ofertasData = ofertas.length > 0 ? ofertas : [
    "Nombre completo del producto",
    "Nombre completo del producto",
    "Nombre completo del producto",
    "Nombre completo del producto",
  ];

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
          {ofertasData.map((nombre, i) => (
            <tr key={i}>
              <td>{nombre}</td>
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
