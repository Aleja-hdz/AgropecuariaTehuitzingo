import { useState, useMemo, useEffect } from 'react';
import './medicamentosVeterinarios.css';
import Searcher from '../../../components/searcher/searcher';
import MenuMedicamentosVeterinarios from '../../../components/menuSubCategories/Medicamentos_Veterinarios/menuMedicamentosVeterinarios';
import CardProduct from '../../../components/cardProduct/cardProduct';
import NoProductsFound from '../../../components/noProductsFound/noProductsFound';
import ViewProduct from '../../../components/viewProduct/viewProduct';
import { supabase } from '../../../lib/supabaseClient';

export default function MedicamentosVeterinarios() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para filtros
    const [selectedOption, setSelectedOption] = useState('');

    // Obtener productos de Supabase
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('medicamentos_veterinarios')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error al obtener medicamentos veterinarios:', error);
            } else {
                // Formatear los datos para que coincidan con la estructura esperada
                const formattedProducts = data.map(item => ({
                    id: item.id,
                    name: item.nombre,
                    weight: item.presentacion || 'Sin especificar',
                    price: item.marca || 'Sin especificar',
                    image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                    // Datos adicionales para la vista detallada
                    tipo_medicamento: item.tipo,
                    especie_destinada: item.especie,
                    presentacion: item.presentacion,
                    marca: item.marca,
                    ingredientes_composicion: item.ingredientes_composicion,
                    informacion_adicional: item.informacion_adicional,
                    created_at: item.created_at
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
                product.weight && product.weight.toLowerCase().includes(searchLower) ||
                product.price && product.price.toLowerCase().includes(searchLower) ||
                product.tipo_medicamento && product.tipo_medicamento.toLowerCase().includes(searchLower) ||
                product.especie_destinada && product.especie_destinada.toLowerCase().includes(searchLower) ||
                product.marca && product.marca.toLowerCase().includes(searchLower)
            );
        }

        // Filtro por tipo de medicamento
        if (selectedOption) {
            filtered = filtered.filter(product => product.tipo_medicamento === selectedOption);
        }

        return filtered;
    }, [products, searchTerm, selectedOption]);

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
    const handleOptionFilter = (option) => {
        setSelectedOption(selectedOption === option ? '' : option);
    };

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar medicamentos veterinarios..." />
            </div>
            <div className="categories-container">
                <MenuMedicamentosVeterinarios 
                    selectedOption={selectedOption}
                    onOptionFilter={handleOptionFilter}
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
                <ViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
            )}
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}