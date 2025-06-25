import ButtonLong from '../buttonLong/buttonLong';
import './cardProduct.css';

export default function CardProduct() {
    return(
        <div className="card-product">
            <div className="image-container">
                <img className="image-product" src="https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw" alt="Producto" />
            </div>
            <div className="info-container">
                <p className="name">Nombre del producto</p>
                <p className="lot">Peso/Gramos: 35gr </p>
                <p className="price">$25</p>
                <ButtonLong text={"Ver producto"}/>
            </div>
        </div>
    );
}