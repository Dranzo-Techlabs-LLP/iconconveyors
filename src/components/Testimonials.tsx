import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const items = [
  {
    quote:
      "Icon's modular belt line replaced two manual stations on our poultry floor. Throughput jumped 32% in the first month — and zero hygiene complaints since.",
    name: "Karthik R.",
    role: "Plant Head, Food Processing",
  },
  {
    quote:
      "We needed a bucket elevator with a 14-metre lift and zero spillage. They designed, built and commissioned it in under 8 weeks. Outstanding.",
    name: "Suresh N.",
    role: "Operations Manager, Cement",
  },
  {
    quote:
      "The screw conveyor handling our fertiliser blend has been running 18 months without a single service call. That's engineering you can trust.",
    name: "Vignesh S.",
    role: "Maintenance Lead, Agri-Inputs",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            What clients say
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold text-brand-900 leading-tight">
            Quiet conveyors.{" "}
            <span className="text-brand-500">Loud results.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lift relative rounded-2xl bg-white p-7 border border-brand-100 shadow-soft"
            >
              <Quote className="absolute top-5 right-5 size-10 text-brand-100" />
              <div className="flex items-center gap-1 text-accent-500">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-brand-800/90 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-brand-100">
                <div className="font-semibold text-brand-900">{t.name}</div>
                <div className="text-sm text-brand-700/70">{t.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
