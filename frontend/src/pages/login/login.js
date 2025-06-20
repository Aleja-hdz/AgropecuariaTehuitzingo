import "./login.css";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";

export default function Login(){
    return (
        <div className="login-body">
            <div className="login-container">
                <h1>Iniciar sesión</h1>
                <form>
                    <input className="inputs-login" type="email" placeholder="Correo electrónico" required />
                    <input className="inputs-login" type="password" placeholder="Contraseña" required />
                    <div className="checkbox-container">
                        <input type="checkbox" id="view" />
                        <label htmlFor="view">Ver contraseña</label>
                    </div>
                    <ButtonSmall text="Iniciar sesión" />
                    <p>¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
                    <p><a href="/register">¿Olvidaste tu contraseña?</a></p>
                </form>
            </div>
        </div>
    );
}