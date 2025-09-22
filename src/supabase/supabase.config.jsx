import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_DATABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
