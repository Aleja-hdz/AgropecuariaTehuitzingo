import { supabase } from '../lib/supabaseClient';

export const runSupabaseDiagnostics = async () => {
  const diagnostics = {
    auth: null,
    storage: null,
    database: null,
    errors: []
  };

  try {
    // Verificar autenticación
    console.log("🔍 Verificando autenticación...");
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      diagnostics.auth = { success: false, error: authError.message };
      diagnostics.errors.push(`Error de autenticación: ${authError.message}`);
    } else if (!user) {
      diagnostics.auth = { success: false, error: "Usuario no autenticado" };
      diagnostics.errors.push("Usuario no autenticado");
    } else {
      diagnostics.auth = { success: true, user: user.email };
      console.log("✅ Usuario autenticado:", user.email);
    }

    // Verificar storage buckets
    console.log("🔍 Verificando buckets de almacenamiento...");
    const buckets = ['implementos-img', 'alimentos-balanceados-img', 'mascotas-img', 'medicamentos-veterinarios-img'];
    
    for (const bucketName of buckets) {
      try {
        const { data, error } = await supabase
          .storage
          .from(bucketName)
          .list('', { limit: 1 });
        
        if (error) {
          console.error(`❌ Error con bucket ${bucketName}:`, error);
          diagnostics.storage = { ...diagnostics.storage, [bucketName]: { success: false, error: error.message } };
          diagnostics.errors.push(`Bucket ${bucketName}: ${error.message}`);
        } else {
          console.log(`✅ Bucket ${bucketName} accesible`);
          diagnostics.storage = { ...diagnostics.storage, [bucketName]: { success: true } };
        }
      } catch (err) {
        console.error(`❌ Error inesperado con bucket ${bucketName}:`, err);
        diagnostics.storage = { ...diagnostics.storage, [bucketName]: { success: false, error: err.message } };
        diagnostics.errors.push(`Bucket ${bucketName}: ${err.message}`);
      }
    }

    // Verificar tablas de base de datos
    console.log("🔍 Verificando tablas de base de datos...");
    const tables = ['implementos', 'alimentos_balanceados', 'mascotas', 'medicamentos_veterinarios'];
    
    for (const tableName of tables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('id')
          .limit(1);
        
        if (error) {
          console.error(`❌ Error con tabla ${tableName}:`, error);
          diagnostics.database = { ...diagnostics.database, [tableName]: { success: false, error: error.message } };
          diagnostics.errors.push(`Tabla ${tableName}: ${error.message}`);
        } else {
          console.log(`✅ Tabla ${tableName} accesible`);
          diagnostics.database = { ...diagnostics.database, [tableName]: { success: true } };
        }
      } catch (err) {
        console.error(`❌ Error inesperado con tabla ${tableName}:`, err);
        diagnostics.database = { ...diagnostics.database, [tableName]: { success: false, error: err.message } };
        diagnostics.errors.push(`Tabla ${tableName}: ${err.message}`);
      }
    }

  } catch (err) {
    console.error("❌ Error general en diagnóstico:", err);
    diagnostics.errors.push(`Error general: ${err.message}`);
  }

  console.log("📊 Resumen de diagnóstico:", diagnostics);
  return diagnostics;
};

export const testImageUpload = async (bucketName = 'implementos-img') => {
  try {
    console.log(`🧪 Probando subida de imagen al bucket ${bucketName}...`);
    
    // Crear un archivo de prueba (1x1 pixel PNG)
    const testImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    const response = await fetch(testImageData);
    const blob = await response.blob();
    
    const fileName = `test_${Date.now()}.png`;
    
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(fileName, blob, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("❌ Error en prueba de subida:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Prueba de subida exitosa:", data);
    
    // Limpiar archivo de prueba
    await supabase
      .storage
      .from(bucketName)
      .remove([fileName]);
    
    return { success: true, data };
    
  } catch (err) {
    console.error("❌ Error inesperado en prueba de subida:", err);
    return { success: false, error: err.message };
  }
};
