import { useState } from "react";
import { api } from "./api";
import { Field, Area, StringList, ListEditor, SectionShell } from "./ui";
import type { SiteContent } from "../data/content";

type SectionKey = keyof SiteContent;

// Shared draft + save behaviour for one content section.
function useSection<T>(
  sectionKey: SectionKey,
  initial: T,
  onSaved: (c: SiteContent) => void
) {
  const [draft, setDraft] = useState<T>(initial);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      const updated = await api<SiteContent>("/api/content", {
        method: "PUT",
        body: JSON.stringify({ [sectionKey]: draft }),
      });
      setStatus("✓ Saved — changes are live on the website");
      onSaved(updated);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }
  return { draft, setDraft, save, saving, status };
}

type EditorProps = { content: SiteContent; onSaved: (c: SiteContent) => void };

function HeroEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "hero",
    content.hero,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) =>
    setDraft({ ...draft, [k]: v });
  return (
    <SectionShell
      title="Hero Section"
      description="The top banner — headline, intro text and call-to-action buttons."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Field label="Badge line" value={draft.badge} onChange={(v) => set("badge", v)} />
      <Field label="Title — line 1" value={draft.titleLine1} onChange={(v) => set("titleLine1", v)} />
      <Field label="Title — highlighted words" value={draft.titleHighlight} onChange={(v) => set("titleHighlight", v)} />
      <Field label="Title — line 2" value={draft.titleLine2} onChange={(v) => set("titleLine2", v)} />
      <Area label="Intro paragraph" value={draft.paragraph} rows={4} onChange={(v) => set("paragraph", v)} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary button" value={draft.primaryCta} onChange={(v) => set("primaryCta", v)} />
        <Field label="Secondary button" value={draft.secondaryCta} onChange={(v) => set("secondaryCta", v)} />
      </div>
      <ListEditor
        label="Hero stat chips"
        items={draft.stats}
        fields={[
          { key: "k", label: "Value (e.g. 10+ Yrs)" },
          { key: "v", label: "Caption" },
        ]}
        newItem={() => ({ k: "", v: "" })}
        onChange={(v) => set("stats", v)}
      />
    </SectionShell>
  );
}

function StatsEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "stats",
    content.stats,
    onSaved
  );
  return (
    <SectionShell
      title="Stats / Counters"
      description="The animated number counters band (years, projects, clients, models)."
      onSave={save}
      saving={saving}
      status={status}
    >
      <ListEditor
        label="Counters"
        items={draft}
        fields={[
          { key: "value", label: "Number", type: "number" },
          { key: "suffix", label: "Suffix (e.g. +)" },
          { key: "label", label: "Label" },
        ]}
        newItem={() => ({ value: 0, suffix: "+", label: "" })}
        onChange={setDraft}
      />
    </SectionShell>
  );
}

function AboutEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "about",
    content.about,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) => setDraft({ ...draft, [k]: v });
  return (
    <SectionShell
      title="About Section"
      description="Company intro, strengths list, and the Mission & Vision cards."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Field label="Badge" value={draft.badge} onChange={(v) => set("badge", v)} />
      <Field label="Heading — lead" value={draft.headingLead} onChange={(v) => set("headingLead", v)} />
      <Field label="Heading — highlighted" value={draft.headingHighlight} onChange={(v) => set("headingHighlight", v)} />
      <Area label="Paragraph 1" value={draft.paragraph1} rows={4} onChange={(v) => set("paragraph1", v)} />
      <Area label="Paragraph 2" value={draft.paragraph2} rows={3} onChange={(v) => set("paragraph2", v)} />
      <StringList label="Strengths" items={draft.strengths} onChange={(v) => set("strengths", v)} />
      <Area label="Mission" value={draft.mission} rows={3} onChange={(v) => set("mission", v)} />
      <Area label="Vision" value={draft.vision} rows={3} onChange={(v) => set("vision", v)} />
    </SectionShell>
  );
}

function IndustriesEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "industries",
    content.industries,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) => setDraft({ ...draft, [k]: v });
  return (
    <SectionShell
      title="Industries We Serve"
      description="The dark section listing the industries you supply to."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Field label="Badge" value={draft.badge} onChange={(v) => set("badge", v)} />
      <Field label="Heading — lead" value={draft.headingLead} onChange={(v) => set("headingLead", v)} />
      <Field label="Heading — highlighted" value={draft.headingHighlight} onChange={(v) => set("headingHighlight", v)} />
      <Area label="Subheading" value={draft.subheading} onChange={(v) => set("subheading", v)} />
      <ListEditor
        label="Industries"
        items={draft.items}
        fields={[
          { key: "title", label: "Title" },
          { key: "desc", label: "Description", type: "textarea" },
        ]}
        newItem={() => ({ title: "", desc: "" })}
        onChange={(v) => set("items", v)}
      />
    </SectionShell>
  );
}

function WhyChooseEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "whyChoose",
    content.whyChoose,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) => setDraft({ ...draft, [k]: v });
  return (
    <SectionShell
      title="Why Choose Us"
      description="The reasons-to-trust grid."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Field label="Badge" value={draft.badge} onChange={(v) => set("badge", v)} />
      <Field label="Heading — lead" value={draft.headingLead} onChange={(v) => set("headingLead", v)} />
      <Field label="Heading — highlighted" value={draft.headingHighlight} onChange={(v) => set("headingHighlight", v)} />
      <ListEditor
        label="Reasons"
        items={draft.items}
        fields={[
          { key: "title", label: "Title" },
          { key: "text", label: "Text", type: "textarea" },
        ]}
        newItem={() => ({ title: "", text: "" })}
        onChange={(v) => set("items", v)}
      />
    </SectionShell>
  );
}

function QualityEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "quality",
    content.quality,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) => setDraft({ ...draft, [k]: v });
  return (
    <SectionShell
      title="Quality & Warranty"
      description="The three quality / experience / warranty cards."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Field label="Badge" value={draft.badge} onChange={(v) => set("badge", v)} />
      <Field label="Heading — lead" value={draft.headingLead} onChange={(v) => set("headingLead", v)} />
      <Field label="Heading — highlighted" value={draft.headingHighlight} onChange={(v) => set("headingHighlight", v)} />
      <ListEditor
        label="Cards"
        items={draft.cards}
        fields={[
          { key: "title", label: "Title" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "badge", label: "Corner badge" },
        ]}
        newItem={() => ({ title: "", text: "", badge: "" })}
        onChange={(v) => set("cards", v)}
      />
    </SectionShell>
  );
}

function ClientsEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "clients",
    content.clients,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) => setDraft({ ...draft, [k]: v });
  return (
    <SectionShell
      title="Clients / Customers"
      description="The customer logos grid."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Field label="Eyebrow" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <Field label="Heading" value={draft.heading} onChange={(v) => set("heading", v)} />
      <ListEditor
        label="Clients"
        items={draft.items}
        fields={[
          { key: "name", label: "Full name" },
          { key: "short", label: "Short code (shown big)" },
          { key: "sub", label: "Sub-label" },
        ]}
        newItem={() => ({ name: "", short: "", sub: "" })}
        onChange={(v) => set("items", v)}
      />
    </SectionShell>
  );
}

function TestimonialsEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "testimonials",
    content.testimonials,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) => setDraft({ ...draft, [k]: v });
  return (
    <SectionShell
      title="Testimonials"
      description="Customer quotes."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Field label="Eyebrow" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <Field label="Heading — lead" value={draft.headingLead} onChange={(v) => set("headingLead", v)} />
      <Field label="Heading — highlighted" value={draft.headingHighlight} onChange={(v) => set("headingHighlight", v)} />
      <ListEditor
        label="Quotes"
        items={draft.items}
        fields={[
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "name", label: "Name" },
          { key: "role", label: "Role / Company" },
        ]}
        newItem={() => ({ quote: "", name: "", role: "" })}
        onChange={(v) => set("items", v)}
      />
    </SectionShell>
  );
}

function ContactEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "contact",
    content.contact,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) => setDraft({ ...draft, [k]: v });
  return (
    <SectionShell
      title="Contact Section"
      description="Phone, email, address, GSTIN and the map shown in the enquiry section."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Field label="Badge" value={draft.badge} onChange={(v) => set("badge", v)} />
      <Field label="Heading — lead" value={draft.headingLead} onChange={(v) => set("headingLead", v)} />
      <Field label="Heading — highlighted" value={draft.headingHighlight} onChange={(v) => set("headingHighlight", v)} />
      <Area label="Paragraph" value={draft.paragraph} onChange={(v) => set("paragraph", v)} />
      <StringList label="Phone numbers" items={draft.phones} onChange={(v) => set("phones", v)} />
      <Field label="Contact person" value={draft.contactPerson} onChange={(v) => set("contactPerson", v)} />
      <StringList label="Email addresses" items={draft.emails} onChange={(v) => set("emails", v)} />
      <Field label="Address — title line" value={draft.addressTitle} onChange={(v) => set("addressTitle", v)} />
      <StringList label="Address — further lines" items={draft.addressLines} onChange={(v) => set("addressLines", v)} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="GSTIN" value={draft.gstin} onChange={(v) => set("gstin", v)} />
        <Field label="ISO line" value={draft.iso} onChange={(v) => set("iso", v)} />
      </div>
      <Field label="Google Maps search query" value={draft.mapEmbedQuery} onChange={(v) => set("mapEmbedQuery", v)} />
      <Field label="WhatsApp number (digits only, e.g. 918807209964)" value={draft.whatsapp} onChange={(v) => set("whatsapp", v)} />
    </SectionShell>
  );
}

function FooterEditor({ content, onSaved }: EditorProps) {
  const { draft, setDraft, save, saving, status } = useSection(
    "footer",
    content.footer,
    onSaved
  );
  const set = (k: keyof typeof draft, v: unknown) => setDraft({ ...draft, [k]: v });
  const setSocial = (k: keyof typeof draft.social, v: string) =>
    setDraft({ ...draft, social: { ...draft.social, [k]: v } });
  return (
    <SectionShell
      title="Footer"
      description="Footer blurb, contact details, link columns and social links."
      onSave={save}
      saving={saving}
      status={status}
    >
      <Area label="Blurb" value={draft.blurb} onChange={(v) => set("blurb", v)} />
      <StringList label="Phone numbers" items={draft.phones} onChange={(v) => set("phones", v)} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary email" value={draft.email} onChange={(v) => set("email", v)} />
        <Field label="Secondary email" value={draft.email2} onChange={(v) => set("email2", v)} />
      </div>
      <StringList label="Address lines" items={draft.addressLines} onChange={(v) => set("addressLines", v)} />
      <Field label="GSTIN" value={draft.gstin} onChange={(v) => set("gstin", v)} />
      <StringList label="Products column links" items={draft.productLinks} onChange={(v) => set("productLinks", v)} />
      <StringList label="Industries column links" items={draft.industryLinks} onChange={(v) => set("industryLinks", v)} />
      <StringList label="Company column links" items={draft.companyLinks} onChange={(v) => set("companyLinks", v)} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Facebook URL" value={draft.social.facebook} onChange={(v) => setSocial("facebook", v)} />
        <Field label="LinkedIn URL" value={draft.social.linkedin} onChange={(v) => setSocial("linkedin", v)} />
        <Field label="Instagram URL" value={draft.social.instagram} onChange={(v) => setSocial("instagram", v)} />
        <Field label="YouTube URL" value={draft.social.youtube} onChange={(v) => setSocial("youtube", v)} />
        <Field label="WhatsApp URL" value={draft.social.whatsapp} onChange={(v) => setSocial("whatsapp", v)} />
      </div>
    </SectionShell>
  );
}

const editors: Record<string, (p: EditorProps) => React.ReactNode> = {
  hero: HeroEditor,
  stats: StatsEditor,
  about: AboutEditor,
  industries: IndustriesEditor,
  whyChoose: WhyChooseEditor,
  quality: QualityEditor,
  clients: ClientsEditor,
  testimonials: TestimonialsEditor,
  contact: ContactEditor,
  footer: FooterEditor,
};

export default function ContentEditor({
  section,
  content,
  onSaved,
}: {
  section: string;
  content: SiteContent;
  onSaved: (c: SiteContent) => void;
}) {
  const Cmp = editors[section];
  if (!Cmp) return null;
  // key forces a fresh draft when switching sections
  return <div key={section}>{Cmp({ content, onSaved })}</div>;
}
