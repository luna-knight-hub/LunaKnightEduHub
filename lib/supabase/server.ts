import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Supabase client cho **Server** (Server Components, Route Handlers, Server Actions).
 *
 * Phải gọi `await` vì `cookies()` trong Next.js 15+ là async.
 * Client này đọc/ghi cookie để duy trì session.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // `setAll` được gọi từ Server Component — bỏ qua lỗi vì
            // middleware sẽ refresh session trước khi Server Component render.
          }
        },
      },
    },
  );
}
