'use client';

import { useState } from 'react';
import { useActionState } from 'react';

import { register, type AuthResult } from '@/features/auth/actions';

const initialState: AuthResult = { error: null, success: false };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: AuthResult, formData: FormData) => {
      return await register(formData);
    },
    initialState,
  );

  const [showPassword, setShowPassword] = useState(false);

  // Nếu đăng ký thành công → hiện thông báo kiểm tra email
  if (state.success) {
    return (
      <div className="animate-fade-in space-y-4 rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-6 text-center">
        <div className="text-4xl">📧</div>
        <h3 className="text-lg font-semibold text-emerald-400">
          Kiểm tra hộp thư của bạn!
        </h3>
        <p className="text-sm text-[var(--muted-foreground)]">
          Chúng tôi đã gửi link xác nhận đến email của bạn. Vui lòng kiểm tra
          hộp thư (và thư mục spam) để hoàn tất đăng ký.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Error message */}
      {state.error && (
        <div className="animate-fade-in rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <span className="mr-2">⚠️</span>
          {state.error}
        </div>
      )}

      {/* Full name */}
      <div className="space-y-2">
        <label
          htmlFor="register-fullname"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Họ và tên
        </label>
        <input
          id="register-fullname"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          className="focus-ring block w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition-colors duration-200 focus:border-[var(--primary)]"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="register-email"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="register-email"
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
          htmlFor="register-password"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Mật khẩu <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            id="register-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Tối thiểu 6 ký tự"
            className="focus-ring block w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 pr-12 text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition-colors duration-200 focus:border-[var(--primary)]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-[var(--muted-foreground)]">
          Mật khẩu phải có ít nhất 6 ký tự.
        </p>
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
            Đang xử lý...
          </span>
        ) : (
          'Tạo tài khoản'
        )}
      </button>
    </form>
  );
}
