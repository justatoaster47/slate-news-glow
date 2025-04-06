import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ensure environment variables are loaded (especially in non-Next.js contexts if needed)
// require('dotenv').config({ path: '.env.local' }); // Uncomment if needed outside Next.js runtime

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!serviceRoleKey) {
  console.error('------------------------------------');
  console.error('*** Missing environment variable: SUPABASE_SERVICE_ROLE_KEY ***');
  console.error('*** Backend operations requiring elevated privileges will fail. ***');
  console.error('*** Please add SUPABASE_SERVICE_ROLE_KEY to your .env.local file. ***');
  console.error('------------------------------------');
  // Decide if you want to throw an error or allow a non-functional client
  // For critical backend tasks, throwing might be safer:
  throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY');
}

// Memoize the client instance to avoid creating it repeatedly
let supabaseAdminClient: SupabaseClient | null = null;

/**
 * Returns a Supabase client instance configured with the service role key.
 * IMPORTANT: Use this client only in server-side code where elevated privileges are required.
 * Never expose the service role key to the client-side.
 */
export const getSupabaseAdminClient = (): SupabaseClient => {
  if (!supabaseAdminClient) {
    console.log("Creating new Supabase Admin Client instance."); // Log instance creation
    supabaseAdminClient = createClient(supabaseUrl!, serviceRoleKey!, {
      auth: {
        // We strongly recommend setting autoRefreshToken and persistSession to false
        // when using the service_role key. This prevents the client from attempting
        // auth operations, which are unnecessary and potentially problematic for service roles.
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false // Explicitly disable URL session detection
      }
    });
  }
  return supabaseAdminClient;
};

// Optionally, export a direct instance if preferred, though the getter is safer for memoization
// export const supabaseAdmin = getSupabaseAdminClient(); 