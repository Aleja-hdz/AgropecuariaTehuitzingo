import './userProfile.css';
import ButtonSmall from "../../components/buttonSmall/buttonSmall";

export default function UserProfile() {
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
                    <div className='profile-body-box2-info-container'>
                        <div className='profile-body-box2-info'>
                            <p>Nombre</p>
                            <input type='text' placeholder='Nombre' className='profile-body-box2-input'/>
                        </div>
                        <div className='profile-body-box2-info'>
                            <p>Apellidos</p>
                            <input type='text' placeholder='Apellidos' className='profile-body-box2-input'/>
                        </div>
                    </div>
                    <div className='profile-body-box2-info-container'>
                        <div className='profile-body-box2-info'>
                            <p>Correo electrónico</p>
                            <input type='text' placeholder='Nombre' className='profile-body-box2-input'/>
                        </div>
                        <div className='profile-body-box2-info'>
                            <p>Teléfono</p>
                            <input type='text' placeholder='Apellidos' className='profile-body-box2-input'/>
                        </div>
                    </div>
                    <br></br>
                    <h2>Información adicional</h2>
                    <p>Dirección</p>
                    <input type='text' placeholder='Nombre' className='profile-body-box2-input'/>
                    <br></br>
                    <ButtonSmall text='Editar perfil' />
                </div>
            </div>
            <div className='profile-footer'>
                <h3>Opciones de cuenta</h3>
                <div className='profile-footer-buttons'>
                    <a href="/nuevaContraseña" className='profile-footer-btns'>Cambiar contraseña</a>
                    <a href="/cambioUsuario" className='profile-footer-btns'>Cambiar tipo de usuario</a>
                    <button className='profile-footer-btns'>Cerrar sesión</button>
                    <button className='profile-footer-btns-red'>Eliminar cuenta</button>
                </div>
            </div>
            <footer className='footer'>
                <p className="text-contact">&copy; 2025 Todos los derechos reservados || Agropecuaria Tehuitzingo</p>
            </footer>
        </div>
    );
}