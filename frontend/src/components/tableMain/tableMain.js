import './tableMain.css';
import OptionsTable from "../../components/optionsTable/optionsTable"

const TableMain = () => {
  const data = [
    { nombre: "Nombre completo del producto", categoria: "Producto" },
    { nombre: "Nombre completo del producto", categoria: "Oferta" },
    { nombre: "Nombre completo del producto", categoria: "Producto" },
    { nombre: "Nombre completo del producto", categoria: "Producto" },
    { nombre: "Nombre completo del producto", categoria: "Oferta" },
  ];

  return (
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre del producto</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((producto, index) => (
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
  );
};

export default TableMain;
