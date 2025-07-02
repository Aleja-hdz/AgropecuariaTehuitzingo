import './tableProducts.css';
import OptionsTable from '../optionsTable/optionsTable';

const TableProducts = ({ productos = [] }) => {
  // Si no se pasan productos, usar los datos de ejemplo
  const productosData = productos.length > 0 ? productos : [
    "Nombre completo del producto",
    "Nombre completo del producto",
    "Nombre completo del producto",
    "Nombre completo del producto",
  ];

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
          {productosData.map((nombre, i) => (
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

export default TableProducts;
