import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../database/types.ts'

// Create a single supabase client for interacting with your database
// TODO: Securely store your supabase URL and key in environment variables
export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
