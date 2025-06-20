import './searcher.css';
import { Search } from 'lucide-react';

export default function Searcher() {
  return (
    <div className="searcher-container">
      <div className="searcher-input-wrapper">
        <button>
          <Search size={20}/>
        </button>
        <input
          type="text"
          placeholder="Buscar..."
          className="searcher-input"
        />
      </div>
    </div>
  );
}
