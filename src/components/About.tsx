import { motion } from "framer-motion";
import {
  CheckCircle2,
  Factory,
  Wrench,
  Award,
  Target,
  Eye,
} from "lucide-react";
import { useContent } from "../data/ContentContext";

export default function About() {
  const c = useContent().about;
  const strengths = c.strengths;
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* Image collage */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative aspect-[5/6] w-full max-w-md mx-auto rounded-[28px] overflow-hidden shadow-[0_30px_70px_-25px_rgba(8,26,56,0.4)] border border-white/60">
            <img
              src="/products/belt-conveyor.jpg"
              alt="Icon Conveyors manufacturing floor"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/65 via-brand-900/10 to-transparent" />
            <div className="absolute bottom-4 inset-x-4 text-white">
              <div className="text-[10px] uppercase tracking-widest font-semibold opacity-80">
                Coimbatore Plant
              </div>
              <div className="font-display text-lg font-bold">
                In-house fabrication & QC
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -z-10 -top-8 -right-6 size-44 rounded-full bg-accent-400/30 blur-3xl"
          />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-2 md:-right-6 w-60 glass rounded-2xl p-4 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                <Award className="size-5 text-accent-600" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-500 font-semibold">
                  ISO 9001:2015
                </div>
                <div className="text-sm font-semibold text-brand-900">
                  Certified Quality
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-2 md:-left-6 w-60 glass rounded-2xl p-4 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-brand-500/15 flex items-center justify-center">
                <Factory className="size-5 text-brand-600" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-500 font-semibold">
                  Coimbatore HQ
                </div>
                <div className="text-sm font-semibold text-brand-900">
                  Est. 2017 · Tamil Nadu
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            <Wrench className="size-4 text-accent-500" /> {c.badge}
          </div>

          <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-brand-900 leading-tight">
            {c.headingLead}{" "}
            <span className="text-brand-500">{c.headingHighlight}</span>
          </h2>

          <p className="mt-5 text-brand-800/75 text-lg leading-relaxed">
            {c.paragraph1}
          </p>
          <p className="mt-4 text-brand-800/75 leading-relaxed">
            {c.paragraph2}
          </p>

          <ul className="mt-7 grid sm:grid-cols-2 gap-2.5">
            {strengths.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-accent-500 mt-0.5 shrink-0" />
                <span className="text-brand-800 text-sm">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#products"
              className="rounded-full bg-brand-700 hover:bg-brand-600 text-white font-semibold px-6 py-3 transition-colors"
            >
              See Our Products
            </a>
            <a
              href="#contact"
              className="rounded-full border border-brand-300 hover:border-brand-500 text-brand-800 font-semibold px-6 py-3 transition-colors"
            >
              Talk to an Engineer
            </a>
          </div>
        </motion.div>
      </div>

      {/* Mission + Vision */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8 mt-24 grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 text-white p-8 md:p-10 overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 size-48 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="relative">
            <div className="size-12 rounded-xl bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
              <Target className="size-6 text-accent-400" />
            </div>
            <h3 className="mt-5 font-display text-2xl md:text-3xl font-bold">
              Our Mission
            </h3>
            <p className="mt-3 text-white/80 leading-relaxed">{c.mission}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative rounded-3xl bg-gradient-to-br from-accent-500 to-accent-600 text-brand-950 p-8 md:p-10 overflow-hidden"
        >
          <div className="absolute -bottom-10 -left-10 size-48 rounded-full bg-brand-700/20 blur-3xl" />
          <div className="relative">
            <div className="size-12 rounded-xl bg-brand-900/15 border border-brand-900/20 flex items-center justify-center">
              <Eye className="size-6 text-brand-900" />
            </div>
            <h3 className="mt-5 font-display text-2xl md:text-3xl font-bold">
              Our Vision
            </h3>
            <p className="mt-3 text-brand-900/85 leading-relaxed">{c.vision}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
