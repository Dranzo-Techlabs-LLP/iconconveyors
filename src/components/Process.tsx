import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    n: "01",
    title: "Consult",
    text: "Share your material, throughput and floor plan. Our engineers brief you on the right approach.",
  },
  {
    n: "02",
    title: "Design",
    text: "We produce a 3D layout, BOM and dimensioned drawings — sized precisely to your line.",
  },
  {
    n: "03",
    title: "Fabricate",
    text: "In-house fabrication in Coimbatore with full QC sign-off before dispatch.",
  },
  {
    n: "04",
    title: "Install & Support",
    text: "Site install, commissioning, operator training, and a clear AMC + spares plan.",
  },
];

export default function Process() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-brand-50/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft"
          >
            Our Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mt-5 font-display text-3xl md:text-5xl font-bold text-brand-900 leading-[1.1] tracking-tight"
          >
            From idea to installed line in{" "}
            <span className="text-brand-500">four clear steps.</span>
          </motion.h2>
        </div>

        <div className="mt-16 relative">
          {/* Connector belt graphic */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-2 rounded-full belt-stripes opacity-30 animate-belt" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid md:grid-cols-4 gap-6"
          >
            {steps.map((s) => (
              <motion.div
                key={s.n}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: EASE }}
                whileHover={{ y: -4 }}
                className="relative bg-white rounded-2xl p-6 border border-brand-100 shadow-soft hover:shadow-[0_20px_50px_-18px_rgba(8,26,56,0.3)] transition-shadow"
              >
                <div className="size-12 rounded-full bg-brand-700 text-white font-display font-bold flex items-center justify-center shadow-glow relative z-10">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brand-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-brand-700/75 text-sm leading-relaxed">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
