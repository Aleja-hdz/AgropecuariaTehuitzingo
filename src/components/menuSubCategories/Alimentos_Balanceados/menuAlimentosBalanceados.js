import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuAlimentosBalanceados.css";
import { Link } from 'react-router-dom';

export default function MenuAlimentosBalanceados() {
  const [showSpecies, setShowSpecies] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showOthers, setShowOthers] = useState(false);

  return (
    <div className="category-header">
      <div className="container-menuSub">
        <div className="back-and-title">
          <Link to="/productos">
            <button className="back-button">
              <ChevronLeft size={20} />
            </button>
          </Link>
          <span className="category-title">Alimentos balanceados</span>
        </div>

        <div className="filters">
          <div className="filter" onClick={() => setShowSpecies(!showSpecies)}>
            <span>Por especie</span>
            <ChevronDown size={16} />
            {showSpecies && (
              <ul className="dropdown">
                <li>Bovinos</li>
                <li>Equinos</li>
                <li>Porcinos</li>
                <li>Caprinos</li>
                <li>Ovinos</li>
                <li>Aves</li>
                <li>Aquacultura</li>
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

          <div className="filter" onClick={() => setShowOthers(!showOthers)}>
            <span>Otros</span>
            <ChevronDown size={16} />
            {showOthers && (
              <ul className="dropdown">
                <li>Alimentos para producción</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}