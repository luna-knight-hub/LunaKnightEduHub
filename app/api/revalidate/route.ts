import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * POST /api/revalidate
 *
 * Sanity webhook gọi endpoint này mỗi khi nội dung được publish/update.
 * → Tự động revalidate cache (ISR) cho trang bị ảnh hưởng.
 *
 * Cấu hình webhook trong Sanity Dashboard:
 *   URL: https://your-domain.com/api/revalidate
 *   Secret: SANITY_WEBHOOK_SECRET (từ .env)
 *   Trigger: Create, Update, Delete
 */
export async function POST(req: NextRequest) {
  try {
    // Xác thực webhook signature
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_WEBHOOK_SECRET);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature', revalidated: false },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: 'Missing document type', revalidated: false },
        { status: 400 },
      );
    }

    // Cache life config — expire immediately to force fresh data
    const purge = { expire: 0 };

    // Revalidate dựa theo loại document
    switch (body._type) {
      case 'post':
        revalidateTag('post', purge);
        // Nếu có slug cụ thể, revalidate thêm trang chi tiết
        if (body.slug?.current) {
          revalidateTag(`post-${body.slug.current}`, purge);
        }
        break;

      case 'educationalApp':
        revalidateTag('app', purge);
        if (body.slug?.current) {
          revalidateTag(`app-${body.slug.current}`, purge);
        }
        break;

      default:
        // Revalidate chung nếu không nhận diện được type
        revalidateTag(body._type, purge);
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug?.current ?? null,
      now: Date.now(),
    });
  } catch (err) {
    console.error('[Revalidate] Error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', revalidated: false },
      { status: 500 },
    );
  }
}
