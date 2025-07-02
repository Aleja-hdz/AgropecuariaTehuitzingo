import { useState, useMemo } from 'react';
import './medicamentosVeterinarios.css';
import Searcher from '../../../components/searcher/searcher';
import MenuMedicamentosVeterinarios from '../../../components/menuSubCategories/Medicamentos_Veterinarios/menuMedicamentosVeterinarios';
import CardProduct from '../../../components/cardProduct/cardProduct';
import NoProductsFound from '../../../components/noProductsFound/noProductsFound';
import ViewProduct from '../../../components/viewProduct/viewProduct';

export default function MedicamentosVeterinarios() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    // Datos de ejemplo de productos (en un proyecto real esto vendría de una API)
    const products = [
        {
            id: 2,
            name: "Vacuna Triple Felina",
            weight: "1ml",
            price: "$45",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 9,
            name: "Antiparasitario para Perros",
            weight: "10ml",
            price: "$60",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 10,
            name: "Vitamina C para Mascotas",
            weight: "100ml",
            price: "$35",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 11,
            name: "Antibiótico para Gatos",
            weight: "50ml",
            price: "$80",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 12,
            name: "Vacuna contra la Rabia",
            weight: "1ml",
            price: "$55",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 13,
            name: "Antiinflamatorio para Perros",
            weight: "30ml",
            price: "$70",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 14,
            name: "Suplemento de Calcio",
            weight: "200gr",
            price: "$40",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 15,
            name: "Desparasitante para Gatos",
            weight: "5ml",
            price: "$50",
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
        </div>
    );
}