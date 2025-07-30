import { useState, useMemo, useEffect } from 'react';
import './implementos.css';
import Searcher from '../../../components/searcher/searcher';
import MenuImplementos from '../../../components/menuSubCategories/Implementos/menuImplementos';
import CardProduct from '../../../components/cardProduct/cardProduct';
import NoProductsFound from '../../../components/noProductsFound/noProductsFound';
import ImpViewProduct from '../../../components/viewProduct/impViewProduct';
import { supabase } from '../../../lib/supabaseClient';

export default function Implementos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        tipo_animal: null,
        que_es: null
    });

    useEffect(() => {
        const fetchImplementos = async () => {
            const { data, error } = await supabase
                .from('implementos')
                .select('*')
                .order('id', { ascending: false });
            if (error) {
                console.error('Error al obtener implementos:', error.message);
            } else {
                setProducts(
                    data.map(item => ({
                        id: item.id,
                        name: item.nombre,
                        image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                        // Datos completos para el modal
                        url: item.url,
                        nombre: item.nombre,
                        que_es: item.que_es,
                        tipo_animal: item.tipo_animal,
                        recomendaciones_uso: item.recomendaciones_uso,
                        informacion_adicional: item.informacion_adicional,
                        created_at: item.created_at,
                    }))
                );
            }
        };
        fetchImplementos();
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filtrar por término de búsqueda
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(product => 
                product.name && product.name.toLowerCase().includes(searchLower)
            );
        }

        // Filtrar por tipo de animal
        if (selectedFilters.tipo_animal) {
            filtered = filtered.filter(product => 
                product.tipo_animal === selectedFilters.tipo_animal
            );
        }

        // Filtrar por tipo de implemento (que_es)
        if (selectedFilters.que_es) {
            filtered = filtered.filter(product => 
                product.que_es === selectedFilters.que_es
            );
        }

        return filtered;
    }, [products, searchTerm, selectedFilters]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    const handleCloseProductModal = () => {
        setShowProductModal(false);
        setSelectedProduct(null);
    };

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar implementos de peluquería..." />
                {/* Indicador de filtros activos */}
                {(selectedFilters.tipo_animal || selectedFilters.que_es) && (
                    <div style={{ 
                        marginTop: '15px', 
                        padding: '12px 16px', 
                        backgroundColor: '#f8f9fa', 
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#495057',
                        border: '2px solid #dee2e6',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '10px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#28a745',
                                borderRadius: '50%',
                                display: 'inline-block'
                            }}></div>
                            <strong style={{ color: '#212529' }}>Filtros activos:</strong>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {selectedFilters.tipo_animal && (
                                    <span style={{
                                        backgroundColor: '#e7f3ff',
                                        color: '#0066cc',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        border: '1px solid #b3d9ff'
                                    }}>
                                        🐾 {selectedFilters.tipo_animal}
                                    </span>
                                )}
                                {selectedFilters.que_es && (
                                    <span style={{
                                        backgroundColor: '#fff3cd',
                                        color: '#856404',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        border: '1px solid #ffeaa7'
                                    }}>
                                        ⚙️ {selectedFilters.que_es}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={() => setSelectedFilters({ tipo_animal: null, que_es: null })}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#c82333';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#dc3545';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            ✕ Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
            <div className="categories-container">
                <MenuImplementos 
                    onFilterChange={handleFilterChange}
                    selectedFilters={selectedFilters}
                />
                <div className="container-card-products">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <CardProduct key={product.id} product={product} onViewProduct={handleViewProduct} />
                        ))
                    ) : (
                        <NoProductsFound searchTerm={searchTerm} />
                    )}
                </div>
            </div>
            {showProductModal && (
                <ImpViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
            )}
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}