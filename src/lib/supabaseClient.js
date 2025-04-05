import { createClient } from '@supabase/supabase-js';

// Read Supabase URL and Anon Key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate that the environment variables are set
if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create and export the Supabase client instance
// We are *not* using the auth helpers here initially as we are skipping auth setup for now.
// If auth is added later, this might need to be replaced or supplemented with
// createServerComponentClient, createClientComponentClient, etc.
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 