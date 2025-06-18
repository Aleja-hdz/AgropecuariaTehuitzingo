import React from 'react';
import './tableMain.css';

const TableMain = () => {
  const data = [
    { nombre: "Nombre completo del producto", categoria: "Producto" },
    { nombre: "Nombre completo del producto", categoria: "Oferta" },
    { nombre: "Nombre completo del producto", categoria: "Producto" },
    { nombre: "Nombre completo del producto", categoria: "Producto" },
    { nombre: "Nombre completo del producto", categoria: "Oferta" },
  ];

  return (
    <div className="table-container">
      <div className="table-title">Ultimas creaciones</div>
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
                <a
                  className={
                    producto.categoria === "Producto" ? "product" : "oferta"
                  }
                  href="#"
                >
                  {producto.categoria}
                </a>
              </td>
              <td>
                <div className="actions">
                  <i className="fa fa-pen-to-square" title="Editar"></i>
                  <i className="fa fa-trash" title="Eliminar"></i>
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
