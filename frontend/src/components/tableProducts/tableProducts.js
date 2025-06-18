import React from 'react';
import './tableProducts.css';

const TableProducts = () => {
  const productos = [
    "Nombre completo del producto",
    "Nombre completo del producto",
    "Nombre completo del producto",
  ];

  return (
    <div className="table-container">
      <button className="nuevo-producto">Nuevo producto</button>
      <p className="table-subtitulo">Productos registrados</p>

      <table className="table-products">
        <thead>
          <tr>
            <th>Nombre del producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((nombre, i) => (
            <tr key={i}>
              <td>{nombre}</td>
              <td>
                <div className="table-actions">
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

export default TableProducts;
