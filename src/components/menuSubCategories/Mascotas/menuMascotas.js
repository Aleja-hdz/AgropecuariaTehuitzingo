import { ChevronDown, ChevronLeft, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Estados temporales móvil
  const [tempFood, setTempFood] = useState(selectedFoodType || '');
  const [tempAccessory, setTempAccessory] = useState(selectedAccessoryType || '');
  const [tempAnimal, setTempAnimal] = useState(selectedAnimalType || '');

  useEffect(() => {
    if (isFiltersOpen) {
      setTempFood(selectedFoodType || '');
      setTempAccessory(selectedAccessoryType || '');
      setTempAnimal(selectedAnimalType || '');
    }
  }, [isFiltersOpen, selectedFoodType, selectedAccessoryType, selectedAnimalType]);

  const applyMobileFilters = () => {
    onFoodTypeFilter(tempFood || '');
    onAccessoryTypeFilter(tempAccessory || '');
    onAnimalTypeFilter(tempAnimal || '');
    setIsFiltersOpen(false);
  };

  const foodTypes = [
    'Gato',
    'Hamsters',
    'Peces',
    'Perro'
  ];

  const accessoryTypes = [
    'Collares',
    'Correas',
    'Juguetes'
  ];

  const animalTypes = [
    'Gato',
    'Hamsters',
    'Peces',
    'Perro'
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

        <button
          type="button"
          className="filters-toggle"
          onClick={() => setIsFiltersOpen((v) => !v)}
          aria-expanded={isFiltersOpen}
        >
          <span>Filtros</span>
          <Filter size={16} />
        </button>

        <div className={`filters ${isFiltersOpen ? 'open' : ''}`}>
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

        {isFiltersOpen && (
          <div className="filters-panel">
            <div className="filters-section">
              <h4>Alimentos para</h4>
              <div className="filters-options">
                <button className={`option ${tempFood === '' ? 'selected' : ''}`} onClick={() => setTempFood('')}>Todos</button>
                {foodTypes.map((f) => (
                  <button key={f} className={`option ${tempFood === f ? 'selected' : ''}`} onClick={() => setTempFood(f)}>{f}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Accesorios</h4>
              <div className="filters-options">
                <button className={`option ${tempAccessory === '' ? 'selected' : ''}`} onClick={() => setTempAccessory('')}>Todos</button>
                {accessoryTypes.map((a) => (
                  <button key={a} className={`option ${tempAccessory === a ? 'selected' : ''}`} onClick={() => setTempAccessory(a)}>{a}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Animales</h4>
              <div className="filters-options">
                <button className={`option ${tempAnimal === '' ? 'selected' : ''}`} onClick={() => setTempAnimal('')}>Todos</button>
                {animalTypes.map((an) => (
                  <button key={an} className={`option ${tempAnimal === an ? 'selected' : ''}`} onClick={() => setTempAnimal(an)}>{an}</button>
                ))}
              </div>
            </div>
            <div className="filters-actions">
              <button className="apply-filters-btn" onClick={applyMobileFilters}>Aplicar filtros</button>
            </div>
          </div>
        )}

        <div className="active-filters">
          {selectedFoodType && (
            <span className="chip">
              {selectedFoodType}
              <button onClick={() => onFoodTypeFilter('')} aria-label="Quitar filtro alimento">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedAccessoryType && (
            <span className="chip">
              {selectedAccessoryType}
              <button onClick={() => onAccessoryTypeFilter('')} aria-label="Quitar filtro accesorio">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedAnimalType && (
            <span className="chip">
              {selectedAnimalType}
              <button onClick={() => onAnimalTypeFilter('')} aria-label="Quitar filtro animal">
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}