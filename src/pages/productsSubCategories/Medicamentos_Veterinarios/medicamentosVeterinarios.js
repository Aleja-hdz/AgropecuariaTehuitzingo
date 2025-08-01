import { useState, useMemo, useEffect } from 'react';
import './medicamentosVeterinarios.css';
import Searcher from '../../../components/searcher/searcher';
import MenuMedicamentosVeterinarios from '../../../components/menuSubCategories/Medicamentos_Veterinarios/menuMedicamentosVeterinarios';
import CardProduct from '../../../components/cardProduct/cardProduct';
import NoProductsFound from '../../../components/noProductsFound/noProductsFound';
import MvViewProduct from '../../../components/viewProduct/mvViewProduct';
import { supabase } from '../../../lib/supabaseClient';

export default function MedicamentosVeterinarios() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para filtros
    const [selectedTipo, setSelectedTipo] = useState('');
    const [selectedEspecie, setSelectedEspecie] = useState('');
    const [selectedVia, setSelectedVia] = useState('');
    const [selectedPresentacion, setSelectedPresentacion] = useState('');

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
                    weight: `${item.edad} - ${item.via_administracion}`,
                    image: item.url || 'https://via.placeholder.com/200x200?text=Sin+Imagen',
                    // Datos adicionales para la vista detallada
                    tipo: item.tipo,
                    especie: item.especie,
                    edad: item.edad,
                    via_administracion: item.via_administracion,
                    presentacion: item.presentacion,
                    marca: item.marca,
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
                product.tipo && product.tipo.toLowerCase().includes(searchLower) ||
                product.especie && product.especie.toLowerCase().includes(searchLower) ||
                product.marca && product.marca.toLowerCase().includes(searchLower) ||
                product.via_administracion && product.via_administracion.toLowerCase().includes(searchLower) ||
                product.presentacion && product.presentacion.toLowerCase().includes(searchLower)
            );
        }

        // Filtro por tipo de medicamento
        if (selectedTipo) {
            filtered = filtered.filter(product => product.tipo === selectedTipo);
        }

        // Filtro por especie
        if (selectedEspecie) {
            filtered = filtered.filter(product => product.especie === selectedEspecie);
        }

        // Filtro por vía de administración
        if (selectedVia) {
            filtered = filtered.filter(product => product.via_administracion === selectedVia);
        }

        // Filtro por presentación
        if (selectedPresentacion) {
            filtered = filtered.filter(product => product.presentacion === selectedPresentacion);
        }

        return filtered;
    }, [products, searchTerm, selectedTipo, selectedEspecie, selectedVia, selectedPresentacion]);

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
    const handleTipoFilter = (tipo) => {
        setSelectedTipo(selectedTipo === tipo ? '' : tipo);
    };

    const handleEspecieFilter = (especie) => {
        setSelectedEspecie(selectedEspecie === especie ? '' : especie);
    };

    const handleViaFilter = (via) => {
        setSelectedVia(selectedVia === via ? '' : via);
    };

    const handlePresentacionFilter = (presentacion) => {
        setSelectedPresentacion(selectedPresentacion === presentacion ? '' : presentacion);
    };

    return(
        <div className="products-container">
            <div className="categories-container-head">
                <h1 className='tittles-h1'>¿Qué producto deseas encontrar?</h1>
                <Searcher onSearch={handleSearch} placeholder="Buscar medicamentos veterinarios..." />
            </div>
            <div className="categories-container">
                <MenuMedicamentosVeterinarios 
                    selectedTipo={selectedTipo}
                    selectedEspecie={selectedEspecie}
                    selectedVia={selectedVia}
                    selectedPresentacion={selectedPresentacion}
                    onTipoFilter={handleTipoFilter}
                    onEspecieFilter={handleEspecieFilter}
                    onViaFilter={handleViaFilter}
                    onPresentacionFilter={handlePresentacionFilter}
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
                <MvViewProduct product={selectedProduct} onClose={handleCloseProductModal} />
            )}
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}