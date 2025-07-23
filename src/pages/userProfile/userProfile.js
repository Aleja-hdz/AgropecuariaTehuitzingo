import './userProfile.css';
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const { user, getUserType, isAdmin, signOut, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Estados para el formulario
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    // Cargar datos del usuario
    useEffect(() => {
        if (user) {
            setName(user.user_metadata?.name || '');
            setLastName(user.user_metadata?.last_name || '');
            setEmail(user.email || '');
            setPhone(user.user_metadata?.phone || '');
            setLocation(user.user_metadata?.location || '');
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const { error } = await updateProfile({
                name,
                last_name: lastName,
                phone: phone || null,
                location: location || null
            });

            if (error) {
                setError('Error al actualizar el perfil');
            } else {
                setMessage('Perfil actualizado exitosamente');
            }
        } catch (err) {
            setError('Error al actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            // Aquí implementarías la lógica para eliminar la cuenta
            alert('Función de eliminación de cuenta en desarrollo');
        }
    };

    return (
        <div className='user-profile'>
            <div className='profile-head-box1'>
                <a href="/">
                    <ButtonSmall text='<- Regresar' />
                </a>
            </div>
            <div className='profile-head'>
                    <h1 className='profile-head-h1'>Mi perfil</h1>
                    <p className='profile-head-text'>Administra tu información y haz cualquier cambio dependiendo de tus preferencias</p>
            </div>
            <div className='profile-body'>
                <div className='profile-body-box1'>
                    <h2>Información que necesitas saber</h2>
                    <p>Cuando te registras en nuestra página, la información que nos compartes (como tu nombre, correo electrónico y otros datos) se almacena de manera segura y solo se utiliza para brindarte acceso a nuestros servicios, personalizar tu experiencia y mantenerte informado sobre novedades relevantes. Nos comprometemos a proteger tu privacidad y no compartiremos tus datos con terceros sin tu consentimiento, excepto cuando sea necesario por motivos legales o para cumplir con nuestros términos de servicio.</p>
                </div>
                            <div className='profile-body-box2'>
                <h2>Datos básicos</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <div className='profile-body-box2-info-container'>
                    <div className='profile-body-box2-info'>
                        <p>Nombre</p>
                        <input 
                            type='text' 
                            placeholder='Nombre' 
                            className='profile-body-box2-input'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='profile-body-box2-info'>
                        <p>Apellidos</p>
                        <input 
                            type='text' 
                            placeholder='Apellidos' 
                            className='profile-body-box2-input'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='profile-body-box2-info-container'>
                    <div className='profile-body-box2-info'>
                        <p>Correo electrónico</p>
                        <input 
                            type='email' 
                            placeholder='Correo electrónico' 
                            className='profile-body-box2-input'
                            value={email}
                            disabled
                        />
                    </div>
                    <div className='profile-body-box2-info'>
                        <p>Teléfono</p>
                        <input 
                            type='tel' 
                            placeholder='Teléfono' 
                            className='profile-body-box2-input'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <br></br>
                <h2>Información adicional</h2>
                <p>Dirección</p>
                <input 
                    type='text' 
                    placeholder='Dirección' 
                    className='profile-body-box2-input'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <br></br>
                <p>Tipo de usuario: <strong>{getUserType()}</strong></p>
                <ButtonSmall 
                    text={loading ? 'Actualizando...' : 'Actualizar perfil'} 
                    onClick={handleUpdateProfile}
                />
                </div>
            </div>
            <div className='profile-footer'>
                <h3>Opciones de cuenta</h3>
                <div className='profile-footer-buttons'>
                    <a href="/nuevaContraseña" className='profile-footer-btns'>Cambiar contraseña</a>
                    <a href="/cambioUsuario" className='profile-footer-btns'>Cambiar tipo de usuario</a>
                    <button className='profile-footer-btns' onClick={handleLogout}>Cerrar sesión</button>
                    <button className='profile-footer-btns-red' onClick={handleDeleteAccount}>Eliminar cuenta</button>
                </div>
            </div>
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}