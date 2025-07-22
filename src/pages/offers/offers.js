import './offers.css'
import CardProductOffer from '../../components/cardProductOffer/cardProductOffer';
import ViewProductOffer from '../../components/viewProductOffer/viewProductOffer';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Offers() {

    const [ofertas, setOfertas] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const fetchOfertas = async () => {
        const { data, error } = await supabase
            .from('ofertas')
            .select('*')
            .order('id', { ascending: false });
        if(error){
            console.error('Error al obtener las ofertas:', error.message)
        }else{
            setOfertas(data);
        }
    };

    useEffect(() => {
        fetchOfertas();
    }, [])

    const handleViewOffer = (offer) => {
        setSelectedOffer(offer);
    };

    const handleCloseModal = () => {
        setSelectedOffer(null);
    };

    return (
        <div className="offers-container">
            <div className="container-info">
                <h1 className='tittles-h1'>Ofertas</h1>
                <hr className="tittle-hr"></hr>
                <p className='text-offers'>¡Bienvenido al rincón de los descuentos! Aquí encontrarás promociones exclusivas, productos seleccionados con precios rebajados y ofertas por tiempo limitado pensadas especialmente para ti.</p>
                <p className='text-offers'>Explora nuestras promociones actuales y consigue lo que necesitas al mejor precio. ¡Comprar inteligente es comprar con descuento!</p>
            </div>
            <hr className='separador'></hr>
            <div className="content-container">
                 <div className="container-card-offers">
                    {ofertas.map((oferta) => (
                        <CardProductOffer key={oferta.id} offer={oferta} onView={() => handleViewOffer(oferta)}></CardProductOffer>
                    ))}
                </div>
            </div>
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>

            {selectedOffer && (
                <ViewProductOffer 
                    offer={selectedOffer} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
}