import { useEffect, useState, useMemo } from 'react';
import './adminPanel.css'
import { supabase } from '../../lib/supabaseClient';
import CurrentInformation from "../../components/currentInformation/currentInformation";
import TableMain from "../../components/tableMain/tableMain";
import ButtonLong from '../../components/buttonLong/buttonLong';
import TableProducts from '../../components/tableProducts/tableProducts';
import TableOffers from '../../components/tableOffers/tableOffers';
import FormNewProduct from '../../components/formNewProduct/formNewProduct';
import FormNewOffer from '../../components/formNewOffer/formNewOffer';
import FormImplementos from '../../components/formNewProduct/forms/implementos/formImplementos';
import FormAlimentosBalanceados from '../../components/formNewProduct/forms/alimentosBalanceados/formAlimentosBalanceados';
import FormMascotas from '../../components/formNewProduct/forms/mascotas/formMascotas';
import FormEditMascotasAccesorios from '../../components/formNewProduct/forms/mascotas/formEditMascotasAccesorios';
import FormEditMascotasAlimentos from '../../components/formNewProduct/forms/mascotas/formEditMascotasAlimentos';

export default function AdminPanel() {
    const [showNewProductForm, setShowNewProductForm] = useState(false);
    const [showNewOfferForm, setShowNewOfferForm] = useState(false);
    const [editOffer, setEditOffer] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [editProductType, setEditProductType] = useState(null);

    const [ofertas, setOfertas] = useState([]);
    const [implementos, setImplementos] = useState([]);
    const [alimentos, setAlimentos] = useState([]);
    // const [medicamentos, setMedicamentos] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

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
        // const { data, error } = await supabase
        // .from('medicamentos_veterinarios')
        // .select('*')
        // .order('created_at', { ascending: false });
        // if(error){
        //     console.error('Error al obtener medicamentos:', error.message);
        //     } else {
        //     setMedicamentos(data.map(item => ({
        //         id: item.id,
        //         nombre: item.nombre || item.name || '',
        //         categoria: 'Medicamentos veterinarios',
        //         url: item.url || item.image || '',
        //         created_at: item.created_at,
        //     })));
        // }
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
            // ...medicamentos,
            ...mascotas
        ];
        
        // Ordenar por created_at descendente para que los más recientes aparezcan primero
        const sortedProducts = allProductsCombined.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
        );
        
        console.log('Productos ordenados por fecha de creación real (más recientes primero):', sortedProducts);
        setAllProducts(sortedProducts);
    }, [implementos, alimentos, /*medicamentos,*/ mascotas]);

    // Fetch inicial
    useEffect(() => {
        fetchImplementos();
        fetchAlimentos();
        // fetchMedicamentos();
        fetchMascotas();
    }, []);

    // Refrescar productos y ofertas tras alta
    const handleRefreshProducts = () => {
        fetchImplementos();
        fetchAlimentos();
        // fetchMedicamentos();
        fetchMascotas();
        fetchOfertas();
    };

    // Combinar productos y ofertas para "Últimas creaciones" ordenados por created_at
    const ultimasCreacionesData = useMemo(() => {
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

        // Combinar y ordenar por created_at descendente
        const todosCombinados = [...productosFormateados, ...ofertasFormateadas];
        const ordenados = todosCombinados.sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
        );

        // Retornar todos los elementos ordenados (el scroll se encargará de mostrar más de 10)
        return ordenados;
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
        console.log('Editando desde TableMain:', item);
        
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
                        console.log('Datos de mascota obtenidos:', mascotaData);
                        
                        if (mascotaData.sub_categoria === 'Accesorio') {
                            setEditProductType('mascotas-accesorios');
                            setEditProduct(mascotaData);
                        } else if (mascotaData.sub_categoria === 'Alimento') {
                            setEditProductType('mascotas-alimentos');
                            setEditProduct(mascotaData);
                        } else {
                            setEditProductType('mascotas-general');
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
        console.log('Eliminando desde TableMain:', item);
        
        const confirm = window.confirm(`¿Estás seguro de que quieres eliminar: ${item.nombre}?`);
        if (!confirm) return;

        if (item.categoria === 'Producto') {
            // Buscar el producto en allProducts por ID
            const producto = allProducts.find(p => p.id === item.id);
            if (producto) {
                if (producto.categoria === 'Implementos') {
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
                } else if (producto.categoria === 'Mascotas') {
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
                    <div className='admin-head'>
                        <div className='admin-box1-head'>
                            <h1 className='tittles-h1'>Panel de gestión</h1>
                            <hr className='admin-line'></hr>
                        </div>
                        <div className='admin-box2-head'>
                            <CurrentInformation products={totalProductos} offers={ofertas.length} />
                        </div>
                    </div>
                    <div className="admin-first-table">
                        <p>Últimas creaciones</p>
                        <TableMain 
                            data={ultimasCreacionesData} 
                            onEdit={handleEditFromMain}
                            onDelete={handleDeleteFromMain}
                        />
                    </div>
                    <div className='admin-others-tables'>
                        <div className='admin-table-products'>
                            <ButtonLong text={"Nuevo producto"} onClick={handleNewProduct}/>
                            <p>Productos registrados</p>
                            <TableProducts productos={allProducts} onRefresh={handleRefreshProducts} />
                        </div>
                        <div className='admin-table-offers'>
                            <ButtonLong text={"Nueva oferta"} onClick={handleNewOffer}/>
                            <p>Ofertas registradas</p>
                            <TableOffers ofertas={ofertas} onRefresh={handleRefreshProducts} />
                        </div>
                    </div>
                </div>

                {/* Modal para Nuevo Producto */}
                {showNewProductForm && (
                    <FormNewProduct onClose={handleCloseNewProduct} onSave={handleRefreshProducts} />
                )}

                {/* Modales para Editar Productos desde TableMain */}
                {editProduct && editProduct.categoria === 'Implementos' && (
                    <FormImplementos
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        implementsData={editProduct}
                        isEdit={true}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {editProduct && editProduct.categoria === 'Alimentos balanceados' && (
                    <FormAlimentosBalanceados
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        alimentosData={editProduct}
                        isEdit={true}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {editProduct && editProduct.categoria === 'Mascotas' && editProductType === 'mascotas-accesorios' && (
                    <FormEditMascotasAccesorios
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        mascotasData={editProduct}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {editProduct && editProduct.categoria === 'Mascotas' && editProductType === 'mascotas-alimentos' && (
                    <FormEditMascotasAlimentos
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        mascotasData={editProduct}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {editProduct && editProduct.categoria === 'Mascotas' && editProductType === 'mascotas-general' && (
                    <FormMascotas
                        onClose={() => { setEditProduct(null); setEditProductType(null); }}
                        mascotasData={editProduct}
                        isEdit={true}
                        onSave={() => { setEditProduct(null); setEditProductType(null); handleRefreshProducts(); }}
                    />
                )}

                {/* Modal para Nueva Oferta */}
                {showNewOfferForm && (
                    <FormNewOffer onClose={handleCloseNewOffer} onSave={handleRefreshProducts} />
                )}

                {/* Modal para Editar Oferta desde TableMain */}
                {editOffer && (
                    <FormNewOffer 
                        onClose={() => setEditOffer(null)} 
                        onSave={() => { setEditOffer(null); handleRefreshProducts(); }}
                        offerData={editOffer}
                        isEdit={true}
                    />
                )}
            </div>
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </>
    );
}