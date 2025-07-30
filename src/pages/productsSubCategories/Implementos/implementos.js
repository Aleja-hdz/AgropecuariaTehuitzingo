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
                    // Datos completos para el modal
                    url: item.url,
                    nombre: item.nombre,
                    que_es: item.que_es,
                    tipo_animal: item.tipo_animal,
                    recomendaciones_uso: item.recomendaciones_uso,
                    informacion_adicional: item.informacion_adicional,
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
                product.que_es?.toLowerCase().includes(searchLower)
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

        return filtered;
    }, [products, searchTerm, selectedAnimalType, selectedWhatIs]);

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

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar implementos..." />
            </div>
            <div className="categories-container">
                <MenuImplementos 
                    selectedAnimalType={selectedAnimalType}
                    selectedWhatIs={selectedWhatIs}
                    onAnimalTypeFilter={handleAnimalTypeFilter}
                    onWhatIsFilter={handleWhatIsFilter}
                />
                <div className="container-card-products">
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
            {showProductModal && (
                <ImpViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
            )}
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}