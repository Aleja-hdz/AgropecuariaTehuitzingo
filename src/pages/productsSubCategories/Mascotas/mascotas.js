import { useState, useMemo, useEffect } from 'react';
import './mascotas.css';
import Searcher from '../../../components/searcher/searcher';
import MenuMascotas from '../../../components/menuSubCategories/Mascotas/menuMascotas';
import CardProduct from '../../../components/cardProduct/cardProduct';
import NoProductsFound from '../../../components/noProductsFound/noProductsFound';
import MascAccViewProduct from '../../../components/viewProduct/mascAccViewProduct';
import MascAliViewProduct from '../../../components/viewProduct/mascAliViewProduct';
import ViewProduct from '../../../components/viewProduct/viewProduct';
import { supabase } from '../../../lib/supabaseClient';

export default function Mascotas() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para filtros
    const [selectedFoodType, setSelectedFoodType] = useState('');
    const [selectedAccessoryType, setSelectedAccessoryType] = useState('');
    const [selectedAnimalType, setSelectedAnimalType] = useState('');

    // Obtener productos de Supabase
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('mascotas')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error al obtener mascotas:', error);
            } else {
                // Obtener datos específicos para cada producto
                const productsWithDetails = await Promise.all(
                    data.map(async (item) => {
                        let weight = '';
                        let additionalData = {};
                        
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
                                };
                            }
                        }
                        
                        return {
                            id: item.id,
                            name: item.nombre,
                            image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                            sub_categoria: item.sub_categoria,
                            informacion_adicional: item.informacion_adicional,
                            weight: weight,
                            // Datos completos para los modales
                            url: item.url,
                            nombre: item.nombre,
                            created_at: item.created_at,
                            ...additionalData,
                        };
                    })
                );
                
                setProducts(productsWithDetails);
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
                (product.name && product.name.toLowerCase().includes(searchLower)) ||
                (product.weight && product.weight.toLowerCase().includes(searchLower)) ||
                (product.especie_mascota && product.especie_mascota.toLowerCase().includes(searchLower)) ||
                (product.tipo_animal && product.tipo_animal.toLowerCase().includes(searchLower)) ||
                (product.que_es && product.que_es.toLowerCase().includes(searchLower))
            );
        }

        // Filtro por tipo de alimento
        if (selectedFoodType) {
            filtered = filtered.filter(product => 
                product.sub_categoria === 'Alimento' && 
                product.especie_mascota === selectedFoodType
            );
        }

        // Filtro por tipo de accesorio
        if (selectedAccessoryType) {
            filtered = filtered.filter(product => 
                product.sub_categoria === 'Accesorio' && 
                product.que_es === selectedAccessoryType
            );
        }

        // Filtro por tipo de animal
        if (selectedAnimalType) {
            filtered = filtered.filter(product => 
                (product.sub_categoria === 'Alimento' && product.especie_mascota === selectedAnimalType) ||
                (product.sub_categoria === 'Accesorio' && product.tipo_animal === selectedAnimalType)
            );
        }

        return filtered;
    }, [products, searchTerm, selectedFoodType, selectedAccessoryType, selectedAnimalType]);

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
    const handleFoodTypeFilter = (foodType) => {
        setSelectedFoodType(selectedFoodType === foodType ? '' : foodType);
    };

    const handleAccessoryTypeFilter = (accessoryType) => {
        setSelectedAccessoryType(selectedAccessoryType === accessoryType ? '' : accessoryType);
    };

    const handleAnimalTypeFilter = (animalType) => {
        setSelectedAnimalType(selectedAnimalType === animalType ? '' : animalType);
    };

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar productos para mascotas..." />
            </div>
            <div className="categories-container">
                <MenuMascotas 
                    selectedFoodType={selectedFoodType}
                    selectedAccessoryType={selectedAccessoryType}
                    selectedAnimalType={selectedAnimalType}
                    onFoodTypeFilter={handleFoodTypeFilter}
                    onAccessoryTypeFilter={handleAccessoryTypeFilter}
                    onAnimalTypeFilter={handleAnimalTypeFilter}
                />
                <div className={`container-card-products ${filteredProducts.length === 0 ? 'no-products' : ''}`}>
                    {loading ? (
                        <div className="loading">Cargando productos...</div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <CardProduct key={product.id} product={product} onViewProduct={handleViewProduct} />
                        ))
                    ) : (
                        <NoProductsFound searchTerm={searchTerm} />
                    )}
                </div>
            </div>
            {showProductModal && selectedProduct && (
                selectedProduct.sub_categoria === 'Alimento' ? (
                    <MascAliViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
                ) : selectedProduct.sub_categoria === 'Accesorio' ? (
                    <MascAccViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
                ) : (
                    <ViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
                )
            )}
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}