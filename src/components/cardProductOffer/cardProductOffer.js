import { useState } from 'react';
import ButtonLong from '../buttonLong/buttonLong';
import './cardProductOffer.css';

export default function CardProductOffer({ offer, onView }) {
    return(
        <>
            <div className="card-product animate-card-hover">
                <div className="offer-container animate-offer-badge">
                    <p className="text-offer animate-offer-text">Oferta</p>
                </div>
                <div className="image-container">
                    <img className="image-product animate-image-hover" src={offer.url} alt={offer.nombre} />
                </div>
                <div className="info-container animate-info-container">
                    <p className="name animate-text-fade-in">{offer.nombre}</p>
                    <p className="lot animate-text-fade-in-delay">Peso/Gramos: {offer.contenido_decimal}{offer.contenido_medida}</p>
                    <div className="price-container animate-price-container">
                        <p className="price-previous animate-price-previous">${offer.precio_anterior}</p>
                        <p className="price-offer animate-price-offer">${offer.precio_actual}</p>
                    </div>
                    <div className="animate-button-container">
                        <ButtonLong text={"Ver oferta"} onClick={onView}/>
                    </div>
                </div>
            </div>
        </>
    );
}