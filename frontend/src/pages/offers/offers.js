import './offers.css'
import CardProductOffer from '../../components/cardProductOffer/cardProductOffer';
import ViewProductOffer from '../../components/viewProductOffer/viewProductOffer';
import { useState } from 'react';

const ofertas = [
  {
    nombre: 'Nutri Gallo',
    img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Gallo.png',
    lote: 'Peso/Gramos: 35gr',
    precioAnterior: 35,
    precio: 25,
    cantidad: 8,
    detalles: 'Alimento balanceado para gallo.',
    fechaInicio: '01/07/2024',
    fechaFin: '31/07/2024',
    esOferta: true
  },
  {
    nombre: 'Nutri Cerdo',
    img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Cerdo.png',
    lote: 'Peso/Gramos: 40gr',
    precioAnterior: 40,
    precio: 30,
    cantidad: 10,
    detalles: 'Alimento balanceado para cerdo.',
    fechaInicio: '01/07/2024',
    fechaFin: '31/07/2024',
    esOferta: true
  },
  {
    nombre: 'Nutri Conejo',
    img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Conejo.png',
    lote: 'Peso/Gramos: 25gr',
    precioAnterior: 28,
    precio: 20,
    cantidad: 12,
    detalles: 'Alimento balanceado para conejo.',
    fechaInicio: '01/07/2024',
    fechaFin: '31/07/2024',
    esOferta: true
  },
  {
    nombre: 'Nutri Bovino',
    img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Bovino.png',
    lote: 'Peso/Gramos: 50gr',
    precioAnterior: 50,
    precio: 38,
    cantidad: 7,
    detalles: 'Alimento balanceado para bovino.',
    fechaInicio: '01/07/2024',
    fechaFin: '31/07/2024',
    esOferta: true
  },
  {
    nombre: 'Nutri Gallo Premium',
    img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Gallo.png',
    lote: 'Peso/Gramos: 40gr',
    precioAnterior: 45,
    precio: 32,
    cantidad: 5,
    detalles: 'Alimento premium para gallo.',
    fechaInicio: '01/07/2024',
    fechaFin: '31/07/2024',
    esOferta: true
  },
  {
    nombre: 'Nutri Cerdo Plus',
    img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Cerdo.png',
    lote: 'Peso/Gramos: 45gr',
    precioAnterior: 42,
    precio: 33,
    cantidad: 9,
    detalles: 'Alimento plus para cerdo.',
    fechaInicio: '01/07/2024',
    fechaFin: '31/07/2024',
    esOferta: true
  },
  {
    nombre: 'Nutri Conejo Gold',
    img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Conejo.png',
    lote: 'Peso/Gramos: 30gr',
    precioAnterior: 30,
    precio: 22,
    cantidad: 11,
    detalles: 'Alimento gold para conejo.',
    fechaInicio: '01/07/2024',
    fechaFin: '31/07/2024',
    esOferta: true
  },
  {
    nombre: 'Nutri Bovino Max',
    img: 'https://nutrel.com.mx/wp-content/uploads/2022/09/Nutri-Bovino.png',
    lote: 'Peso/Gramos: 60gr',
    precioAnterior: 60,
    precio: 45,
    cantidad: 6,
    detalles: 'Alimento max para bovino.',
    fechaInicio: '01/07/2024',
    fechaFin: '31/07/2024',
    esOferta: true
  },
];

export default function Offers() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);

    const abrirModal = (oferta) => {
        setOfertaSeleccionada(oferta);
        setModalAbierto(true);
    };
    const cerrarModal = () => {
        setModalAbierto(false);
        setOfertaSeleccionada(null);
    };

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
                    {ofertas.map((oferta, idx) => (
                      <CardProductOffer key={idx} oferta={oferta} onVerDetalles={abrirModal} />
                    ))}
                </div>
            </div>
            {modalAbierto && ofertaSeleccionada && (
              <ViewProductOffer
                cerrarModal={cerrarModal}
                nombre={ofertaSeleccionada.nombre}
                img={ofertaSeleccionada.img}
                precio={ofertaSeleccionada.precio}
                cantidad={ofertaSeleccionada.cantidad}
                detalles={ofertaSeleccionada.detalles}
                fechaInicio={ofertaSeleccionada.fechaInicio}
                fechaFin={ofertaSeleccionada.fechaFin}
                precioAnterior={ofertaSeleccionada.precioAnterior}
                esOferta={ofertaSeleccionada.esOferta}
              />
            )}
        </div>
    );
;}