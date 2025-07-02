import { useState } from 'react';
import ButtonLong from '../buttonLong/buttonLong';
import ViewProductOffer from '../viewProductOffer/viewProductOffer';
import './cardProductOffer.css';

export default function CardProductOffer({ offer }) {
    const [showModal, setShowModal] = useState(false);
    
    // Datos por defecto si no se pasan props
    const defaultOffer = {
        id: 1,
        name: "Nombre del producto",
        weight: "35gr",
        pricePrevious: "$35",
        priceOffer: "$25",
        image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
        startDate: "05/06/2025",
        endDate: "15/06/2025",
        stock: 5,
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
                <div className="offer-container">
                    <p className="text-offer">Oferta</p>
                </div>
                <div className="image-container">
                    <img className="image-product" src={offerData.image} alt={offerData.name} />
                </div>
                <div className="info-container">
                    <p className="name">{offerData.name}</p>
                    <p className="lot">Peso/Gramos: {offerData.weight}</p>
                    <div className="price-container">
                        <p className="price-previous">{offerData.pricePrevious}</p>
                        <p className="price-offer">{offerData.priceOffer}</p>
                    </div>
                    <ButtonLong text={"Ver oferta"} onClick={handleViewOffer}/>
                </div>
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