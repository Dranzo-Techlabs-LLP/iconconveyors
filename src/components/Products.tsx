import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { YoutubeIcon } from "./SocialIcons";
import {
  CATEGORIES,
  defaultProducts,
  fetchProducts,
  productImages,
  type Category,
  type Product,
} from "../data/products";

type Filter = "All" | Category;
const filters: Filter[] = ["All", ...CATEGORIES];

// Auto-playing crossfade slider for a product's gallery.
function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(
      () => setIdx((v) => (v + 1) % images.length),
      3200
    );
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <>
      <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-105">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={title}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-contain p-3 transition-opacity duration-700 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
              className={`size-1.5 rounded-full transition-colors ${
                i === idx ? "bg-accent-500" : "bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function Products() {
  const [items, setItems] = useState<Product[]>(defaultProducts);
  const [active, setActive] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  // Pick up live catalogue (admin edits) when the API is running.
  useEffect(() => {
    fetchProducts().then((d) => {
      if (d) setItems(d);
    });
  }, []);

  const filtered = useMemo(
    () =>
      items.filter((p) => {
        const inCat = active === "All" || p.category === active;
        const inQ =
          !query.trim() ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.desc.toLowerCase().includes(query.toLowerCase());
        return inCat && inQ;
      }),
    [items, active, query]
  );

  return (
    <section
      id="products"
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-brand-50/40 to-white"
    >
      <div className="absolute inset-0 bg-dot opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000_30%,transparent_80%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft"
          >
            <span className="size-1.5 rounded-full bg-accent-500" />
            Our Products · {items.length} Systems
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 font-display text-3xl md:text-5xl font-bold text-brand-900 leading-[1.1] tracking-tight"
          >
            A complete catalogue of conveyors,
            <br className="hidden md:block" />{" "}
            <span className="text-brand-500">engineered to your line</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 text-brand-800/70 text-lg"
          >
            Pick a system. We size, fabricate, install and service it.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active === c
                    ? "text-white"
                    : "text-brand-700 hover:text-brand-900 bg-white border border-brand-100"
                }`}
              >
                {active === c && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full bg-brand-700"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-brand-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full md:w-72 rounded-full bg-white border border-brand-100 focus:border-brand-400 outline-none pl-11 pr-4 py-2.5 text-sm"
            />
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i, 8) * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-brand-100 shadow-soft hover:shadow-[0_28px_60px_-22px_rgba(8,26,56,0.35)] transition-shadow"
              >
                <div className="relative h-60 overflow-hidden bg-gradient-to-b from-white to-brand-50">
                  <ProductGallery images={productImages(p)} title={p.title} />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/80 via-brand-900/20 to-transparent pointer-events-none" />
                  {p.tag && (
                    <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-accent-500 text-brand-950 px-2.5 py-1 rounded-full shadow-md">
                      {p.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-brand-700 px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                  <h3 className="absolute bottom-3 left-4 right-4 font-display text-xl font-bold text-white drop-shadow-lg group-hover:opacity-0 transition-opacity">
                    {p.title}
                  </h3>
                  {p.video && (
                    <a
                      href={p.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Watch ${p.title} video on YouTube`}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-brand-950/55 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] text-white font-bold px-5 py-2.5 text-sm shadow-lg">
                        <YoutubeIcon className="size-5" /> Watch video
                      </span>
                      <span className="px-4 text-center font-display text-base font-bold text-white drop-shadow">
                        {p.title}
                      </span>
                    </a>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-sm text-brand-800/75 leading-relaxed line-clamp-3 min-h-[60px]">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-500 group/btn"
                    >
                      Request quote
                      <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                    <span className="text-xs text-brand-700/50">
                      Price on requirement
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-brand-700/60">
            No products match — try a different category or keyword.
          </div>
        )}
      </div>
    </section>
  );
}
