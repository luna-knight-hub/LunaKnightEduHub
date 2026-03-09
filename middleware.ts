import { type NextRequest } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match tất cả request paths NGOẠI TRỪ:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /studio (Sanity Studio — tự xử lý auth riêng)
     * - /api/revalidate (Sanity webhook — dùng secret key)
     * - Các file ảnh phổ biến (svg, png, jpg, ...)
     */
    '/((?!_next/static|_next/image|favicon.ico|studio|api/revalidate|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
