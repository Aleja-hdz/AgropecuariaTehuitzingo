import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./authContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AdminRoute({ children }) {
    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUserProfile = async () => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("usuarios")
                    .select("tipo_usuario")
                    .eq("auth_id", user.id)
                    .single();

                if (error) {
                    console.error("Error al obtener perfil:", error);
                    setUserProfile(null);
                } else {
                    setUserProfile(data);
                }
            } catch (error) {
                console.error("Error inesperado:", error);
                setUserProfile(null);
            } finally {
                setIsLoading(false);
            }
        };

        getUserProfile();
    }, [user]);

    if (isLoading) {
        return <LoadingSpinner message="Verificando permisos de administrador..." />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!userProfile || userProfile.tipo_usuario !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
} 