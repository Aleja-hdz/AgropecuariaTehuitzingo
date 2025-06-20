import ButtonLong from '../buttonLong/buttonLong';
import './cardProductOffer.css';

export default function CardProductOffer({ oferta, onVerDetalles }) {
    return(
        <div className="card-product">
            <div className="offer-container">
                <p className="text-offer">Oferta</p>
            </div>
            <div className="image-container">
                <img className="image-product" src={oferta.img} alt={oferta.nombre} />
            </div>
            <div className="info-container">
                <p className="name">{oferta.nombre}</p>
                <p className="lot">{oferta.lote}</p>
                <div className="price-container">
                    <p className="price-previous">${oferta.precioAnterior}</p>
                    <p className="price-offer">${oferta.precio}</p>
                </div>
                <ButtonLong onClick={() => onVerDetalles(oferta)} />
            </div>
        </div>
    );
}