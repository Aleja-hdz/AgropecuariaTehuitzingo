import { useState } from 'react';
import ButtonLong from '../buttonLong/buttonLong';
import './cardProductOffer.css';

export default function CardProductOffer({ offer, onView }) {
    return(
        <>
            <div className="card-product">
                <div className="offer-container">
                    <p className="text-offer">Oferta</p>
                </div>
                <div className="image-container">
                    <img className="image-product" src={offer.url} alt={offer.nombre} />
                </div>
                <div className="info-container">
                    <p className="name">{offer.nombre}</p>
                    <p className="lot">Peso/Gramos: {offer.contenido_decimal}{offer.contenido_medida}</p>
                    <div className="price-container">
                        <p className="price-previous">${offer.precio_anterior}</p>
                        <p className="price-offer">${offer.precio_actual}</p>
                    </div>
                    <ButtonLong text={"Ver oferta"} onClick={onView}/>
                </div>
            </div>
        </>
    );
}