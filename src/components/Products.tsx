import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

type Category =
  | "All"
  | "Belt"
  | "Screw"
  | "Roller"
  | "Chain"
  | "Loading"
  | "Packaging"
  | "Specialty";

type Product = {
  title: string;
  desc: string;
  img: string;
  category: Exclude<Category, "All">;
  tag?: string;
};

const products: Product[] = [
  // Belt
  {
    title: "Belt Conveyor System",
    desc: "Heavy-duty continuous belt system built for high-volume, long-distance transport of bulk material across factories and yards.",
    img: "/products/belt-conveyor.jpg",
    category: "Belt",
    tag: "Most Popular",
  },
  {
    title: "Aluminium Belt Conveyor",
    desc: "Lightweight modular aluminium profile frame for smooth, efficient material handling and quick customisation.",
    img: "/products/aluminium-belt.jpg",
    category: "Belt",
    tag: "Modular",
  },
  {
    title: "Cleated Belt Conveyor",
    desc: "Raised cleats on the belt move materials up steep inclines without sliding or spillage.",
    img: "/products/cleated-belt.jpg",
    category: "Belt",
    tag: "Incline",
  },
  {
    title: "Side Wall Cleated Conveyor",
    desc: "Flexible sidewalls plus cleats deliver spillage-free handling of bulk material at steep or vertical angles.",
    img: "/products/sidewall-cleated.jpg",
    category: "Belt",
    tag: "Vertical",
  },
  {
    title: "Modular Belt Conveyor",
    desc: "Exceptional flexibility for hygienic food, pharma and manufacturing lines — modular plastic belt with easy section replacement.",
    img: "/products/modular-belt.jpg",
    category: "Belt",
    tag: "Food Grade",
  },
  {
    title: "Inclined Belt Conveyor",
    desc: "Sidewalls and cleats for secure, efficient transport of bulk material at steep angles without spillage.",
    img: "/products/inclined-belt.jpg",
    category: "Belt",
  },
  {
    title: "SS Belt Conveyor",
    desc: "Stainless-steel frame and belt — hygienic, corrosion-resistant, ideal for food, pharma and cleanroom applications.",
    img: "/products/ss-belt.jpg",
    category: "Belt",
    tag: "SS 304/316",
  },

  // Screw
  {
    title: "Screw Conveyor",
    desc: "Helical design for efficient, enclosed transport of bulk material in horizontal, inclined or vertical layouts.",
    img: "/products/screw-conveyor.jpg",
    category: "Screw",
  },
  {
    title: "Inclined Screw Conveyor",
    desc: "Enclosed helical transport of bulk material at upward angles — sealed against dust and spillage.",
    img: "/products/inclined-screw.jpg",
    category: "Screw",
  },
  {
    title: "U-Trough Screw Conveyor",
    desc: "Robust U-trough construction for smooth, efficient handling of bulk material in horizontal or slight incline.",
    img: "/products/u-trough-screw.jpg",
    category: "Screw",
  },
  {
    title: "Pipe Type Screw Conveyor",
    desc: "Sealed tubular design for safe, dust-free, efficient transport — horizontal, inclined or vertical.",
    img: "/products/pipe-screw.jpg",
    category: "Screw",
    tag: "Dust-Free",
  },

  // Roller
  {
    title: "Roller Conveyor",
    desc: "Steel roller bed for cartons, totes and palletised goods — backbone of packaging and warehouse lines.",
    img: "/products/roller-conveyor.jpg",
    category: "Roller",
  },
  {
    title: "Gravity Roller Conveyor",
    desc: "Simple, cost-effective free-rolling design for smooth manual movement of goods in horizontal or inclined setups.",
    img: "/products/gravity-roller.jpg",
    category: "Roller",
  },
  {
    title: "Motorized Roller Conveyor",
    desc: "Powered rollers for efficient, automated and controlled movement of goods — reliable material handling.",
    img: "/products/motorized-roller.webp",
    category: "Roller",
    tag: "Powered",
  },
  {
    title: "Flexible Roller Conveyor",
    desc: "Extendable, bendable design moves goods around dynamic spaces and adaptable workflows.",
    img: "/products/flexible-roller.webp",
    category: "Roller",
    tag: "Extendable",
  },

  // Chain
  {
    title: "Chain Conveyor",
    desc: "Heavy-duty chains move pallets, drums and tough industrial loads with reliable, low-maintenance performance.",
    img: "/products/chain-conveyor.jpg",
    category: "Chain",
  },
  {
    title: "SS Slat Chain Conveyor",
    desc: "Stainless-steel slat chain for hygienic, durable, smooth transport of heavy loads in food, pharma and packaging.",
    img: "/products/ss-slat-chain.jpg",
    category: "Chain",
    tag: "SS Hygienic",
  },
  {
    title: "MS Slat Chain Conveyor",
    desc: "Sturdy mild-steel slat chain for durable, efficient and smooth transport of heavy industrial loads.",
    img: "/products/chain-conveyor.jpg",
    category: "Chain",
  },
  {
    title: "Drag Chain Conveyor",
    desc: "Rugged design uses heavy-duty chains for reliable handling of bulk material in horizontal or inclined runs.",
    img: "/products/chain-conveyor.jpg",
    category: "Chain",
  },
  {
    title: "Vertical Continuous Chain",
    desc: "Robust vertical continuous chain conveyor for space-saving, reliable vertical movement in continuous operations.",
    img: "/products/vertical-chain.webp",
    category: "Chain",
    tag: "Space-Saving",
  },

  // Loading
  {
    title: "Truck Loading Conveyor",
    desc: "Flexible, extendable design for quick, efficient and safe loading or unloading — cuts manual effort and turnaround time.",
    img: "/products/truck-loading.jpg",
    category: "Loading",
    tag: "Logistics",
  },
  {
    title: "Bag Stacker Conveyor",
    desc: "Movable, height-adjustable conveyor for efficient stacking and handling of bags at varying heights.",
    img: "/products/bag-stacker.jpg",
    category: "Loading",
  },
  {
    title: "Bucket Elevator",
    desc: "Vertical bucket design for efficient lifting and continuous transport of grains, powders and granules.",
    img: "/products/bucket-elevator.jpg",
    category: "Loading",
    tag: "Vertical Lift",
  },

  // Packaging
  {
    title: "Double Head Bagging Machine",
    desc: "High-speed dual-head system for accurate weighing, simultaneous bag filling and higher productivity.",
    img: "/products/bag-stacker.jpg",
    category: "Packaging",
    tag: "High Speed",
  },
  {
    title: "Single Head Bagging Machine",
    desc: "Compact single-head design for fast, accurate, efficient filling and packaging of bulk material bags.",
    img: "/products/bag-stacker.jpg",
    category: "Packaging",
  },
  {
    title: "Triple Head Bagging Machine",
    desc: "High-speed triple-head design for fast, accurate, simultaneous filling of multiple bags in bulk packaging.",
    img: "/products/bag-stacker.jpg",
    category: "Packaging",
    tag: "Max Throughput",
  },
  {
    title: "Augerfiller with FFS Machine",
    desc: "Form-fill-seal packaging plus auger filler for precise filling of powders and granules in one efficient system.",
    img: "/products/bag-stacker.jpg",
    category: "Packaging",
    tag: "FFS",
  },
  {
    title: "Gross Weigher Machine",
    desc: "Accurate weighing and filling machine to pack bulk material directly into bags with consistency.",
    img: "/products/bag-stacker.jpg",
    category: "Packaging",
  },

  // Specialty
  {
    title: "Z-Type Conveyor",
    desc: "Cleated belt Z-design for efficient vertical and horizontal transfer of bulk material in limited floor space.",
    img: "/products/z-type.jpg",
    category: "Specialty",
    tag: "Compact",
  },
  {
    title: "90° Curve Conveyor",
    desc: "Space-saving curve design for smooth, efficient product transfer around corners in material handling systems.",
    img: "/products/90-curve.webp",
    category: "Specialty",
  },
  {
    title: "Automatic Segregation Conveyor",
    desc: "Streamlined sorting and segregation for efficient product separation and material handling automation.",
    img: "/products/segregation.jpg",
    category: "Specialty",
    tag: "Smart Sort",
  },
  {
    title: "Assembly Line Conveyor",
    desc: "Smooth product flow that boosts efficiency and productivity across manufacturing assembly processes.",
    img: "/products/assembly-line.jpg",
    category: "Specialty",
  },
  {
    title: "Ribbon Mixing Blender",
    desc: "Helical ribbons for fast, uniform mixing of powders, granules and bulk materials across industries.",
    img: "/products/ribbon-blender.jpg",
    category: "Specialty",
    tag: "Blender",
  },
  {
    title: "Vibrating Conveyor",
    desc: "Controlled vibration moves bulk granular and powdered material with gentle, dust-free handling.",
    img: "/products/roller-conveyor.jpg",
    category: "Specialty",
  },
  {
    title: "Pop-Up Conveyor System",
    desc: "Pop-up diverter for inline product routing — integrates seamlessly into automated packaging flows.",
    img: "/products/segregation.jpg",
    category: "Specialty",
    tag: "Diverter",
  },
];

const categories: Category[] = [
  "All",
  "Belt",
  "Screw",
  "Roller",
  "Chain",
  "Loading",
  "Packaging",
  "Specialty",
];

export default function Products() {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const inCat = active === "All" || p.category === active;
        const inQ =
          !query.trim() ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.desc.toLowerCase().includes(query.toLowerCase());
        return inCat && inQ;
      }),
    [active, query]
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
            Our Products · {products.length} Systems
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
            {categories.map((c) => (
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
                key={p.title}
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
                <div className="relative h-56 overflow-hidden bg-brand-50">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-900/25 to-transparent" />
                  {p.tag && (
                    <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-accent-500 text-brand-950 px-2.5 py-1 rounded-full shadow-md">
                      {p.tag}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-brand-700 px-2.5 py-1 rounded-full">
                    {p.category}
                  </span>
                  <h3 className="absolute bottom-3 left-4 right-4 font-display text-xl font-bold text-white drop-shadow-lg">
                    {p.title}
                  </h3>
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
