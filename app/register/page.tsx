import type { Metadata } from 'next';
import Link from 'next/link';

import { RegisterForm } from '@/features/auth/components';

export const metadata: Metadata = {
  title: 'Đăng ký',
  description:
    'Tạo tài khoản LunaKnightEduHub để truy cập blog, portfolio và kho ứng dụng giáo dục.',
};

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[var(--secondary)] opacity-[0.07] blur-[128px]" />
        <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-[var(--accent)] opacity-[0.07] blur-[128px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 py-12">
        {/* Logo */}
        <div className="animate-fade-in mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">LunaKnight</span>
              <span className="text-[var(--foreground)]">EduHub</span>
            </h1>
          </Link>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Tạo tài khoản mới
          </p>
        </div>

        {/* Card */}
        <div
          className="animate-fade-in rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-lg"
          style={{ animationDelay: '100ms' }}
        >
          <RegisterForm />
        </div>

        {/* Footer links */}
        <p
          className="animate-fade-in mt-6 text-center text-sm text-[var(--muted-foreground)]"
          style={{ animationDelay: '200ms' }}
        >
          Đã có tài khoản?{' '}
          <Link
            href="/login"
            className="font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)] hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </main>
  );
}
