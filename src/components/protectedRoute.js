import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../auth/authContext";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Mostrar loading mientras se verifica la sesión
  if (isLoading) {
    return <LoadingSpinner message="Verificando autenticación..." />;
  }

  // Redirigir a login si no hay sesión
  if (!session && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
