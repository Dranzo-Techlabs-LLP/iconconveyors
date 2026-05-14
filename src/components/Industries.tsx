import { motion } from "framer-motion";
import {
  Utensils,
  Package,
  Factory,
  Cog,
  Truck,
  Wheat,
} from "lucide-react";

const items = [
  {
    icon: Utensils,
    title: "Food Processing",
    desc: "Hygienic SS belt, modular belt and slat-chain conveyors for bakeries, dairies, poultry and ready-meal lines.",
    color: "from-rose-500/20 to-rose-700/0",
  },
  {
    icon: Package,
    title: "Packaging",
    desc: "Roller, modular belt, bagging machines and gross weighers feeding pack-out, sealing and palletising stations.",
    color: "from-amber-500/20 to-amber-700/0",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    desc: "Assembly-line conveyors, slat-chain and aluminium-profile belts engineered for high-volume production floors.",
    color: "from-sky-500/20 to-sky-700/0",
  },
  {
    icon: Cog,
    title: "Engineering",
    desc: "Custom material-handling solutions for foundry, automotive, machine-shop and heavy engineering plants.",
    color: "from-emerald-500/20 to-emerald-700/0",
  },
  {
    icon: Truck,
    title: "Material Handling",
    desc: "Truck loading, bag stacker, bucket elevators and segregation lines for warehouses and logistics hubs.",
    color: "from-violet-500/20 to-violet-700/0",
  },
  {
    icon: Wheat,
    title: "Agriculture & Allied",
    desc: "Cleated and screw conveyors moving grain, seed, feed and fertiliser at farm-to-mill scale.",
    color: "from-lime-500/20 to-lime-700/0",
  },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative py-24 md:py-32 bg-brand-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(245,158,11,0.2),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-light [background-size:48px_48px] opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm font-semibold text-white"
          >
            Industries We Serve
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-5 font-display text-3xl md:text-5xl font-bold leading-tight"
          >
            One conveyor partner.{" "}
            <span className="text-accent-400">Every industry.</span>
          </motion.h2>
          <p className="mt-5 text-brand-100/80 text-lg max-w-2xl">
            From food-grade hygiene to heavy-engineering durability — we
            engineer the right machine for the right floor.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-7 hover:border-accent-400/50 transition-colors overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${it.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <div className="size-12 rounded-xl bg-accent-500/15 border border-accent-500/30 flex items-center justify-center">
                    <Icon className="size-6 text-accent-400" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-brand-100/75 text-sm leading-relaxed">
                    {it.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
