import "./register.css";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { useState } from "react";

export default function Register() {

    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className="register-body">
            <div className="register-container">
                <h1>Regístrate</h1>
                <form className="register-form">
                    <input className="inputs-register" type="text" placeholder="Nombre" required />
                    <input className="inputs-register" type="text" placeholder="Apellido" required />
                    <input className="inputs-register" type="tel" placeholder="Teléfono" required />
                    <input className="inputs-register" type="text" placeholder="Dirección" required />
                    <input className="inputs-register" type="email" placeholder="Correo electrónico" required />
                    <input className="inputs-register" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" required />
                    <div className="view-password-register">
                        <input type="checkbox" checked={showPassword} onChange={ () => setShowPassword(!showPassword)}></input>
                        <p>Ver contraseña</p>
                    </div>
                    <ButtonSmall text="Guardar" />
                    <p>¿Ya tienes una cuenta? <a href="/ingreso">Inicia sesión</a></p>
                </form>
            </div>
        </div>
    );
}