import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'LunaKnightEduHub — Nền Tảng Giáo Dục & Portfolio',
    template: '%s | LunaKnightEduHub',
  },
  description:
    'Nền tảng cá nhân tích hợp Blog, Portfolio và Kho ứng dụng giáo dục. Xây dựng bởi Ngô Quang Hải.',
  keywords: ['education', 'portfolio', 'blog', 'game', 'knowledge maze', 'edtech'],
  authors: [{ name: 'Ngô Quang Hải' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'LunaKnightEduHub',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
