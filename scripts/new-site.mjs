// Scaffolds the JSON for a new site with the full structure, ready to edit.
// Usage: npm run new -- --slug nuno-spa --category spa --name "Nuno Spa" --phone "777 986 5933" --ig nuno.mx --address "Blvd. Díaz Ordaz 42, Acapantzingo"
import { writeFile, access } from "node:fs/promises";

const args = Object.fromEntries(process.argv.slice(2).join(" ").split(/\s+--/).filter(Boolean).map((p) => {
  const [k, ...v] = p.replace(/^--/, "").split(/[ =]/);
  return [k, v.join(" ").replace(/^"|"$/g, "")];
}));

const categories = ["spa", "restaurant", "clinic", "fitness"];
const subcategories = ["dental", "aesthetic", "veterinary", "medical", "firm"];
if (!args.slug || !categories.includes(args.category)) {
  console.error(`Missing arguments. Example:\n  npm run new -- --slug nuno-spa --category ${categories.join("|")} --name "Nuno Spa" --phone "777 986 5933"`);
  process.exit(1);
}
if (args.subcategory && !subcategories.includes(args.subcategory)) {
  console.error(`Unknown subcategory. Use one of: ${subcategories.join(", ")}`);
  process.exit(1);
}
const file = new URL(`../sites/${args.slug}.json`, import.meta.url);
try { await access(file); console.error(`sites/${args.slug}.json already exists`); process.exit(1); } catch {}

// Placeholder copy is Spanish on purpose: it is what the visitor reads.
const presets = {
  spa: {
    tagline: "Un rato para ti",
    sections: [
      { title: "Faciales", items: [{ name: "Facial profundo", description: "", duration: "60 min", featured: true }] },
      { title: "Masajes", items: [{ name: "Relajante", description: "", duration: "60 min" }] },
    ],
  },
  restaurant: {
    tagline: "Cocina de casa, mesa de siempre",
    sections: [
      { title: "Desayunos", items: [{ name: "Chilaquiles", description: "", price: 0, featured: true }] },
      { title: "Comida", items: [{ name: "Plato del día", description: "" }] },
    ],
  },
  clinic: {
    tagline: "Atención cercana, sin esperas",
    sections: [{ title: "Consulta", items: [{ name: "Primera consulta", description: "", duration: "40 min", featured: true }] }],
  },
  fitness: {
    tagline: "Entrena | con nosotros",
    sections: [{ title: "Planes", items: [{ name: "Clase suelta" }, { name: "Mensualidad", featured: true }] }],
    classes: [{ day: "Lunes", time: "7:00", name: "Clase" }],
  },
};
const preset = presets[args.category];

const site = {
  slug: args.slug,
  category: args.category,
  ...(args.category === "clinic" ? { subcategory: args.subcategory ?? "medical" } : {}),
  name: args.name ?? args.slug,
  tagline: preset.tagline,
  description: "Dos o tres frases sobre el lugar, con lo que lo hace distinto. Sin cifras inventadas.",
  logo: null,
  photos: [],
  phone: args.phone ?? "",
  instagram: args.ig ?? "",
  address: args.address ?? "",
  mapUrl: "",
  hours: [{ days: "Lunes a sábado", time: "9:00 – 20:00" }, { days: "Domingo", time: "Cerrado" }],
  ...(preset.classes ? { classes: preset.classes } : {}),
  sections: preset.sections,
  demo: true,
  notes: "",
};
await writeFile(file, JSON.stringify(site, null, 2) + "\n");
console.log(`✓ sites/${args.slug}.json created. Edit it, then run: npm run build && npm run shots ${args.slug}`);
