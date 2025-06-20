import './offers.css'
import CardProductOffer from '../../components/cardProductOffer/cardProductOffer';

export default function Offers() {
    return (
        <div className="offers-container">
            <div className="container-info">
                <h1>Ofertas</h1>
                <hr className="tittle-hr"></hr>
                <p className="text-head1">¡Bienvenido al rincón de los descuentos! Aquí encontrarás promociones exclusivas, productos seleccionados con precios rebajados y ofertas por tiempo limitado pensadas especialmente para ti.</p>
                <p className="text-head2">Explora nuestras promociones actuales y consigue lo que necesitas al mejor precio. ¡Comprar inteligente es comprar con descuento!</p>
            </div>
            <hr className="content-hr"></hr>
            <div className="content-container">
                 <div className="container-card-offers">
                    <CardProductOffer />
                    <CardProductOffer />
                    <CardProductOffer />
                    <CardProductOffer />
                    <CardProductOffer />
                    <CardProductOffer />
                    <CardProductOffer />
                    <CardProductOffer />
                </div>
            </div>
        </div>
    );
;}