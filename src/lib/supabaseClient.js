import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gsqpsnpdfszzpjakaykj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcXBzbnBkZnN6enBqYWtheWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4ODA3NTYsImV4cCI6MjA2NDQ1Njc1Nn0.ZhdMRgpA4HL5N2OB1wt-ceg_yHiEDz1xbLe5EHgvYHc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        storageKey: 'agropecuaria-auth',
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});