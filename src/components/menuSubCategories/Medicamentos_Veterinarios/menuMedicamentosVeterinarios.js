import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuMedicamentosVeterinarios.css";
import { Link } from 'react-router-dom';

export default function MenuMedicamentosVeterinarios({
  selectedOption,
  onOptionFilter
}) {
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    'Desparasitantes',
    'Vitaminas',
    'Suplementos',
    'Vacunas'
  ];

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
          <div className="filter" onClick={() => setShowOptions(!showOptions)}>
            <span>Opciones {selectedOption && `(${selectedOption})`}</span>
            <ChevronDown size={16} />
            {showOptions && (
              <ul className="dropdown">
                <li onClick={() => onOptionFilter('')}>Todos</li>
                {options.map((option) => (
                  <li 
                    key={option}
                    onClick={() => onOptionFilter(option)}
                    className={selectedOption === option ? 'selected' : ''}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}