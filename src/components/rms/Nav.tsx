import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollY } from "@/hooks/use-reveal";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Industries", href: "#industries" },
  { label: "Security", href: "#security" },
  { label: "About", href: "#about" },
];

export function Nav() {
  const y = useScrollY();
  const solid = y > 24;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container-rms flex h-16 items-center justify-between gap-6 md:h-18">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="RMS360 home">
          <img src="/rms360-logo.png" alt="RMS360" className="h-9 w-auto max-w-[11rem] object-contain" />
        </a>

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative rounded-sm px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
          >
            Request a Demo
            <ArrowRight className="size-3.5" />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-md border border-border bg-surface/50 text-foreground transition-colors hover:border-primary/50 xl:hidden"
          >
            <span className="relative block size-5">
              <Menu
                className={cn(
                  "absolute inset-0 size-5 transition-all duration-300",
                  open ? "scale-75 rotate-90 opacity-0" : "opacity-100",
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 size-5 transition-all duration-300",
                  open ? "opacity-100" : "scale-75 -rotate-90 opacity-0",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 xl:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-rms flex flex-col py-4">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#demo"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            Request a Demo <ArrowRight className="size-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
