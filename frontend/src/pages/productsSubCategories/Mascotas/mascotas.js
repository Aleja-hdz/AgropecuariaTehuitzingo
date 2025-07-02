import { useState, useMemo } from 'react';
import './mascotas.css';
import Searcher from '../../../components/searcher/searcher';
import MenuMascotas from '../../../components/menuSubCategories/Mascotas/menuMascotas';
import CardProduct from '../../../components/cardProduct/cardProduct';
import NoProductsFound from '../../../components/noProductsFound/noProductsFound';
import ViewProduct from '../../../components/viewProduct/viewProduct';

export default function Mascotas() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    // Datos de ejemplo de productos (en un proyecto real esto vendría de una API)
    const products = [
        {
            id: 3,
            name: "Comedero Automático",
            weight: "500gr",
            price: "$120",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 16,
            name: "Juguete para Perros",
            weight: "200gr",
            price: "$25",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 17,
            name: "Cama para Gatos",
            weight: "1kg",
            price: "$45",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 18,
            name: "Correa Retráctil",
            weight: "300gr",
            price: "$35",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 19,
            name: "Arena Sanitaria",
            weight: "4kg",
            price: "$30",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 20,
            name: "Cepillo para Mascotas",
            weight: "150gr",
            price: "$18",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 21,
            name: "Transportadora para Gatos",
            weight: "2kg",
            price: "$85",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 22,
            name: "Plato de Agua Automático",
            weight: "800gr",
            price: "$55",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        }
    ];

    // Función para filtrar productos basada en el término de búsqueda
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return products;
        }
        
        const searchLower = searchTerm.toLowerCase();
        return products.filter(product => 
            product.name.toLowerCase().includes(searchLower) ||
            product.weight.toLowerCase().includes(searchLower) ||
            product.price.toLowerCase().includes(searchLower)
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
                <Searcher onSearch={handleSearch} placeholder="Buscar productos para mascotas..." />
            </div>
            <div className="categories-container">
                <MenuMascotas />
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
        </div>
    );
}