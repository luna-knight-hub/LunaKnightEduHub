export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TODO: Navbar component sẽ được thêm ở Sprint 1 */}
      <main className="flex-1">{children}</main>
      {/* TODO: Footer component sẽ được thêm ở Sprint 1 */}
    </div>
  );
}
