import { useState } from 'react';
import './adminPanel.css'
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

    // Datos de ejemplo para productos
    const productosData = [
        "Alimento balanceado para perros",
        "Vacuna contra la rabia",
        "Collar antipulgas",
        "Comida para gatos premium",
        "Suplemento vitamínico equino",
        "Herramienta de poda",
        "Fertilizante orgánico",
        "Semillas de maíz híbrido",
        "Medicamento antiparasitario",
        "Equipo de riego por goteo",
        "Alimento para aves de corral",
        "Desinfectante veterinario"
    ];

    // Datos de ejemplo para ofertas
    const ofertasData = [
        "Descuento en alimento balanceado",
        "Oferta especial en vacunas",
        "Promoción en productos de limpieza",
        "Rebaja en herramientas agrícolas",
        "Oferta de temporada en semillas",
        "Descuento en medicamentos",
        "Promoción en equipos de riego",
        "Oferta especial en suplementos"
    ];

    // Datos combinados para la tabla principal (últimas creaciones)
    const ultimasCreacionesData = [
        { nombre: "Alimento balanceado para perros", categoria: "Producto" },
        { nombre: "Descuento en alimento balanceado", categoria: "Oferta" },
        { nombre: "Vacuna contra la rabia", categoria: "Producto" },
        { nombre: "Oferta especial en vacunas", categoria: "Oferta" },
        { nombre: "Collar antipulgas", categoria: "Producto" },
        { nombre: "Promoción en productos de limpieza", categoria: "Oferta" },
        { nombre: "Comida para gatos premium", categoria: "Producto" },
        { nombre: "Rebaja en herramientas agrícolas", categoria: "Oferta" }
    ];

    // Calcular conteos reales
    const totalProductos = productosData.length;
    const totalOfertas = ofertasData.length;

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
                            <CurrentInformation products={totalProductos} offers={totalOfertas} />
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
                            <TableProducts productos={productosData} />
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
                    <FormNewProduct onClose={handleCloseNewProduct} />
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