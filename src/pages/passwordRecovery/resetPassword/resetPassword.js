import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonLong from '../../../components/buttonLong/buttonLong';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { supabase } from '../../../lib/supabaseClient';
import './resetPassword.css';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const [isCheckingToken, setIsCheckingToken] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkRecoverySession = async () => {
            try {
                // Verificar si hay parámetros de recuperación en la URL
                const urlParams = new URLSearchParams(location.search);
                const hasRecoveryParams = urlParams.has('access_token') || 
                                        urlParams.has('refresh_token') || 
                                        urlParams.has('type');

                if (hasRecoveryParams) {
                    // Esperar un momento para que Supabase procese la URL
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
                
                // Verificar la sesión actual
                const { data: { session }, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error('Error al obtener sesión:', error);
                    setError('Error al verificar el enlace de recuperación.');
                    setIsCheckingToken(false);
                    return;
                }

                if (!session) {
                    setError('Enlace de recuperación inválido o expirado. Solicita un nuevo enlace.');
                    setIsCheckingToken(false);
                    return;
                }

                // Verificar que el usuario tenga permisos para cambiar contraseña
                if (!session.user) {
                    setError('Usuario no válido para recuperación de contraseña.');
                    setIsCheckingToken(false);
                    return;
                }

                setIsValidToken(true);
            } catch (err) {
                console.error('Error al verificar token:', err);
                setError('Error al verificar el enlace de recuperación.');
            } finally {
                setIsCheckingToken(false);
            }
        };

        // Agregar listener para cambios de sesión
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY' || event === 'TOKEN_REFRESHED') {
                if (session) {
                    setIsValidToken(true);
                    setIsCheckingToken(false);
                }
            }
        });

        checkRecoverySession();

        // Cleanup del listener
        return () => subscription?.unsubscribe();
    }, [location.search]);

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
            // Establecer la nueva contraseña usando la sesión actual
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                setError('Error al restablecer la contraseña: ' + error.message);
            } else {
                setSuccess('¡Contraseña restablecida exitosamente! Serás redirigido al login.');
                // Cerrar sesión después de cambiar la contraseña
                await supabase.auth.signOut();
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError('Error inesperado. Intenta más tarde.');
            console.error('Error al restablecer contraseña:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingToken) {
        return (
            <div className='resetP-body'>
                <div className="resetP-container">
                    <LoadingSpinner 
                        message="Verificando enlace de recuperación..." 
                        size="medium"
                        fullScreen={false}
                    />
                </div>
            </div>
        );
    }

    if (!isValidToken) {
        return (
            <div className='resetP-body'>
                <div className="resetP-container">
                    <h1>Enlace inválido</h1>
                    <p>El enlace de recuperación es inválido o ha expirado.</p>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <a href="/recuperarContraseña" style={{ color: '#007bff', textDecoration: 'none' }}>
                            Solicitar nuevo enlace
                        </a>
                    </div>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
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

                {isLoading ? (
                    <LoadingSpinner 
                        message="Restableciendo contraseña..." 
                        size="medium"
                        fullScreen={false}
                    />
                ) : (
                    <>
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
                    </>
                )}

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
