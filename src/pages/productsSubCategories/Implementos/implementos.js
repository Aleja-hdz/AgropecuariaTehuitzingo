import { useState, useMemo, useEffect } from 'react';
import './implementos.css';
import Searcher from '../../../components/searcher/searcher';
import MenuImplementos from '../../../components/menuSubCategories/Implementos/menuImplementos';
import CardProduct from '../../../components/cardProduct/cardProduct';
import NoProductsFound from '../../../components/noProductsFound/noProductsFound';
import ViewProduct from '../../../components/viewProduct/viewProduct';
import { supabase } from '../../../lib/supabaseClient';

export default function Implementos() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

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
                    }))
                );
            }
        };
        fetchImplementos();
    }, []);

    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return products;
        }
        const searchLower = searchTerm.toLowerCase();
        return products.filter(product => 
            product.name && product.name.toLowerCase().includes(searchLower)
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

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar implementos de peluquería..." />
            </div>
            <div className="categories-container">
                <MenuImplementos />
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