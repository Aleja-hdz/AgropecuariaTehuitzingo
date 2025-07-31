// Configuración para EmailJS
// Para usar este servicio, necesitas:
// 1. Crear una cuenta en https://www.emailjs.com/
// 2. Configurar un servicio de email (Gmail, Outlook, etc.)
// 3. Crear una plantilla de email
// 4. Obtener las claves necesarias

export const EMAILJS_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID', // Reemplazar con tu Service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Reemplazar con tu Template ID
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY' // Reemplazar con tu Public Key
};

export const sendEmailToAdmins = async (adminEmails, userEmail, userName) => {
    try {
        // Importar EmailJS dinámicamente para evitar problemas de dependencia
        const emailjs = await import('@emailjs/browser');
        
        // Inicializar EmailJS
        emailjs.default.init(EMAILJS_CONFIG.PUBLIC_KEY);
        
        // Enviar email a cada administrador
        const emailPromises = adminEmails.map(adminEmail => {
            const templateParams = {
                to_email: adminEmail,
                to_name: 'Administrador',
                from_email: userEmail,
                from_name: userName || 'Usuario',
                subject: 'Solicitud de cambio de tipo de usuario',
                message: `Solicitud para cambiar el siguiente correo: ${userEmail} a administrador. Porfavor realizar el cambio en la base de datos.`
            };

            return emailjs.default.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );
        });

        // Esperar a que se envíen todos los emails
        await Promise.all(emailPromises);
        
        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        throw error;
    }
};

// Función alternativa usando fetch (si tienes un servidor backend)
export const sendEmailViaAPI = async (adminEmails, userEmail, userName) => {
    try {
        const emailData = {
            to: adminEmails,
            subject: 'Solicitud de cambio de tipo de usuario',
            body: `Solicitud para cambiar el siguiente correo: ${userEmail} a administrador. Porfavor realizar el cambio en la base de datos.`,
            from: userEmail,
            fromName: userName || 'Usuario'
        };

        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });

        if (!response.ok) {
            throw new Error('Error al enviar email');
        }

        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        throw error;
    }
}; 