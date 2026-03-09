export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background relative min-h-screen">
      {/* Game layout — fullscreen, minimal chrome */}
      {children}
    </div>
  );
}
