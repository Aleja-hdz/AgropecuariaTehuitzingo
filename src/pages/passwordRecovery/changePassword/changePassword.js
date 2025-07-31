import ButtonLong from '../../../components/buttonLong/buttonLong';
import './changePassword.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../auth/authContext';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth();

    const handleChangePassword = async () => {
        setError('');
        setSuccess('');
        setIsLoading(true);

        // Validación básica
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Por favor completa todos los campos.');
            setIsLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas nuevas no coinciden.');
            setIsLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres.');
            setIsLoading(false);
            return;
        }

        try {
            // Primero verificar la contraseña actual
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: currentPassword
            });

            if (signInError) {
                setError('La contraseña actual es incorrecta.');
                setIsLoading(false);
                return;
            }

            // Cambiar la contraseña
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (updateError) {
                setError('Error al cambiar la contraseña: ' + updateError.message);
            } else {
                setSuccess('¡Contraseña cambiada exitosamente!');
                setTimeout(() => navigate('/userProfile'), 2000);
            }

        } catch (err) {
            setError('Error inesperado. Intenta más tarde.');
            console.error('Error al cambiar contraseña:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='changeP-body'>
            <div className="changeP-container">
                <h1>Cambio de contraseña</h1>
                <p>Llene los siguientes campos para hacer el cambio de su contraseña.</p>

                <input
                    type="password"
                    placeholder="Contraseña actual"
                    className='changeP-input'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    disabled={isLoading}
                /><br />

                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    className='changeP-input'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={isLoading}
                /><br />

                <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    className='changeP-input'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                /><br />

                <ButtonLong 
                    text={isLoading ? "Cambiando contraseña..." : "Cambiar contraseña"} 
                    onClick={handleChangePassword}
                    disabled={isLoading}
                />

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a href="/userProfile" style={{ color: '#007bff', textDecoration: 'none' }}>
                        ← Volver al perfil
                    </a>
                </div>
            </div>
        </div>
    );
}
