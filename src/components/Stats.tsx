import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 5000, suffix: "+", label: "Projects Executed" },
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 40, suffix: "+", label: "Conveyor Models" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, to]);
  return (
    <span
      ref={ref}
      className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-br from-brand-900 to-brand-600 bg-clip-text text-transparent tabular-nums"
    >
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-brand-50 via-white to-accent-400/10 border border-brand-100 p-8 md:p-12 shadow-soft overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-accent-400/10 blur-3xl" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center"
              >
                <Counter to={s.value} suffix={s.suffix} />
                <div className="mt-2 text-brand-700/70 font-medium text-sm md:text-base">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
