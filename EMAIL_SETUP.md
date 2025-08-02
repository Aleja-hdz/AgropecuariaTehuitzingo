# Configuración de EmailJS para Envío de Emails

## Pasos para configurar el envío de emails reales:

### 1. Crear cuenta en EmailJS
- Ve a https://www.emailjs.com/
- Crea una cuenta gratuita
- Verifica tu email

### 2. Configurar un servicio de email
- En el dashboard de EmailJS, ve a "Email Services"
- Haz clic en "Add New Service"
- Selecciona tu proveedor de email (Gmail, Outlook, etc.)
- Sigue las instrucciones para conectar tu cuenta
- Guarda el **Service ID** que se genera

### 3. Crear una plantilla de email
- Ve a "Email Templates"
- Haz clic en "Create New Template"
- Usa esta plantilla:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Solicitud de contacto</title>
</head>
<body>
    <h2>Solicitud de contacto</h2>
    <p><strong>De:</strong> {{from_name}} ({{from_email}})</p>
    <p><strong>Para:</strong> {{to_name}} ({{to_email}})</p>
    <p><strong>Asunto:</strong> {{subject}}</p>
    <hr>
    <p>{{message}}</p>
    <hr>
    <p><em>Este es un mensaje automático del sistema Agropecuaria Tehuitzingo.</em></p>
</body>
</html>
```

- Guarda la plantilla y copia el **Template ID**

### 4. Obtener la clave pública
- Ve a "Account" > "API Keys"
- Copia tu **Public Key**

### 5. Actualizar la configuración
- Abre el archivo `src/lib/emailService.js`
- Reemplaza los valores con tus claves reales:

```javascript
export const EMAILJS_CONFIG = {
    SERVICE_ID: 'tu_service_id_aqui',
    TEMPLATE_ID: 'tu_template_id_aqui', 
    PUBLIC_KEY: 'tu_public_key_aqui'
};
```

### 6. Instalar EmailJS
```bash
npm install @emailjs/browser
```

### 7. Probar la funcionalidad
- Ve a la página de contacto
- Completa el formulario de contacto
- Verifica que los administradores reciban el email

## Notas importantes:
- La cuenta gratuita de EmailJS permite 200 emails por mes
- Para producción, considera actualizar a un plan pagado
- Asegúrate de que los emails de administradores estén correctos en la base de datos

## Alternativas:
Si prefieres no usar EmailJS, puedes:
1. Usar SendGrid (más profesional)
2. Crear tu propio servidor backend con nodemailer
3. Usar servicios como Mailgun o Postmark 