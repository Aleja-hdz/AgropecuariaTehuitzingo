import ButtonLong from '../buttonLong/buttonLong';
import './cardProduct.css';

export default function CardProduct({ product, onViewProduct }) {
    // Datos por defecto si no se pasan props
    const defaultProduct = {
        id: 1,
        name: "Nombre del producto",
        weight: "35gr",
        price: "$25",
        image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw"
    };
    
    const productData = product || defaultProduct;
    
    const handleViewProduct = () => {
        if (onViewProduct) {
            onViewProduct(product || defaultProduct);
        }
    };
    
    return(
        <div className="card-product animate-card-hover">
            <div className="image-container">
                <img className="image-product animate-image-hover" src={productData.image} alt={productData.name} />
            </div>
            <div className="info-container">
                <p className="name animate-text-fade-in">{productData.name}</p>
                <p style={{marginBlock: "-10px"}} className="lot animate-text-fade-in-delay">Peso/Gramos: {productData.weight}</p>
                {productData.price && <p className="price animate-text-fade-in-delay-2">{productData.price}</p>}
                <div className="animate-button-container">
                    <ButtonLong text={"Ver producto"} onClick={handleViewProduct}/>
                </div>
            </div>
        </div>
    );
}