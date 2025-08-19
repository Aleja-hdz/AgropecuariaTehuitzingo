import { ChevronDown, ChevronLeft, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import "./menuAlimentosBalanceados.css";
import { Link } from 'react-router-dom';

export default function MenuAlimentosBalanceados({
  selectedSpecies,
  selectedBrand,
  selectedProduction,
  onSpeciesFilter,
  onBrandFilter,
  onProductionFilter
}) {
  const [showSpecies, setShowSpecies] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showOthers, setShowOthers] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Estados temporales para panel móvil
  const [tempSpecies, setTempSpecies] = useState(selectedSpecies || '');
  const [tempBrand, setTempBrand] = useState(selectedBrand || '');
  const [tempProduction, setTempProduction] = useState(selectedProduction || '');

  useEffect(() => {
    if (isFiltersOpen) {
      setTempSpecies(selectedSpecies || '');
      setTempBrand(selectedBrand || '');
      setTempProduction(selectedProduction || '');
    }
  }, [isFiltersOpen, selectedSpecies, selectedBrand, selectedProduction]);

  const applyMobileFilters = () => {
    onSpeciesFilter(tempSpecies || '');
    onBrandFilter(tempBrand || '');
    onProductionFilter(tempProduction || '');
    setIsFiltersOpen(false);
  };

  const species = [
    'Bovinos',
    'Equinos',
    'Porcinos',
    'Caprinos',
    'Ovinos',
    'Aviar',
    'Canino',
    'Felino',
    'Aquacultura',
    'Apícola',
    'Roedores',
    'Reptilia',
    'Cúnicos',
    'Aves ornamentales'
  ];

  const brands = [
    'Apiaba',
    'Fasa',
    'Nutre bien',
    'Unión'
  ];

  const productionOptions = [
    { value: 'true', label: 'Alimentos para producción' },
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
          <span className="category-title">Alimentos balanceados</span>
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
          <div className="filter" onClick={() => setShowSpecies(!showSpecies)}>
            <span>Por especie {selectedSpecies && `(${selectedSpecies})`}</span>
            <ChevronDown size={16} />
            {showSpecies && (
              <ul className="dropdown">
                <li onClick={() => onSpeciesFilter('')}>Todos</li>
                {species.map((specie) => (
                  <li 
                    key={specie}
                    onClick={() => onSpeciesFilter(specie)}
                    className={selectedSpecies === specie ? 'selected' : ''}
                  >
                    {specie}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowBrands(!showBrands)}>
            <span>Por marca {selectedBrand && `(${selectedBrand})`}</span>
            <ChevronDown size={16} />
            {showBrands && (
              <ul className="dropdown">
                <li onClick={() => onBrandFilter('')}>Todas</li>
                {brands.map((brand) => (
                  <li 
                    key={brand}
                    onClick={() => onBrandFilter(brand)}
                    className={selectedBrand === brand ? 'selected' : ''}
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="filter" onClick={() => setShowOthers(!showOthers)}>
            <span>Otros {selectedProduction !== '' && `(${selectedProduction === 'true' ? 'Producción' : 'No producción'})`}</span>
            <ChevronDown size={16} />
            {showOthers && (
              <ul className="dropdown">
                <li onClick={() => onProductionFilter('')}>Todos</li>
                {productionOptions.map((option) => (
                  <li 
                    key={option.value}
                    onClick={() => onProductionFilter(option.value)}
                    className={selectedProduction === option.value ? 'selected' : ''}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {isFiltersOpen && (
          <div className="filters-panel">
            <div className="filters-section">
              <h4>Especie</h4>
              <div className="filters-options">
                <button className={`option ${tempSpecies === '' ? 'selected' : ''}`} onClick={() => setTempSpecies('')}>Todos</button>
                {species.map((s) => (
                  <button key={s} className={`option ${tempSpecies === s ? 'selected' : ''}`} onClick={() => setTempSpecies(s)}>{s}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Marca</h4>
              <div className="filters-options">
                <button className={`option ${tempBrand === '' ? 'selected' : ''}`} onClick={() => setTempBrand('')}>Todas</button>
                {brands.map((b) => (
                  <button key={b} className={`option ${tempBrand === b ? 'selected' : ''}`} onClick={() => setTempBrand(b)}>{b}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Otros</h4>
              <div className="filters-options">
                <button className={`option ${tempProduction === '' ? 'selected' : ''}`} onClick={() => setTempProduction('')}>Todos</button>
                {productionOptions.map((o) => (
                  <button key={o.value} className={`option ${tempProduction === o.value ? 'selected' : ''}`} onClick={() => setTempProduction(o.value)}>{o.label}</button>
                ))}
              </div>
            </div>
            <div className="filters-actions">
              <button className="apply-filters-btn" onClick={applyMobileFilters}>Aplicar filtros</button>
            </div>
          </div>
        )}

        <div className="active-filters">
          {selectedSpecies && (
            <span className="chip">
              {selectedSpecies}
              <button onClick={() => onSpeciesFilter('')} aria-label="Quitar filtro especie">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedBrand && (
            <span className="chip">
              {selectedBrand}
              <button onClick={() => onBrandFilter('')} aria-label="Quitar filtro marca">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedProduction !== '' && (
            <span className="chip">
              {selectedProduction === 'true' ? 'Producción' : 'No producción'}
              <button onClick={() => onProductionFilter('')} aria-label="Quitar filtro producción">
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}