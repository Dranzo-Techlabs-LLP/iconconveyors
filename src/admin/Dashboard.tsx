import { useEffect, useState } from "react";
import {
  Package,
  PlayCircle,
  Cog,
  User,
  Factory,
  Star,
  ImagePlus,
  ArrowUpRight,
} from "lucide-react";
import { api } from "./api";
import type { Product } from "../data/products";
import type { SiteContent } from "../data/content";

type Metric = {
  label: string;
  value: number;
  color: string;
  Icon: typeof Package;
};

export default function Dashboard({
  content,
  onNavigate,
}: {
  content: SiteContent;
  onNavigate: (section: string) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    api<Product[]>("/api/products")
      .then(setProducts)
      .catch(() => {});
  }, []);

  const withVideo = products.filter((p) => p.video).length;
  const withoutImage = products.filter((p) => !p.img).length;
  const categories = new Set(products.map((p) => p.category)).size;

  const metrics: Metric[] = [
    { label: "Total Products", value: products.length, color: "bg-brand-600", Icon: Package },
    { label: "Products with Video", value: withVideo, color: "bg-[#FF0000]", Icon: PlayCircle },
    { label: "Product Categories", value: categories, color: "bg-sky-600", Icon: Cog },
    { label: "Missing Image", value: withoutImage, color: "bg-amber-500", Icon: ImagePlus },
    { label: "Clients Listed", value: content.clients.items.length, color: "bg-emerald-600", Icon: User },
    { label: "Industries", value: content.industries.items.length, color: "bg-violet-600", Icon: Factory },
    { label: "Testimonials", value: content.testimonials.items.length, color: "bg-rose-600", Icon: Star },
  ];

  const shortcuts = [
    { label: "Add / edit products", section: "products" },
    { label: "Edit hero headline", section: "hero" },
    { label: "Update contact details", section: "contact" },
    { label: "Manage clients", section: "clients" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-900">
        Dashboard
      </h1>
      <p className="text-sm text-brand-700/70 mt-1">
        Overview of your website content. Everything here is editable.
      </p>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl bg-white border border-brand-100 shadow-soft overflow-hidden flex items-stretch"
          >
            <div className={`${m.color} flex items-center justify-center w-16 shrink-0`}>
              <m.Icon className="size-7 text-white" />
            </div>
            <div className="px-4 py-4">
              <div className="font-display text-3xl font-bold text-brand-900 tabular-nums">
                {m.value}
              </div>
              <div className="text-xs text-brand-700/70 font-medium mt-0.5">
                {m.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white border border-brand-100 shadow-soft p-6">
          <h2 className="font-display text-lg font-bold text-brand-900">
            Quick actions
          </h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {shortcuts.map((s) => (
              <button
                key={s.section}
                onClick={() => onNavigate(s.section)}
                className="group flex items-center justify-between rounded-xl border border-brand-100 hover:border-brand-300 bg-brand-50/50 px-4 py-3 text-left transition-colors"
              >
                <span className="text-sm font-semibold text-brand-800">
                  {s.label}
                </span>
                <ArrowUpRight className="size-4 text-brand-400 group-hover:text-brand-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-brand-100 shadow-soft p-6">
          <h2 className="font-display text-lg font-bold text-brand-900">
            Recently added products
          </h2>
          <ul className="mt-4 divide-y divide-brand-100">
            {products.slice(-5).reverse().map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-2.5">
                <img
                  src={p.img}
                  alt=""
                  className="size-10 rounded-lg object-contain bg-brand-50 border border-brand-100"
                />
                <span className="text-sm font-medium text-brand-800 flex-1 truncate">
                  {p.title}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">
                  {p.category}
                </span>
              </li>
            ))}
            {products.length === 0 && (
              <li className="py-3 text-sm text-brand-700/60">No products yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
