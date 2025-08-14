import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import './adminPanel.css'
import { supabase } from '../../lib/supabaseClient';
import CurrentInformation from "../../components/currentInformation/currentInformation";
import TableMain from "../../components/tableMain/tableMain";
import ButtonLong from '../../components/buttonLong/buttonLong';
import TableProducts from "../../components/tableProducts/tableProducts";
import TableOffers from "../../components/tableOffers/tableOffers";
import FormNewProduct from '../../components/formNewProduct/formNewProduct';
import FormNewOffer from '../../components/formNewOffer/formNewOffer';
import FormImplementos from '../../components/formNewProduct/forms/implementos/formImplementos';
import FormAlimentosBalanceados from '../../components/formNewProduct/forms/alimentosBalanceados/formAlimentosBalanceados';
import FormMedicamentosVeterinarios from '../../components/formNewProduct/forms/medicamentosVeterinarios/formMedicamentosVeterinarios';
import FormMascotas from '../../components/formNewProduct/forms/mascotas/formMascotas';
import FormEditMascotasAccesorios from '../../components/formNewProduct/forms/mascotas/formEditMascotasAccesorios';
import FormEditMascotasAlimentos from '../../components/formNewProduct/forms/mascotas/formEditMascotasAlimentos';
import Searcher from '../../components/searcher/searcher';
import OptionsTable from '../../components/optionsTable/optionsTable';

