import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time or when env vars are missing, return a mock client
    // This prevents build failures while still allowing runtime functionality
    if (typeof window === 'undefined') {
      // Server-side: return a mock client for build time
      return {
        auth: {
          getUser: () => Promise.resolve({ data: { user: null }, error: null }),
          signIn: () => Promise.resolve({ data: null, error: { message: 'Environment variables not configured' } }),
          signOut: () => Promise.resolve({ error: null }),
        },
        from: () => ({
          select: () => ({ data: [], error: { message: 'Environment variables not configured' } }),
          insert: () => ({ data: null, error: { message: 'Environment variables not configured' } }),
          update: () => ({ data: null, error: { message: 'Environment variables not configured' } }),
          delete: () => ({ data: null, error: { message: 'Environment variables not configured' } }),
        }),
      } as any
    }
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}
