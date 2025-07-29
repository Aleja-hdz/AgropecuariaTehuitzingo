import { useEffect, useState } from 'react';
import './adminPanel.css'
import { supabase } from '../../lib/supabaseClient';
import CurrentInformation from "../../components/currentInformation/currentInformation";
import TableMain from "../../components/tableMain/tableMain";
import ButtonLong from '../../components/buttonLong/buttonLong';
import TableProducts from '../../components/tableProducts/tableProducts';
import TableOffers from '../../components/tableOffers/tableOffers';
import FormNewProduct from '../../components/formNewProduct/formNewProduct';
import FormNewOffer from '../../components/formNewOffer/formNewOffer';

export default function AdminPanel() {
    const [showNewProductForm, setShowNewProductForm] = useState(false);
    const [showNewOfferForm, setShowNewOfferForm] = useState(false);

    const [ofertas, setOfertas] = useState([]);
    const [implementos, setImplementos] = useState([]);
    // const [alimentos, setAlimentos] = useState([]);
    // const [medicamentos, setMedicamentos] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const fetchOfertas = async () => {
        const { data, error } = await supabase
        .from('ofertas')
        .select('*')
        .order('id', { ascending: false });

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
        .order('id', { ascending: false });
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
            })));
        }
    };
    const fetchAlimentos = async () => {
        // const { data, error } = await supabase
        // .from('alimentos_balanceados')
        // .select('*')
        // .order('id', { ascending: false });
        // if(error){
        //     console.error('Error al obtener alimentos:', error.message);
        // } else {
        //     setAlimentos(data.map(item => ({
        //         id: item.id,
        //         nombre: item.nombre || item.name || '',
        //         categoria: 'Alimentos balanceados',
        //         url: item.url || item.image || '',
        //     })));
        // }
    };
    const fetchMedicamentos = async () => {
        // const { data, error } = await supabase
        // .from('medicamentos_veterinarios')
        // .select('*')
        // .order('id', { ascending: false });
        // if(error){
        //     console.error('Error al obtener medicamentos:', error.message);
        // } else {
        //     setMedicamentos(data.map(item => ({
        //         id: item.id,
        //         nombre: item.nombre || item.name || '',
        //         categoria: 'Medicamentos veterinarios',
        //         url: item.url || item.image || '',
        //     })));
        // }
    };
    const fetchMascotas = async () => {
        const { data, error } = await supabase
        .from('mascotas')
        .select('*')
        .order('id', { ascending: false });
        if(error){
            console.error('Error al obtener mascotas:', error.message);
        } else {
            setMascotas(data.map(item => ({
                id: item.id,
                nombre: item.nombre || item.name || '',
                categoria: 'Mascotas',
                url: item.url || item.image || '',
            })));
        }
    };

    // Unificar productos
    useEffect(() => {
        setAllProducts([
            ...implementos,
            // ...alimentos,
            // ...medicamentos,
            ...mascotas
        ]);
    }, [implementos, /*alimentos, medicamentos,*/ mascotas]);

    // Fetch inicial
    useEffect(() => {
        fetchImplementos();
        // fetchAlimentos();
        // fetchMedicamentos();
        fetchMascotas();
    }, []);

    // Refrescar productos tras alta
    const handleRefreshProducts = () => {
        fetchImplementos();
        // fetchAlimentos();
        // fetchMedicamentos();
        fetchMascotas();
    };

    // Datos de ejemplo para ofertas
    const ofertasData = [
        "Descuento en alimento balanceado",
        "Oferta especial en vacunas",
    ];

    // Datos combinados para la tabla principal (últimas creaciones)
    const ultimasCreacionesData = [
        { nombre: "Alimento balanceado para perros", categoria: "Oferta" },
        { nombre: "Descuento en alimento balanceado", categoria: "Oferta" },
        { nombre: "Vacuna contra la rabia", categoria: "Producto" },
        { nombre: "Oferta especial en vacunas", categoria: "Oferta" },
    ];

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
                        <TableMain data={ultimasCreacionesData} />
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
                            <TableOffers ofertas={ofertasData} />
                        </div>
                    </div>
                </div>

                {/* Modal para Nuevo Producto */}
                {showNewProductForm && (
                    <FormNewProduct onClose={handleCloseNewProduct} onSave={handleRefreshProducts} />
                )}

                {/* Modal para Nueva Oferta */}
                {showNewOfferForm && (
                    <FormNewOffer onClose={handleCloseNewOffer} />
                )}
            </div>
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </>
    );
}