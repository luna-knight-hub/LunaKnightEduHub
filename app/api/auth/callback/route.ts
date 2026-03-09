import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

/**
 * Auth callback handler.
 *
 * Khi user xác nhận email hoặc login qua OAuth, Supabase redirect về
 * `/api/auth/callback?code=xxx`. Route này exchange code → session cookie
 * rồi redirect user đến trang đích.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect đến trang đích sau khi exchange thành công
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Nếu không có code hoặc exchange lỗi → redirect về trang lỗi
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
