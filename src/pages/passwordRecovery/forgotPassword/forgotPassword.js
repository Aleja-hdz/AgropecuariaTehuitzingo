import ButtonLong from '../../../components/buttonLong/buttonLong';
import './forgotPassword.css';
import React, { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setMessage('');
        setError('');
        setIsLoading(true);
        
        try {
            // Validación básica de email
            if (!email || !email.includes('@')) {
                setError('Por favor ingresa un email válido');
                setIsLoading(false);
                return;
            }

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            });

            if (error) {
                setError('Error al enviar el email de recuperación: ' + error.message);
            } else {
                setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico. Revisa tu bandeja de entrada y sigue las instrucciones.');
            }
        } catch (err) {
            setError('Error inesperado. Intenta de nuevo más tarde.');
            console.error('Error en recuperación de contraseña:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='forgotP-body'>
            <div className="forgotP-container">
                <h1>Recuperación de contraseña</h1>
                <p>Escribe el correo electrónico con el que te registraste</p>
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    className='forgotP-input' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    disabled={isLoading}
                />
                <br></br>
                <ButtonLong 
                    text={isLoading ? "Enviando..." : "Enviar enlace de recuperación"} 
                    onClick={handleSubmit}
                    disabled={isLoading}
                />
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                        ← Volver al inicio de sesión
                    </a>
                </div>
            </div>
        </div>
    );
}