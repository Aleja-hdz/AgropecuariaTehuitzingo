import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuMascotas.css";
import { Link } from 'react-router-dom';

export default function MenuMascotas() {
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
          <span className="category-title">Mascotas</span>
        </div>

        <div className="filters">
          <div className="filter" onClick={() => setShowSpecies(!showSpecies)}>
            <span>Alimentos</span>
            <ChevronDown size={16} />
            {showSpecies && (
              <ul className="dropdown">
                <li>Perro</li>
                <li>Gato</li>
                <li>Hasmters</li>
                <li>Peces</li>
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowBrands(!showBrands)}>
            <span>Accesorios</span>
            <ChevronDown size={16} />
            {showBrands && (
              <ul className="dropdown">
                <li>Collares</li>
                <li>Correas</li>
                <li>Juguetes</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}