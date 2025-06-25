import './tableOffers.css';
import OptionsTable from '../optionsTable/optionsTable';

const TableOffers = () => {
  const ofertas = [
    "Nombre completo del producto",
    "Nombre completo del producto",
    "Nombre completo del producto",
    "Nombre completo del producto",
    "Nombre completo del producto",
  ];

  return (
      <table className="table-products">
        <thead>
          <tr>
            <th>Nombre del producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ofertas.map((nombre, i) => (
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
  );
};

export default TableOffers;
