import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionChecked, setSessionChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener sesión inicial
        const getInitialSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user || null);
                setSessionChecked(true);
            } catch (error) {
                console.error('Error al obtener sesión inicial:', error);
                setSessionChecked(true);
            } finally {
                setLoading(false);
            }
        };

        getInitialSession();

        // Escuchar cambios en el estado de autenticación
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            setSessionChecked(true);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (!error) {
                setUser(null);
                navigate('/login');
            } else {
                console.error('Error al cerrar sesión:', error);
            }
        } catch (error) {
            console.error('Error inesperado al cerrar sesión:', error);
        }
    };

    const value = {
        user,
        setUser,
        logout,
        loading: loading || !sessionChecked
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}
