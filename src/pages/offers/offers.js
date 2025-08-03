import './offers.css'
import CardProductOffer from '../../components/cardProductOffer/cardProductOffer';
import ViewProductOffer from '../../components/viewProductOffer/viewProductOffer';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Offers() {

    const [ofertas, setOfertas] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [isVisible, setIsVisible] = useState({
        header: false,
        offers: false
    });

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

    // Animación de entrada inicial
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, header: true }));
        }, 100);

        const timer2 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, offers: true }));
        }, 300);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    const handleViewOffer = (offer) => {
        setSelectedOffer(offer);
    };

    const handleCloseModal = () => {
        setSelectedOffer(null);
    };

    return (
        <div className="offers-container">
            <div className={`container-info ${isVisible.header ? 'animate-fade-in' : ''}`}>
                <h1 className='tittles-h1 animate-title'>Ofertas</h1>
                <hr className="tittle-hr animate-hr"></hr>
                <p className='text-offers animate-text-delay'>¡Bienvenido al rincón de los descuentos! Aquí encontrarás promociones exclusivas, productos seleccionados con precios rebajados y ofertas por tiempo limitado pensadas especialmente para ti.</p>
                <p className='text-offers animate-text-delay-2'>Explora nuestras promociones actuales y consigue lo que necesitas al mejor precio. ¡Comprar inteligente es comprar con descuento!</p>
            </div>
            <hr className='separador animate-separator'></hr>
            <div className={`content-container ${isVisible.offers ? 'animate-fade-in-delay' : ''}`}>
                 <div className="container-card-offers">
                    {ofertas.map((oferta, index) => (
                        <div 
                            key={oferta.id} 
                            className="animate-card-offer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <CardProductOffer offer={oferta} onView={() => handleViewOffer(oferta)}></CardProductOffer>
                        </div>
                    ))}
                </div>
            </div>
            <footer className='footer animate-footer'>
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