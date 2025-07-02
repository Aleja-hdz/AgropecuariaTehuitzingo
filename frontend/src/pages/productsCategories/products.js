import { useState, useMemo } from 'react';
import './products.css';
import Searcher from '../../components/searcher/searcher';
import MenuCategories from '../../components/menuCategories/menuCategories';
import CardProduct from '../../components/cardProduct/cardProduct';
import NoProductsFound from '../../components/noProductsFound/noProductsFound';
import ViewProduct from '../../components/viewProduct/viewProduct';

export default function Products(){
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const allProducts = [
        // Alimentos Balanceados (IDs 1-8)
        {
            id: 1,
            name: "Alimento Premium para Perros",
            weight: "2kg",
            price: "$25",
            category: "Alimentos Balanceados",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 2,
            name: "Alimento para Gatos Adultos",
            weight: "1.5kg",
            price: "$30",
            category: "Alimentos Balanceados",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 3,
            name: "Alimento para Aves",
            weight: "500gr",
            price: "$15",
            category: "Alimentos Balanceados",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 4,
            name: "Alimento para Conejos",
            weight: "1kg",
            price: "$20",
            category: "Alimentos Balanceados",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 5,
            name: "Alimento para Hamsters",
            weight: "250gr",
            price: "$12",
            category: "Alimentos Balanceados",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 6,
            name: "Alimento para Peces",
            weight: "100gr",
            price: "$8",
            category: "Alimentos Balanceados",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 7,
            name: "Alimento para Tortugas",
            weight: "300gr",
            price: "$18",
            category: "Alimentos Balanceados",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 8,
            name: "Alimento para Perros Cachorros",
            weight: "3kg",
            price: "$35",
            category: "Alimentos Balanceados",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        
        // Medicamentos Veterinarios (IDs 9-15)
        {
            id: 9,
            name: "Vacuna Triple Felina",
            weight: "1ml",
            price: "$45",
            category: "Medicamentos Veterinarios",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 10,
            name: "Antiparasitario para Perros",
            weight: "10ml",
            price: "$60",
            category: "Medicamentos Veterinarios",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 11,
            name: "Vitamina C para Mascotas",
            weight: "100ml",
            price: "$35",
            category: "Medicamentos Veterinarios",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 12,
            name: "Antibiótico para Gatos",
            weight: "50ml",
            price: "$80",
            category: "Medicamentos Veterinarios",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 13,
            name: "Vacuna contra la Rabia",
            weight: "1ml",
            price: "$55",
            category: "Medicamentos Veterinarios",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 14,
            name: "Antiinflamatorio para Perros",
            weight: "30ml",
            price: "$70",
            category: "Medicamentos Veterinarios",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 15,
            name: "Suplemento de Calcio",
            weight: "200gr",
            price: "$40",
            category: "Medicamentos Veterinarios",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        
        // Mascotas (IDs 16-22)
        {
            id: 16,
            name: "Comedero Automático",
            weight: "500gr",
            price: "$120",
            category: "Mascotas",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 17,
            name: "Juguete para Perros",
            weight: "200gr",
            price: "$25",
            category: "Mascotas",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 18,
            name: "Cama para Gatos",
            weight: "1kg",
            price: "$45",
            category: "Mascotas",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 19,
            name: "Correa Retráctil",
            weight: "300gr",
            price: "$35",
            category: "Mascotas",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 20,
            name: "Arena Sanitaria",
            weight: "4kg",
            price: "$30",
            category: "Mascotas",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 21,
            name: "Cepillo para Mascotas",
            weight: "150gr",
            price: "$18",
            category: "Mascotas",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 22,
            name: "Transportadora para Gatos",
            weight: "2kg",
            price: "$85",
            category: "Mascotas",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        
        // Implementos (IDs 23-30)
        {
            id: 23,
            name: "Tijeras de Peluquería",
            weight: "250gr",
            price: "$65",
            category: "Implementos",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 24,
            name: "Cortauñas para Mascotas",
            weight: "100gr",
            price: "$28",
            category: "Implementos",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 25,
            name: "Secador de Pelo Profesional",
            weight: "1.2kg",
            price: "$150",
            category: "Implementos",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 26,
            name: "Mesa de Peluquería",
            weight: "15kg",
            price: "$280",
            category: "Implementos",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 27,
            name: "Shampoo Profesional",
            weight: "500ml",
            price: "$42",
            category: "Implementos",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 28,
            name: "Cepillo Profesional",
            weight: "300gr",
            price: "$38",
            category: "Implementos",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 29,
            name: "Peine de Púas Finas",
            weight: "80gr",
            price: "$22",
            category: "Implementos",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        },
        {
            id: 30,
            name: "Kit de Peluquería Completo",
            weight: "2kg",
            price: "$180",
            category: "Implementos",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
        }
    ];

    // Función para filtrar productos conforme a lo quie se escriba en search
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) {
            return allProducts;
        }
        
        const searchLower = searchTerm.toLowerCase();
        return allProducts.filter(product => 
            product.name.toLowerCase().includes(searchLower) ||
            product.weight.toLowerCase().includes(searchLower) ||
            product.price.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower)
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
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <CardProduct key={product.id} product={product} onViewProduct={handleViewProduct} />
                            ))
                        ) : (
                            <NoProductsFound searchTerm={searchTerm} />
                        )}
                    </div>
                </div>
            )}
            {showProductModal && (
                <ViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
            )}
        </div>
    );
}