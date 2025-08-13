import ButtonLong from '../buttonLong/buttonLong';
import './cardProduct.css';
import { useState, useEffect } from 'react';
import { formatProductWeight } from '../../utils/formatUtils';

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

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Función para determinar qué información mostrar
    const getDisplayInfo = () => {
        // Si es un accesorio de mascotas, mostrar "Para:" seguido del tipo de animal
        if (productData.sub_categoria === 'Accesorio' && productData.tipo_animal) {
            return {
                label: "Para:",
                value: productData.tipo_animal
            };
        }
        
        // Si es un implemento, mostrar "Para:" seguido del tipo de animal
        if (productData.tipo_animal && !productData.sub_categoria) {
            return {
                label: "Para:",
                value: productData.tipo_animal
            };
        }
        
        // Si es un medicamento veterinario, mostrar peso/gramos
        if (productData.category === 'Medicamentos Veterinarios') {
            return {
                label: "Peso/Gramos:",
                value: formatProductWeight(productData)
            };
        }
        
        // Para otros productos, mostrar peso/gramos
        return {
            label: "Peso/Gramos:",
            value: formatProductWeight(productData)
        };
    };

    const displayInfo = getDisplayInfo();

    // Estilos solo para dispositivos móviles
    const cardStyle = isMobile ? {
        height: "380px",
        width: "170px",
        minWidth: "170px",
        maxWidth: "170px",
        flex: "0 0 160px",
        margin: "3px", // Reducido de 5px a 3px para menos separación
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    } : {
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    };

    const imageContainerStyle = isMobile ? {
        height: "200px", // Aumentado de 180px a 200px para imagen más grande
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    } : {};

    const imageStyle = isMobile ? {
        height: "100%",
        width: "100%",
        objectFit: "cover", // Cambiado de "contain" a "cover" para llenar mejor el contenedor
        maxHeight: "none" // Removido el maxHeight para que la imagen use todo el espacio disponible
    } : {};

    const infoContainerStyle = isMobile ? {
        height: "100px", // Reducido de 110px a 90px para compensar la imagen más grande
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "3px"
    } : {};

    const nameStyle = isMobile ? {
        marginTop: "1px",
        fontSize: "14px",
        fontWeight: "400",
        textAlign: "center",
        lineHeight: "1.2"
    } : {
        marginTop: "5px",
        fontWeight: "400",
        marginBottom: "5px"
    };

    const weightStyle = isMobile ? {
        marginBlock: "5px",
        fontSize: "12px",
        textAlign: "center",
        color: "#666"
    } : {
        marginBlock: "5px"
    };

    const priceStyle = isMobile ? {
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "center",
        margin: "5px 0"
    } : {
        margin: "5px 0"
    };

    const buttonContainerStyle = isMobile ? {
        marginTop: "auto"
    } : {
        marginTop: "10px"
    };
    
    return(
        <div style={cardStyle} className="card-product animate-card-hover">
            <div style={imageContainerStyle} className="image-container">
                <img 
                    style={imageStyle}
                    className="image-product animate-image-hover" 
                    src={productData.image} 
                    alt={productData.name} 
                />
            </div>
            <div style={infoContainerStyle} className="info-container">
                <p style={nameStyle} className="name animate-text-fade-in">{productData.name}</p>
                <p style={weightStyle} className="lot animate-text-fade-in-delay">{displayInfo.label} {displayInfo.value}</p>
                {productData.price && <p style={priceStyle} className="price animate-text-fade-in-delay-2">{productData.price}</p>}
                <div style={buttonContainerStyle} className="animate-button-container">
                    <ButtonLong text={"Ver producto"} onClick={handleViewProduct}/>
                </div>
            </div>
        </div>
    );
}