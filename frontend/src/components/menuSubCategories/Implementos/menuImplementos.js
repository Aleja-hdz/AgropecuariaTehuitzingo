import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuImplementos.css";
import { Link } from 'react-router-dom';

export default function MenuImplementos() {
  const [showSpecies, setShowSpecies] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  return (
    <div className="category-header">
      <div className="container-menuSub">
        <div className="back-and-title">
          <Link to="/productos">
            <button className="back-button">
              <ChevronLeft size={20} />
            </button>
          </Link>
          <span className="category-title">Implementos</span>
        </div>

        <div className="filters">
          <div className="filter" onClick={() => setShowSpecies(!showSpecies)}>
            <span>Para animales</span>
            <ChevronDown size={16} />
            {showSpecies && (
              <ul className="dropdown">
                <li>Gallos</li>
                <li>Rascaderos</li>
                <li>Bebederos</li>
                <li>Comederos</li>
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowBrands(!showBrands)}>
            <span>Generales</span>
            <ChevronDown size={16} />
            {showBrands && (
              <ul className="dropdown">
                <li>Herramientas</li>
                <li>Otros</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}