// Función para formatear medidas - convierte nombres completos a abreviaciones
export const formatMeasure = (medida) => {
    const medidas = {
        'Kilogramos': 'kg',
        'Gramos': 'gr',
        'Miligramos': 'mg',
        'Litros': 'L',
        'Mililitros': 'ml',
        'Unidades': 'unid',
        'Piezas': 'pzas',
        'kg': 'kg',
        'g': 'gr',
        'mg': 'mg',
        'L': 'L',
        'ml': 'ml',
        'unid': 'unid',
        'pzas': 'pzas'
    };
    return medidas[medida] || medida;
};

// Función para formatear el peso/medida del producto
export const formatProductWeight = (productData) => {
    if (!productData) return '';
    
    // Si viene como objeto con contenido_decimal y contenido_medida
    if (productData.contenido_decimal && productData.contenido_medida) {
        const formattedUnit = formatMeasure(productData.contenido_medida);
        return `${productData.contenido_decimal} ${formattedUnit}`;
    }
    
    // Si viene como string con peso ya formateado
    if (productData.weight) {
        if (typeof productData.weight === 'string' && productData.weight.includes(' ')) {
            const parts = productData.weight.split(' ');
            if (parts.length === 2) {
                const [value, unit] = parts;
                const formattedUnit = formatMeasure(unit);
                return `${value} ${formattedUnit}`;
            }
        }
        return productData.weight;
    }
    
    return '';
};

// Función para formatear el contenido de una oferta
export const formatOfferContent = (offer) => {
    if (offer.contenido_decimal && offer.contenido_medida) {
        const formattedUnit = formatMeasure(offer.contenido_medida);
        return `${offer.contenido_decimal} ${formattedUnit}`;
    }
    return '';
};
