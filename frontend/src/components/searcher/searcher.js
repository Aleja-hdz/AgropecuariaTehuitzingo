import './searcher.css';
import { FaSearch } from 'react-icons/fa';

export default function Searcher({ value, onChange }) {
  return (
    <div className="searcher-container">
      <div className="searcher-input-wrapper">
        <FaSearch className="searcher-icon" />
        <input
          type="text"
          className="searcher-input"
          placeholder="Buscar..."
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
