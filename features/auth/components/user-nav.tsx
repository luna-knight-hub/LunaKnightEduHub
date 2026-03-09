'use client';

import Link from 'next/link';

import { useUser } from '@/features/auth/hooks';
import { logout } from '@/features/auth/actions';

/**
 * Component hiển thị trạng thái user ở navigation bar.
 * - Chưa đăng nhập → nút Đăng nhập / Đăng ký
 * - Đã đăng nhập → avatar + tên + nút Đăng xuất
 */
export function UserNav() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-20 animate-pulse rounded-lg bg-[var(--muted)]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)] transition-all duration-200 hover:bg-[var(--primary-hover)] hover:shadow-md"
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  const displayName =
    user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3">
      {/* Avatar + Name */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-xs font-bold text-white">
          {initials}
        </div>
        <span className="hidden text-sm font-medium text-[var(--foreground)] sm:inline">
          {displayName}
        </span>
      </div>

      {/* Logout */}
      <form action={logout}>
        <button
          type="submit"
          className="rounded-lg px-3 py-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
        >
          Đăng xuất
        </button>
      </form>
    </div>
  );
}
