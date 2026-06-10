import { motion } from "framer-motion";

const clients = [
  {
    name: "Kanan Devan Hills Tea Plantation",
    short: "KDHP",
    sub: "Munnar · Tea Plantations",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    name: "Tamil Nadu Newsprint & Papers",
    short: "TNPL",
    sub: "Paper & Newsprint",
    color: "from-green-600 to-green-800",
  },
  {
    name: "Pricol Pvt Ltd",
    short: "PRICOL",
    sub: "Automotive Components",
    color: "from-slate-700 to-slate-900",
  },
  {
    name: "ST Courier",
    short: "ST",
    sub: "Logistics & Courier",
    color: "from-red-600 to-red-800",
  },
  {
    name: "Saint-Gobain",
    short: "SG",
    sub: "Glass & Materials",
    color: "from-blue-700 to-indigo-900",
  },
  {
    name: "Suguna Foods",
    short: "SUGUNA",
    sub: "Poultry & Food",
    color: "from-orange-600 to-red-700",
  },
  {
    name: "ISF Pvt Ltd",
    short: "ISF",
    sub: "Industrial Solutions",
    color: "from-rose-600 to-rose-800",
  },
  {
    name: "ELGI Rubber",
    short: "ELGI",
    sub: "Rubber & Equipment",
    color: "from-zinc-700 to-zinc-900",
  },
  {
    name: "IIT Chennai",
    short: "IIT-M",
    sub: "Research & Academia",
    color: "from-sky-700 to-blue-900",
  },
  {
    name: "Tube Investments of India",
    short: "TII",
    sub: "Engineering · Murugappa",
    color: "from-cyan-700 to-teal-900",
  },
  {
    name: "Murugappa Group",
    short: "MURUGAPPA",
    sub: "Diversified Conglomerate",
    color: "from-amber-700 to-orange-900",
  },
  {
    name: "C.R.I Pumps",
    short: "CRI",
    sub: "Pumps & Motors",
    color: "from-indigo-700 to-violet-900",
  },
];

export default function ClientsMarquee() {
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
            Our Customers
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-4xl font-bold text-brand-900">
            Trusted by industry leaders across India
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
