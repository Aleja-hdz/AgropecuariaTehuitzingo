import './searcher.css';
import { FaSearch } from 'react-icons/fa';

export default function Searcher() {
  return (
    <div className="searcher-container">
      <label className="searcher-label">¿Qué producto deseas encontrar?</label>
      <div className="searcher-input-wrapper">
        <FaSearch className="searcher-icon" />
        <input
          type="text"
          placeholder="Buscar..."
          className="searcher-input"
        />
      </div>
    </div>
  );
}
