import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonLong from '../../../components/buttonLong/buttonLong';
import './resetPassword.css';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    // Extraer token desde la URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, new_password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('¡Contraseña restablecida exitosamente!');
                setTimeout(() => navigate('/'), 2000); // redirigir después de 2 segundos
            } else {
                setError(data.msg || 'Ocurrió un error al restablecer la contraseña.');
            }
        } catch (err) {
            setError('Error del servidor. Intenta más tarde.');
        }
    };

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
                />
                <br />
                <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    className='resetP-input'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                <ButtonLong text="Restablecer contraseña" onClick={handleSubmit} />

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
}
