import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuSubCategories.css";

export default function MenuSubCategories() {
  const [showSpecies, setShowSpecies] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  return (
    <div className="category-header">
      <div className="container-menuSub">
        <div className="back-and-title">
          <button className="back-button">
            <ChevronLeft size={20} />
          </button>
          <span className="category-title">Alimentos balanceados</span>
        </div>

        <div className="filters">
          <div className="filter" onClick={() => setShowSpecies(!showSpecies)}>
            <span>Por especie</span>
            <ChevronDown size={16} />
            {showSpecies && (
              <ul className="dropdown">
                <li>Perro</li>
                <li>Gato</li>
                <li>Gallina</li>
                <li>Cerdo</li>
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowBrands(!showBrands)}>
            <span>Por marca</span>
            <ChevronDown size={16} />
            {showBrands && (
              <ul className="dropdown">
                <li>Unión</li>
                <li>Apiaba</li>
                <li>Fasa</li>
                <li>Nutre bien</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}