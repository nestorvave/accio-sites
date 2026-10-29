/**
 * Every business is a JSON file in /sites. This module defines the schema and loads them.
 * To add one: `npm run new -- --slug name --category spa ...`, or copy a JSON and edit it.
 */

export type Category = "spa" | "restaurant" | "clinic" | "fitness" | "bakery" | "store" | "florist" | "catering";
/** Refines the vocabulary of the clinic template. */
export type Subcategory = "dental" | "aesthetic" | "veterinary" | "medical" | "firm";

export interface ClassSlot {
  day: string;
  time: string;
  name: string;
  coach?: string;
}

export interface Hours {
  /** e.g. "Lunes a viernes", "Sábado", "Domingo" */
  days: string;
  /** e.g. "9:00 – 20:00" or "Cerrado" */
  time: string;
}

export interface Item {
  name: string;
  description?: string;
  /** In pesos, no symbol. Omit when unknown. */
  price?: number;
  /** Free text, e.g. "60 min" */
  duration?: string;
  featured?: boolean;
}

export interface Section {
  title: string;
  note?: string;
  items: Item[];
}

export interface Colors {
  /** Main background */
  bg: string;
  /** Main text */
  ink: string;
  /** Brand color (buttons, accents) */
  brand: string;
  /** Secondary surface (cards, bands) */
  paper: string;
}

export interface Site {
  slug: string;
  category: Category;
  subcategory?: Subcategory;
  name: string;
  /** One line under the name */
  tagline: string;
  /** Two or three sentences about the place */
  description: string;
  /** Path inside /public (e.g. "/logos/maya-spa.png") or a URL. A monogram is drawn when missing. */
  logo?: string | null;
  /** Optional photos (paths in /public or URLs). Without them the template uses its own texture. */
  photos?: string[];
  colors?: Partial<Colors>;
  phone?: string;
  /** Digits only with country code, e.g. "527773173711". Derived from phone when missing (10 digits → 52). */
  whatsapp?: string;
  /** Handle without @ */
  instagram?: string;
  facebook?: string;
  address?: string;
  /** Google Maps link */
  mapUrl?: string;
  hours: Hours[];
  /** Spa: services. Restaurant: menu. Clinic: treatments. Fitness: plans. */
  sections: Section[];
  /** Fitness: weekly class schedule (optional). */
  classes?: ClassSlot[];
  /** Primary button. When missing: WhatsApp with a prefilled message. */
  booking?: { label?: string; url?: string; message?: string };
  promo?: string;
  /** Shows a discreet "demo" badge: keep it on while the page is a proposal, not a delivered site. */
  demo?: boolean;
  /** Google rating shown as social proof, copied from Maps: { stars, count } */
  rating?: { stars: number; count: number };
  /** Internal notes (never rendered) */
  notes?: string;
}

const modules = import.meta.glob<{ default: Site }>("/sites/*.json", { eager: true });

export const sites: Site[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.name.localeCompare(b.name, "es"));

export const bySlug = (slug: string) => sites.find((s) => s.slug === slug);

/** WhatsApp digits with country code. */
export function waNumber(s: Site): string | null {
  if (s.whatsapp) return s.whatsapp.replace(/\D/g, "");
  const d = (s.phone ?? "").replace(/\D/g, "");
  if (d.length === 10) return `52${d}`;
  if (d.length === 12 && d.startsWith("52")) return d;
  return null;
}

export function waLink(s: Site, message?: string): string | null {
  const n = waNumber(s);
  if (!n) return null;
  const text = message ?? s.booking?.message ?? `Hola, ${s.name}. Quiero reservar.`;
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}

/** Primary action of the page: what the visitor came to do. */
export function bookingLink(s: Site): { label: string; url: string } | null {
  if (s.booking?.url) return { label: s.booking.label ?? "Reservar", url: s.booking.url };
  const url = waLink(s);
  if (!url) return null;
  const labels: Record<Category, string> = { restaurant: "Reservar mesa", spa: "Agendar cita", clinic: "Agendar cita", fitness: "Reservar clase", bakery: "Hacer pedido", store: "Preguntar por WhatsApp", florist: "Pedir arreglo", catering: "Cotizar evento" };
  return { label: s.booking?.label ?? labels[s.category], url };
}

export function telLink(s: Site): string | null {
  const d = (s.phone ?? "").replace(/\D/g, "");
  return d ? `tel:+${d.length === 10 ? "52" + d : d}` : null;
}

/** Initials for the monogram when there is no logo: "Casa Manzano" → "CM". */
export function monogram(name: string): string {
  const words = name.replace(/[^\p{L}\p{N} ]/gu, "").split(/\s+/).filter((w) => w.length > 2 || /^\p{Lu}/u.test(w));
  const letters = (words.length >= 2 ? [words[0], words[words.length - 1]] : words.slice(0, 1)).map((w) => w[0]?.toUpperCase() ?? "");
  return letters.join("") || "A";
}

export const formatPrice = (n?: number) => (typeof n === "number" ? `$${n.toLocaleString("es-MX")}` : "");

/** White or dark ink, whichever contrasts better on the brand color (for buttons). */
export function textOn(hex: string): string {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  if (!m) return "#FFFFFF";
  const ch = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = 0.2126 * ch(parseInt(m[1], 16)) + 0.7152 * ch(parseInt(m[2], 16)) + 0.0722 * ch(parseInt(m[3], 16));
  return (1.05) / (L + 0.05) >= (L + 0.05) / 0.05 ? "#FFFFFF" : "#14201B";
}
