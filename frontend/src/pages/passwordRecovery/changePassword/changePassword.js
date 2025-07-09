import ButtonLong from '../../../components/buttonLong/buttonLong';
import './changePassword.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleChangePassword = async () => {
        setError('');
        setSuccess('');

        // Validación básica
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Por favor completa todos los campos.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas nuevas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Agrega token si usas autenticación con JWT
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('¡Contraseña cambiada exitosamente!');
                setTimeout(() => navigate('/perfil'), 2000); // Redirigir a home o login
            } else {
                setError(data.msg || 'No se pudo cambiar la contraseña.');
            }

        } catch (err) {
            setError('Error del servidor. Intenta más tarde.');
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
                /><br />

                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    className='changeP-input'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                /><br />

                <input
                    type="password"
                    placeholder="Confirmar nueva"
                    className='changeP-input'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                /><br />

                <ButtonLong text="Cambiar contraseña" onClick={handleChangePassword} />

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
}
