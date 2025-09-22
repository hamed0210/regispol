import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.SUPABASE_DATABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
)
