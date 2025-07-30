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

    // Obtener productos reales de la base de datos
    useEffect(() => {
        const fetchMedicamentos = async () => {
            const { data, error } = await supabase
                .from('medicamentos_veterinarios')
                .select('*')
                .order('id', { ascending: false });
            
            if (error) {
                console.error('Error al obtener medicamentos veterinarios:', error.message);
            } else {
                setProducts(
                    data.map(item => ({
                        id: item.id,
                        name: item.nombre,
                        weight: item.presentacion || 'Sin especificar',
                        price: item.marca || 'Sin especificar',
                        image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                    }))
                );
            }
            setLoading(false);
        };
        
        fetchMedicamentos();
    }, []);

    // Función para filtrar productos basada en el término de búsqueda
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return products;
        }
        
        const searchLower = searchTerm.toLowerCase();
        return products.filter(product => 
            product.name && product.name.toLowerCase().includes(searchLower) ||
            product.weight && product.weight.toLowerCase().includes(searchLower) ||
            product.price && product.price.toLowerCase().includes(searchLower)
        );
    }, [products, searchTerm]);

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

    if (loading) {
        return (
            <div className="products-container">
                <div className="categories-container-head">
                    <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                    <Searcher onSearch={handleSearch} placeholder="Buscar medicamentos veterinarios..." />
                </div>
                <div className="categories-container">
                    <MenuMedicamentosVeterinarios />
                    <div className="container-card-products">
                        <p>Cargando productos...</p>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar medicamentos veterinarios..." />
            </div>
            <div className="categories-container">
                <MenuMedicamentosVeterinarios />
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
                <ViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
            )}
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}