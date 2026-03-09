'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

// ── Types ───────────────────────────────────────────────────────
export type AuthResult = {
  error: string | null;
  success: boolean;
};

// ── Login ───────────────────────────────────────────────────────
export async function login(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Vui lòng nhập email và mật khẩu.', success: false };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: getVietnameseError(error.message), success: false };
  }

  // Redirect sau khi login thành công
  redirect('/');
}

// ── Register ────────────────────────────────────────────────────
export async function register(formData: FormData): Promise<AuthResult> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  if (!email || !password) {
    return { error: 'Vui lòng nhập email và mật khẩu.', success: false };
  }

  if (password.length < 6) {
    return { error: 'Mật khẩu phải có ít nhất 6 ký tự.', success: false };
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || '',
      },
      emailRedirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: getVietnameseError(error.message), success: false };
  }

  return {
    error: null,
    success: true,
  };
}

// ── Logout ──────────────────────────────────────────────────────
export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

// ── Helper — Map English error messages to Vietnamese ───────────
function getVietnameseError(message: string): string {
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Email hoặc mật khẩu không đúng.',
    'Email not confirmed': 'Email chưa được xác nhận. Vui lòng kiểm tra hộp thư.',
    'User already registered': 'Email này đã được đăng ký.',
    'Password should be at least 6 characters':
      'Mật khẩu phải có ít nhất 6 ký tự.',
    'Signup requires a valid password': 'Vui lòng nhập mật khẩu hợp lệ.',
    'Unable to validate email address: invalid format':
      'Định dạng email không hợp lệ.',
  };

  return errorMap[message] || `Đã xảy ra lỗi: ${message}`;
}
