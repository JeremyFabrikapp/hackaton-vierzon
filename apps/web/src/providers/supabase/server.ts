import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  return createSupabaseClient(
    process.env.SUPABASE_PROJECT_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )
}