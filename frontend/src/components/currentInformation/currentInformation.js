//Este componente es el que muuestra cuantos productos y ofertas se tienen registradas, es de la pantalla de gestión de productos
import './currentInformation.css';

export default function CurrentInformation({ products = 0, offers = 0 }) {
    return (
        <div className="container-current-information">
            <div className="info-separated">
                <p className="amount">{products}</p>
                <p className="concept">Productos</p>
            </div>
            <div className="info-separated">
                <p className="amount">{offers}</p>
                <p className="concept">Ofertas</p>
            </div>
        </div>
    );
}