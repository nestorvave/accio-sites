// Crea el JSON de un prospecto nuevo con la estructura completa, listo para editar.
// Uso: npm run new -- --slug nuno-spa --giro spa --nombre "Nuno Spa" --tel "777 986 5933" --ig nuno.mx --dir "Blvd. Díaz Ordaz 42, Acapantzingo"
import { writeFile, access } from "node:fs/promises";

const args = Object.fromEntries(process.argv.slice(2).join(" ").split(/\s+--/).filter(Boolean).map((p) => {
  const [k, ...v] = p.replace(/^--/, "").split(/[ =]/);
  return [k, v.join(" ").replace(/^"|"$/g, "")];
}));

const giros = ["spa", "restaurante"];
if (!args.slug || !giros.includes(args.giro)) {
  console.error(`Faltan datos. Ejemplo:\n  npm run new -- --slug nuno-spa --giro ${giros.join("|")} --nombre "Nuno Spa" --tel "777 986 5933"`);
  process.exit(1);
}
const file = new URL(`../sites/${args.slug}.json`, import.meta.url);
try { await access(file); console.error(`Ya existe sites/${args.slug}.json`); process.exit(1); } catch {}

const esSpa = args.giro === "spa";
const site = {
  slug: args.slug,
  giro: args.giro,
  nombre: args.nombre ?? args.slug,
  tagline: esSpa ? "Un rato para ti" : "Cocina de casa, mesa de siempre",
  descripcion: "Dos o tres frases sobre el lugar, con lo que lo hace distinto. Sin cifras inventadas.",
  logo: null,
  fotos: [],
  telefono: args.tel ?? "",
  instagram: args.ig ?? "",
  direccion: args.dir ?? "",
  mapa: "",
  horario: [{ dias: "Lunes a sábado", horas: "9:00 – 20:00" }, { dias: "Domingo", horas: "Cerrado" }],
  secciones: esSpa
    ? [{ titulo: "Faciales", items: [{ nombre: "Facial profundo", descripcion: "", duracion: "60 min", destacado: true }] },
       { titulo: "Masajes", items: [{ nombre: "Relajante", descripcion: "", duracion: "60 min" }] }]
    : [{ titulo: "Desayunos", items: [{ nombre: "Chilaquiles", descripcion: "", precio: 0, destacado: true }] },
       { titulo: "Comida", items: [{ nombre: "Plato del día", descripcion: "" }] }],
  demo: true,
  notas: "",
};
await writeFile(file, JSON.stringify(site, null, 2) + "\n");
console.log(`✓ sites/${args.slug}.json creado. Edítalo y corre: npm run build && npm run shots ${args.slug}`);
