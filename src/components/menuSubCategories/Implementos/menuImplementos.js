import { ChevronDown, ChevronLeft, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import "./menuImplementos.css";
import { Link } from 'react-router-dom';

export default function MenuImplementos({
  selectedAnimalType,
  selectedWhatIs,
  selectedMarca,
  selectedAnimalesEspeciales,
  onAnimalTypeFilter,
  onWhatIsFilter,
  onMarcaFilter,
  onAnimalesEspecialesFilter
}) {
  const [showAnimalType, setShowAnimalType] = useState(false);
  const [showWhatIs, setShowWhatIs] = useState(false);
  const [showMarca, setShowMarca] = useState(false);
  const [showAnimalesEspeciales, setShowAnimalesEspeciales] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Estados temporales móvil
  const [tempAnimalType, setTempAnimalType] = useState(selectedAnimalType || '');
  const [tempWhatIs, setTempWhatIs] = useState(selectedWhatIs || '');
  const [tempMarca, setTempMarca] = useState(selectedMarca || '');
  const [tempAnimalesEspeciales, setTempAnimalesEspeciales] = useState(selectedAnimalesEspeciales || '');

  useEffect(() => {
    if (isFiltersOpen) {
      setTempAnimalType(selectedAnimalType || '');
      setTempWhatIs(selectedWhatIs || '');
      setTempMarca(selectedMarca || '');
      setTempAnimalesEspeciales(selectedAnimalesEspeciales || '');
    }
  }, [isFiltersOpen, selectedAnimalType, selectedWhatIs, selectedMarca, selectedAnimalesEspeciales]);

  const applyMobileFilters = () => {
    onAnimalTypeFilter(tempAnimalType || '');
    onWhatIsFilter(tempWhatIs || '');
    onMarcaFilter(tempMarca || '');
    onAnimalesEspecialesFilter(tempAnimalesEspeciales || '');
    setIsFiltersOpen(false);
  };

  const animalTypes = [
    'Universal',
    'Gallos y pollos',
    'Caballos',
    'Vacas',
    'Cerdos',
    'Ovejas',
    'Conejos'
  ];

  const whatIsOptions = [
    'Comederos',
    'Bebederos',
    'Monturas',
    'Cuerdas',
    'Deslanadores',
    'Rascaderos',
    'Voladeros',
    'Jaulas',
    'Biberones',
    'Mamilas'
  ];

  const marcaOptions = [
    'Implementos Lopez',
    'Comprovet'
  ];

  const animalesEspecialesOptions = [
    'Aves de combate',
    'Animales de engorda'
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
            <span>Productos {selectedWhatIs && `(${selectedWhatIs})`}</span>
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

          <div className="filter" onClick={() => setShowMarca(!showMarca)}>
            <span>Marca {selectedMarca && `(${selectedMarca})`}</span>
            <ChevronDown size={16} />
            {showMarca && (
              <ul className="dropdown">
                <li onClick={() => onMarcaFilter('')}>Todas</li>
                {marcaOptions.map((option) => (
                  <li 
                    key={option}
                    onClick={() => onMarcaFilter(option)}
                    className={selectedMarca === option ? 'selected' : ''}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowAnimalesEspeciales(!showAnimalesEspeciales)}>
            <span>Animales especiales {selectedAnimalesEspeciales && `(${selectedAnimalesEspeciales})`}</span>
            <ChevronDown size={16} />
            {showAnimalesEspeciales && (
              <ul className="dropdown">
                <li onClick={() => onAnimalesEspecialesFilter('')}>Todos</li>
                {animalesEspecialesOptions.map((option) => (
                  <li 
                    key={option}
                    onClick={() => onAnimalesEspecialesFilter(option)}
                    className={selectedAnimalesEspeciales === option ? 'selected' : ''}
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
              <h4>Animales</h4>
              <div className="filters-options">
                <button className={`option ${tempAnimalType === '' ? 'selected' : ''}`} onClick={() => setTempAnimalType('')}>Todos</button>
                {animalTypes.map((a) => (
                  <button key={a} className={`option ${tempAnimalType === a ? 'selected' : ''}`} onClick={() => setTempAnimalType(a)}>{a}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Productos</h4>
              <div className="filters-options">
                <button className={`option ${tempWhatIs === '' ? 'selected' : ''}`} onClick={() => setTempWhatIs('')}>Todos</button>
                {whatIsOptions.map((o) => (
                  <button key={o} className={`option ${tempWhatIs === o ? 'selected' : ''}`} onClick={() => setTempWhatIs(o)}>{o}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Marca</h4>
              <div className="filters-options">
                <button className={`option ${tempMarca === '' ? 'selected' : ''}`} onClick={() => setTempMarca('')}>Todas</button>
                {marcaOptions.map((m) => (
                  <button key={m} className={`option ${tempMarca === m ? 'selected' : ''}`} onClick={() => setTempMarca(m)}>{m}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Animales especiales</h4>
              <div className="filters-options">
                <button className={`option ${tempAnimalesEspeciales === '' ? 'selected' : ''}`} onClick={() => setTempAnimalesEspeciales('')}>Todos</button>
                {animalesEspecialesOptions.map((a) => (
                  <button key={a} className={`option ${tempAnimalesEspeciales === a ? 'selected' : ''}`} onClick={() => setTempAnimalesEspeciales(a)}>{a}</button>
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
              <button onClick={() => onWhatIsFilter('')} aria-label="Quitar filtro productos">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedMarca && (
            <span className="chip">
              {selectedMarca}
              <button onClick={() => onMarcaFilter('')} aria-label="Quitar filtro marca">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedAnimalesEspeciales && (
            <span className="chip">
              {selectedAnimalesEspeciales}
              <button onClick={() => onAnimalesEspecialesFilter('')} aria-label="Quitar filtro animales especiales">
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}