import './userProfile.css';
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function UserProfile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Estados para el formulario
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    // Estados para animaciones
    const [isVisible, setIsVisible] = useState({
        header: false,
        info: false,
        form: false,
        buttons: false
    });

    // Animación de entrada inicial
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, header: true }));
        }, 100);

        const timer2 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, info: true }));
        }, 300);

        const timer3 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, form: true }));
        }, 500);

        const timer4 = setTimeout(() => {
            setIsVisible(prev => ({ ...prev, buttons: true }));
        }, 700);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

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
                        setName(data.nombre || '');
                        setLastName(data.apellidos || '');
                        setEmail(data.email || '');
                        setPhone(data.telefono || '');
                        setLocation(data.direccion || '');
                    }
                } catch (error) {
                    console.error("Error inesperado:", error);
                }
            }
        };

        loadUserProfile();
    }, [user]);

    // Manejar visibilidad del navbar cuando el modal de confirmación está abierto
    useEffect(() => {
        if (showDeleteConfirm) {
            document.body.style.overflow = 'hidden'; // Deshabilitar scroll del body
            
            // Ocultar el navbar cuando el modal se abre
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.add('hidden');
            }
            
            return () => {
                document.body.style.overflow = 'unset'; // Re-habilitar scroll del body
                
                // Mostrar el navbar cuando el modal se cierra
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    navbar.classList.remove('hidden');
                }
            };
        }
    }, [showDeleteConfirm]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const { error } = await supabase
                .from("usuarios")
                .update({
                    nombre: name,
                    apellidos: lastName,
                    telefono: phone,
                    direccion: location
                })
                .eq("auth_id", user.id);

            if (error) {
                setError('Error al actualizar el perfil: ' + error.message);
            } else {
                setMessage('Perfil actualizado exitosamente');
                // Recargar datos del usuario
                const { data } = await supabase
                    .from("usuarios")
                    .select("*")
                    .eq("auth_id", user.id)
                    .single();
                if (data) {
                    setUserProfile(data);
                }
            }
        } catch (err) {
            setError('Error al actualizar el perfil');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleDeleteAccount = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDeleteAccount = async () => {
        setLoading(true);
        setError('');
        setShowDeleteConfirm(false);
        
        try {
            // Eliminar los datos del usuario de la tabla usuarios
            const { error: deleteUserError } = await supabase
                .from("usuarios")
                .delete()
                .eq("auth_id", user.id);

            if (deleteUserError) {
                setError('Error al eliminar datos del usuario: ' + deleteUserError.message);
                setLoading(false);
                return;
            }

            // Mostrar mensaje de éxito
            alert('Tu cuenta ha sido eliminada exitosamente. Serás redirigido al inicio.');
            
            // Cerrar sesión y redirigir
            await logout();
            navigate('/');
            
        } catch (err) {
            setError('Error al eliminar la cuenta: ' + err.message);
            console.error('Error al eliminar cuenta:', err);
        } finally {
            setLoading(false);
        }
    };

    const cancelDeleteAccount = () => {
        setShowDeleteConfirm(false);
    };

    if (!user) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px'
            }}>
                Redirigiendo al login...
            </div>
        );
    }

    return (
        <div className='user-profile'>
            <div className={`profile-head-box1 ${isVisible.header ? 'animate-fade-in' : ''}`}>
                <a href="/">
                    <ButtonSmall text='<- Regresar' />
                </a>
            </div>
            <div className={`profile-head ${isVisible.header ? 'animate-fade-in-delay' : ''}`}>
                    <h1 className='profile-head-h1 animate-title'>Mi perfil</h1>
                    <p className='profile-head-text animate-text'>Administra tu información y haz cualquier cambio dependiendo de tus preferencias</p>
            </div>
            <div className={`profile-body ${isVisible.info ? 'animate-fade-in-delay-2' : ''}`}>
                <div className='profile-body-box1 animate-info-section'>
                    <h2 className="animate-text-delay">Información que necesitas saber</h2>
                    <p className="animate-text-delay-2">Cuando te registras en nuestra página, la información que nos compartes (como tu nombre, correo electrónico y otros datos) se almacena de manera segura y solo se utiliza para brindarte acceso a nuestros servicios, personalizar tu experiencia y mantenerte informado sobre novedades relevantes. Nos comprometemos a proteger tu privacidad y no compartiremos tus datos con terceros sin tu consentimiento, excepto cuando sea necesario por motivos legales o para cumplir con nuestros términos de servicio.</p>
                </div>
                <div className={`profile-body-box2 ${isVisible.form ? 'animate-fade-in-delay-3' : ''}`}>
                    <h2 className="animate-text-delay">Datos básicos</h2>
                    {message && <p className="success-message animate-success">{message}</p>}
                    {error && <p className="error-message animate-error">{error}</p>}
                    <div className='profile-body-box2-info-container animate-form-section'>
                        <div className='profile-body-box2-info animate-input-group'>
                            <p>Nombre</p>
                            <input 
                                type='text' 
                                placeholder='Nombre' 
                                className='profile-body-box2-input animate-input'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='profile-body-box2-info animate-input-group'>
                            <p>Apellidos</p>
                            <input 
                                type='text' 
                                placeholder='Apellidos' 
                                className='profile-body-box2-input animate-input'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='profile-body-box2-info-container animate-form-section'>
                        <div className='profile-body-box2-info animate-input-group'>
                            <p>Correo electrónico</p>
                            <input 
                                type='email' 
                                placeholder='Correo electrónico' 
                                className='profile-body-box2-input animate-input'
                                value={email}
                                disabled
                            />
                        </div>
                        <div className='profile-body-box2-info animate-input-group'>
                            <p>Teléfono</p>
                            <input 
                                type='tel' 
                                placeholder='Teléfono' 
                                className='profile-body-box2-input animate-input'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <br></br>
                    <h2 className="animate-text-delay">Información adicional</h2>
                    <p>Dirección</p>
                    <input 
                        type='text' 
                        placeholder='Dirección' 
                        className='profile-body-box2-input animate-input'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <br></br>
                    <p>Tipo de usuario: <strong>{userProfile?.tipo_usuario || 'Usuario'}</strong></p>
                    <div className="animate-button-container">
                        <ButtonSmall 
                            text={loading ? 'Actualizando...' : 'Actualizar perfil'} 
                            onClick={handleUpdateProfile}
                        />
                    </div>
                </div>
            </div>
            <div className={`profile-footer ${isVisible.buttons ? 'animate-fade-in-delay-4' : ''}`}>
                <h3 className="animate-text-delay">Opciones de cuenta</h3>
                <div className='profile-footer-buttons animate-buttons-section'>
                    <a href="/nuevaContraseña" className='profile-footer-btns animate-button'>Cambiar contraseña</a>

                    <button className='profile-footer-btns animate-button' onClick={handleLogout}>Cerrar sesión</button>
                    <button className='profile-footer-btns-red animate-button' onClick={handleDeleteAccount}>Eliminar cuenta</button>
                </div>
            </div>
            
            {/* Modal de confirmación para eliminar cuenta */}
            {showDeleteConfirm && (
                <div className="delete-confirm-modal">
                    <div className="delete-confirm-content">
                        <h3>Confirmar eliminación de cuenta</h3>
                        <p>¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                        <div className="delete-confirm-buttons">
                            <button 
                                className="delete-confirm-btn cancel" 
                                onClick={cancelDeleteAccount}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="delete-confirm-btn confirm" 
                                onClick={confirmDeleteAccount}
                                disabled={loading}
                            >
                                {loading ? 'Eliminando...' : 'Eliminar cuenta'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <footer className='footer animate-footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}