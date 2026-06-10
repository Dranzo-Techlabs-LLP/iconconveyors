import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import IsometricConveyor from "./IsometricConveyor";
import { useContent } from "../data/ContentContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const c = useContent().hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden"
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/30 to-white pointer-events-none" />
      <div className="absolute inset-0 bg-hero-mesh opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-light [background-size:48px_48px] [mask-image:radial-gradient(60%_60%_at_50%_30%,#000_30%,transparent_80%)] opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* LEFT — Copy */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 backdrop-blur px-4 py-1.5 text-sm font-medium text-brand-700 shadow-soft"
          >
            <Sparkles className="size-4 text-accent-500" />
            {c.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
            className="mt-6 font-display text-[2.4rem] md:text-5xl lg:text-[3.75rem] font-bold leading-[1.04] tracking-tight text-brand-900"
          >
            {c.titleLine1}{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-brand-700 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                {c.titleHighlight}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                className="absolute left-0 right-0 -bottom-1 h-2.5 bg-accent-400/35 rounded-full origin-left -z-0"
              />
            </span>
            <br />
            {c.titleLine2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="mt-6 text-base md:text-lg text-brand-800/75 max-w-xl leading-relaxed"
          >
            {c.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-700 hover:bg-brand-600 text-white font-semibold px-7 py-3.5 shadow-glow transition-colors"
            >
              {c.primaryCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-brand-200 hover:border-brand-400 text-brand-800 font-semibold px-6 py-3.5 transition-colors"
            >
              <PlayCircle className="size-5 text-accent-500" />
              {c.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
            }}
            className="mt-10 grid grid-cols-3 gap-6 max-w-md"
          >
            {c.stats.map((s) => (
              <motion.div
                key={s.v}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="font-display text-2xl md:text-3xl font-bold text-brand-800">
                  {s.k}
                </div>
                <div className="mt-1 text-xs md:text-sm text-brand-700/65">
                  {s.v}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — 3D isometric conveyor scene */}
        <motion.div
          style={{ y: imgY, opacity: fade }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.15, ease: EASE }}
          className="lg:col-span-6 relative"
        >
          <IsometricConveyor />
        </motion.div>
      </div>

      {/* Soft bottom fade */}
      <div className="absolute -bottom-1 inset-x-0 h-20 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
}
