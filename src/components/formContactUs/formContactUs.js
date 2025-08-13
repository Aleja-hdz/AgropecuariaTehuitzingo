import './formContactUs.css';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../../config/emailjs';

export default function FormContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        lastnames: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitStatus(null);

        try {
            const templateParams = {
                from_name: `${formData.name} ${formData.lastnames}`,
                from_email: formData.email,
                phone: formData.phone,
                message: formData.message,
                send_date: new Date().toLocaleString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Mexico_City'
                })
            };

            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );

            setSubmitStatus('success');
            setFormData({
                name: '',
                lastnames: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error('Error al enviar el email:', error);
            setSubmitStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="container-form">
            <form onSubmit={handleSubmit}>
                <div className="first-questions">
                    <div className="questions">
                        <p>Nombre</p>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="questions">
                        <p>Apellidos</p>
                        <input 
                            type="text" 
                            name="lastnames" 
                            value={formData.lastnames}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                </div>
                <p>Email</p>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                />
                <p>Teléfono</p>
                <input 
                    type="tel" 
                    className="input-phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                />
                <p>Asunto</p>
                <input 
                    type="text" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                />
                <button 
                    className={`btn ${isLoading ? 'btn-loading' : ''}`} 
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            
            {submitStatus === 'success' && (
                <div className="success-message">
                    ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                </div>
            )}
            
            {submitStatus === 'error' && (
                <div className="error-message">
                    Error al enviar el mensaje. Por favor, intenta nuevamente.
                </div>
            )}
        </div>
    );
}