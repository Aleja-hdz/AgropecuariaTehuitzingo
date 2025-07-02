import { useState } from 'react';
import './searcher.css';
import { Search } from 'lucide-react';

export default function Searcher({ onSearch, placeholder = "Buscar..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
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
    <div className="searcher-container">
      <div className="searcher-input-wrapper">
        <button type="button" disabled>
          <Search size={20}/>
        </button>
        <input
          type="text"
          placeholder={placeholder}
          className="searcher-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button 
            type="button" 
            className="clear-search-btn"
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
