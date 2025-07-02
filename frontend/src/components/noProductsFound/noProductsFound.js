import './noProductsFound.css';

export default function NoProductsFound({ searchTerm }) {
  return (
    <div className="no-products-found">
      <div className="no-products-icon">🔍</div>
      <h3>No se encontraron productos</h3>
      <p>
        No hay productos que coincidan con "{searchTerm}"
      </p>
      <p className="suggestion">
        Intenta con otros términos de búsqueda o revisa la ortografía
      </p>
    </div>
  );
} 