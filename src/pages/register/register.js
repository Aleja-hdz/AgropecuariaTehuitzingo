import "./register.css";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        email: "", 
        password: "", 
        nombre: "", 
        apellidos: "", 
        telefono: "", 
        direccion: ""
    });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    // Función para traducir errores de Supabase
    const getErrorMessage = (error) => {
        switch (error.message) {
            case 'User already registered':
                return 'Ya existe una cuenta con este email';
            case 'Password should be at least 6 characters':
                return 'La contraseña debe tener al menos 6 caracteres';
            case 'Invalid email':
                return 'El formato del email no es válido';
            case 'Signup disabled':
                return 'El registro está temporalmente deshabilitado';
            default:
                return 'Error en el registro. Verifica tus datos e intenta de nuevo.';
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            // Validaciones básicas
            if (form.password.length < 6) {
                setError("La contraseña debe tener al menos 6 caracteres");
                setIsLoading(false);
                return;
            }

            if (!form.email.includes('@')) {
                setError("Por favor ingresa un email válido");
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase.auth.signUp({
                email: form.email,
                password: form.password
            });

            if (error) {
                setError(getErrorMessage(error));
                setIsLoading(false);
                return;
            }

            const authId = data.user.id;

            const { error: dbError } = await supabase.from("usuarios").insert({
                auth_id: authId,
                email: form.email,
                nombre: form.nombre,
                apellidos: form.apellidos,
                telefono: form.telefono,
                direccion: form.direccion,
                tipo_usuario: ["admin@mail.com", "otro@admin.com"].includes(form.email) ? "admin" : "user"
            });

            if (dbError) {
                setError("Error al guardar datos del usuario: " + dbError.message);
                setIsLoading(false);
                return;
            }

            setSuccess("Registro exitoso, revisa tu correo para confirmar.");
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            setError("Error inesperado. Intenta de nuevo.");
            console.error("Error de registro:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="register-body">
            <div className="register-container">
                <h1 className="tittles-h1">Regístrate</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input 
                        className="inputs-register" 
                        type="text" 
                        placeholder="Nombre" 
                        name="nombre" 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                    />
                    <input 
                        className="inputs-register" 
                        type="text" 
                        placeholder="Apellido" 
                        name="apellidos" 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                    />
                    <input 
                        className="inputs-register" 
                        type="tel" 
                        placeholder="Teléfono" 
                        name="telefono" 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                    />
                    <input 
                        className="inputs-register" 
                        type="text" 
                        placeholder="Dirección" 
                        name="direccion" 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                    />
                    <input 
                        className="inputs-register" 
                        type="email" 
                        placeholder="Correo electrónico" 
                        name="email" 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                    />
                    <input 
                        className="inputs-register" 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Contraseña" 
                        name="password" 
                        onChange={handleChange} 
                        required 
                        disabled={isLoading}
                    />
                    <div className="view-password-register">
                        <input 
                            type="checkbox" 
                            checked={showPassword} 
                            onChange={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                        />
                        <p>Ver contraseña</p>
                    </div>
                    <ButtonSmall 
                        text={isLoading ? "Registrando..." : "Guardar"} 
                        disabled={isLoading}
                    />
                    {error && <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{error}</p>}
                    {success && <p style={{color: 'green', textAlign: 'center', marginTop: '10px'}}>{success}</p>}
                    <p>¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión</Link></p>
                </form>
            </div>
        </div>
    );
}