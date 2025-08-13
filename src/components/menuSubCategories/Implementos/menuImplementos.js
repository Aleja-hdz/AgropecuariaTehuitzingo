import { ChevronDown, ChevronLeft, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import "./menuImplementos.css";
import { Link } from 'react-router-dom';

export default function MenuImplementos({
  selectedAnimalType,
  selectedWhatIs,
  onAnimalTypeFilter,
  onWhatIsFilter
}) {
  const [showAnimalType, setShowAnimalType] = useState(false);
  const [showWhatIs, setShowWhatIs] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Estados temporales móvil
  const [tempAnimalType, setTempAnimalType] = useState(selectedAnimalType || '');
  const [tempWhatIs, setTempWhatIs] = useState(selectedWhatIs || '');

  useEffect(() => {
    if (isFiltersOpen) {
      setTempAnimalType(selectedAnimalType || '');
      setTempWhatIs(selectedWhatIs || '');
    }
  }, [isFiltersOpen, selectedAnimalType, selectedWhatIs]);

  const applyMobileFilters = () => {
    onAnimalTypeFilter(tempAnimalType || '');
    onWhatIsFilter(tempWhatIs || '');
    setIsFiltersOpen(false);
  };

  const animalTypes = [
    'Gallos',
    'Pollos',
    'Caballos',
    'Vacas',
    'Cerdos',
    'Ovejas'
  ];

  const whatIsOptions = [
    'Comedero',
    'Bebedero',
    'Montura',
    'Cuerda',
    'Deslanador'
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
          <div className="filter" onClick={() => setShowAnimalType(!showAnimalType)}>
            <span>Para animales {selectedAnimalType && `(${selectedAnimalType})`}</span>
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
            <span>Generales {selectedWhatIs && `(${selectedWhatIs})`}</span>
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
        </div>

        {isFiltersOpen && (
          <div className="filters-panel">
            <div className="filters-section">
              <h4>Para animales</h4>
              <div className="filters-options">
                <button className={`option ${tempAnimalType === '' ? 'selected' : ''}`} onClick={() => setTempAnimalType('')}>Todos</button>
                {animalTypes.map((a) => (
                  <button key={a} className={`option ${tempAnimalType === a ? 'selected' : ''}`} onClick={() => setTempAnimalType(a)}>{a}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Generales</h4>
              <div className="filters-options">
                <button className={`option ${tempWhatIs === '' ? 'selected' : ''}`} onClick={() => setTempWhatIs('')}>Todos</button>
                {whatIsOptions.map((o) => (
                  <button key={o} className={`option ${tempWhatIs === o ? 'selected' : ''}`} onClick={() => setTempWhatIs(o)}>{o}</button>
                ))}
              </div>
            </div>
            <div className="filters-actions">
              <button className="apply-filters-btn" onClick={applyMobileFilters}>Aplicar filtros</button>
            </div>
          </div>
        )}

        <div className="active-filters">
          {selectedAnimalType && (
            <span className="chip">
              {selectedAnimalType}
              <button onClick={() => onAnimalTypeFilter('')} aria-label="Quitar filtro animales">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedWhatIs && (
            <span className="chip">
              {selectedWhatIs}
              <button onClick={() => onWhatIsFilter('')} aria-label="Quitar filtro generales">
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}