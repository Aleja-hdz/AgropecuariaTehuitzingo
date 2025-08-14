import { useState, useMemo, useEffect } from 'react';
import './products.css';
import SearcherProducts from '../../components/searcherProducts/searcherProducts';
import MenuCategories from '../../components/menuCategories/menuCategories';
import CardProduct from '../../components/cardProduct/cardProduct';
import NoProductsFound from '../../components/noProductsFound/noProductsFound';
import ViewProduct from '../../components/viewProduct/viewProduct';
import AliBalViewProduct from '../../components/viewProduct/aliBalViewProduct';
import ImpViewProduct from '../../components/viewProduct/impViewProduct';
import MascAccViewProduct from '../../components/viewProduct/mascAccViewProduct';
import MascAliViewProduct from '../../components/viewProduct/mascAliViewProduct';
import MvViewProduct from '../../components/viewProduct/mvViewProduct';
import { supabase } from '../../lib/supabaseClient';

export default function Products(){
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState({
        header: false,
        categories: false,
        searchResults: false
    });

    // Estado para "Todos los productos" aleatorios + paginación
    const [shuffledProducts, setShuffledProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    // Animación de entrada inicial
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, header: true }));
        }, 100);

        const timer2 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, categories: true }));
        }, 300);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    // Animación para resultados de búsqueda
    useEffect(() => {
        if (searchTerm.trim()) {
            const timer = setTimeout(() => {
                setIsVisible(prev => ({ ...prev, searchResults: true }));
            }, 200);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(prev => ({ ...prev, searchResults: false }));
        }
    }, [searchTerm]);

    // Obtener todos los productos de todas las categorías
    useEffect(() => {
        fetchAllProducts();
    }, []);

    const shuffleArray = (array) => {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    };

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const allProductsData = [];

            // 1. Obtener Alimentos Balanceados
            const { data: alimentosData, error: alimentosError } = await supabase
                .from('alimentos_balanceados')
                .select('*')
                .order('created_at', { ascending: false });

            if (!alimentosError && alimentosData) {
                const alimentosFormatted = alimentosData.map(item => ({
                    id: item.id,
                    name: item.nombre,
                    weight: `${item.contenido_decimal} ${item.contenido_medida}`,
                    image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                    category: 'Alimentos Balanceados',
                    // Datos adicionales para la vista detallada
                    especie: item.especie,
                    marca: item.marca,
                    alimento_produccion: item.alimento_produccion,
                    materias_primas: item.materias_primas,
                    informacion_adicional: item.informacion_adicional,
                    contenido_decimal: item.contenido_decimal,
                    contenido_medida: item.contenido_medida,
                    created_at: item.created_at,
                    // Identificador para el modal correcto
                    modalType: 'alimentos-balanceados'
                }));
                allProductsData.push(...alimentosFormatted);
            }

            // 2. Obtener Implementos
            const { data: implementosData, error: implementosError } = await supabase
                .from('implementos')
                .select('*')
                .order('created_at', { ascending: false });

            if (!implementosError && implementosData) {
                const implementosFormatted = implementosData.map(item => ({
                    id: item.id,
                    name: item.nombre,
                    weight: item.tipo_animal || 'Implemento',
                    image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                    category: 'Implementos',
                    // Datos adicionales para la vista detallada
                    que_es: item.que_es,
                    tipo_animal: item.tipo_animal,
                    recomendaciones_uso: item.recomendaciones_uso,
                    informacion_adicional: item.informacion_adicional,
                    marca_distribuidor: item.marca_distribuidor,
                    presentaciones_disponibles: item.presentaciones_disponibles,
                    created_at: item.created_at,
                    // Identificador para el modal correcto
                    modalType: 'implementos'
                }));
                allProductsData.push(...implementosFormatted);
            }

            // 3. Obtener Mascotas (Alimentos y Accesorios)
            const { data: mascotasData, error: mascotasError } = await supabase
                .from('mascotas')
                .select('*')
                .order('created_at', { ascending: false });

            if (!mascotasError && mascotasData) {
                const mascotasWithDetails = await Promise.all(
                    mascotasData.map(async (item) => {
                        let weight = '';
                        let additionalData = {};
                        let modalType = '';
                        
                        if (item.sub_categoria === 'Alimento') {
                            // Obtener datos de alimentos_mascotas
                            const { data: alimentoData } = await supabase
                                .from('alimentos_mascotas')
                                .select('*')
                                .eq('id', item.id)
                                .single();
                            
                            if (alimentoData) {
                                weight = `${alimentoData.contenido_decimal} ${alimentoData.contenido_medida}`;
                                additionalData = {
                                    ...alimentoData,
                                    // Datos para el modal de alimentos
                                    especie_mascota: alimentoData.especie_mascota,
                                    etapa_vida: alimentoData.etapa_vida,
                                    tamano_raza: alimentoData.tamano_raza,
                                    presentacion: alimentoData.presentacion,
                                    marca: alimentoData.marca,
                                    ingredientes_composicion_nutrimental: alimentoData.ingredientes_composicion_nutrimental,
                                    contenido_decimal: alimentoData.contenido_decimal,
                                    contenido_medida: alimentoData.contenido_medida,
                                    // Incluir información adicional de la tabla principal
                                    informacion_adicional: item.informacion_adicional,
                                };
                                modalType = 'mascotas-alimentos';
                            }
                        } else if (item.sub_categoria === 'Accesorio') {
                            // Obtener datos de accesorios_mascotas
                            const { data: accesorioData } = await supabase
                                .from('accesorios_mascotas')
                                .select('*')
                                .eq('id', item.id)
                                .single();
                            
                            if (accesorioData) {
                                weight = accesorioData.tipo_animal || 'Accesorio';
                                additionalData = {
                                    ...accesorioData,
                                    // Datos para el modal de accesorios
                                    que_es: accesorioData.que_es,
                                    tipo_animal: accesorioData.tipo_animal,
                                    recomendaciones_uso: accesorioData.recomendaciones_uso,
                                    // Incluir información adicional de la tabla principal
                                    informacion_adicional: item.informacion_adicional,
                                };
                                modalType = 'mascotas-accesorios';
                            }
                        }
                        
                        return {
                            id: item.id,
                            name: item.nombre,
                            image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                            weight: weight,
                            category: 'Mascotas',
                            // Datos completos para los modales
                            url: item.url,
                            nombre: item.nombre,
                            created_at: item.created_at,
                            ...additionalData,
                            // Identificador para el modal correcto
                            modalType: modalType
                        };
                    })
                );
                allProductsData.push(...mascotasWithDetails);
            }

            // 4. Obtener Medicamentos Veterinarios
            const { data: medicamentosData, error: medicamentosError } = await supabase
                .from('medicamentos_veterinarios')
                .select('*')
                .order('created_at', { ascending: false });

            if (!medicamentosError && medicamentosData) {
                const medicamentosFormatted = medicamentosData.map(item => ({
                    id: item.id,
                    name: item.nombre,
                    weight: `${item.contenido_decimal} ${item.contenido_medida}`,
                    image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                    category: 'Medicamentos Veterinarios',
                    // Datos adicionales para la vista detallada
                    tipo: item.tipo,
                    especie: item.especie,
                    edad: item.edad,
                    via_administracion: item.via_administracion,
                    presentacion: item.presentacion,
                    marca: item.marca,
                    contenido_decimal: item.contenido_decimal,
                    contenido_medida: item.contenido_medida,
                    informacion_adicional: item.informacion_adicional,
                    created_at: item.created_at,
                    // Identificador para el modal correcto
                    modalType: 'medicamentos-veterinarios'
                }));
                allProductsData.push(...medicamentosFormatted);
            }

            setAllProducts(allProductsData);
            // Barajar y preparar la sección "Todos los productos"
            setShuffledProducts(shuffleArray(allProductsData));
            setCurrentPage(1);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
    };

    const normalize = (text) => (text || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    // Función para filtrar productos conforme a lo que se escriba en search
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return [];
        }
        
        const searchNormalized = normalize(searchTerm);
        return allProducts.filter(product => {
            const name = normalize(product.name);
            const brand = normalize(product.marca);
            return name.includes(searchNormalized) || brand.includes(searchNormalized);
        });
    }, [allProducts, searchTerm]);

    // Paginación para "Todos los productos"
    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(shuffledProducts.length / pageSize));
    }, [shuffledProducts.length]);

    useEffect(() => {
        // Ajustar página si cambia el total de páginas
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return shuffledProducts.slice(start, start + pageSize);
    }, [shuffledProducts, currentPage]);

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

    // Función para renderizar el modal correcto según el tipo de producto
    const renderProductModal = () => {
        if (!selectedProduct) return null;

        switch (selectedProduct.modalType) {
            case 'alimentos-balanceados':
                return <AliBalViewProduct product={selectedProduct} onClose={handleCloseProductModal} />;
            case 'implementos':
                return <ImpViewProduct product={selectedProduct} onClose={handleCloseProductModal} />;
            case 'mascotas-alimentos':
                return <MascAliViewProduct product={selectedProduct} onClose={handleCloseProductModal} />;
            case 'mascotas-accesorios':
                return <MascAccViewProduct product={selectedProduct} onClose={handleCloseProductModal} />;
            case 'medicamentos-veterinarios':
                return <MvViewProduct product={selectedProduct} onClose={handleCloseProductModal} />;
            default:
                return <ViewProduct product={selectedProduct} onClose={handleCloseProductModal} />;
        }
    };

    return(
        <div className="products-container">
            <div className={`categories-container-head ${isVisible.header ? 'animate-fade-in' : ''}`}>
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <SearcherProducts onSearch={handleSearch} placeholder="Buscar en todos los productos..." />
            </div>
            
            {!searchTerm.trim() ? (
                // Mostrar categorías cuando no hay búsqueda
                <div className={`categories-container-menu ${isVisible.categories ? 'animate-fade-in-delay' : ''}`}>
                    <p>Elíge la categoría de tu interés</p>
                    <MenuCategories />
                </div>
            ) : (
                // Mostrar resultados de búsqueda
                <div className={`search-results-container ${isVisible.searchResults ? 'animate-fade-in-delay' : ''}`}>
                    <div className="search-results-header">
                        <p className='text'>Resultados de búsqueda para "{searchTerm}" ({filteredProducts.length} encontrado{filteredProducts.length !== 1 ? 's' : ''})</p>
                    </div>
                    <div className={`container-card-products ${filteredProducts.length === 0 ? 'no-products' : ''}`}>
                        {loading ? (
                            <div className="loading">Buscando productos...</div>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <div 
                                    key={`${product.category}-${product.id}`} 
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
                </div>
            )}
            {showProductModal && renderProductModal()}
            <br></br>
            <div className='all-products'>
                <p>Todos los productos</p>
                <div className={`container-card-products ${paginatedProducts.length === 0 ? 'no-products' : ''}`}>
                    {paginatedProducts.map((product, index) => (
                        <div 
                            key={`all-${product.category}-${product.id}-${index}`} 
                            className="animate-card-product"
                            style={{ animationDelay: `${index * 0.03}s` }}
                        >
                            <CardProduct product={product} onViewProduct={handleViewProduct} />
                        </div>
                    ))}
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
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}