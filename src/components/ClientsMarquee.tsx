import { motion } from "framer-motion";
import { useContent } from "../data/ContentContext";

const palette = [
  "from-emerald-600 to-emerald-800",
  "from-green-600 to-green-800",
  "from-slate-700 to-slate-900",
  "from-red-600 to-red-800",
  "from-blue-700 to-indigo-900",
  "from-orange-600 to-red-700",
  "from-rose-600 to-rose-800",
  "from-zinc-700 to-zinc-900",
  "from-sky-700 to-blue-900",
  "from-cyan-700 to-teal-900",
  "from-amber-700 to-orange-900",
  "from-indigo-700 to-violet-900",
];

export default function ClientsMarquee() {
  const c = useContent().clients;
  const clients = c.items.map((cl, i) => ({
    ...cl,
    color: palette[i % palette.length],
  }));
  return (
    <section id="clients" className="border-y border-brand-100 bg-gradient-to-b from-white to-brand-50/40 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-sm tracking-widest text-brand-500 uppercase font-semibold">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold text-brand-900">
            {c.heading}
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {clients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative aspect-[5/3] rounded-2xl bg-white border border-brand-100 shadow-soft overflow-hidden flex flex-col items-center justify-center p-4 text-center"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative">
                <div className="font-display text-lg md:text-xl font-bold text-brand-900 group-hover:text-white tracking-tight">
                  {c.short}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-brand-700/60 group-hover:text-white/85">
                  {c.sub}
                </div>
                <div className="mt-1.5 text-[10px] text-brand-700/45 group-hover:text-white/60 line-clamp-1">
                  {c.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
