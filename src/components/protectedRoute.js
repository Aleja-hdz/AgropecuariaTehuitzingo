import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../auth/authContext";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      // Esperar a que el contexto de autenticación termine de cargar
      if (loading) {
        return;
      }

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
  }, [loading]);

  // Mostrar loading mientras el contexto de autenticación está cargando
  if (loading) {
    return <LoadingSpinner message="Verificando autenticación..." />;
  }

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
