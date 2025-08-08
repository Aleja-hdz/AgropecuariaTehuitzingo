# Configuración de EmailJS para el Formulario de Contacto

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
- Ve a [EmailJS.com](https://www.emailjs.com/)
- Regístrate para obtener una cuenta gratuita

### 2. Configurar Email Service
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. Copia el **Service ID** generado

### 3. Crear Email Template
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este template HTML:

```html
Hola {{to_name}},

Has recibido un nuevo mensaje de contacto desde tu sitio web:

**Nombre:** {{from_name}}
**Email:** {{from_email}}
**Teléfono:** {{phone}}
**Mensaje:** {{message}}

Este mensaje fue enviado desde el formulario de contacto de Agropecuaria Tehuitzingo.

Saludos,
Tu sitio web
```

4. Guarda el template y copia el **Template ID**

### 4. Obtener Public Key
1. Ve a "Account" → "API Keys"
2. Copia tu **Public Key**

### 5. Configurar en el proyecto
1. Abre el archivo `src/config/emailjs.js`
2. Reemplaza los valores con tus credenciales:

```javascript
export const EMAILJS_CONFIG = {
    SERVICE_ID: 'tu_service_id_aqui',
    TEMPLATE_ID: 'tu_template_id_aqui', 
    PUBLIC_KEY: 'tu_public_key_aqui'
};
```

### 6. Probar el formulario
- Llena el formulario de contacto en tu sitio
- Verifica que recibas el email
- Revisa la consola del navegador para errores

## Características implementadas:

✅ **Validación de campos** - Todos los campos son obligatorios
✅ **Validación de email** - Verifica formato de email válido
✅ **Estado de carga** - Botón muestra "Enviando..." durante el envío
✅ **Notificaciones** - Mensajes de éxito/error con animaciones
✅ **Limpieza del formulario** - Se limpia automáticamente después del envío exitoso
✅ **Manejo de errores** - Captura y muestra errores de envío

## Notas importantes:

- El plan gratuito de EmailJS permite 200 emails por mes
- Los emails se envían desde tu cuenta de email configurada
- Las notificaciones aparecen en la esquina superior derecha
- El formulario se deshabilita durante el envío para evitar envíos múltiples 