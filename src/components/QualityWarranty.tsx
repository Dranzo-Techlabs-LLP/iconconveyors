import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Clock } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    icon: BadgeCheck,
    title: "Quality Policy",
    text: "We deliver products and services that meet or exceed customer expectations — strict quality control at every stage of production, ISO compliance, and continuous improvement in process, technology and workforce skills.",
    badge: "ISO Certified",
  },
  {
    icon: Clock,
    title: "10+ Years Experience",
    text: "Over ten years designing, manufacturing, supplying and installing industrial material-handling systems and conveyor solutions — projects executed reliably across food, packaging, manufacturing and engineering sectors.",
    badge: "Since 2017",
  },
  {
    icon: ShieldCheck,
    title: "One-Year Warranty",
    text: "Every product carries a one-year warranty against manufacturing defects and workmanship under normal operating conditions. Any proven defect is repaired or replaced as per company policy.",
    badge: "12 Months",
  },
];

export default function QualityWarranty() {
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700"
          >
            Quality · Experience · Warranty
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mt-5 font-display text-3xl md:text-5xl font-bold text-brand-900 leading-[1.1] tracking-tight"
          >
            Built to a standard you can{" "}
            <span className="text-brand-500">depend on.</span>
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mt-14 grid md:grid-cols-3 gap-6"
        >
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                variants={{
                  hidden: { opacity: 0, y: 26 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: EASE }}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl bg-gradient-to-br from-brand-50 via-white to-white border border-brand-100 p-8 shadow-soft hover:shadow-[0_25px_60px_-20px_rgba(8,26,56,0.3)] transition-shadow overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 size-40 rounded-full bg-accent-400/10 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-glow">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-accent-500/15 text-accent-600 px-3 py-1 rounded-full">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-brand-900">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-brand-700/75 text-sm leading-relaxed">
                    {c.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
