import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuImplementos.css";
import { Link } from 'react-router-dom';

export default function MenuImplementos({
  selectedAnimalType,
  selectedWhatIs,
  selectedSpecialAnimal,
  onAnimalTypeFilter,
  onWhatIsFilter,
  onSpecialAnimalFilter
}) {
  const [showAnimalType, setShowAnimalType] = useState(false);
  const [showWhatIs, setShowWhatIs] = useState(false);
  const [showSpecialAnimal, setShowSpecialAnimal] = useState(false);

  const animalTypes = [
    'Gallos',
    'Pollos',
    'Caballos',
    'Vacas',
    'Cerdos',
    'Ovejas'
  ];

  const specialAnimalTypes = [
    'Aves de combate'
  ];

  const whatIsOptions = [
    'Comedero',
    'Bebedero',
    'Montura',
    'Cuerda',
    'Deslanador',
    'Jaula',
    'Nido',
    'Corral',
    'Báscula'
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
          <span className="category-title">Implementos</span>
        </div>

        <div className="filters">
          <div className="filter" onClick={() => setShowAnimalType(!showAnimalType)}>
            <span>Animales {selectedAnimalType && `(${selectedAnimalType})`}</span>
            <ChevronDown size={16} />
            {showAnimalType && (
              <ul className="dropdown">
                <li onClick={() => onAnimalTypeFilter('')}>Todos</li>
                {animalTypes.map((animalType) => (
                  <li 
                    key={animalType}
                    onClick={() => onAnimalTypeFilter(animalType)}
                    className={selectedAnimalType === animalType ? 'selected' : ''}
                  >
                    {animalType}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowWhatIs(!showWhatIs)}>
            <span>Producto específico {selectedWhatIs && `(${selectedWhatIs})`}</span>
            <ChevronDown size={16} />
            {showWhatIs && (
              <ul className="dropdown">
                <li onClick={() => onWhatIsFilter('')}>Todos</li>
                {whatIsOptions.map((option) => (
                  <li 
                    key={option}
                    onClick={() => onWhatIsFilter(option)}
                    className={selectedWhatIs === option ? 'selected' : ''}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowSpecialAnimal(!showSpecialAnimal)}>
            <span>Animales especiales {selectedSpecialAnimal && `(${selectedSpecialAnimal})`}</span>
            <ChevronDown size={16} />
            {showSpecialAnimal && (
              <ul className="dropdown">
                <li onClick={() => onSpecialAnimalFilter('')}>Todos</li>
                {specialAnimalTypes.map((specialAnimal) => (
                  <li 
                    key={specialAnimal}
                    onClick={() => onSpecialAnimalFilter(specialAnimal)}
                    className={selectedSpecialAnimal === specialAnimal ? 'selected' : ''}
                  >
                    {specialAnimal}
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