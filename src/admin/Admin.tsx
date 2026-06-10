import { useEffect, useState } from "react";
import {
  Gauge,
  Package,
  Sparkles,
  Award,
  FileText,
  Factory,
  Star,
  ShieldCheck,
  User,
  Quote,
  Phone,
  MapPin,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { getToken, clearToken, login as apiLogin } from "./api";
import { fetchContent, defaultContent, type SiteContent } from "../data/content";
import Dashboard from "./Dashboard";
import ProductsManager from "./ProductsManager";
import ContentEditor from "./ContentEditors";

type NavItem = { key: string; label: string; Icon: typeof Gauge; group: string };

const NAV: NavItem[] = [
  { key: "dashboard", label: "Dashboard", Icon: Gauge, group: "Overview" },
  { key: "products", label: "Products", Icon: Package, group: "Catalogue" },
  { key: "hero", label: "Hero", Icon: Sparkles, group: "Website Content" },
  { key: "stats", label: "Stats / Counters", Icon: Award, group: "Website Content" },
  { key: "about", label: "About", Icon: FileText, group: "Website Content" },
  { key: "industries", label: "Industries", Icon: Factory, group: "Website Content" },
  { key: "whyChoose", label: "Why Choose Us", Icon: Star, group: "Website Content" },
  { key: "quality", label: "Quality & Warranty", Icon: ShieldCheck, group: "Website Content" },
  { key: "clients", label: "Clients", Icon: User, group: "Website Content" },
  { key: "testimonials", label: "Testimonials", Icon: Quote, group: "Website Content" },
  { key: "contact", label: "Contact", Icon: Phone, group: "Website Content" },
  { key: "footer", label: "Footer", Icon: MapPin, group: "Website Content" },
];

// ---------------- Login ----------------
function Login({ onSuccess }: { onSuccess: () => void }) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await apiLogin(userid, password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white/[0.05] backdrop-blur border border-white/10 p-8 text-white">
        <div className="bg-white inline-flex rounded-xl p-2.5">
          <img src="/icon-logo.png" alt="Icon Conveyors" className="h-9 w-auto" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold">Admin Panel</h1>
        <p className="mt-1 text-sm text-white/60">Sign in to manage your website.</p>

        <label className="block mt-6">
          <span className="block text-xs uppercase tracking-widest text-white/60 font-semibold mb-2">User ID</span>
          <input value={userid} onChange={(e) => setUserid(e.target.value)} autoComplete="username" required
            className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-accent-400 outline-none px-4 py-3" />
        </label>
        <label className="block mt-4">
          <span className="block text-xs uppercase tracking-widest text-white/60 font-semibold mb-2">Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required
            className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-accent-400 outline-none px-4 py-3" />
        </label>

        {error && <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{error}</p>}

        <button type="submit" disabled={busy}
          className="mt-6 w-full rounded-full bg-accent-500 hover:bg-accent-400 disabled:opacity-60 text-brand-950 font-bold px-6 py-3 transition-colors">
          {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// ---------------- Shell ----------------
function Shell({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState("dashboard");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    fetchContent().then((c) => {
      if (c) setContent(c);
    });
  }, []);

  const groups = [...new Set(NAV.map((n) => n.group))];

  function go(key: string) {
    setActive(key);
    setNavOpen(false);
  }

  return (
    <div className="min-h-screen bg-brand-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 bg-brand-950 text-white flex flex-col transition-transform ${
          navOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center gap-2 px-5 border-b border-white/10">
          <div className="bg-white rounded-lg p-1.5">
            <img src="/icon-logo.png" alt="Icon Conveyors" className="h-6 w-auto" />
          </div>
          <span className="font-display font-bold">Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {groups.map((g) => (
            <div key={g}>
              <div className="px-3 text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">
                {g}
              </div>
              <div className="space-y-1">
                {NAV.filter((n) => n.group === g).map((n) => (
                  <button
                    key={n.key}
                    onClick={() => go(n.key)}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active === n.key
                        ? "bg-accent-500 text-brand-950"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <n.Icon className="size-4 shrink-0" />
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={onLogout}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 hover:bg-white/10 text-sm font-semibold px-4 py-2 transition-colors">
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </aside>

      {navOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setNavOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-white border-b border-brand-100 h-16 flex items-center justify-between px-5">
          <button className="lg:hidden p-2 -ml-2 text-brand-800" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            {navOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
          <span className="font-display font-bold text-brand-900 hidden sm:block">
            {NAV.find((n) => n.key === active)?.label}
          </span>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="ml-auto text-sm font-semibold text-brand-600 hover:text-brand-500">
            View website ↗
          </a>
        </header>

        <main className="p-5 md:p-8">
          {active === "dashboard" && <Dashboard content={content} onNavigate={go} />}
          {active === "products" && <ProductsManager />}
          {active !== "dashboard" && active !== "products" && (
            <ContentEditor section={active} content={content} onSaved={setContent} />
          )}
        </main>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => !!getToken());
  function logout() {
    clearToken();
    setAuthed(false);
  }
  return authed ? <Shell onLogout={logout} /> : <Login onSuccess={() => setAuthed(true)} />;
}
