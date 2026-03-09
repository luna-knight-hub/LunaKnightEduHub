'use client';

import { useActionState } from 'react';

import { login, type AuthResult } from '@/features/auth/actions';

const initialState: AuthResult = { error: null, success: false };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: AuthResult, formData: FormData) => {
      return await login(formData);
    },
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {/* Error message */}
      {state.error && (
        <div className="animate-fade-in rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <span className="mr-2">⚠️</span>
          {state.error}
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="focus-ring block w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition-colors duration-200 focus:border-[var(--primary)]"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Mật khẩu
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="focus-ring block w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition-colors duration-200 focus:border-[var(--primary)]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="focus-ring relative w-full overflow-hidden rounded-lg bg-[var(--primary)] px-4 py-3 font-semibold text-[var(--primary-foreground)] transition-all duration-300 hover:bg-[var(--primary-hover)] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Đang đăng nhập...
          </span>
        ) : (
          'Đăng nhập'
        )}
      </button>
    </form>
  );
}
