import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CMS Studio | LunaKnight EduHub',
  description: 'Quản lý nội dung blog và ứng dụng giáo dục.',
};

/**
 * Studio Layout — KHÔNG có <html>/<body> riêng.
 *
 * Next.js App Router chỉ cho phép 1 root layout duy nhất chứa <html>/<body>.
 * Layout lồng nhau (nested layout) chỉ wrap phần <children> bên trong.
 *
 * Sử dụng `style` inline để override global CSS mà không ảnh hưởng
 * các trang khác. Sanity Studio tự quản lý toàn bộ UI bên trong.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="sanity-studio-root"
      style={{
        // Full viewport — Studio cần chiếm toàn bộ màn hình
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        // Reset các style từ global CSS / root layout
        margin: 0,
        padding: 0,
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
}
