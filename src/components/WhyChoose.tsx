import { motion } from "framer-motion";
import {
  Settings2,
  ShieldCheck,
  Headphones,
  Truck,
  Ruler,
  Gauge,
} from "lucide-react";
import { useContent } from "../data/ContentContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const icons = [Settings2, ShieldCheck, Gauge, Ruler, Truck, Headphones];

export default function WhyChoose() {
  const c = useContent().whyChoose;
  const reasons = c.items.map((r, i) => ({ ...r, icon: icons[i % icons.length] }));
  return (
    <section id="why" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700"
          >
            {c.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mt-5 font-display text-3xl md:text-5xl font-bold text-brand-900 leading-[1.1] tracking-tight"
          >
            {c.headingLead}{" "}
            <span className="text-brand-500">{c.headingHighlight}</span>
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.55, ease: EASE }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl bg-white border border-brand-100 p-7 shadow-soft hover:shadow-[0_25px_60px_-20px_rgba(8,26,56,0.3)] transition-shadow overflow-hidden"
              >
                <div className="absolute top-0 right-0 size-32 rounded-full bg-gradient-to-br from-brand-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="size-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-glow">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brand-900">
                  {r.title}
                </h3>
                <p className="mt-2 text-brand-700/75 text-sm leading-relaxed">
                  {r.text}
                </p>
                <div className="absolute top-6 right-6 font-display text-5xl font-bold text-brand-100 select-none pointer-events-none">
                  0{i + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
