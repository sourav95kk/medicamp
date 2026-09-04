import { createClient } from '@supabase/supabase-js';

let rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Clean URL in case it has trailing slashes or /rest/v1
const cleanUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

export const isSupabaseConfigured = () => {
  return Boolean(
    cleanUrl && 
    supabaseAnonKey && 
    cleanUrl.startsWith('http') && 
    !cleanUrl.includes('your-project-id')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(cleanUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
