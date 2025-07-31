import "./login.css";
import { useState } from "react";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authContext";

export default function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Función para traducir errores de Supabase
    const getErrorMessage = (error) => {
        switch (error.message) {
            case 'Invalid login credentials':
                return 'Email o contraseña incorrectos';
            case 'Email not confirmed':
                return 'Por favor confirma tu email antes de iniciar sesión';
            case 'Too many requests':
                return 'Demasiados intentos. Intenta de nuevo en unos minutos';
            case 'User not found':
                return 'No existe una cuenta con este email';
            default:
                return 'Error al iniciar sesión. Verifica tus datos e intenta de nuevo.';
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            
            if (loginError) {
                setError(getErrorMessage(loginError));
                return;
            }
            
            setSuccess("¡Inicio de sesión exitoso!");
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (error) {
            setError("Error inesperado. Intenta de nuevo.");
            console.error("Error de login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <h1 className="tittles-h1">Iniciar sesión</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <input 
                        className="inputs-login" 
                        type="email" 
                        placeholder="Correo electrónico" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        disabled={isLoading}
                    />
                    <input 
                        className="inputs-login" 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        disabled={isLoading}
                    />
                    <div className="view-password">
                        <input 
                            type="checkbox" 
                            checked={showPassword} 
                            onChange={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        />
                        <p>Ver contraseña</p>
                    </div>
                    <ButtonSmall 
                        text={isLoading ? "Iniciando sesión..." : "Iniciar sesión"} 
                        disabled={isLoading}
                    />
                    {error && <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{error}</p>}
                    {success && <p style={{color: 'green', textAlign: 'center', marginTop: '10px'}}>{success}</p>}
                    <div className="links-register">
                        <p className="ac">¿No tienes una cuenta? <a href="/registro">Regístrate</a></p>
                        <p className="ad"><a href="/recuperarContraseña">¿Olvidaste tu contraseña?</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
