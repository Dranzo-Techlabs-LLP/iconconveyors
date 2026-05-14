import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/85 border-b border-brand-100 shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <img
            src="/icon-logo.png"
            alt="Icon Conveyors"
            className="h-10 md:h-11 w-auto select-none"
            draggable={false}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-brand-800 hover:text-brand-500 transition-colors"
            >
              <span>{l.label}</span>
              <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-accent-500 scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+918807209964"
            className="flex items-center gap-2 text-sm font-medium text-brand-800 hover:text-brand-500"
          >
            <Phone className="size-4" /> +91 88072 09964
          </a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-brand-700 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 shadow-glow"
          >
            <span className="relative z-10">Get a Quote</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
          </motion.a>
        </div>

        <button
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-md text-brand-800 hover:bg-brand-50"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-t border-brand-100"
          >
            <div className="px-5 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-brand-800 hover:bg-brand-50 font-medium"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 text-center rounded-full bg-brand-700 text-white font-semibold px-5 py-3"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
