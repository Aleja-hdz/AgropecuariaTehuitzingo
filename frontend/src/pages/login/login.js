import "./login.css";
import { useState } from "react";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";

export default function Login(){

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="login-body">
            <div className="login-container">
                <h1>Iniciar sesión</h1>
                <form className="login-form">
                    <input className="inputs-login" type="email" placeholder="Correo electrónico" required />
                    <input className="inputs-login" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" required />
                    <div className="view-password">
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} ></input>
                        <p>Ver contraseña</p>
                    </div>
                    <ButtonSmall text="Iniciar sesión" />
                    <div className="links-register">
                        <p className="ac">¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
                        <p className="ad"><a href="/register">¿Olvidaste tu contraseña?</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
