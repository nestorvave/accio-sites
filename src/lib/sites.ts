/**
 * Cada negocio es un JSON en /sites. Este archivo define el esquema y lo carga.
 * Para agregar un prospecto: `npm run new -- --slug nombre --giro spa ...` o copia un JSON y edítalo.
 */

export type Giro = "spa" | "restaurante" | "consultorio" | "fitness";
/** Afina el vocabulario de la plantilla consultorio. */
export type Subgiro = "dental" | "estetica" | "veterinaria" | "medico" | "despacho";

export interface Clase {
  dia: string;
  hora: string;
  nombre: string;
  coach?: string;
}

export interface Horario {
  /** Ej. "Lunes a viernes", "Sábado", "Domingo" */
  dias: string;
  /** Ej. "9:00 – 20:00" o "Cerrado" */
  horas: string;
}

export interface Item {
  nombre: string;
  descripcion?: string;
  /** En pesos, sin símbolo. Omitir si no se conoce. */
  precio?: number;
  /** Texto libre, ej. "60 min" */
  duracion?: string;
  destacado?: boolean;
}

export interface Seccion {
  titulo: string;
  nota?: string;
  items: Item[];
}

export interface Colores {
  /** Fondo principal */
  fondo: string;
  /** Texto principal */
  tinta: string;
  /** Color de marca (botones, acentos) */
  marca: string;
  /** Superficie secundaria (tarjetas, franjas) */
  papel: string;
}

export interface Site {
  slug: string;
  giro: Giro;
  subgiro?: Subgiro;
  nombre: string;
  /** Una línea debajo del nombre */
  tagline: string;
  /** Dos o tres frases sobre el lugar */
  descripcion: string;
  /** Ruta dentro de /public (ej. "/logos/maya-spa.png") o URL. Si falta se dibuja un monograma. */
  logo?: string | null;
  /** Fotos opcionales (rutas en /public o URLs). Si no hay, la plantilla usa textura propia. */
  fotos?: string[];
  colores?: Partial<Colores>;
  telefono?: string;
  /** Solo dígitos con lada de país, ej. "527773173711". Si falta se deriva de telefono (10 dígitos → 52). */
  whatsapp?: string;
  /** Usuario sin @ */
  instagram?: string;
  facebook?: string;
  direccion?: string;
  /** Link de Google Maps */
  mapa?: string;
  horario: Horario[];
  /** Spa: servicios. Restaurante: carta. Consultorio: tratamientos. Fitness: planes. */
  secciones: Seccion[];
  /** Fitness: horario de clases de la semana (opcional). */
  clases?: Clase[];
  /** Botón principal. Si falta: WhatsApp con mensaje prellenado. */
  reserva?: { label?: string; url?: string; mensaje?: string };
  promo?: string;
  /** Pinta un aviso discreto de "demostración": úsalo mientras sea propuesta, no sitio entregado. */
  demo?: boolean;
  /** Notas internas del prospecto (no se publican) */
  notas?: string;
}

const modules = import.meta.glob<{ default: Site }>("/sites/*.json", { eager: true });

export const sites: Site[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

export const bySlug = (slug: string) => sites.find((s) => s.slug === slug);

/** Dígitos del WhatsApp con lada de país. */
export function waNumber(s: Site): string | null {
  if (s.whatsapp) return s.whatsapp.replace(/\D/g, "");
  const d = (s.telefono ?? "").replace(/\D/g, "");
  if (d.length === 10) return `52${d}`;
  if (d.length === 12 && d.startsWith("52")) return d;
  return null;
}

export function waLink(s: Site, mensaje?: string): string | null {
  const n = waNumber(s);
  if (!n) return null;
  const text = mensaje ?? s.reserva?.mensaje ?? `Hola, ${s.nombre}. Quiero reservar.`;
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}

/** Acción principal de la página: lo que el visitante vino a hacer. */
export function reservaLink(s: Site): { label: string; url: string } | null {
  if (s.reserva?.url) return { label: s.reserva.label ?? "Reservar", url: s.reserva.url };
  const url = waLink(s);
  if (!url) return null;
  const labels: Record<Giro, string> = { restaurante: "Reservar mesa", spa: "Agendar cita", consultorio: "Agendar cita", fitness: "Reservar clase" };
  return { label: s.reserva?.label ?? labels[s.giro], url };
}

export function telLink(s: Site): string | null {
  const d = (s.telefono ?? "").replace(/\D/g, "");
  return d ? `tel:+${d.length === 10 ? "52" + d : d}` : null;
}

/** Iniciales para el monograma cuando no hay logo: "Casa Manzano" → "CM". */
export function monograma(nombre: string): string {
  const words = nombre.replace(/[^\p{L}\p{N} ]/gu, "").split(/\s+/).filter((w) => w.length > 2 || /^\p{Lu}/u.test(w));
  const letters = (words.length >= 2 ? [words[0], words[words.length - 1]] : words.slice(0, 1)).map((w) => w[0]?.toUpperCase() ?? "");
  return letters.join("") || "A";
}

export const precio = (n?: number) => (typeof n === "number" ? `$${n.toLocaleString("es-MX")}` : "");

/** Blanco o tinta oscura según qué contraste mejor sobre el color de marca (para botones). */
export function textoSobre(hex: string): string {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  if (!m) return "#FFFFFF";
  const ch = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = 0.2126 * ch(parseInt(m[1], 16)) + 0.7152 * ch(parseInt(m[2], 16)) + 0.0722 * ch(parseInt(m[3], 16));
  return (1.05) / (L + 0.05) >= (L + 0.05) / 0.05 ? "#FFFFFF" : "#14201B";
}
