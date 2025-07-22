import './tableMain.css';
import OptionsTable from "../../components/optionsTable/optionsTable"

const TableMain = ({ data = [] }) => {
  // Si no se pasan datos, usar los datos de ejemplo
  const tableData = data.length > 0 ? data : [
    { nombre: "Nombre completo del producto", categoria: "Producto" },
    { nombre: "Nombre completo del producto", categoria: "Oferta" },
    { nombre: "Nombre completo del producto", categoria: "Producto" },
    { nombre: "Nombre completo del producto", categoria: "Producto" },
  ];

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre del producto</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>
                <label
                  className={
                    producto.categoria === "Producto" ? "product" : "oferta"
                  }
                  href="#"
                >
                  {producto.categoria}
                </label>
              </td>
              <td>
                <div className="actions">
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

export default TableMain;
