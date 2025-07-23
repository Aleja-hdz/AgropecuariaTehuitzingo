import "./register.css";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        // Registro con Supabase Auth
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });
        if (signUpError) {
            setError("Error al registrar: " + signUpError.message);
            return;
        }
        // Guardar datos extra en la tabla 'usuario'
        const user_id = data.user?.id;
        let registroExitoso = true;
        if (user_id) {
            const { error: insertError } = await supabase.from("usuario").insert([
                { user_id, nombre, apellido, telefono, direccion, email }
            ]);
            if (insertError) {
                setError("Usuario creado, pero error al guardar datos extra: " + insertError.message);
                registroExitoso = false;
            }
        }
        setSuccess("¡Registro exitoso!");
        if (registroExitoso) setTimeout(() => navigate("/ingreso"), 2000);
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <h1 className="tittles-h1">Regístrate</h1>
                <form className="register-form" onSubmit={handleRegister}>
                    <input className="inputs-register" type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    <input className="inputs-register" type="text" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} required />
                    <input className="inputs-register" type="tel" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} required />
                    <input className="inputs-register" type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} required />
                    <input className="inputs-register" type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input className="inputs-register" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
                    <div className="view-password-register">
                        <input type="checkbox" checked={showPassword} onChange={ () => setShowPassword(!showPassword)}></input>
                        <p>Ver contraseña</p>
                    </div>
                    <ButtonSmall text="Guardar" />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {success && <p style={{color: 'green'}}>{success}</p>}
                    <p>¿Ya tienes una cuenta? <a href="/ingreso">Inicia sesión</a></p>
                </form>
            </div>
        </div>
    );
}