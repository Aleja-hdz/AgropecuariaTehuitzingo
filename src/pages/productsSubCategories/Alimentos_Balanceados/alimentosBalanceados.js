import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import CardProduct from '../../../components/cardProduct/cardProduct';
import Searcher from '../../../components/searcher/searcher';
import MenuAlimentosBalanceados from '../../../components/menuSubCategories/Alimentos_Balanceados/menuAlimentosBalanceados';
import AliBalViewProduct from '../../../components/viewProduct/aliBalViewProduct';
import NoProductsFound from '../../../components/noProductsFound/noProductsFound';
import './alimentosBalanceados.css';

export default function AlimentosBalanceados() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedProduction, setSelectedProduction] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 24;

    // Función para formatear medidas
    const formatMeasure = (medida) => {
        const medidas = {
            'Kilogramos': 'kg',
            'Gramos': 'gr',
            'Litros': 'L',
            'Mililitros': 'ml',
            'Unidades': 'unid',
            'Piezas': 'pzas'
        };
        return medidas[medida] || medida;
    };

    // Obtener productos de Supabase
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('alimentos_balanceados')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error al obtener alimentos balanceados:', error);
            } else {
                // Formatear los datos para que coincidan con la estructura esperada
                const formattedProducts = data.map(product => {
                    // Formatear el contenido con la medida abreviada
                    let contenidoFormateado = '';
                    if (product.contenido_decimal && product.contenido_medida) {
                        const medidaAbreviada = formatMeasure(product.contenido_medida);
                        contenidoFormateado = `${product.contenido_decimal} ${medidaAbreviada}`;
                    }
                    
                    return {
                        id: product.id,
                        name: product.nombre,
                        weight: contenidoFormateado,
                        image: product.url,
                        // Datos adicionales para la vista detallada
                        especie: product.especie,
                        marca: product.marca,
                        alimento_produccion: product.alimento_produccion,
                        materias_primas: product.materias_primas,
                        contenido_decimal: product.contenido_decimal,
                        contenido_medida: product.contenido_medida,
                        informacion_adicional: product.informacion_adicional,
                        created_at: product.created_at
                    };
                });
                setProducts(formattedProducts);
            }
        } catch (error) {
            console.error('Error inesperado:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Función para filtrar productos basada en el término de búsqueda y filtros
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Filtro por búsqueda
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchLower) ||
                product.weight.toLowerCase().includes(searchLower) ||
                product.especie?.toLowerCase().includes(searchLower) ||
                product.marca?.toLowerCase().includes(searchLower)
            );
        }

        // Filtro por especie
        if (selectedSpecies) {
            filtered = filtered.filter(product => product.especie === selectedSpecies);
        }

        // Filtro por marca
        if (selectedBrand) {
            filtered = filtered.filter(product => product.marca === selectedBrand);
        }

        // Filtro por producción
        if (selectedProduction !== '') {
            const isProduction = selectedProduction === 'true';
            filtered = filtered.filter(product => product.alimento_produccion === isProduction);
        }

        return filtered;
    }, [products, searchTerm, selectedSpecies, selectedBrand, selectedProduction]);

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
    const handleSpeciesFilter = (species) => {
        setSelectedSpecies(selectedSpecies === species ? '' : species);
    };

    const handleBrandFilter = (brand) => {
        setSelectedBrand(selectedBrand === brand ? '' : brand);
    };

    const handleProductionFilter = (production) => {
        setSelectedProduction(selectedProduction === production ? '' : production);
    };

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar alimentos balanceados..." />
            </div>
            <div className="categories-container">
                <MenuAlimentosBalanceados 
                    selectedSpecies={selectedSpecies}
                    selectedBrand={selectedBrand}
                    selectedProduction={selectedProduction}
                    onSpeciesFilter={handleSpeciesFilter}
                    onBrandFilter={handleBrandFilter}
                    onProductionFilter={handleProductionFilter}
                />
                <div className={`container-card-products ${paginatedProducts.length === 0 ? 'no-products' : ''}`}>
                    {loading ? (
                        <div className="loading">Cargando productos...</div>
                    ) : paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <CardProduct key={product.id} product={product} onViewProduct={handleViewProduct} />
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
                <AliBalViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
            )}
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}