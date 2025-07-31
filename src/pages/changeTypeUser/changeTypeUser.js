import ButtonLong from '../../components/buttonLong/buttonLong';
import './changeTypeUser.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/authContext';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { sendEmailToAdmins } from '../../lib/emailService';

export default function ChangeTypeUser() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    // Cargar datos del usuario
    useEffect(() => {
        const loadUserProfile = async () => {
            if (user) {
                try {
                    const { data, error } = await supabase
                        .from("usuarios")
                        .select("*")
                        .eq("auth_id", user.id)
                        .single();

                    if (error) {
                        console.error("Error al cargar perfil:", error);
                    } else if (data) {
                        setUserProfile(data);
                    }
                } catch (error) {
                    console.error("Error inesperado:", error);
                }
            }
        };

        loadUserProfile();
    }, [user]);

    const handleChangeType = async () => {
        if (!user) {
            setError('Debes iniciar sesión para realizar esta acción');
            return;
        }

        if (userProfile?.tipo_usuario === 'admin') {
            setError('Ya eres administrador');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Obtener todos los usuarios admin
            const { data: adminUsers, error: fetchError } = await supabase
                .from("usuarios")
                .select("email")
                .eq("tipo_usuario", "admin");

            if (fetchError) {
                setError('Error al obtener la lista de administradores: ' + fetchError.message);
                return;
            }

            if (!adminUsers || adminUsers.length === 0) {
                setError('No se encontraron administradores en el sistema.');
                return;
            }

            // Enviar email a todos los administradores
            const adminEmails = adminUsers.map(admin => admin.email);
            const userName = userProfile?.nombre || 'Usuario';
            
            await sendEmailToAdmins(adminEmails, user.email, userName);

            setMessage('Solicitud enviada exitosamente a los administradores del sistema. Te notificaremos cuando se procese tu solicitud.');
            
        } catch (error) {
            setError('Error al enviar la solicitud: ' + error.message);
            console.error('Error en solicitud de cambio de tipo:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='changeTU-body'>
            <div className='changeTU-container'>
                <h1>Cambio de tipo de usuario</h1>
                <p>Tipo de usuario actual: <strong>{userProfile?.tipo_usuario || 'Usuario'}</strong></p>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <p>Da clic en el botón para enviar la solicitud de cambio.</p>
                <ButtonLong 
                    text={loading ? 'Enviando solicitud...' : 'Cambiar tipo de usuario'} 
                    onClick={handleChangeType}
                    disabled={loading}
                />
                <p>NOTA: Actualmente tu usuario está relacionado a una cuenta de tipo usuario común. Para poder cambiar esto es necesario que la solicitud sea revisada por el administrador de la página. Una vez revisado tu perfil, los cambios se reflejarán de manera automática.</p>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <a href="/userProfile" style={{ color: '#007bff', textDecoration: 'none' }}>
                        ← Volver al perfil
                    </a>
                </div>
            </div>
        </div>
    );
}