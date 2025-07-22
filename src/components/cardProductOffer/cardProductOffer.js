import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ButtonLong from '../buttonLong/buttonLong';
import ViewProductOffer from '../viewProductOffer/viewProductOffer';
import './cardProductOffer.css';

export default function CardProductOffer({ offer }) {
    const [showModal, setShowModal] = useState(false);
    const [ofertas, setOfertas] = useState([]);

    const fetchOfertas = async () => {
        const { data, error } = await supabase
        .from('ofertas')
        .select('*')
        .order('id', { ascending: false });

        if (error) {
        console.error('Error al obtener ofertas:', error.message);
        } else {
        setOfertas(data);
        }
    };

    useEffect(() => {
        fetchOfertas();
    }, []);
    
    // Datos por defecto si no se pasan props
    const defaultOffer = {
        id: 1,
        name: "Nombre del producto",
        textOffer: "¡Oferta Especial!",
        weight: "35gr",
        pricePrevious: "$35",
        priceOffer: "$25",
        image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
        startDate: "05/06/2025",
        endDate: "15/06/2025",
        description: "Lorem ipsum dolor sit amet consectetur, adipiscing elit sem sapien lacus et, sociis cubilia congue sollicitudin. Arcu risus sociosqu imperdiet aliquam per, etiam vel facilisis."
    };
    
    const offerData = offer || defaultOffer;
    
    const handleViewOffer = () => {
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    return(
        <>
            <div className="card-product">
                {ofertas.map((oferta) => (
                    <>
                        <div className="offer-container">
                            <p className="text-offer">Oferta</p>
                        </div>
                        <div className="image-container">
                            <img className="image-product" src={oferta.url} alt={oferta.nombre} />
                        </div>
                        <div className="info-container">
                            <p className="name">{oferta.nombre}</p>
                            <p className="lot">Peso/Gramos: {oferta.contenido_decimal}{oferta.contenido_medida}</p>
                            <div className="price-container">
                                <p className="price-previous">${oferta.precio_anterior}</p>
                                <p className="price-offer">${oferta.precio_actual}</p>
                            </div>
                            <ButtonLong text={"Ver oferta"} onClick={handleViewOffer}/>
                        </div>
                    </>
                ))}
            </div>
            
            {showModal && (
                <ViewProductOffer 
                    offer={offerData} 
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}