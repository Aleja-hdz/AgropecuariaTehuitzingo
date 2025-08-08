import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
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

  const species = [
    'Bovinos',
    'Equinos',
    'Porcinos',
    'Caprinos',
    'Ovinos',
    'Aves',
    'Aquacultura'
  ];

  const brands = [
    'Unión',
    'Apiaba',
    'Fasa',
    'Nutre bien'
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

        <div className="filters">
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
      </div>
    </div>
  );
}