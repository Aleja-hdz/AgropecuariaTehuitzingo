import './offers.css'
import CardProductOffer from '../../components/cardProductOffer/cardProductOffer';

export default function Offers() {
    // Datos de ejemplo de ofertas
    const offers = [
        {
            id: 1,
            name: "Alimento Premium para Perros",
            weight: "2kg",
            pricePrevious: "$450",
            priceOffer: "$380",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
            startDate: "01/12/2024",
            endDate: "15/12/2024",
            stock: 12,
            description: "Alimento premium con proteínas de alta calidad, vitaminas y minerales esenciales para el desarrollo saludable de tu mascota."
        },
        {
            id: 2,
            name: "Vitaminas para Ganado",
            weight: "500gr",
            pricePrevious: "$280",
            priceOffer: "$220",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
            startDate: "05/12/2024",
            endDate: "20/12/2024",
            stock: 8,
            description: "Suplemento vitamínico completo para mejorar la salud y productividad del ganado bovino."
        },
        {
            id: 3,
            name: "Implementos de Ordeño",
            weight: "Kit completo",
            pricePrevious: "$1,200",
            priceOffer: "$950",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
            startDate: "10/12/2024",
            endDate: "25/12/2024",
            stock: 3,
            description: "Kit completo de implementos para ordeño manual, incluye baldes, filtros y accesorios de limpieza."
        },
        {
            id: 4,
            name: "Medicamento Veterinario",
            weight: "100ml",
            pricePrevious: "$180",
            priceOffer: "$140",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
            startDate: "15/12/2024",
            endDate: "30/12/2024",
            stock: 15,
            description: "Antiparasitario de amplio espectro para bovinos, ovinos y porcinos."
        },
        {
            id: 5,
            name: "Alimento para Aves",
            weight: "5kg",
            pricePrevious: "$320",
            priceOffer: "$260",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
            startDate: "20/12/2024",
            endDate: "05/01/2025",
            stock: 20,
            description: "Alimento balanceado para gallinas ponedoras con alto contenido de proteínas y calcio."
        },
        {
            id: 6,
            name: "Herramientas Agrícolas",
            weight: "Set completo",
            pricePrevious: "$850",
            priceOffer: "$680",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
            startDate: "25/12/2024",
            endDate: "10/01/2025",
            stock: 5,
            description: "Set completo de herramientas básicas para el trabajo agrícola: palas, rastrillos y azadones."
        },
        {
            id: 7,
            name: "Vacuna para Bovinos",
            weight: "10 dosis",
            pricePrevious: "$420",
            priceOffer: "$340",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
            startDate: "30/12/2024",
            endDate: "15/01/2025",
            stock: 7,
            description: "Vacuna triple viral para bovinos, previene enfermedades respiratorias y reproductivas."
        },
        {
            id: 8,
            name: "Alimento para Cerdos",
            weight: "3kg",
            pricePrevious: "$380",
            priceOffer: "$300",
            image: "https://imgs.search.brave.com/6EdTz-zoom8mWlKflZmTE9uQYrsDSDh_52Qk46F2vHQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg3ODk3MS1NTE04/MjE3MTE0Mzk0M18w/MTIwMjUtRS53ZWJw",
            startDate: "05/01/2025",
            endDate: "20/01/2025",
            stock: 10,
            description: "Alimento especializado para cerdos en crecimiento con alto contenido proteico y energético."
        }
    ];

    return (
        <div className="offers-container">
            <div className="container-info">
                <h1 className='tittles-h1'>Ofertas</h1>
                <hr className="tittle-hr"></hr>
                <p className='text-offers'>¡Bienvenido al rincón de los descuentos! Aquí encontrarás promociones exclusivas, productos seleccionados con precios rebajados y ofertas por tiempo limitado pensadas especialmente para ti.</p>
                <p className='text-offers'>Explora nuestras promociones actuales y consigue lo que necesitas al mejor precio. ¡Comprar inteligente es comprar con descuento!</p>
            </div>
            <hr className='separador'></hr>
            <div className="content-container">
                 <div className="container-card-offers">
                    {offers.map((offer) => (
                        <CardProductOffer key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>
        </div>
    );
}