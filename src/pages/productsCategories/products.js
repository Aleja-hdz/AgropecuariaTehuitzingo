import { useState, useMemo, useEffect } from 'react';
import './products.css';
import Searcher from '../../components/searcher/searcher';
import MenuCategories from '../../components/menuCategories/menuCategories';
import CardProduct from '../../components/cardProduct/cardProduct';
import NoProductsFound from '../../components/noProductsFound/noProductsFound';
import ViewProduct from '../../components/viewProduct/viewProduct';
import AliBalViewProduct from '../../components/viewProduct/aliBalViewProduct';
import ImpViewProduct from '../../components/viewProduct/impViewProduct';
import MascAccViewProduct from '../../components/viewProduct/mascAccViewProduct';
import MascAliViewProduct from '../../components/viewProduct/mascAliViewProduct';
import { supabase } from '../../lib/supabaseClient';

export default function Products(){
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener todos los productos de todas las categorías
    useEffect(() => {
        fetchAllProducts();
    }, []);

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
                    weight: item.informacion_adicional || 'Implemento',
                    image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                    category: 'Implementos',
                    // Datos adicionales para la vista detallada
                    que_es: item.que_es,
                    tipo_animal: item.tipo_animal,
                    recomendaciones_uso: item.recomendaciones_uso,
                    informacion_adicional: item.informacion_adicional,
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
                                weight = item.informacion_adicional || 'Accesorio';
                                additionalData = {
                                    ...accesorioData,
                                    // Datos para el modal de accesorios
                                    que_es: accesorioData.que_es,
                                    tipo_animal: accesorioData.tipo_animal,
                                    recomendaciones_uso: accesorioData.recomendaciones_uso,
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
                    tipo_medicamento: item.tipo_medicamento,
                    especie_destinada: item.especie_destinada,
                    presentacion: item.presentacion,
                    marca: item.marca,
                    ingredientes_composicion: item.ingredientes_composicion,
                    informacion_adicional: item.informacion_adicional,
                    created_at: item.created_at,
                    // Identificador para el modal correcto
                    modalType: 'medicamentos-veterinarios'
                }));
                allProductsData.push(...medicamentosFormatted);
            }

            setAllProducts(allProductsData);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para filtrar productos conforme a lo que se escriba en search
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return [];
        }
        
        const searchLower = searchTerm.toLowerCase();
        return allProducts.filter(product => 
            product.name && product.name.toLowerCase().includes(searchLower) ||
            product.weight && product.weight.toLowerCase().includes(searchLower) ||
            product.category && product.category.toLowerCase().includes(searchLower) ||
            product.especie && product.especie.toLowerCase().includes(searchLower) ||
            product.marca && product.marca.toLowerCase().includes(searchLower) ||
            product.tipo_animal && product.tipo_animal.toLowerCase().includes(searchLower) ||
            product.que_es && product.que_es.toLowerCase().includes(searchLower) ||
            product.especie_mascota && product.especie_mascota.toLowerCase().includes(searchLower) ||
            product.tipo_medicamento && product.tipo_medicamento.toLowerCase().includes(searchLower) ||
            product.especie_destinada && product.especie_destinada.toLowerCase().includes(searchLower)
        );
    }, [allProducts, searchTerm]);

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
                return <ViewProduct product={selectedProduct} onClose={handleCloseProductModal} />;
            default:
                return <ViewProduct product={selectedProduct} onClose={handleCloseProductModal} />;
        }
    };

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar en todos los productos..." />
            </div>
            
            {!searchTerm.trim() ? (
                // Mostrar categorías cuando no hay búsqueda
                <div className="categories-container-menu">
                    <p>Elíge la categoría de tu interés</p>
                    <MenuCategories />
                </div>
            ) : (
                // Mostrar resultados de búsqueda
                <div className="search-results-container">
                    <div className="search-results-header">
                        <h2>Resultados de búsqueda</h2>
                        <p>Se encontraron {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="container-card-products">
                        {loading ? (
                            <div className="loading">Buscando productos...</div>
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <CardProduct key={`${product.category}-${product.id}`} product={product} onViewProduct={handleViewProduct} />
                            ))
                        ) : (
                            <NoProductsFound searchTerm={searchTerm} />
                        )}
                    </div>
                </div>
            )}
            {showProductModal && renderProductModal()}
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}