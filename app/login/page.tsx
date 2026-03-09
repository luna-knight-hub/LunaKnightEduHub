import type { Metadata } from 'next';
import Link from 'next/link';

import { LoginForm } from '@/features/auth/components';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập vào LunaKnightEduHub để truy cập tất cả tính năng.',
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
}) {
  // searchParams is a Promise in Next.js 15+ but we don't await it in RSC render
  // We pass it to the client component if needed

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[var(--primary)] opacity-[0.07] blur-[128px]" />
        <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-[var(--secondary)] opacity-[0.07] blur-[128px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="animate-fade-in mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">LunaKnight</span>
              <span className="text-[var(--foreground)]">EduHub</span>
            </h1>
          </Link>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Đăng nhập để tiếp tục
          </p>
        </div>

        {/* Card */}
        <div
          className="animate-fade-in rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg"
          style={{ animationDelay: '100ms' }}
        >
          <LoginForm />
        </div>

        {/* Footer links */}
        <p
          className="animate-fade-in mt-6 text-center text-sm text-[var(--muted-foreground)]"
          style={{ animationDelay: '200ms' }}
        >
          Chưa có tài khoản?{' '}
          <Link
            href="/register"
            className="font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)] hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </main>
  );
}
