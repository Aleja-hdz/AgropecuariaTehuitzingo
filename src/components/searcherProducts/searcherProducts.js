import { useState } from 'react';
import './searcherProducts.css';
import { Search } from 'lucide-react';

export default function SearcherProducts({ onSearch, placeholder = "Buscar productos..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('SearcherProducts - Valor ingresado:', value);
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="searcher-products-container">
      <div className="searcher-products-input-wrapper">
        <button type="button" disabled>
          <Search size={20}/>
        </button>
        <input
          type="text"
          placeholder={placeholder}
          className="searcher-products-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button 
            type="button" 
            className="clear-search-products-btn"
            onClick={handleClearSearch}
            title="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
} 