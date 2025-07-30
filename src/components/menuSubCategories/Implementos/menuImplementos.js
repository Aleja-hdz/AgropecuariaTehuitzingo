import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuImplementos.css";
import { Link } from 'react-router-dom';

export default function MenuImplementos({ onFilterChange, selectedFilters }) {
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
          <span className="category-title">Implementos</span>
        </div>

        <div className="filters">
          <div className={`filter ${selectedFilters?.tipo_animal ? 'active-filter' : ''}`} onClick={() => setShowSpecies(!showSpecies)}>
            <span>Para animales</span>
            {selectedFilters?.tipo_animal && (
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#28a745',
                borderRadius: '50%',
                marginLeft: '4px'
              }}></div>
            )}
            <ChevronDown 
              size={16} 
              style={{
                transition: 'transform 0.2s ease',
                transform: showSpecies ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
            {showSpecies && (
              <ul className="dropdown">
                <li 
                  className={selectedFilters?.tipo_animal === 'Gallos' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('tipo_animal', selectedFilters?.tipo_animal === 'Gallos' ? null : 'Gallos');
                  }}
                >
                  Gallos
                </li>
                <li 
                  className={selectedFilters?.tipo_animal === 'Pollos' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('tipo_animal', selectedFilters?.tipo_animal === 'Pollos' ? null : 'Pollos');
                  }}
                >
                  Pollos
                </li>
                <li 
                  className={selectedFilters?.tipo_animal === 'Caballos' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('tipo_animal', selectedFilters?.tipo_animal === 'Caballos' ? null : 'Caballos');
                  }}
                >
                  Caballos
                </li>
                <li 
                  className={selectedFilters?.tipo_animal === 'Vacas' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('tipo_animal', selectedFilters?.tipo_animal === 'Vacas' ? null : 'Vacas');
                  }}
                >
                  Vacas
                </li>
                <li 
                  className={selectedFilters?.tipo_animal === 'Cerdos' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('tipo_animal', selectedFilters?.tipo_animal === 'Cerdos' ? null : 'Cerdos');
                  }}
                >
                  Cerdos
                </li>
                <li 
                  className={selectedFilters?.tipo_animal === 'Ovejas' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('tipo_animal', selectedFilters?.tipo_animal === 'Ovejas' ? null : 'Ovejas');
                  }}
                >
                  Ovejas
                </li>
              </ul>
            )}
          </div>

          <div className={`filter ${selectedFilters?.que_es ? 'active-filter' : ''}`} onClick={() => setShowBrands(!showBrands)}>
            <span>Generales</span>
            {selectedFilters?.que_es && (
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#28a745',
                borderRadius: '50%',
                marginLeft: '4px'
              }}></div>
            )}
            <ChevronDown 
              size={16} 
              style={{
                transition: 'transform 0.2s ease',
                transform: showBrands ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
            {showBrands && (
              <ul className="dropdown">
                <li 
                  className={selectedFilters?.que_es === 'Comedero' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('que_es', selectedFilters?.que_es === 'Comedero' ? null : 'Comedero');
                  }}
                >
                  Comederos
                </li>
                <li 
                  className={selectedFilters?.que_es === 'Bebedero' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('que_es', selectedFilters?.que_es === 'Bebedero' ? null : 'Bebedero');
                  }}
                >
                  Bebederos
                </li>
                <li 
                  className={selectedFilters?.que_es === 'Montura' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('que_es', selectedFilters?.que_es === 'Montura' ? null : 'Montura');
                  }}
                >
                  Monturas
                </li>
                <li 
                  className={selectedFilters?.que_es === 'Cuerda' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('que_es', selectedFilters?.que_es === 'Cuerda' ? null : 'Cuerda');
                  }}
                >
                  Cuerdas
                </li>
                <li 
                  className={selectedFilters?.que_es === 'Deslanador' ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange('que_es', selectedFilters?.que_es === 'Deslanador' ? null : 'Deslanador');
                  }}
                >
                  Deslanadores
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}