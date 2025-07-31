import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonLong from '../../../components/buttonLong/buttonLong';
import { supabase } from '../../../lib/supabaseClient';
import './resetPassword.css';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Extraer token desde la URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const type = queryParams.get('type');

    useEffect(() => {
        // Verificar si tenemos los parámetros necesarios
        if (!token || type !== 'recovery') {
            setError('Enlace de recuperación inválido o expirado.');
            return;
        }
        setIsValidToken(true);
    }, [token, type]);

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        setIsLoading(true);

        if (!password || !confirmPassword) {
            setError('Por favor completa todos los campos.');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            setIsLoading(false);
            return;
        }

        try {
            // Establecer la nueva contraseña usando el token de recuperación
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                setError('Error al restablecer la contraseña: ' + error.message);
            } else {
                setSuccess('¡Contraseña restablecida exitosamente! Serás redirigido al login.');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError('Error inesperado. Intenta más tarde.');
            console.error('Error al restablecer contraseña:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isValidToken) {
        return (
            <div className='resetP-body'>
                <div className="resetP-container">
                    <h1>Enlace inválido</h1>
                    <p>El enlace de recuperación es inválido o ha expirado.</p>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                            ← Volver al login
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='resetP-body'>
            <div className="resetP-container">
                <h1>Restablecer contraseña</h1>
                <p>Ingrese su nueva contraseña</p>

                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    className='resetP-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <br />
                <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    className='resetP-input'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <br />
                <ButtonLong 
                    text={isLoading ? "Restableciendo contraseña..." : "Restablecer contraseña"} 
                    onClick={handleSubmit}
                    disabled={isLoading}
                />

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                        ← Volver al login
                    </a>
                </div>
            </div>
        </div>
    );
}
