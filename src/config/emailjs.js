// Configuración de EmailJS
// Reemplaza estos valores con tus credenciales reales de EmailJS

export const EMAILJS_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID', // Tu Service ID de EmailJS
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Tu Template ID de EmailJS
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY' // Tu Public Key de EmailJS
};

// Ejemplo de template de email que puedes usar en EmailJS:
/*
Template HTML para EmailJS:

Hola {{to_name}},

Has recibido un nuevo mensaje de contacto:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
Mensaje: {{message}}

Este mensaje fue enviado desde el formulario de contacto de tu sitio web.

Saludos,
Tu sitio web
*/ 