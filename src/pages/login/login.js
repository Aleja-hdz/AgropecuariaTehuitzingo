import "./login.css";
import { useState } from "react";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (loginError) {
            setError("Error al iniciar sesión: " + loginError.message);
            return;
        }
        setSuccess("¡Inicio de sesión exitoso!");
        setTimeout(() => navigate("/dashboard"), 2000);
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <h1 className="tittles-h1">Iniciar sesión</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <input className="inputs-login" type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input className="inputs-login" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                    <div className="view-password">
                        <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} ></input>
                        <p>Ver contraseña</p>
                    </div>
                    <ButtonSmall text="Iniciar sesión" />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {success && <p style={{color: 'green'}}>{success}</p>}
                    <div className="links-register">
                        <p className="ac">¿No tienes una cuenta? <a href="/registro">Regístrate</a></p>
                        <p className="ad"><a href="/recuperarContraseña">¿Olvidaste tu contraseña?</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
