import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import {
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  WhatsappIcon,
} from "./SocialIcons";

const cols = [
  {
    title: "Products",
    links: [
      "Belt Conveyor",
      "Screw Conveyor",
      "Roller Conveyor",
      "Slat Chain Conveyor",
      "Bucket Elevator",
      "Truck Loading",
      "Bagging Machines",
      "Modular Belt",
    ],
  },
  {
    title: "Industries",
    links: [
      "Food Processing",
      "Packaging",
      "Manufacturing",
      "Engineering",
      "Material Handling",
      "Agriculture",
    ],
  },
  {
    title: "Company",
    links: ["About", "Mission & Vision", "Customers", "Process", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative bg-brand-950 text-white pt-16 pb-8">
      <div className="h-3 belt-stripes animate-belt opacity-80" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-12">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white inline-flex rounded-xl p-3">
              <img
                src="/icon-logo.png"
                alt="Icon Conveyors"
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-5 text-white/70 max-w-sm leading-relaxed">
              Trusted Coimbatore-based manufacturer of conveyor systems and
              packaging machines. Optimising material flow for India's
              industries since 2017 · ISO 9001:2015 certified.
            </p>

            <div className="mt-6 space-y-3 text-sm text-white/75">
              <a
                href="tel:+918807209964"
                className="flex items-start gap-3 hover:text-accent-400"
              >
                <Phone className="size-4 mt-0.5 text-accent-400 shrink-0" />
                +91 88072 09964
              </a>
              <a
                href="mailto:sales@iconconveyors.com"
                className="flex items-start gap-3 hover:text-accent-400 break-all"
              >
                <Mail className="size-4 mt-0.5 text-accent-400 shrink-0" />
                sales@iconconveyors.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-accent-400 shrink-0" />
                <span>
                  S.F.No. 109/1A, 1B, Bodipalayam Post,
                  <br />
                  Madukkarai, Coimbatore — 641105, TN
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {[
                { I: FacebookIcon, href: "#", label: "Facebook" },
                { I: LinkedinIcon, href: "#", label: "LinkedIn" },
                { I: InstagramIcon, href: "#", label: "Instagram" },
                { I: YoutubeIcon, href: "#", label: "YouTube" },
                {
                  I: WhatsappIcon,
                  href: "https://wa.me/918807209964",
                  label: "WhatsApp",
                },
              ].map(({ I, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-10 rounded-full bg-white/5 border border-white/10 hover:bg-accent-500/20 hover:border-accent-400 flex items-center justify-center transition-colors"
                >
                  <I className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-bold text-lg">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-accent-400 transition-colors text-sm"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} Icon Conveyors. All rights reserved. ·
            GSTIN 33BXBPM6357D1ZN
          </p>
          <div className="flex items-center gap-5 text-sm text-white/55">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              Back to top <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
