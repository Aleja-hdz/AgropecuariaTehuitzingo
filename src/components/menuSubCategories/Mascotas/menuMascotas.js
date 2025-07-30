import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuMascotas.css";
import { Link } from 'react-router-dom';

export default function MenuMascotas({
  selectedFoodType,
  selectedAccessoryType,
  selectedAnimalType,
  onFoodTypeFilter,
  onAccessoryTypeFilter,
  onAnimalTypeFilter
}) {
  const [showFoodType, setShowFoodType] = useState(false);
  const [showAccessoryType, setShowAccessoryType] = useState(false);
  const [showAnimalType, setShowAnimalType] = useState(false);

  const foodTypes = [
    'Perro',
    'Gato',
    'Hamsters',
    'Peces'
  ];

  const accessoryTypes = [
    'Collares',
    'Correas',
    'Juguetes'
  ];

  const animalTypes = [
    'Perro',
    'Gato',
    'Hamsters',
    'Peces'
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
          <span className="category-title">Mascotas</span>
        </div>

        <div className="filters">
          <div className="filter" onClick={() => setShowFoodType(!showFoodType)}>
            <span>Alimentos para {selectedFoodType && `(${selectedFoodType})`}</span>
            <ChevronDown size={16} />
            {showFoodType && (
              <ul className="dropdown">
                <li onClick={() => onFoodTypeFilter('')}>Todos</li>
                {foodTypes.map((foodType) => (
                  <li 
                    key={foodType}
                    onClick={() => onFoodTypeFilter(foodType)}
                    className={selectedFoodType === foodType ? 'selected' : ''}
                  >
                    {foodType}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowAccessoryType(!showAccessoryType)}>
            <span>Accesorios {selectedAccessoryType && `(${selectedAccessoryType})`}</span>
            <ChevronDown size={16} />
            {showAccessoryType && (
              <ul className="dropdown">
                <li onClick={() => onAccessoryTypeFilter('')}>Todos</li>
                {accessoryTypes.map((accessoryType) => (
                  <li 
                    key={accessoryType}
                    onClick={() => onAccessoryTypeFilter(accessoryType)}
                    className={selectedAccessoryType === accessoryType ? 'selected' : ''}
                  >
                    {accessoryType}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}