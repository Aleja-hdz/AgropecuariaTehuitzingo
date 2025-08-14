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
    const [loading, setLoading] = useState(true);
    
    // Estados para filtros
    const [selectedAnimalType, setSelectedAnimalType] = useState('');
    const [selectedWhatIs, setSelectedWhatIs] = useState('');
    const [selectedMarca, setSelectedMarca] = useState('');

    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 24;

    // Estados para animaciones
    const [isVisible, setIsVisible] = useState({
        header: false,
        menu: false,
        products: false
    });

    // Animación de entrada inicial
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, header: true }));
        }, 100);

        const timer2 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, menu: true }));
        }, 300);

        const timer3 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, products: true }));
        }, 500);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    // Obtener productos de Supabase
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('implementos')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error al obtener implementos:', error);
            } else {
                // Formatear los datos para que coincidan con la estructura esperada
                const formattedProducts = data.map(item => ({
                    id: item.id,
                    name: item.nombre,
                    image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                    weight: item.tipo_animal || 'Implemento',
                    // Datos completos para el modal
                    url: item.url,
                    nombre: item.nombre,
                    que_es: item.que_es,
                    tipo_animal: item.tipo_animal,
                    recomendaciones_uso: item.recomendaciones_uso,
                    informacion_adicional: item.informacion_adicional,
                    marca_distribuidor: item.marca_distribuidor,
                    presentaciones_disponibles: item.presentaciones_disponibles,
                    created_at: item.created_at,
                }));
                setProducts(formattedProducts);
            }
        } catch (error) {
            console.error('Error inesperado:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para filtrar productos basada en el término de búsqueda y filtros
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filtro por búsqueda
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(product => 
                product.name && product.name.toLowerCase().includes(searchLower) ||
                product.tipo_animal?.toLowerCase().includes(searchLower) ||
                product.que_es?.toLowerCase().includes(searchLower) ||
                product.marca_distribuidor?.toLowerCase().includes(searchLower)
            );
        }

        // Filtro por tipo de animal
        if (selectedAnimalType) {
            filtered = filtered.filter(product => product.tipo_animal === selectedAnimalType);
        }

        // Filtro por tipo de implemento
        if (selectedWhatIs) {
            filtered = filtered.filter(product => product.que_es === selectedWhatIs);
        }

        // Filtro por marca
        if (selectedMarca) {
            filtered = filtered.filter(product => product.marca_distribuidor === selectedMarca);
        }

        return filtered;
    }, [products, searchTerm, selectedAnimalType, selectedWhatIs, selectedMarca]);

    // Paginación
    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    }, [filteredProducts.length]);

    useEffect(() => {
        // Ajustar página si cambia el total de páginas
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredProducts.slice(start, start + pageSize);
    }, [filteredProducts, currentPage]);

    const getPageNumbers = () => {
        const maxToShow = 5;
        let start = Math.max(1, currentPage - Math.floor(maxToShow / 2));
        let end = start + maxToShow - 1;
        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxToShow + 1);
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setShowProductModal(true);
    };

    const handleCloseProductModal = () => {
        setShowProductModal(false);
        setSelectedProduct(null);
    };

    // Funciones para manejar filtros
    const handleAnimalTypeFilter = (animalType) => {
        setSelectedAnimalType(selectedAnimalType === animalType ? '' : animalType);
    };

    const handleWhatIsFilter = (whatIs) => {
        setSelectedWhatIs(selectedWhatIs === whatIs ? '' : whatIs);
    };

    const handleMarcaFilter = (marca) => {
        setSelectedMarca(selectedMarca === marca ? '' : marca);
    };

    return(
        <div className="products-container">
            <div className={`categories-container-head ${isVisible.header ? 'animate-fade-in' : ''}`}>
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar implementos..." />
            </div>
            <div className={`categories-container ${isVisible.menu ? 'animate-fade-in-delay' : ''}`}>
                <MenuImplementos 
                    selectedAnimalType={selectedAnimalType}
                    selectedWhatIs={selectedWhatIs}
                    selectedMarca={selectedMarca}
                    onAnimalTypeFilter={handleAnimalTypeFilter}
                    onWhatIsFilter={handleWhatIsFilter}
                    onMarcaFilter={handleMarcaFilter}
                />
                <div className={`container-card-products ${isVisible.products ? 'animate-fade-in-delay-2' : ''} ${paginatedProducts.length === 0 ? 'no-products' : ''}`}>
                    {loading ? (
                        <div className="loading">Cargando productos...</div>
                    ) : paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product, index) => (
                            <div 
                                key={product.id} 
                                className="animate-card-product"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <CardProduct product={product} onViewProduct={handleViewProduct} />
                            </div>
                        ))
                    ) : (
                        <NoProductsFound searchTerm={searchTerm} />
                    )}
                </div>
                {totalPages > 1 && (
                    <div className="pagination">
                        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>Anterior</button>
                        {getPageNumbers().map((page) => (
                            <button
                                key={`page-${page}`}
                                className={page === currentPage ? 'active' : ''}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>Siguiente</button>
                    </div>
                )}
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