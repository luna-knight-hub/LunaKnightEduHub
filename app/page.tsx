export default function HomePage() {
  return (
    <main className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-primary/20 absolute -top-32 -left-32 h-96 w-96 rounded-full blur-[128px]" />
        <div className="bg-secondary/20 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-[128px]" />
        <div className="bg-accent/10 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[96px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in border-border bg-card/50 text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
          </span>
          Đang xây dựng — Sprint 1: Foundation
        </div>

        {/* Heading */}
        <h1
          className="animate-fade-in mb-6 text-5xl font-bold tracking-tight md:text-7xl"
          style={{ animationDelay: '100ms' }}
        >
          <span className="text-gradient">LunaKnight</span>
          <br />
          <span className="text-foreground">EduHub</span>
        </h1>

        {/* Description */}
        <p
          className="animate-fade-in text-muted-foreground mx-auto mb-10 max-w-xl text-lg leading-relaxed md:text-xl"
          style={{ animationDelay: '200ms' }}
        >
          Nền tảng cá nhân tích hợp <span className="text-foreground font-semibold">Blog</span>,{' '}
          <span className="text-foreground font-semibold">Portfolio</span> và{' '}
          <span className="text-foreground font-semibold">Kho ứng dụng giáo dục</span>.
        </p>

        {/* Feature cards */}
        <div
          className="animate-fade-in mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
          style={{ animationDelay: '300ms' }}
        >
          {[
            {
              icon: '📝',
              title: 'Blog',
              desc: 'Chia sẻ kiến thức',
            },
            {
              icon: '💼',
              title: 'Portfolio',
              desc: 'Dự án & thành tích',
            },
            {
              icon: '🎮',
              title: 'Game Hub',
              desc: 'Mê cung tri thức',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group border-border bg-card/60 hover:border-primary/40 rounded-xl border p-5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="mb-3 block text-3xl transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </span>
              <h3 className="text-card-foreground mb-1 font-semibold">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p
          className="animate-fade-in text-muted-foreground mt-12 text-sm"
          style={{ animationDelay: '400ms' }}
        >
          Xây dựng với ❤️ bởi <span className="text-foreground font-medium">Ngô Quang Hải</span> ·
          Next.js + Tailwind CSS
        </p>
      </div>
    </main>
  );
}
