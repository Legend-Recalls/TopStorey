import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[topstorey] Supabase env vars missing. Recommended properties config will fall back to defaults.',
  )
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
export default supabase
