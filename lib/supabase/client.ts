import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client cho **Browser** (Client Components).
 *
 * Gọi hàm này mỗi khi cần Supabase ở client-side.
 * @supabase/ssr tự xử lý cookie sync cho session.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
