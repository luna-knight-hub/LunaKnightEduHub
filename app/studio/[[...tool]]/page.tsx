/**
 * Sanity Studio — Embedded route
 *
 * Route: /studio (catch-all: /studio/[[...tool]])
 * Đây là "cửa sau" để quản lý nội dung CMS.
 * Studio chạy hoàn toàn client-side, Next.js chỉ serve HTML shell.
 */
'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
