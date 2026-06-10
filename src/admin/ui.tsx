import { Plus, Trash2 } from "lucide-react";

const labelCls =
  "block text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1.5";
const inputCls =
  "w-full rounded-xl bg-white border border-brand-100 focus:border-brand-400 outline-none px-4 py-2.5 text-sm text-brand-900";

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

export function Area({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </label>
  );
}

// Editor for an array of plain strings (lists, links, address lines…).
export function StringList({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={v}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="shrink-0 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 text-red-600"
              aria-label="Remove"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-500"
      >
        <Plus className="size-4" /> Add item
      </button>
    </div>
  );
}

export type ItemField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number";
};

// Editor for an array of objects, each rendered as a card of fields.
export function ListEditor<T extends Record<string, unknown>>({
  label,
  items,
  fields,
  newItem,
  onChange,
}: {
  label: string;
  items: T[];
  fields: ItemField[];
  newItem: () => T;
  onChange: (next: T[]) => void;
}) {
  function update(i: number, key: string, value: unknown) {
    const next = items.map((it, j) => (j === i ? { ...it, [key]: value } : it));
    onChange(next);
  }
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-2xl border border-brand-100 bg-white p-4 relative"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-400">
                #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-500"
              >
                <Trash2 className="size-3.5" /> Remove
              </button>
            </div>
            <div className="grid gap-3">
              {fields.map((f) =>
                f.type === "textarea" ? (
                  <Area
                    key={f.key}
                    label={f.label}
                    value={String(it[f.key] ?? "")}
                    onChange={(v) => update(i, f.key, v)}
                  />
                ) : (
                  <Field
                    key={f.key}
                    label={f.label}
                    type={f.type === "number" ? "number" : "text"}
                    value={
                      f.type === "number"
                        ? (it[f.key] as number)
                        : String(it[f.key] ?? "")
                    }
                    onChange={(v) =>
                      update(i, f.key, f.type === "number" ? Number(v) : v)
                    }
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-500"
      >
        <Plus className="size-4" /> Add entry
      </button>
    </div>
  );
}

// Section wrapper with title, description, Save button and status line.
export function SectionShell({
  title,
  description,
  onSave,
  saving,
  status,
  children,
}: {
  title: string;
  description: string;
  onSave: () => void;
  saving: boolean;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-900">
            {title}
          </h1>
          <p className="text-sm text-brand-700/70 mt-1">{description}</p>
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="shrink-0 rounded-full bg-brand-700 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold px-6 py-2.5 text-sm transition-colors"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
      {status && (
        <p
          className={`mb-4 text-sm rounded-lg px-3 py-2 border ${
            status.startsWith("✓")
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-red-600 bg-red-50 border-red-200"
          }`}
        >
          {status}
        </p>
      )}
      <div className="space-y-5">{children}</div>
    </div>
  );
}
