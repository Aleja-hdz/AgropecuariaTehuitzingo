import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import "./menuMedicamentosVeterinarios.css";
import { Link } from 'react-router-dom';

export default function MenuMedicamentosVeterinarios({
  selectedTipo,
  selectedEspecie,
  selectedVia,
  selectedPresentacion,
  onTipoFilter,
  onEspecieFilter,
  onViaFilter,
  onPresentacionFilter
}) {
  const [showTipo, setShowTipo] = useState(false);
  const [showEspecie, setShowEspecie] = useState(false);
  const [showVia, setShowVia] = useState(false);
  const [showPresentacion, setShowPresentacion] = useState(false);

  const tipos = [
    'Desparasitante',
    'Vitamina',
    'Suplemento',
    'Vacuna',
    'Antibiótico',
    'Antiinflamatorio',
    'Analgésico',
    'Hormonal'
  ];

  const especies = [
    'Perro',
    'Gato',
    'Gallo',
    'Caballo',
    'Cerdo',
    'Conejo',
    'Vaca',
    'Oveja',
    'Cabra',
    'Ave'
  ];

  const vias = [
    'Oral',
    'Inyectable',
    'Tópica',
    'Intranasal',
    'Ocular',
    'Subcutánea',
    'Intramuscular',
    'Intravenosa'
  ];

  const presentaciones = [
    'Frasco',
    'Ampolleta',
    'Blister',
    'Sobres',
    'Jeringa',
    'Pomada',
    'Gotas',
    'Tabletas',
    'Cápsulas',
    'Suspensión'
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
          {/* Filtro por Tipo de Medicamento */}
          <div className="filter" onClick={() => setShowTipo(!showTipo)}>
            <span>Tipo {selectedTipo && `(${selectedTipo})`}</span>
            <ChevronDown size={16} />
            {showTipo && (
              <ul className="dropdown">
                <li onClick={() => onTipoFilter('')}>Todos los tipos</li>
                {tipos.map((tipo) => (
                  <li 
                    key={tipo}
                    onClick={() => onTipoFilter(tipo)}
                    className={selectedTipo === tipo ? 'selected' : ''}
                  >
                    {tipo}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filtro por Especie */}
          <div className="filter" onClick={() => setShowEspecie(!showEspecie)}>
            <span>Especies de animales {selectedEspecie && `(${selectedEspecie})`}</span>
            <ChevronDown size={16} />
            {showEspecie && (
              <ul className="dropdown">
                <li onClick={() => onEspecieFilter('')}>Todas las especies</li>
                {especies.map((especie) => (
                  <li 
                    key={especie}
                    onClick={() => onEspecieFilter(especie)}
                    className={selectedEspecie === especie ? 'selected' : ''}
                  >
                    {especie}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filtro por Vía de Administración */}
          <div className="filter" onClick={() => setShowVia(!showVia)}>
            <span>Vía de administración {selectedVia && `(${selectedVia})`}</span>
            <ChevronDown size={16} />
            {showVia && (
              <ul className="dropdown">
                <li onClick={() => onViaFilter('')}>Todas las vías</li>
                {vias.map((via) => (
                  <li 
                    key={via}
                    onClick={() => onViaFilter(via)}
                    className={selectedVia === via ? 'selected' : ''}
                  >
                    {via}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filtro por Presentación */}
          <div className="filter" onClick={() => setShowPresentacion(!showPresentacion)}>
            <span>Presentación {selectedPresentacion && `(${selectedPresentacion})`}</span>
            <ChevronDown size={16} />
            {showPresentacion && (
              <ul className="dropdown">
                <li onClick={() => onPresentacionFilter('')}>Todas las presentaciones</li>
                {presentaciones.map((presentacion) => (
                  <li 
                    key={presentacion}
                    onClick={() => onPresentacionFilter(presentacion)}
                    className={selectedPresentacion === presentacion ? 'selected' : ''}
                  >
                    {presentacion}
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