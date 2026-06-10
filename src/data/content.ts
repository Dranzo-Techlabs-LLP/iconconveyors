import contentJson from "../../server/data/content.json";

export type HeroStat = { k: string; v: string };
export type StatItem = { value: number; suffix: string; label: string };
export type TitleTextItem = { title: string; text: string };
export type TitleDescItem = { title: string; desc: string };
export type QualityCard = { title: string; text: string; badge: string };
export type ClientItem = { name: string; short: string; sub: string };
export type Testimonial = { quote: string; name: string; role: string };

export type SiteContent = {
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    paragraph: string;
    primaryCta: string;
    secondaryCta: string;
    stats: HeroStat[];
  };
  stats: StatItem[];
  about: {
    badge: string;
    headingLead: string;
    headingHighlight: string;
    paragraph1: string;
    paragraph2: string;
    strengths: string[];
    mission: string;
    vision: string;
  };
  industries: {
    badge: string;
    headingLead: string;
    headingHighlight: string;
    subheading: string;
    items: TitleDescItem[];
  };
  whyChoose: {
    badge: string;
    headingLead: string;
    headingHighlight: string;
    items: TitleTextItem[];
  };
  quality: {
    badge: string;
    headingLead: string;
    headingHighlight: string;
    cards: QualityCard[];
  };
  clients: {
    eyebrow: string;
    heading: string;
    items: ClientItem[];
  };
  testimonials: {
    eyebrow: string;
    headingLead: string;
    headingHighlight: string;
    items: Testimonial[];
  };
  contact: {
    badge: string;
    headingLead: string;
    headingHighlight: string;
    paragraph: string;
    phones: string[];
    contactPerson: string;
    emails: string[];
    addressTitle: string;
    addressLines: string[];
    gstin: string;
    iso: string;
    mapEmbedQuery: string;
    whatsapp: string;
  };
  footer: {
    blurb: string;
    phones: string[];
    email: string;
    email2: string;
    addressLines: string[];
    gstin: string;
    productLinks: string[];
    industryLinks: string[];
    companyLinks: string[];
    social: {
      facebook: string;
      linkedin: string;
      instagram: string;
      youtube: string;
      whatsapp: string;
    };
  };
};

// Bundled snapshot — the source of truth until /api/content responds, and the
// only source when the site is served statically without the admin API.
export const defaultContent = contentJson as unknown as SiteContent;

export async function fetchContent(): Promise<SiteContent | null> {
  try {
    const r = await fetch("/api/content");
    if (!r.ok) return null;
    const d = await r.json();
    return d && typeof d === "object" ? (d as SiteContent) : null;
  } catch {
    return null;
  }
}
