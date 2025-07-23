import ButtonLong from '../../components/buttonLong/buttonLong';
import './changeTypeUser.css';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export default function ChangeTypeUser() {
    const { user, getUserType, isAdmin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChangeType = async () => {
        if (!user) {
            alert('Debes iniciar sesión para realizar esta acción');
            return;
        }

        if (isAdmin()) {
            alert('Ya eres administrador');
            return;
        }

        setLoading(true);
        try {
            // Aquí podrías implementar la lógica para enviar la solicitud
            // Por ahora, solo mostraremos un mensaje
            setMessage('Solicitud enviada. El administrador revisará tu perfil.');
            
            // En el futuro, podrías crear una tabla en Supabase para las solicitudes
            // const { data, error } = await supabase
            //     .from('user_type_requests')
            //     .insert([
            //         { user_id: user.id, requested_type: 'admin', status: 'pending' }
            //     ]);
            
        } catch (error) {
            setMessage('Error al enviar la solicitud. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='changeTU-body'>
            <div className='changeTU-container'>
                <h1>Cambio de tipo de usuario</h1>
                <p>Tipo de usuario actual: <strong>{getUserType()}</strong></p>
                {message && <p className="message">{message}</p>}
                <p>Da clic en el botón para enviar la solicitud de cambio.</p>
                <ButtonLong 
                    text={loading ? 'Enviando solicitud...' : 'Cambiar tipo de usuario'} 
                    onClick={handleChangeType}
                />
                <p>NOTA: Actualmente tu usuario está relacionado a una cuenta de tipo usuario común. Para poder cambiar esto es necesario que la solicitud sea revisada por el administrador de la página. Una vez revisado tu perfil, los cambios se reflejarán de manera automática.</p>
            </div>
        </div>
    );
}