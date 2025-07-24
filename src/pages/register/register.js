import "./register.css";
import ButtonSmall from "../../components/buttonSmall/buttonSmall";
import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: "", password: "", nombre: "", apellidos: "", telefono: "", direccion: ""
    });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password
        });

        if (error) return alert(error.message);

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

        if (dbError) return alert(dbError.message);

        alert("Registro exitoso, revisa tu correo para confirmar.");
        navigate("/login");
    };
    
    return (
        <div className="register-body">
            <div className="register-container">
                <h1 className="tittles-h1">Regístrate</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input className="inputs-register" type="text" placeholder="Nombre" name="nombre" onChange={handleChange} required />
                    <input className="inputs-register" type="text" placeholder="Apellido" name="apellidos" onChange={handleChange} required />
                    <input className="inputs-register" type="tel" placeholder="Teléfono" name="telefono" onChange={handleChange} required />
                    <input className="inputs-register" type="text" placeholder="Dirección" name="direccion" onChange={handleChange} required />
                    <input className="inputs-register" type="email" placeholder="Correo electrónico" name="email" onChange={handleChange} required />
                    <input className="inputs-register" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" name="password" onChange={handleChange} required />
                    <div className="view-password-register">
                        <input type="checkbox" checked={showPassword} onChange={ () => setShowPassword(!showPassword)}></input>
                        <p>Ver contraseña</p>
                    </div>
                    <ButtonSmall text="Guardar" />
                    <p>¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión</Link></p>
                </form>
            </div>
        </div>
    );
}