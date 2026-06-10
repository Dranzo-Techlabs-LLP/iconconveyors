import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ImagePlus, Pencil, Plus, Trash2, X } from "lucide-react";
import { YoutubeIcon } from "../components/SocialIcons";
import { CATEGORIES, type Category, type Product } from "../data/products";
import { api } from "./api";

// Card identical to the public site card, used for the live preview.
function PreviewCard({ p }: { p: Partial<Product> }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative overflow-hidden rounded-2xl bg-white border border-brand-100 shadow-soft w-full max-w-sm"
    >
      <div className="relative h-60 overflow-hidden bg-gradient-to-b from-white to-brand-50">
        {p.img ? (
          <img src={p.img} alt={p.title || "Product"} className="w-full h-full object-contain p-3" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-300 text-sm">
            Upload an image to preview
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/80 via-brand-900/20 to-transparent pointer-events-none" />
        {p.tag && (
          <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-accent-500 text-brand-950 px-2.5 py-1 rounded-full shadow-md">
            {p.tag}
          </span>
        )}
        {p.category && (
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-brand-700 px-2.5 py-1 rounded-full">
            {p.category}
          </span>
        )}
        <h3
          className={`absolute bottom-3 left-4 right-4 font-display text-xl font-bold text-white drop-shadow-lg transition-opacity ${
            hover && p.video ? "opacity-0" : ""
          }`}
        >
          {p.title || "Product title"}
        </h3>
        {p.video && (
          <div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-brand-950/55 transition-opacity ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] text-white font-bold px-5 py-2.5 text-sm shadow-lg">
              <YoutubeIcon className="size-5" /> Watch video
            </span>
            <span className="px-4 text-center font-display text-base font-bold text-white drop-shadow">
              {p.title || "Product title"}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-sm text-brand-800/75 leading-relaxed line-clamp-3 min-h-[60px]">
          {p.desc || "Product description appears here…"}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
            Request quote <ArrowUpRight className="size-4" />
          </span>
          <span className="text-xs text-brand-700/50">Price on requirement</span>
        </div>
      </div>
    </article>
  );
}

type FormState = {
  title: string;
  desc: string;
  category: Category;
  tag: string;
  video: string;
  img: string;
};
const emptyForm: FormState = { title: "", desc: "", category: "Belt", tag: "", video: "", img: "" };

function ProductForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: Product | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<FormState>(
    initial
      ? {
          title: initial.title,
          desc: initial.desc,
          category: initial.category,
          tag: initial.tag || "",
          video: initial.video || "",
          img: initial.img,
        }
      : emptyForm
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("image", file);
      const name = encodeURIComponent(form.title || file.name);
      const data = await api<{ path: string }>(
        `/api/upload?name=${name}`,
        { method: "POST", body: fd },
        false
      );
      set("img", data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const body = JSON.stringify({
        title: form.title,
        desc: form.desc,
        category: form.category,
        tag: form.tag,
        video: form.video,
        img: form.img,
      });
      if (initial) await api(`/api/products/${initial.id}`, { method: "PUT", body });
      else await api("/api/products", { method: "POST", body });
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  const label = "block text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1.5";
  const input = "w-full rounded-xl bg-white border border-brand-100 focus:border-brand-400 outline-none px-4 py-2.5 text-sm text-brand-900";

  return (
    <div className="fixed inset-0 z-50 bg-brand-950/60 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto p-4">
      <div className="w-full max-w-4xl rounded-3xl bg-brand-50 border border-brand-100 shadow-2xl my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-100 sticky top-0 bg-brand-50 rounded-t-3xl">
          <h2 className="font-display text-xl font-bold text-brand-900">
            {initial ? `Edit — ${initial.title}` : "Add New Product"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-100 text-brand-700" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={save} className="grid md:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <div>
              <span className={label}>Product Name *</span>
              <input value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="e.g. Inclined Belt Conveyor" className={input} />
            </div>
            <div>
              <span className={label}>Description *</span>
              <textarea value={form.desc} onChange={(e) => set("desc", e.target.value)} required rows={4} placeholder="Short description shown on the card…" className={input} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className={label}>Category *</span>
                <select value={form.category} onChange={(e) => set("category", e.target.value as Category)} className={input}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className={label}>Badge / Tag (optional)</span>
                <input value={form.tag} onChange={(e) => set("tag", e.target.value)} placeholder="e.g. High Speed" className={input} />
              </div>
            </div>
            <div>
              <span className={label}>YouTube Video Link (optional)</span>
              <input value={form.video} onChange={(e) => set("video", e.target.value)} placeholder="https://youtu.be/…" className={input} />
              <p className="mt-1 text-[11px] text-brand-700/60">
                Paste a YouTube link — a "Watch video" button appears when visitors hover the product.
              </p>
            </div>
            <div>
              <span className={label}>Product Image *</span>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadImage(f);
                  e.target.value = "";
                }}
              />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                className="w-full rounded-xl border-2 border-dashed border-brand-200 hover:border-brand-400 bg-white px-4 py-5 flex flex-col items-center gap-2 text-brand-600 transition-colors disabled:opacity-60">
                <ImagePlus className="size-6" />
                <span className="text-sm font-semibold">
                  {uploading ? "Uploading…" : form.img ? "Replace image" : "Upload image (JPG / PNG / WebP)"}
                </span>
                {form.img && <span className="text-[11px] text-brand-700/60">{form.img}</span>}
              </button>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={busy || uploading}
                className="rounded-full bg-brand-700 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold px-7 py-3 transition-colors">
                {busy ? "Saving…" : initial ? "Save Changes" : "Add Product"}
              </button>
              <button type="button" onClick={onClose}
                className="rounded-full border border-brand-200 hover:border-brand-400 text-brand-800 font-semibold px-6 py-3 transition-colors">
                Cancel
              </button>
            </div>
          </div>

          <div>
            <span className={label}>Live Preview — how it appears on the site</span>
            <p className="text-[11px] text-brand-700/60 mb-3">Hover the card to test the video button.</p>
            <PreviewCard p={{ ...form, tag: form.tag || undefined, video: form.video || undefined }} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");

  async function load() {
    try {
      setProducts(await api<Product[]>("/api/products"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function remove(p: Product) {
    if (!window.confirm(`Delete "${p.title}" from the website?`)) return;
    try {
      await api(`/api/products/${p.id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  const shown = products.filter(
    (p) =>
      !filter.trim() ||
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-900">Products</h1>
          <p className="text-sm text-brand-700/70 mt-1">{products.length} products live on the website</p>
        </div>
        <div className="flex items-center gap-3">
          <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search…"
            className="rounded-full bg-white border border-brand-100 focus:border-brand-400 outline-none px-4 py-2.5 text-sm w-44" />
          <button onClick={() => setAdding(true)}
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 text-sm transition-colors shrink-0">
            <Plus className="size-4" /> Add Product
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shown.map((p) => (
          <div key={p.id} className="rounded-2xl bg-white border border-brand-100 shadow-soft overflow-hidden flex flex-col">
            <div className="relative h-40 bg-gradient-to-b from-white to-brand-50">
              <img src={p.img} alt={p.title} className="w-full h-full object-contain p-2" />
              <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-brand-900/85 text-white px-2 py-0.5 rounded-full">
                {p.category}
              </span>
              {p.video && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] font-bold bg-[#FF0000] text-white px-2 py-0.5 rounded-full">
                  <YoutubeIcon className="size-3" /> VIDEO
                </span>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-display font-bold text-brand-900 leading-snug">{p.title}</h3>
              <p className="mt-1 text-xs text-brand-700/70 line-clamp-2 flex-1">{p.desc}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditing(p)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-50 hover:bg-brand-100 border border-brand-100 text-brand-800 text-xs font-bold px-3 py-2 transition-colors">
                  <Pencil className="size-3.5" /> Edit
                </button>
                <button onClick={() => remove(p)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-100 text-red-700 text-xs font-bold px-3 py-2 transition-colors">
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {shown.length === 0 && !error && (
        <p className="mt-10 text-center text-brand-700/60">No products match your search.</p>
      )}

      {(adding || editing) && (
        <ProductForm
          initial={editing}
          onClose={() => {
            setAdding(false);
            setEditing(null);
          }}
          onSaved={() => {
            setAdding(false);
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}