export default function AdminPanel() {
    const [showNewProductForm, setShowNewProductForm] = useState(false);
    const [showNewOfferForm, setShowNewOfferForm] = useState(false);
    const [editOffer, setEditOffer] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [editProductType, setEditProductType] = useState(null);

    const [ofertas, setOfertas] = useState([]);
    const [implementos, setImplementos] = useState([]);
    const [alimentos, setAlimentos] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    // Estados para búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchContainerRef = useRef(null);

    // Estados para animaciones
    const [isVisible, setIsVisible] = useState({
        header: false,
        info: false,
        search: false,
        tables: false,
        buttons: false
    });

    // Animación de entrada inicial
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, header: true }));
        }, 100);

        const timer2 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, info: true }));
        }, 300);

        const timer3 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, search: true }));
        }, 400);

        const timer4 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, tables: true }));
        }, 600);

        const timer5 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, buttons: true }));
        }, 800);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, []);

    // Manejar clics fuera del contenedor de búsqueda
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Verificar si el clic fue en un botón de acción dentro de los resultados de búsqueda
            const isActionButton = event.target.closest('.search-actions') || 
                                  event.target.closest('.options-table') ||
                                  event.target.closest('button[name="edit"]') ||
                                  event.target.closest('button[name="delete"]') ||
                                  event.target.closest('svg') ||
                                  event.target.closest('path');
            
            // Verificar si el clic fue en el contenedor de búsqueda o en los resultados
            const isInSearchContainer = searchContainerRef.current && searchContainerRef.current.contains(event.target);
            const isInSearchResults = event.target.closest('.search-results-container');
            
            if (!isInSearchContainer && !isInSearchResults && !isActionButton) {
                setShowSearchResults(false);
            }
        };

        if (showSearchResults) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearchResults]);

    const fetchOfertas = async () => {
        const { data, error } = await supabase
        .from('ofertas')
        .select('*')
        .order('created_at', { ascending: false });

        if (error){
        console.error('Error al obtener ofertas:', error.message);
        }
        else {
        setOfertas(data);
        }
    };

    useEffect(() => {
        fetchOfertas();
    }, []);

    // Fetch para cada tabla
    const fetchImplementos = async () => {
        const { data, error } = await supabase
        .from('implementos')
        .select('*')
        .order('created_at', { ascending: false });
        if(error){
            console.error('Error al obtener implementos:', error.message);
        } else {
            setImplementos(data.map(item => ({
                id: item.id,
                nombre: item.nombre,
                categoria: 'Implementos',
                url: item.url || '',
                que_es: item.que_es || '',
                tipo_animal: item.tipo_animal || '',
                recomendaciones_uso: item.recomendaciones_uso || '',
                informacion_adicional: item.informacion_adicional || '',
                marca_distribuidor: item.marca_distribuidor || '',
                presentaciones_disponibles: item.presentaciones_disponibles || '',
                created_at: item.created_at,
            })));
        }
    };
    const fetchAlimentos = async () => {
        const { data, error } = await supabase
        .from('alimentos_balanceados')
        .select('*')
        .order('created_at', { ascending: false });
        if(error){
            console.error('Error al obtener alimentos:', error.message);
        } else {
            setAlimentos(data.map(item => ({
                id: item.id,
                nombre: item.nombre || item.name || '',
                categoria: 'Alimentos balanceados',
                url: item.url || item.image || '',
                alimento_produccion: item.alimento_produccion || false,
                contenido_decimal: item.contenido_decimal || '',
                contenido_medida: item.contenido_medida || '',
                especie: item.especie || '',
                marca: item.marca || '',
                materias_primas: item.materias_primas || '',
                informacion_adicional: item.informacion_adicional || '',
                created_at: item.created_at,
            })));
        }
    };
    const fetchMedicamentos = async () => {
        const { data, error } = await supabase
        .from('medicamentos_veterinarios')
        .select('*')
        .order('created_at', { ascending: false });
        if(error){
            console.error('Error al obtener medicamentos:', error.message);
        } else {
            setMedicamentos(data.map(item => ({
                id: item.id,
                nombre: item.nombre || item.name || '',
                categoria: 'Medicamentos Veterinarios',
                url: item.url || item.image || '',
                tipo: item.tipo || '',
                especie: item.especie || '',
                edad: item.edad || '',
                via_administracion: item.via_administracion || '',
                presentacion: item.presentacion || '',
                marca: item.marca || '',
                informacion_adicional: item.informacion_adicional || '',
                created_at: item.created_at,
            })));
        }
    };
    const fetchMascotas = async () => {
        const { data, error } = await supabase
        .from('mascotas')
        .select('*')
        .order('created_at', { ascending: false });
        if(error){
            console.error('Error al obtener mascotas:', error.message);
        } else {
            setMascotas(data.map(item => ({
                id: item.id,
                nombre: item.nombre || item.name || '',
                categoria: 'Mascotas',
                url: item.url || item.image || '',
                created_at: item.created_at,
            })));
        }
    };

    // Unificar productos y ordenar por created_at descendente (más recientes primero)
    useEffect(() => {
        const allProductsCombined = [
            ...implementos,
            ...alimentos,
            ...medicamentos,
            ...mascotas
        ];
        
        // Ordenar por created_at descendente para que los más recientes aparezcan primero
        const sortedProducts = allProductsCombined.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
        );
        
        setAllProducts(sortedProducts);
    }, [implementos, alimentos, medicamentos, mascotas]);

    // Fetch inicial
    useEffect(() => {
        fetchImplementos();
        fetchAlimentos();
        fetchMedicamentos();
        fetchMascotas();
    }, []);

    // Refrescar productos y ofertas tras alta
    const handleRefreshProducts = () => {
        fetchImplementos();
        fetchAlimentos();
        fetchMedicamentos();
        fetchMascotas();
        fetchOfertas();
    };

    // Función para manejar la búsqueda
    const handleSearch = (term) => {
        setSearchTerm(term);
        
        if (term.trim() === '') {
            setShowSearchResults(false);
            setSearchResults([]);
            return;
        }

        // Buscar en todos los productos y ofertas
        const searchLower = term.toLowerCase();
        
        // Buscar en productos
        const foundProducts = allProducts.filter(product => 
            product.nombre.toLowerCase().includes(searchLower)
        );

        // Buscar en ofertas
        const foundOffers = ofertas.filter(offer => 
            offer.nombre.toLowerCase().includes(searchLower)
        );

        // Combinar resultados
        const combinedResults = [
            ...foundProducts.map(product => ({
                ...product,
                tipo: 'Producto'
            })),
            ...foundOffers.map(offer => ({
                ...offer,
                tipo: 'Oferta'
            }))
        ];

        setSearchResults(combinedResults);
        setShowSearchResults(true);
    };

    // Funciones para manejar acciones desde los resultados de búsqueda
    const handleEditFromSearch = useCallback(async (item) => {
        
        if (item.tipo === 'Producto') {
            // Buscar el producto en allProducts por ID
            const producto = allProducts.find(p => p.id === item.id);
            if (producto) {
                if (producto.categoria === 'Implementos') {
                    setEditProductType('implementos');
                    setEditProduct(producto);
                } else if (producto.categoria === 'Alimentos balanceados') {
                    setEditProductType('alimentos-balanceados');
                    setEditProduct(producto);
                } else if (producto.categoria === 'Medicamentos Veterinarios') {
                    setEditProductType('medicamentos-veterinarios');
                    setEditProduct(producto);
                } else if (producto.categoria === 'Mascotas') {
                    // Obtener datos completos de mascotas para determinar subcategoría
                    const { data: mascotaData, error } = await supabase
                        .from('mascotas')
                        .select('*')
                        .eq('id', producto.id)
                        .single();
                    
                    if (error) {
                        console.error('Error al obtener datos de mascota:', error);
                        return;
                    }
                    
                    if (mascotaData) {
                        if (mascotaData.sub_categoria === 'Accesorio') {
                            setEditProductType('mascotas-accesorios');
                        } else if (mascotaData.sub_categoria === 'Alimento') {
                            setEditProductType('mascotas-alimentos');
                        } else {
                            // Si no hay sub_categoria definida, intentar determinar por otros campos
                            if (mascotaData.tipo === 'Accesorios' || mascotaData.categoria === 'Accesorios') {
                                setEditProductType('mascotas-accesorios');
                            } else {
                                setEditProductType('mascotas-alimentos');
                            }
                        }
                        setEditProduct(mascotaData);
                    }
                }
            }
        } else if (item.tipo === 'Oferta') {
            setEditOffer(item);
        }
        
        // Cerrar resultados de búsqueda
        setShowSearchResults(false);
    }, [allProducts]);

    const handleDeleteFromSearch = useCallback(async (item) => {
        const confirm = window.confirm(`¿Estás seguro de que quieres eliminar: ${item.nombre}?`);
        if (!confirm) return;
        
        if (item.tipo === 'Producto') {
            // Buscar el producto en allProducts por ID
            const producto = allProducts.find(p => p.id === item.id);
            if (producto) {
                if (producto.categoria === 'Implementos') {
                    // Eliminar imagen del bucket si existe
                    if (producto.url) {
                        try {
                            const parts = producto.url.split('/');
                            const fileName = parts[parts.length - 1].split('?')[0];
                            const { error: storageError } = await supabase
                                .storage
                                .from('implementos-img')
                                .remove([fileName]);
                            if (storageError) {
                                console.error('Error al eliminar la imagen del bucket:', storageError);
                            }
                        } catch (err) {
                            console.error('Error al procesar la eliminación de la imagen:', err);
                        }
                    }
                    
                    // Eliminar implemento
                    const { error } = await supabase
                        .from('implementos')
                        .delete()
                        .eq('id', producto.id);
                    if (error) {
                        console.error('Error al eliminar implemento:', error);
                        alert('Error al eliminar el producto');
                    } else {
                        alert('Producto eliminado con éxito');
                        handleRefreshProducts();
                    }
                } else if (producto.categoria === 'Alimentos balanceados') {
                    // Eliminar imagen del bucket si existe
                    if (producto.url) {
                        try {
                            const parts = producto.url.split('/');
                            const fileName = parts[parts.length - 1].split('?')[0];
                            const { error: storageError } = await supabase
                                .storage
                                .from('alimentos-balanceados-img')
                                .remove([fileName]);
                            if (storageError) {
                                console.error('Error al eliminar la imagen del bucket:', storageError);
                            }
                        } catch (err) {
                            console.error('Error al procesar la eliminación de la imagen:', err);
                        }
                    }
                    
                    // Eliminar alimento balanceado
                    const { error } = await supabase
                        .from('alimentos_balanceados')
                        .delete()
                        .eq('id', producto.id);
                    if (error) {
                        console.error('Error al eliminar alimento balanceado:', error);
                        alert('Error al eliminar el producto');
                    } else {
                        alert('Producto eliminado con éxito');
                        handleRefreshProducts();
                    }
                } else if (producto.categoria === 'Medicamentos Veterinarios') {
                    // Eliminar imagen del bucket si existe
                    if (producto.url) {
                        try {
                            const parts = producto.url.split('/');
                            const fileName = parts[parts.length - 1].split('?')[0];
                            const { error: storageError } = await supabase
                                .storage
                                .from('medicamentos-veterinarios-img')
                                .remove([fileName]);
                            if (storageError) {
                                console.error('Error al eliminar la imagen del bucket:', storageError);
                            }
                        } catch (err) {
                            console.error('Error al procesar la eliminación de la imagen:', err);
                        }
                    }
                    
                    // Eliminar medicamento veterinario
                    const { error } = await supabase
                        .from('medicamentos_veterinarios')
                        .delete()
                        .eq('id', producto.id);
                    if (error) {
                        console.error('Error al eliminar medicamento veterinario:', error);
                        alert('Error al eliminar el producto');
                    } else {
                        alert('Producto eliminado con éxito');
                        handleRefreshProducts();
                    }
                } else if (producto.categoria === 'Mascotas') {
                    // Para mascotas, necesitamos obtener la subcategoría para determinar el bucket correcto
                    const { data: mascotaData } = await supabase
                        .from('mascotas')
                        .select('sub_categoria')
                        .eq('id', producto.id)
                        .single();
                    
                    // Determinar el bucket según la subcategoría
                    let bucket = '';
                    if (mascotaData?.sub_categoria === 'Alimento') {
                        bucket = 'mascotas-alimentos-img';
                    } else if (mascotaData?.sub_categoria === 'Accesorio') {
                        bucket = 'mascotas-accesorios-img';
                    } else {
                        // Si no hay sub_categoria definida, intentar determinar por otros campos
                        if (mascotaData?.tipo === 'Accesorios' || mascotaData?.categoria === 'Accesorios') {
                            bucket = 'mascotas-accesorios-img';
                        } else {
                            bucket = 'mascotas-alimentos-img'; // Por defecto
                        }
                    }
                    
                    // Eliminar imagen del bucket si existe
                    if (producto.url && bucket) {
                        try {
                            const parts = producto.url.split('/');
                            const fileName = parts[parts.length - 1].split('?')[0];
                            const { error: storageError } = await supabase
                                .storage
                                .from(bucket)
                                .remove([fileName]);
                            if (storageError) {
                                console.error('Error al eliminar la imagen del bucket:', storageError);
                            }
                        } catch (err) {
                            console.error('Error al procesar la eliminación de la imagen:', err);
                        }
                    }
                    
                    // Eliminar mascota
                    const { error } = await supabase
                        .from('mascotas')
                        .delete()
                        .eq('id', producto.id);
                    if (error) {
                        console.error('Error al eliminar mascota:', error);
                        alert('Error al eliminar el producto');
                    } else {
                        alert('Producto eliminado con éxito');
                        handleRefreshProducts();
                    }
                }
            }
        } else if (item.tipo === 'Oferta') {
            // Eliminar imagen del bucket si existe
            if (item.url) {
                try {
                    const parts = item.url.split('/');
                    const fileName = parts[parts.length - 1].split('?')[0];
                    const { error: storageError } = await supabase
                        .storage
                        .from('ofertas-img')
                        .remove([fileName]);
                    if (storageError) {
                        console.error('Error al eliminar la imagen del bucket:', storageError);
                    }
                } catch (err) {
                    console.error('Error al procesar la eliminación de la imagen:', err);
                }
            }
            
            // Eliminar oferta
            const { error } = await supabase
                .from('ofertas')
                .delete()
                .eq('id', item.id);
            if (error) {
                console.error('Error al eliminar oferta:', error);
                alert('Error al eliminar la oferta');
            } else {
                alert('Oferta eliminada con éxito');
                handleRefreshProducts();
            }
        }
        
        // Actualizar resultados de búsqueda
        const updatedResults = searchResults.filter(result => result.id !== item.id);
        setSearchResults(updatedResults);
        
        // Si no quedan resultados, cerrar la búsqueda
        if (updatedResults.length === 0) {
            setShowSearchResults(false);
        }
    }, [searchResults, handleRefreshProducts]);

    // Combinar productos y ofertas para "Todos los productos" ordenados por created_at
    const todosLosProductosData = useMemo(() => {
        // Preparar productos con formato para la tabla
        const productosFormateados = allProducts.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            categoria: 'Producto',
            created_at: producto.created_at
        }));

        // Preparar ofertas con formato para la tabla
        const ofertasFormateadas = ofertas.map(oferta => ({
            id: oferta.id,
            nombre: oferta.nombre,
            categoria: 'Oferta',
            created_at: oferta.created_at
        }));

        // Combinar y ordenar por fecha de creación (más recientes primero)
        const combinedData = [...productosFormateados, ...ofertasFormateadas];
        const sortedProducts = combinedData.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
        });

        return sortedProducts; // Mostrar todos los productos
    }, [allProducts, ofertas]);

    // Calcular conteos reales
    const totalProductos = allProducts.length;

    //Funciones para la vista y cierre de los formularios
    const handleNewProduct = () => {
        setShowNewProductForm(true);
    };

    const handleNewOffer = () => {
        setShowNewOfferForm(true);
    };

    const handleCloseNewProduct = () => {
        setShowNewProductForm(false);
    };

    const handleCloseNewOffer = () => {
        setShowNewOfferForm(false);
    };

    // Funciones para manejar edición y eliminación desde TableMain
    const handleEditFromMain = async (item) => {
        
        if (item.categoria === 'Producto') {
            // Buscar el producto en allProducts por ID
            const producto = allProducts.find(p => p.id === item.id);
            if (producto) {
                if (producto.categoria === 'Implementos') {
                    setEditProductType('implementos');
                    setEditProduct(producto);
                } else if (producto.categoria === 'Alimentos balanceados') {
                    setEditProductType('alimentos-balanceados');
                    setEditProduct(producto);
                } else if (producto.categoria === 'Medicamentos Veterinarios') {
                    setEditProductType('medicamentos-veterinarios');
                    setEditProduct(producto);
                } else if (producto.categoria === 'Mascotas') {
                    // Obtener datos completos de mascotas para determinar subcategoría
                    const { data: mascotaData, error } = await supabase
                        .from('mascotas')
                        .select('*')
                        .eq('id', producto.id)
                        .single();
                    
                    if (error) {
                        console.error('Error al obtener datos de mascota:', error);
                        return;
                    }
                    
                    if (mascotaData) {
                        
                        if (mascotaData.sub_categoria === 'Accesorio') {
                            setEditProductType('mascotas-accesorios');
                            setEditProduct(mascotaData);
                        } else if (mascotaData.sub_categoria === 'Alimento') {
                            setEditProductType('mascotas-alimentos');
                            setEditProduct(mascotaData);
                        } else {
                            // Si no hay sub_categoria definida, intentar determinar por otros campos
                            if (mascotaData.tipo === 'Accesorios' || mascotaData.categoria === 'Accesorios') {
                                setEditProductType('mascotas-accesorios');
                            } else {
                                setEditProductType('mascotas-alimentos');
                            }
                            setEditProduct(mascotaData);
                        }
                    }
                }
            }
        } else if (item.categoria === 'Oferta') {
            // Buscar la oferta en ofertas por ID
            const oferta = ofertas.find(o => o.id === item.id);
            if (oferta) {
                setEditOffer(oferta);
            }
        }
    };

    const handleDeleteFromMain = async (item) => {
        
        const confirm = window.confirm(`¿Estás seguro de que quieres eliminar: ${item.nombre}?`);
        if (!confirm) return;

        if (item.categoria === 'Producto') {
            // Buscar el producto en allProducts por ID
            const producto = allProducts.find(p => p.id === item.id);
            if (producto) {
                if (producto.categoria === 'Implementos') {
                    // Eliminar imagen del bucket si existe
                    if (producto.url) {
                        try {
                            const parts = producto.url.split('/');
                            const fileName = parts[parts.length - 1].split('?')[0];
                            const { error: storageError } = await supabase
                                .storage
                                .from('implementos-img')
                                .remove([fileName]);
                            if (storageError) {
                                console.error('Error al eliminar la imagen del bucket:', storageError);
                            }
                        } catch (err) {
                            console.error('Error al procesar la eliminación de la imagen:', err);
                        }
                    }
                    
                    // Eliminar implemento
                    const { error } = await supabase
                        .from('implementos')
                        .delete()
                        .eq('id', producto.id);
                    if (error) {
                        console.error('Error al eliminar implemento:', error);
                        alert('Error al eliminar el producto');
                    } else {
                        alert('Producto eliminado con éxito');
                        handleRefreshProducts();
                    }
                } else if (producto.categoria === 'Alimentos balanceados') {
                    // Eliminar imagen del bucket si existe
                    if (producto.url) {
                        try {
                            const parts = producto.url.split('/');
                            const fileName = parts[parts.length - 1].split('?')[0];
                            const { error: storageError } = await supabase
                                .storage
                                .from('alimentos-balanceados-img')
                                .remove([fileName]);
                            if (storageError) {
                                console.error('Error al eliminar la imagen del bucket:', storageError);
                            }
                        } catch (err) {
                            console.error('Error al procesar la eliminación de la imagen:', err);
                        }
                    }
                    
                    // Eliminar alimento balanceado
                    const { error } = await supabase
                        .from('alimentos_balanceados')
                        .delete()
                        .eq('id', producto.id);
                    if (error) {
                        console.error('Error al eliminar alimento balanceado:', error);
                        alert('Error al eliminar el producto');
                    } else {
                        alert('Producto eliminado con éxito');
                        handleRefreshProducts();
                    }
                } else if (producto.categoria === 'Medicamentos Veterinarios') {
                    // Eliminar imagen del bucket si existe
                    if (producto.url) {
                        try {
                            const parts = producto.url.split('/');
                            const fileName = parts[parts.length - 1].split('?')[0];
                            const { error: storageError } = await supabase
                                .storage
                                .from('medicamentos-veterinarios-img')
                                .remove([fileName]);
                            if (storageError) {
                                console.error('Error al eliminar la imagen del bucket:', storageError);
                            }
                        } catch (err) {
                            console.error('Error al procesar la eliminación de la imagen:', err);
                        }
                    }
                    
                    // Eliminar medicamento veterinario
                    const { error } = await supabase
                        .from('medicamentos_veterinarios')
                        .delete()
                        .eq('id', producto.id);
                    if (error) {
                        console.error('Error al eliminar medicamento veterinario:', error);
                        alert('Error al eliminar el producto');
                    } else {
                        alert('Producto eliminado con éxito');
                        handleRefreshProducts();
                    }
                } else if (producto.categoria === 'Mascotas') {
                    // Para mascotas, necesitamos obtener la subcategoría para determinar el bucket correcto
                    const { data: mascotaData } = await supabase
                        .from('mascotas')
                        .select('sub_categoria')
                        .eq('id', producto.id)
                        .single();
                    
                    // Determinar el bucket según la subcategoría
                    let bucket = '';
                    if (mascotaData?.sub_categoria === 'Alimento') {
                        bucket = 'mascotas-alimentos-img';
                    } else if (mascotaData?.sub_categoria === 'Accesorio') {
                        bucket = 'mascotas-accesorios-img';
                    } else {
                        // Si no hay sub_categoria definida, intentar determinar por otros campos
                        if (mascotaData?.tipo === 'Accesorios' || mascotaData?.categoria === 'Accesorios') {
                            bucket = 'mascotas-accesorios-img';
                        } else {
                            bucket = 'mascotas-alimentos-img'; // Por defecto
                        }
                    }
                    
                    // Eliminar imagen del bucket si existe
                    if (producto.url && bucket) {
                        try {
                            const parts = producto.url.split('/');
                            const fileName = parts[parts.length - 1].split('?')[0];
                            const { error: storageError } = await supabase
                                .storage
                                .from(bucket)
                                .remove([fileName]);
                            if (storageError) {
                                console.error('Error al eliminar la imagen del bucket:', storageError);
                            }
                        } catch (err) {
                            console.error('Error al procesar la eliminación de la imagen:', err);
                        }
                    }
                    
                    // Eliminar mascota (esto eliminará también los registros relacionados)
                    const { error } = await supabase
                        .from('mascotas')
                        .delete()
                        .eq('id', producto.id);
                    if (error) {
                        console.error('Error al eliminar mascota:', error);
                        alert('Error al eliminar el producto');
                    } else {
                        alert('Producto eliminado con éxito');
                        handleRefreshProducts();
                    }
                }
            }
        } else if (item.categoria === 'Oferta') {
            // Buscar la oferta en ofertas por ID
            const oferta = ofertas.find(o => o.id === item.id);
            if (oferta) {
                // Eliminar imagen del bucket si existe
                if (oferta.url) {
                    try {
                        const parts = oferta.url.split('/');
                        const fileName = parts[parts.length - 1].split('?')[0];
                        const { error: storageError } = await supabase
                            .storage
                            .from('ofertas-img')
                            .remove([fileName]);
                        if (storageError) {
                            console.error('Error al eliminar la imagen del bucket:', storageError);
                        }
                    } catch (err) {
                        console.error('Error al procesar la eliminación de la imagen:', err);
                    }
                }
                
                // Eliminar oferta
                const { error } = await supabase
                    .from('ofertas')
                    .delete()
                    .eq('id', oferta.id);
                if (error) {
                    console.error('Error al eliminar oferta:', error);
                    alert('Error al eliminar la oferta');
                } else {
                    alert('Oferta eliminada con éxito');
                    handleRefreshProducts();
                }
            }
        }
    };

    return (
        <>
            <div className="admin-container">
                <div className='admin-content'>
                    <div className={`admin-head ${isVisible.header ? 'animate-fade-in' : ''}`}>
                        <div className='admin-box1-head animate-title'>
                            <h1 className='tittles-h1'>Panel de gestión</h1>
                            <hr className='admin-line animate-hr'></hr>
                        </div>
                        <div style={{marginTop: '5px', marginBottom: '-10px'}} className={`admin-box-head-search ${isVisible.search ? 'animate-search' : ''}`} ref={searchContainerRef}>
                            <p style={{fontSize: '14px', fontWeight: '300', color: '#000'}}>¿Buscas algo?</p>
                            <Searcher onSearch={handleSearch} placeholder="Buscar productos y ofertas..."></Searcher>
                        </div>
                        <div className={`admin-box2-head ${isVisible.info ? 'animate-fade-in-delay' : ''}`}>
                            <CurrentInformation products={totalProductos} offers={ofertas.length} />
                        </div>
                    </div>
                    
                    {showSearchResults && (
                        <div className="search-results-container">
                            {searchResults.length > 0 ? (
                                <>
                                    <div className="search-results-header">
                                        Resultados de búsqueda para "{searchTerm}" ({searchResults.length} encontrado{searchResults.length !== 1 ? 's' : ''})
                                    </div>
                                    <table className="search-results-table">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Categoría</th>
                                                <th>Tipo</th>
                                                <th>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {searchResults.map((item, index) => (
                                                <tr key={`${item.tipo}-${item.id}`}>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.categoria}</td>
                                                    <td>
                                                        <span className={`search-result-category ${item.tipo.toLowerCase()}`}>
                                                            {item.tipo}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="search-actions">
                                                            <OptionsTable 
                                                                onEdit={() => handleEditFromSearch(item)}
                                                                onDelete={() => handleDeleteFromSearch(item)}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <div className="search-no-results">
                                    No existen productos con ese nombre, pruebe con otro
                                </div>
                            )}
                        </div>
                    )}
                    <div className={`admin-first-table ${isVisible.tables ? 'animate-fade-in-delay-2' : ''}`} style={{display: 'flex', alignItems: 'flex-start', marginTop: '0px'}}>
                        <p className="animate-text">Todos los productos</p>
                        <TableMain 
                            data={todosLosProductosData} 
                            onEdit={handleEditFromMain}
                            onDelete={handleDeleteFromMain}
                        />
                    </div>
                    <div className={`admin-others-tables ${isVisible.buttons ? 'animate-fade-in-delay-3' : ''}`}>
                        <div className='admin-table-products animate-table-section'>
                            <div className="animate-button-container">
                                <ButtonLong text={"Nuevo producto"} onClick={handleNewProduct}/>
                            </div>
                            <p className="animate-text-delay">Productos registrados</p>
                            <TableProducts productos={allProducts} onRefresh={handleRefreshProducts} />
                        </div>
                        <div className='admin-table-offers animate-table-section'>
                            <div className="animate-button-container">
                                <ButtonLong text={"Nueva oferta"} onClick={handleNewOffer}/>
                            </div>
                            <p className="animate-text-delay">Ofertas registradas</p>
                            <TableOffers ofertas={ofertas} onRefresh={handleRefreshProducts} />
                        </div>
                    </div>
                </div>

                {/* Modal para Nuevo Producto */}
                {showNewProductForm && !editProduct && !editProductType && (
                    <FormNewProduct onClose={handleCloseNewProduct} onSave={handleRefreshProducts} />
                )}

                {/* Modales para Editar Productos */}
                {editProduct && (editProduct.categoria === 'Implementos' || editProductType === 'implementos') && (
                    <FormImplementos
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        implementsData={editProduct}
                        isEdit={true}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {editProduct && (editProduct.categoria === 'Alimentos balanceados' || editProductType === 'alimentos-balanceados') && (
                    <FormAlimentosBalanceados
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        alimentosData={editProduct}
                        isEdit={true}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {editProduct && (editProduct.categoria === 'Medicamentos Veterinarios' || editProductType === 'medicamentos-veterinarios') && (
                    <FormMedicamentosVeterinarios
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        medicamentosData={editProduct}
                        isEdit={true}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {editProduct && editProductType === 'mascotas-accesorios' && (
                    <FormEditMascotasAccesorios
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        mascotasData={editProduct}
                        isEdit={true}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {editProduct && editProductType === 'mascotas-alimentos' && (
                    <FormEditMascotasAlimentos
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        mascotasData={editProduct}
                        isEdit={true}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}



                {/* Modal para Nueva Oferta */}
                {showNewOfferForm && !editOffer && (
                    <FormNewOffer onClose={handleCloseNewOffer} onSave={handleRefreshProducts} />
                )}

                {/* Modal para Editar Oferta */}
                {editOffer && (
                    <FormNewOffer 
                        onClose={() => setEditOffer(null)} 
                        onSave={() => { setEditOffer(null); handleRefreshProducts(); }}
                        offerData={editOffer}
                        isEdit={true}
                    />
                )}
            </div>
            <footer className='footer animate-footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </>
    );
}