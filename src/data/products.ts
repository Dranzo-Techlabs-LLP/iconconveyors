import productsJson from "../../server/data/products.json";

export type Category =
  | "Belt"
  | "Screw"
  | "Roller"
  | "Chain"
  | "Loading"
  | "Packaging"
  | "Specialty";

export const CATEGORIES: Category[] = [
  "Belt",
  "Screw",
  "Roller",
  "Chain",
  "Loading",
  "Packaging",
  "Specialty",
];

export type Product = {
  id: string;
  title: string;
  desc: string;
  img: string; // primary image (kept = images[0] for backward compatibility)
  images?: string[]; // full gallery; shown as an auto slider on the card
  category: Category;
  tag?: string;
  video?: string;
};

// Resolve the gallery for a product — falls back to the single img.
export function productImages(p: Product): string[] {
  const list = (p.images && p.images.length ? p.images : [p.img]).filter(Boolean);
  return list.length ? list : [p.img];
}

// Bundled snapshot — used until /api/products responds (and as the only
// source when the site is deployed statically without the admin API).
export const defaultProducts = productsJson as unknown as Product[];

export async function fetchProducts(): Promise<Product[] | null> {
  try {
    const r = await fetch("/api/products");
    if (!r.ok) return null;
    const d = await r.json();
    return Array.isArray(d) && d.length ? (d as Product[]) : null;
  } catch {
    return null;
  }
}
