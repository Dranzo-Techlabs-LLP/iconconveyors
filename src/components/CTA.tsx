import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, FileText, User } from "lucide-react";
import { useState } from "react";
import { WhatsappIcon } from "./SocialIcons";
import { useContent } from "../data/ContentContext";

export default function CTA() {
  const c = useContent().contact;
  const [sent, setSent] = useState(false);
  const telHref = "tel:" + (c.phones[0] || "").replace(/[^0-9+]/g, "");
  const waHref = `https://wa.me/${c.whatsapp}?text=Hi%20Icon%20Conveyors%2C%20I%27d%20like%20a%20quote%20for`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(c.mapEmbedQuery)}&output=embed`;
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-brand-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(31,78,148,0.45),transparent_60%),radial-gradient(40%_40%_at_90%_100%,rgba(245,158,11,0.3),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-light [background-size:48px_48px] opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm font-semibold">
            {c.badge}
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-tight">
            {c.headingLead}{" "}
            <span className="text-accent-400">{c.headingHighlight}</span>
          </h2>
          <p className="mt-5 text-white/75 text-lg max-w-xl">{c.paragraph}</p>

          <div className="mt-10 space-y-5">
            <a href={telHref} className="flex items-start gap-4 group">
              <div className="size-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-accent-500/20 group-hover:border-accent-400 transition-colors shrink-0">
                <Phone className="size-5 text-accent-400" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Call / WhatsApp
                </div>
                <div className="font-display text-lg md:text-xl font-semibold">
                  {c.phones[0]}
                </div>
                <div className="text-sm text-white/70 mt-0.5">
                  {c.phones.slice(1).join(" · ")}
                  {c.contactPerson ? ` · ${c.contactPerson}` : ""}
                </div>
              </div>
            </a>

            <a
              href={"mailto:" + (c.emails[0] || "")}
              className="flex items-start gap-4 group"
            >
              <div className="size-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-accent-500/20 group-hover:border-accent-400 transition-colors shrink-0">
                <Mail className="size-5 text-accent-400" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Email
                </div>
                <div className="font-display text-lg md:text-xl font-semibold break-all">
                  {c.emails[0]}
                </div>
                {c.emails[1] && (
                  <div className="text-sm text-white/70 mt-0.5 break-all">
                    {c.emails[1]}
                  </div>
                )}
              </div>
            </a>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(c.mapEmbedQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group"
            >
              <div className="size-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-accent-500/20 group-hover:border-accent-400 transition-colors shrink-0">
                <MapPin className="size-5 text-accent-400" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Plant & Office
                </div>
                <div className="font-display text-base md:text-lg font-semibold">
                  {c.addressTitle}
                </div>
                <div className="text-sm text-white/70">
                  {c.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < c.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <FileText className="size-5 text-accent-400" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">
                  GSTIN
                </div>
                <div className="font-display text-lg font-semibold tracking-wider">
                  {c.gstin}
                </div>
                <div className="text-xs text-white/55 mt-0.5">{c.iso}</div>
              </div>
            </div>
          </div>

          {/* Map embed */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 aspect-[16/9]">
            <iframe
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Icon Conveyors Coimbatore"
            />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-3xl bg-white/[0.04] backdrop-blur border border-white/10 p-7 md:p-9 lg:sticky lg:top-28"
        >
          <h3 className="font-display text-2xl font-bold">Request a Quote</h3>
          <p className="mt-1 text-white/65 text-sm">
            Fill in the basics — we'll handle the engineering.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Field label="Company name" type="text" required name="company" />
            <Field label="Contact person" type="text" required name="name" />
            <Field label="Email ID" type="email" required name="email" />
            <Field label="Phone" type="tel" required name="phone" />
          </div>
          <div className="mt-4">
            <Field
              label="Address"
              name="address"
              type="text"
              placeholder="City, State"
            />
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <Field
              label="Product name"
              name="product"
              type="text"
              placeholder="e.g. Belt Conveyor"
            />
            <Field
              label="Conveyor type / equipment"
              name="conveyorType"
              type="text"
              placeholder="e.g. Inclined, SS, Modular"
            />
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <Field
              label="Material handling type"
              name="material"
              type="text"
              placeholder="e.g. grain, powder, cartons"
            />
            <Field
              label="Length / Width / Height"
              name="dimensions"
              type="text"
              placeholder="e.g. 6m / 600mm / 1m"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-widest text-white/60 font-semibold mb-2">
              Additional requirement details
            </label>
            <textarea
              name="message"
              rows={3}
              placeholder="Throughput, incline angle, timeline…"
              className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-accent-400 outline-none px-4 py-3 text-white placeholder-white/40"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 hover:bg-accent-400 text-brand-950 font-bold px-6 py-3.5 transition-colors"
          >
            {sent ? "Thank you — we'll be in touch" : "Send Enquiry"}
            <ArrowRight className="size-4" />
          </motion.button>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold px-6 py-3 transition-colors"
          >
            <WhatsappIcon className="size-4" /> Chat on WhatsApp
          </a>

          <p className="mt-3 text-xs text-white/50 text-center">
            <User className="inline size-3 mr-1" /> Replies within 24 working
            hours. Your details stay private.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-white/60 font-semibold mb-2">
        {label}
      </span>
      <input
        {...rest}
        className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-accent-400 outline-none px-4 py-3 text-white placeholder-white/40"
      />
    </label>
  );
}
