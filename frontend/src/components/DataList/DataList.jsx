import React from 'react';
import './DataList.css';

const DataList = ({ data, columns, onRowClick, onSort }) => {
  const handleSort = (column) => {
    if (onSort) {
      onSort(column);
    }
  };

  return (
    <div className="data-list-container">
      <div className="data-list-header">
        {columns.map((column) => (
          <div
            key={column.key}
            className="header-cell"
            onClick={() => handleSort(column.key)}
          >
            {column.label}
            {column.sortable && <span className="sort-icon">↕</span>}
          </div>
        ))}
      </div>
      <div className="data-list-body">
        {data.map((item, index) => (
          <div
            key={index}
            className="data-list-row"
            onClick={() => onRowClick && onRowClick(item)}
          >
            {columns.map((column) => (
              <div key={column.key} className="data-cell">
                {column.render ? column.render(item[column.key], item) : item[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <div className="no-data">
          No hay datos disponibles
        </div>
      )}
    </div>
  );
};

export default DataList; 