import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuMedicamentosVeterinarios.css";
import { Link } from 'react-router-dom';

export default function MenuMedicamentosVeterinarios() {
  const [showSpecies, setShowSpecies] = useState(false);

  return (
    <div className="category-header">
      <div className="container-menuSub">
        <div className="back-and-title">
          <Link to="/productos">
            <button className="back-button">
              <ChevronLeft size={20} />
            </button>
          </Link>
          <span className="category-title">Medicamentos veterinarios</span>
        </div>

        <div className="filters">
          <div className="filter" onClick={() => setShowSpecies(!showSpecies)}>
            <span>Opciones</span>
            <ChevronDown size={16} />
            {showSpecies && (
              <ul className="dropdown">
                <li>Desparasitantes</li>
                <li>Vitaminas</li>
                <li>Suplementos</li>
                <li>Vacunas</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}