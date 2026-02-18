// src/components/NavBar.tsx
const navItems = [
  { label: "Home", id: "home" },
  { label: "Education", id: "education" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export function NavBar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <button
          onClick={() => scrollTo("home")}
          className="text-sm font-semibold tracking-tight text-white/90 hover:text-white"
        >
          Vedant Nandoskar
        </button>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
