import ButtonLong from '../../../components/buttonLong/buttonLong';
import './forgotPassword.css';
import React, {  useState} from 'react';

export default function ForgotPassword() {

    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setMessage('');
        setError('');
        
        try {
            const response = await fetch('http://localhost:5000/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_or_phone: identifier }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Se ha enviado un enlace de recuperación. Revisa tu correo o SMS.');
            } else {
                setError(data.msg || 'Hubo un error al procesar la solicitud.');
            }
        } catch (err) {
            setError('Error del servidor. Intenta de nuevo más tarde o verifique sus datos.');
        }
    };

    return (
        <div className='forgotP-body'>
            <div className="forgotP-container">
                <h1>Recuperación de contraseña</h1>
                <p>Escriba el correo electrónico o teléfono con el que se haya registrado anteriormente</p>
                <input type="text" placeholder="Correo electrónico/ Teléfono" className='forgotP-input' value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
                <br></br>
                <ButtonLong text="Enviar código de verificación" onClick={handleSubmit}/>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}