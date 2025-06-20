import "./register.css";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";

export default function Register() {
    return (
        <div className="register-body">
            <div className="register-container">
                <h1>Regístrate</h1>
                <form>
                    <input className="inputs-register" type="text" placeholder="Nombre" required />
                    <input className="inputs-register" type="text" placeholder="Apellido" required />
                    <input className="inputs-register" type="tel" placeholder="Teléfono" required />
                    <input className="inputs-register" type="text" placeholder="Dirección" required />
                    <input className="inputs-register" type="email" placeholder="Correo electrónico" required />
                    <input className="inputs-register" type="password" placeholder="Contraseña" required />
                    <div className="checkbox-container">
                        <input type="checkbox" id="view" />
                        <label htmlFor="view">Ver contraseña</label>
                    </div>
                    <ButtonSmall text="Guardar" />
                    <p>¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></p>
                </form>
            </div>
        </div>
    );
}