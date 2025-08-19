import { ChevronDown, ChevronLeft, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import "./menuMedicamentosVeterinarios.css";
import { Link } from 'react-router-dom';

export default function MenuMedicamentosVeterinarios({
  selectedTipo,
  selectedEspecie,
  selectedVia,
  selectedPresentacion,
  selectedMarca,
  onTipoFilter,
  onEspecieFilter,
  onViaFilter,
  onPresentacionFilter,
  onMarcaFilter
}) {
  const [showTipo, setShowTipo] = useState(false);
  const [showEspecie, setShowEspecie] = useState(false);
  const [showVia, setShowVia] = useState(false);
  const [showPresentacion, setShowPresentacion] = useState(false);
  const [showMarca, setShowMarca] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Estados temporales para el panel móvil
  const [tempTipo, setTempTipo] = useState(selectedTipo || '');
  const [tempEspecie, setTempEspecie] = useState(selectedEspecie || '');
  const [tempVia, setTempVia] = useState(selectedVia || '');
  const [tempPresentacion, setTempPresentacion] = useState(selectedPresentacion || '');
  const [tempMarca, setTempMarca] = useState(selectedMarca || '');

  useEffect(() => {
    if (isFiltersOpen) {
      setTempTipo(selectedTipo || '');
      setTempEspecie(selectedEspecie || '');
      setTempVia(selectedVia || '');
      setTempPresentacion(selectedPresentacion || '');
      setTempMarca(selectedMarca || '');
    }
  }, [isFiltersOpen, selectedTipo, selectedEspecie, selectedVia, selectedPresentacion, selectedMarca]);

  const applyMobileFilters = () => {
    onTipoFilter(tempTipo || '');
    onEspecieFilter(tempEspecie || '');
    onViaFilter(tempVia || '');
    onPresentacionFilter(tempPresentacion || '');
    onMarcaFilter(tempMarca || '');
    setIsFiltersOpen(false);
  };

  const tipos = [
    'Analgésico',
    'Antihelmínticos',
    'Antibiótico',
    'Antimicóticos',
    'Antimicrobianos',
    'Antiparásito',
    'Antiséptico',
    'Antiinflamatorio',
    'Biológicos',
    'Cardiología',
    'Dermatología',
    'Desinfectante',
    'Desparasitante',
    'Electrolitos',
    'Endocrinología',
    'Farmacéutico',
    'Gastroenterología',
    'Gastrointestinal',
    'Hormonal',
    'Locomoción',
    'Manejo de heridas',
    'Multivitamínico',
    'Nutrición',
    'Pomada',
    'Renal',
    'Respiratorio',
    'Solución',
    'Suplementos',
    'Vacunas',
    'Vitaminas'
  ];

  const especies = [
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

  const vias = [
    'Intramuscular',
    'Intranasal',
    'Intravenosa',
    'Inyectable',
    'Ocular',
    'Oral',
    'Subcutánea',
    'Tópica'
  ];

  const presentaciones = [
    'Ampolleta',
    'Blister',
    'Cápsulas',
    'Frasco',
    'Gotas',
    'Jeringa',
    'Pomada',
    'Sobres',
    'Suspensión',
    'Tabletas'
  ];

  const marcas = [
    'AGROVET',
    'ARANDA',
    'Aranda Pets',
    'Dechra',
    'Laboratorios Pier',
    'PANAVET',
    'PROVETMEX',
    'Riverfarma',
    'Sanfer',
    'Zoetis'
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

        {/* Toggle solo visible en móvil */}
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

          {/* Filtro por Marca */}
          <div className="filter" onClick={() => setShowMarca(!showMarca)}>
            <span>Marca {selectedMarca && `(${selectedMarca})`}</span>
            <ChevronDown size={16} />
            {showMarca && (
              <ul className="dropdown">
                <li onClick={() => onMarcaFilter('')}>Todas las marcas</li>
                {marcas.map((marca) => (
                  <li 
                    key={marca}
                    onClick={() => onMarcaFilter(marca)}
                    className={selectedMarca === marca ? 'selected' : ''}
                  >
                    {marca}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Panel móvil de filtros en lista */}
        {isFiltersOpen && (
          <div className="filters-panel">
            <div className="filters-section">
              <h4>Tipo</h4>
              <div className="filters-options">
                <button className={`option ${tempTipo === '' ? 'selected' : ''}`} onClick={() => setTempTipo('')}>Todos</button>
                {tipos.map((t) => (
                  <button key={t} className={`option ${tempTipo === t ? 'selected' : ''}`} onClick={() => setTempTipo(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Especies de animales</h4>
              <div className="filters-options">
                <button className={`option ${tempEspecie === '' ? 'selected' : ''}`} onClick={() => setTempEspecie('')}>Todas</button>
                {especies.map((e) => (
                  <button key={e} className={`option ${tempEspecie === e ? 'selected' : ''}`} onClick={() => setTempEspecie(e)}>{e}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Vía de administración</h4>
              <div className="filters-options">
                <button className={`option ${tempVia === '' ? 'selected' : ''}`} onClick={() => setTempVia('')}>Todas</button>
                {vias.map((v) => (
                  <button key={v} className={`option ${tempVia === v ? 'selected' : ''}`} onClick={() => setTempVia(v)}>{v}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Presentación</h4>
              <div className="filters-options">
                <button className={`option ${tempPresentacion === '' ? 'selected' : ''}`} onClick={() => setTempPresentacion('')}>Todas</button>
                {presentaciones.map((p) => (
                  <button key={p} className={`option ${tempPresentacion === p ? 'selected' : ''}`} onClick={() => setTempPresentacion(p)}>{p}</button>
                ))}
              </div>
            </div>
            <div className="filters-section">
              <h4>Marca</h4>
              <div className="filters-options">
                <button className={`option ${tempMarca === '' ? 'selected' : ''}`} onClick={() => setTempMarca('')}>Todas</button>
                {marcas.map((m) => (
                  <button key={m} className={`option ${tempMarca === m ? 'selected' : ''}`} onClick={() => setTempMarca(m)}>{m}</button>
                ))}
              </div>
            </div>
            <div className="filters-actions">
              <button className="apply-filters-btn" onClick={applyMobileFilters}>Aplicar filtros</button>
            </div>
          </div>
        )}

        {/* Chips de filtros activos (visible en móvil) */}
        <div className="active-filters">
          {selectedTipo && (
            <span className="chip">
              {selectedTipo}
              <button onClick={() => onTipoFilter('')} aria-label="Quitar filtro tipo">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedEspecie && (
            <span className="chip">
              {selectedEspecie}
              <button onClick={() => onEspecieFilter('')} aria-label="Quitar filtro especie">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedVia && (
            <span className="chip">
              {selectedVia}
              <button onClick={() => onViaFilter('')} aria-label="Quitar filtro vía">
                <X size={14} />
              </button>
            </span>
          )}
          {selectedPresentacion && (
            <span className="chip">
              {selectedPresentacion}
              <button onClick={() => onPresentacionFilter('')} aria-label="Quitar filtro presentación">
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
        </div>
      </div>
    </div>
  );
}