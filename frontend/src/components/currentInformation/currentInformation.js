//Este componente es el que muuestra cuantos productos y ofertas se tienen registradas, es de la pantalla de gestión de productos
import './currentInformation.css';

export default function CurrentInformation({ products, offers }) {
    return (
        <div className="container-current-information">
            <div>
                <p className="amount">20</p>
                <p className="concept">Productos</p>
            </div>
            <div>
                <p className="amount">8</p>
                <p className="concept">Ofertas</p>
            </div>
        </div>
    );
}