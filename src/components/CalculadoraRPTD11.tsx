import { useState, useMemo } from "react";
import { Calculator, Wind, Building, Zap, Settings, ChevronDown, ChevronUp, Info, Ruler, Shield } from "lucide-react";

// Safe number formatting helper
const fmt = (v: number | undefined | null, d = 2) => Number(v ?? 0).toFixed(d);

// ── Reusable UI Components ──────────────────────────────────────────────

const CollapsibleSection = ({
  title, icon: Icon, children, defaultOpen = true, badge,
}: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean; badge?: string;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0"><Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /></div>
          <h3 className="text-sm sm:text-base font-bold text-foreground truncate">{title}</h3>
          {badge && <span className="eng-badge eng-badge-primary hidden sm:inline-flex">{badge}</span>}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2">{children}</div>}
    </div>
  );
};

const InputField = ({
  label, value, onChange, unit, hint, readOnly = false, highlight = false,
}: {
  label: string; value: number | string; onChange?: (v: string) => void; unit?: string; hint?: string; readOnly?: boolean; highlight?: boolean;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <div className="flex items-center gap-1">
      <input
        type="text"
        value={typeof value === "number" ? (Number.isInteger(value) ? value : value.toFixed(4).replace(/\.?0+$/, "")) : value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm font-mono transition-colors
          ${readOnly ? "bg-muted/50 border-border cursor-default text-foreground/70" : "bg-background border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"}
          ${highlight ? "!bg-primary/10 !border-primary/40 !text-primary font-bold" : ""}
        `}
      />
      {unit && <span className="text-xs text-muted-foreground whitespace-nowrap min-w-[40px]">{unit}</span>}
    </div>
    {hint && <p className="text-[10px] text-muted-foreground/70">{hint}</p>}
  </div>
);

const SelectField = ({
  label, value, options, onChange,
}: {
  label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

// ── Default values ──────────────────────────────────────────────────────

const defaultProject = {
  projectName: "Línea AT 220 kV — Ejemplo",
  tensionNominal: 220,     // kV
  numFases: 3,
  numConductoresFase: 2,   // haz
  numCablesGuardia: 1,
};

const defaultConductor = {
  tipo: "AAAC 1400 MCM",
  diametro: 34.63,         // mm
  peso: 1.9465,            // kg/m
  tensionRotura: 20649,    // kg
  tensionMaxima: 10324.5,  // kg (50% Trupt)
  tensionNormal: 4350,     // kg @ 15°C sin sobrecarga
};

const defaultCableGuardia = {
  tipo: "OPGW 18 mm",
  diametro: 18,            // mm
  peso: 0.85,              // kg/m
  tensionRotura: 10000,    // kg
  tensionMaxima: 5000,     // kg
  tensionNormal: 2100,     // kg
};

const defaultAmbiente = {
  zona: "III" as "II" | "III" | "custom",
  altitud: 131,
  presionViento: 40,       // auto or custom
  tempAmbiente: 10,        // auto or custom
  espHielo: 0,             // mm — espesor manguito de hielo (Zona I/IV)
};

const defaultEstructura = {
  tipo: "reticulada" as "reticulada" | "poste_hormigon" | "poste_metalico" | "poste_circular",
  alturaTotal: 35,         // m
  alturaConductor: 28,     // m — altura media conductor (hc)
  anchoFrontal: 3.5,       // m
  profundidad: 3.5,        // m — solo reticulada
  areaFrontal: 8.5,        // m² — Af
  areaGlobal: 12.25,       // m² — Ag (reticulada)
  espesorPerfil: 5,        // mm — mínimo
};

const defaultVano = {
  longitudVano: 380,       // m
  vanoViento: 293.72,      // m
  vanoPeso: 293.72,        // m
  anguloLinea: 5,          // ° — ángulo en el vértice
};

const defaultCortadura = {
  tipoEstructura: "suspension" as "suspension" | "anclaje",
  factorK: 0.7,            // grampas deslizantes
  numConductoresCortados: 1, // n1
};

// ── Helpers ─────────────────────────────────────────────────────────────

function getPresionViento(zona: "II" | "III" | "custom") { if (zona === "custom") return 0; return zona === "II" ? 50 : 40; }
function getTempAmbiente(zona: "II" | "III" | "custom") { if (zona === "custom") return 0; return zona === "II" ? 5 : 10; }

function getGc(zona: "II" | "III" | "custom", hc: number): number {
  if (hc <= 50) return 1.0;
  if (zona === "II") return 0.2914 * Math.log(hc) + 1.0468;
  return 0.4936 * Math.log(hc) + 0.9124; // Zona III and custom use same Gc
}

function getCfReticulada(e: number): number {
  return 4.0 * e * e - 5.9 * e + 4.0;
}

function getGtCf(tipo: string) {
  switch (tipo) {
    case "poste_hormigon": return { Gt: 1.0, Cf: 2.0 };
    case "poste_metalico": return { Gt: 1.0, Cf: 1.4 };
    case "poste_circular": return { Gt: 1.2, Cf: 1.0 };
    case "reticulada":
    default: return { Gt: 1.25, Cf: 0 }; // Cf calculated from solidez
  }
}

// Cruces entre líneas (§5.7.7)
function distHorizontalBT(flecha: number) { return 1.5 + flecha / Math.SQRT2; }
function distHorizontalMTAT(flecha: number, kV: number) { return 1.5 + flecha / Math.SQRT2 + kV / 170; }
function distVerticalMTAT(kVs: number, kVi: number) { return 1.5 + (kVs + kVi) / 170; }

// Distancia vertical cruce tensión reducida (§5.7.5)
function distCruceTensionReducida(kV: number, distPuntoCruce: number) {
  const base = 1.80 + 0.01 * kV;
  const extra = distPuntoCruce > 50 ? 0.003 * (distPuntoCruce - 50) : 0;
  return base + extra;
}

// ── Main Component ──────────────────────────────────────────────────────

const CalculadoraRPTD11 = () => {
  const [project, setProject] = useState(defaultProject);
  const [conductor, setConductor] = useState(defaultConductor);
  const [cableGuardia, setCableGuardia] = useState(defaultCableGuardia);
  const [ambiente, setAmbiente] = useState(defaultAmbiente);
  const [estructura, setEstructura] = useState(defaultEstructura);
  const [vano, setVano] = useState(defaultVano);
  const [cortadura, setCortadura] = useState(defaultCortadura);
  const [cruceTensionDist, setCruceTensionDist] = useState(30); // m al punto de cruce
  const [kVInferior, setKVInferior] = useState(66); // kV línea inferior

  const presionViento = useMemo(() => ambiente.zona === "custom" ? ambiente.presionViento : getPresionViento(ambiente.zona), [ambiente.zona, ambiente.presionViento]);
  const tempAmbiente = useMemo(() => ambiente.zona === "custom" ? ambiente.tempAmbiente : getTempAmbiente(ambiente.zona), [ambiente.zona, ambiente.tempAmbiente]);

  const calc = useMemo(() => {
    // ── 1. Gc – Factor de amplificación
    const Gc = getGc(ambiente.zona, estructura.alturaConductor);

    // ── 2. Presión de viento corregida por altura
    const qc = presionViento * Gc; // kg/m²

    // ── 3. Fuerza de viento sobre la estructura
    const gtcf = getGtCf(estructura.tipo);
    let Gt = gtcf.Gt;
    let Cf: number;
    let solidez = 0;
    if (estructura.tipo === "reticulada") {
      solidez = estructura.areaGlobal > 0 ? estructura.areaFrontal / estructura.areaGlobal : 0.5;
      Cf = getCfReticulada(solidez);
    } else {
      Cf = gtcf.Cf;
    }
    const Fz = Gt * Cf * qc * estructura.areaFrontal; // kg

    // ── 4. Fuerza de viento sobre conductor
    const fuerzaVientoConductor = qc * (conductor.diametro / 1000) * vano.vanoViento; // kg
    const fuerzaVientoConductorParalelo = fuerzaVientoConductor / 4; // §5.11.2

    // ── 5. Fuerza de viento sobre cable de guardia
    const fuerzaVientoCG = qc * (cableGuardia.diametro / 1000) * vano.vanoViento; // kg

    // ── 6. Tensiones mecánicas máximas
    const tensionMax50 = conductor.tensionRotura * 0.50;
    const tensionMax70 = conductor.tensionRotura * 0.70;
    const csNormal = conductor.tensionRotura / (conductor.tensionNormal || 1);
    const csMaximo = conductor.tensionRotura / (conductor.tensionMaxima || 1);

    // ── 7. Cortadura de conductor (Tabla N°3)
    let cortaduraCond: number;
    let cortaduraCG: number;
    if (cortadura.tipoEstructura === "suspension") {
      cortaduraCond = cortadura.numConductoresCortados * cortadura.factorK * conductor.tensionNormal;
      cortaduraCG = cableGuardia.tensionNormal;
    } else {
      cortaduraCond = project.numConductoresFase * conductor.tensionMaxima;
      cortaduraCG = cableGuardia.tensionMaxima;
    }

    // ── 8. Solicitación de ángulo
    const deltaRad = (vano.anguloLinea * Math.PI) / 180;
    const fuerzaAnguloCond = 2 * project.numConductoresFase * conductor.tensionMaxima * Math.sin(deltaRad / 2);
    const fuerzaAnguloCG = 2 * cableGuardia.tensionMaxima * Math.sin(deltaRad / 2);

    // ── 9. Cruces (§5.7)
    const flechaEstimada = vano.longitudVano > 0 ? (conductor.peso * vano.longitudVano * vano.longitudVano) / (8 * (conductor.tensionNormal || 1)) : 0;
    const cruceBTHoriz = distHorizontalBT(flechaEstimada);
    const cruceMTATHoriz = distHorizontalMTAT(flechaEstimada, project.tensionNominal);
    const cruceVertMTAT = distVerticalMTAT(project.tensionNominal, kVInferior);
    const cruceTensionRed = distCruceTensionReducida(project.tensionNominal, cruceTensionDist);

    // ── 10. Paralelismos
    const separacionParalelismo = 1.5 * estructura.alturaTotal;

    // ── 11. Peso hielo (§5.21)
    const pesoHielo = ambiente.espHielo > 0
      ? 0.9 * Math.PI * ((conductor.diametro / 1000 + ambiente.espHielo / 1000) * (ambiente.espHielo / 1000)) * 1000 // kg/m approx
      : 0;
    const pesoConductorConHielo = conductor.peso + pesoHielo;

    // ── 12. Factores de mínima sobrecarga (Tabla N°4)
    const factoresTabla4 = [
      { condicion: "Normal (viento máx, ángulo, deseq., remate)", factor: 1.5 },
      { condicion: "Hielo máx, deseq. viento+hielo, remate viento+hielo", factor: 1.4 },
      { condicion: "Eventual (cortadura, mantenimiento, montaje, tendido)", factor: 1.2 },
    ];

    return {
      Gc, qc, Gt, Cf, solidez, Fz,
      fuerzaVientoConductor, fuerzaVientoConductorParalelo, fuerzaVientoCG,
      tensionMax50, tensionMax70, csNormal, csMaximo,
      cortaduraCond, cortaduraCG,
      fuerzaAnguloCond, fuerzaAnguloCG,
      flechaEstimada, cruceBTHoriz, cruceMTATHoriz, cruceVertMTAT, cruceTensionRed,
      separacionParalelismo,
      pesoHielo, pesoConductorConHielo,
      factoresTabla4,
    };
  }, [project, conductor, cableGuardia, ambiente, estructura, vano, cortadura, presionViento, cruceTensionDist, kVInferior]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-xl font-bold text-foreground">Calculadora RPTD N° 11</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Líneas de Alta y Extra Alta Tensión — Parámetros y Ecuaciones Normativas (SEC)
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">F<sub>z</sub> = G<sub>t</sub> × C<sub>f</sub> × q<sub>c</sub> × A<sub>f</sub></span>
              <span className="eng-badge eng-badge-warning">Interactiva</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Result Summary ── */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border-2 border-primary/30">
        <h3 className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">Resultados Principales</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {[
            { label: "Gc", value: calc.Gc, unit: "", desc: "Factor amplif." },
            { label: "qc", value: calc.qc, unit: "kg/m²", desc: "Presión corregida" },
            { label: "Fz", value: calc.Fz, unit: "kg", desc: "Viento estructura" },
            { label: "Fv,cond", value: calc.fuerzaVientoConductor, unit: "kg", desc: "Viento conductor" },
            { label: "CS normal", value: calc.csNormal, unit: "", desc: "Coef. seguridad" },
            { label: "Cortadura", value: calc.cortaduraCond, unit: "kg", desc: "Carga cortadura" },
          ].map((r) => (
            <div key={r.label} className={`rounded-lg p-2 sm:p-3 text-center ${r.label === "Fz" ? "bg-primary/10 border border-primary/30" : "bg-muted/50"}`}>
              <p className={`text-base sm:text-xl font-bold font-mono ${r.label === "Fz" ? "text-primary" : "text-foreground"}`}>{fmt(r.value, r.unit === "" ? 2 : 0)}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. Datos del Proyecto ── */}
      <CollapsibleSection title="1. Datos del Proyecto" icon={Settings} badge="General">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="sm:col-span-2 md:col-span-3">
            <InputField label="Nombre del Proyecto" value={project.projectName} onChange={(v) => setProject({ ...project, projectName: v })} />
          </div>
          <InputField label="Tensión Nominal" value={project.tensionNominal} onChange={(v) => setProject({ ...project, tensionNominal: parseFloat(v) || 0 })} unit="kV" />
          <InputField label="N° Fases" value={project.numFases} onChange={(v) => setProject({ ...project, numFases: parseInt(v) || 0 })} />
          <InputField label="Conductores por Fase (haz)" value={project.numConductoresFase} onChange={(v) => setProject({ ...project, numConductoresFase: parseInt(v) || 0 })} />
          <InputField label="N° Cables de Guardia" value={project.numCablesGuardia} onChange={(v) => setProject({ ...project, numCablesGuardia: parseInt(v) || 0 })} />
        </div>
      </CollapsibleSection>

      {/* ── 2. Conductor ── */}
      <CollapsibleSection title="2. Conductor de Fase" icon={Zap} badge="§5.10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <InputField label="Tipo" value={conductor.tipo} onChange={(v) => setConductor({ ...conductor, tipo: v })} />
          <InputField label="Diámetro (Φ)" value={conductor.diametro} onChange={(v) => setConductor({ ...conductor, diametro: parseFloat(v) || 0 })} unit="mm" />
          <InputField label="Peso Unitario" value={conductor.peso} onChange={(v) => setConductor({ ...conductor, peso: parseFloat(v) || 0 })} unit="kg/m" />
          <InputField label="Tensión de Rotura" value={conductor.tensionRotura} onChange={(v) => setConductor({ ...conductor, tensionRotura: parseFloat(v) || 0 })} unit="kg" />
          <InputField label="Tensión Máxima (Tmáx)" value={conductor.tensionMaxima} onChange={(v) => setConductor({ ...conductor, tensionMaxima: parseFloat(v) || 0 })} unit="kg" hint="≤ 50% Trupt sin hielo" />
          <InputField label="Tensión Normal (Tn @ 15°C)" value={conductor.tensionNormal} onChange={(v) => setConductor({ ...conductor, tensionNormal: parseFloat(v) || 0 })} unit="kg" />
        </div>
        <div className="eng-note mt-4">
          <p className="text-xs"><Info className="w-3 h-3 inline mr-1" />
            <strong>§5.10:</strong> Tensión mecánica máxima ≤ 50% Trupt (sin hielo) o ≤ 70% Trupt (con hielo).
            Actual: 50% = <strong>{fmt(calc.tensionMax50, 0)} kg</strong>, 70% = <strong>{fmt(calc.tensionMax70, 0)} kg</strong>
          </p>
        </div>
      </CollapsibleSection>

      {/* ── 3. Cable de Guardia ── */}
      <CollapsibleSection title="3. Cable de Guardia" icon={Shield} badge="§5.14" defaultOpen={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <InputField label="Tipo" value={cableGuardia.tipo} onChange={(v) => setCableGuardia({ ...cableGuardia, tipo: v })} />
          <InputField label="Diámetro" value={cableGuardia.diametro} onChange={(v) => setCableGuardia({ ...cableGuardia, diametro: parseFloat(v) || 0 })} unit="mm" />
          <InputField label="Peso Unitario" value={cableGuardia.peso} onChange={(v) => setCableGuardia({ ...cableGuardia, peso: parseFloat(v) || 0 })} unit="kg/m" />
          <InputField label="Tensión de Rotura" value={cableGuardia.tensionRotura} onChange={(v) => setCableGuardia({ ...cableGuardia, tensionRotura: parseFloat(v) || 0 })} unit="kg" />
          <InputField label="Tensión Máxima" value={cableGuardia.tensionMaxima} onChange={(v) => setCableGuardia({ ...cableGuardia, tensionMaxima: parseFloat(v) || 0 })} unit="kg" />
          <InputField label="Tensión Normal (15°C)" value={cableGuardia.tensionNormal} onChange={(v) => setCableGuardia({ ...cableGuardia, tensionNormal: parseFloat(v) || 0 })} unit="kg" />
        </div>
      </CollapsibleSection>

      {/* ── 4. Condiciones Ambientales ── */}
      <CollapsibleSection title="4. Condiciones Ambientales" icon={Wind} badge="§5.8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <SelectField label="Zona Geográfica (§5.8.1)" value={ambiente.zona}
            options={[
              { value: "II", label: "Zona II — Costera (50 kg/m²)" },
              { value: "III", label: "Zona III — Interior (40 kg/m²)" },
            ]}
            onChange={(v) => setAmbiente({ ...ambiente, zona: v as "II" | "III" })}
          />
          <InputField label="Presión de Viento (auto)" value={presionViento} readOnly unit="kg/m²" hint="Según zona" />
          <InputField label="Temperatura Ambiente (auto)" value={tempAmbiente} readOnly unit="°C" />
          <InputField label="Altitud" value={ambiente.altitud} onChange={(v) => setAmbiente({ ...ambiente, altitud: parseFloat(v) || 0 })} unit="m.s.n.m." />
          <InputField label="Espesor Manguito de Hielo" value={ambiente.espHielo} onChange={(v) => setAmbiente({ ...ambiente, espHielo: parseFloat(v) || 0 })} unit="mm" hint="0 para Zonas II y III" />
        </div>
      </CollapsibleSection>

      {/* ── 5. Estructura de Soporte ── */}
      <CollapsibleSection title="5. Estructura de Soporte" icon={Building} badge="§5.9 / §5.12 / §5.28">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <SelectField label="Tipo de Estructura (§5.9)" value={estructura.tipo}
            options={[
              { value: "reticulada", label: "Reticulada cuadrada/rectangular" },
              { value: "poste_hormigon", label: "Poste de hormigón" },
              { value: "poste_metalico", label: "Poste metálico poligonal (≤8 lados)" },
              { value: "poste_circular", label: "Poste circular / poligonal >8 lados" },
            ]}
            onChange={(v) => setEstructura({ ...estructura, tipo: v as any })}
          />
          <InputField label="Altura Total" value={estructura.alturaTotal} onChange={(v) => setEstructura({ ...estructura, alturaTotal: parseFloat(v) || 0 })} unit="m" />
          <InputField label="Altura Media Conductor (hc)" value={estructura.alturaConductor} onChange={(v) => setEstructura({ ...estructura, alturaConductor: parseFloat(v) || 0 })} unit="m" hint="Para cálculo de Gc" />
          <InputField label="Área Frontal (Af)" value={estructura.areaFrontal} onChange={(v) => setEstructura({ ...estructura, areaFrontal: parseFloat(v) || 0 })} unit="m²" />
          {estructura.tipo === "reticulada" && (
            <InputField label="Área Global (Ag)" value={estructura.areaGlobal} onChange={(v) => setEstructura({ ...estructura, areaGlobal: parseFloat(v) || 0 })} unit="m²" hint="Para factor de solidez e = Af/Ag" />
          )}
          <InputField label="Espesor Mín. Perfil (§5.28.5)" value={estructura.espesorPerfil} onChange={(v) => setEstructura({ ...estructura, espesorPerfil: parseFloat(v) || 0 })} unit="mm" hint="Mín: 5 mm principales, 3 mm otros" />
        </div>
      </CollapsibleSection>

      {/* ── 6. Vano ── */}
      <CollapsibleSection title="6. Datos del Vano" icon={Ruler} badge="Editable" defaultOpen={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <InputField label="Longitud del Vano" value={vano.longitudVano} onChange={(v) => setVano({ ...vano, longitudVano: parseFloat(v) || 0 })} unit="m" />
          <InputField label="Vano Viento (Lv)" value={vano.vanoViento} onChange={(v) => setVano({ ...vano, vanoViento: parseFloat(v) || 0 })} unit="m" />
          <InputField label="Vano Peso (Lp)" value={vano.vanoPeso} onChange={(v) => setVano({ ...vano, vanoPeso: parseFloat(v) || 0 })} unit="m" />
          <InputField label="Ángulo de la Línea (δ)" value={vano.anguloLinea} onChange={(v) => setVano({ ...vano, anguloLinea: parseFloat(v) || 0 })} unit="°" hint="Para solicitación de ángulo" />
        </div>
      </CollapsibleSection>

      {/* ── 7. Factor Gc y Fuerza de Viento (§5.8.4 / §5.12) ── */}
      <CollapsibleSection title="7. Factor Gc y Fuerza de Viento sobre Estructura" icon={Wind} badge="§5.8.4 / §5.12">
        <div className="space-y-4">
          {/* Gc */}
          <div className="eng-formula">
            <p className="text-sm mb-1"><strong>Factor de Amplificación G<sub>c</sub> (§5.8.4):</strong></p>
            {estructura.alturaConductor <= 50 ? (
              <p className="text-center text-sm">h<sub>c</sub> = {fmt(estructura.alturaConductor, 1)} m ≤ 50 m → <strong className="text-primary">G<sub>c</sub> = 1.00</strong></p>
            ) : (
              <p className="text-center text-sm">
                {ambiente.zona === "II"
                  ? <>G<sub>c</sub> = 0.2914 × Ln({fmt(estructura.alturaConductor, 1)}) + 1.0468</>
                  : <>G<sub>c</sub> = 0.4936 × Ln({fmt(estructura.alturaConductor, 1)}) + 0.9124</>
                }
                {" "}= <strong className="text-primary">{fmt(calc.Gc, 4)}</strong>
              </p>
            )}
          </div>

          {/* qc */}
          <div className="eng-formula">
            <p className="text-sm">
              <strong>Presión corregida:</strong> q<sub>c</sub> = P<sub>v</sub> × G<sub>c</sub> = {presionViento} × {fmt(calc.Gc, 4)} = <strong className="text-primary">{fmt(calc.qc, 2)} kg/m²</strong>
            </p>
          </div>

          {/* Fz */}
          <div className="eng-formula">
            <p className="text-sm mb-1"><strong>Fuerza de viento sobre estructura (§5.12):</strong></p>
            <p className="text-center text-base font-semibold mb-3">
              F<sub>z</sub> = G<sub>t</sub> × C<sub>f</sub> × q<sub>c</sub> × A<sub>f</sub>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead><tr><th>Variable</th><th>Descripción</th><th>Valor</th><th>Unidad</th></tr></thead>
              <tbody>
                <tr><td className="font-mono font-semibold">G<sub>t</sub></td><td>Factor de turbulencia</td><td className="font-mono">{fmt(calc.Gt, 2)}</td><td>—</td></tr>
                <tr><td className="font-mono font-semibold">C<sub>f</sub></td><td>Factor de forma {estructura.tipo === "reticulada" ? `(e=${fmt(calc.solidez, 3)})` : ""}</td><td className="font-mono">{fmt(calc.Cf, 3)}</td><td>—</td></tr>
                <tr><td className="font-mono font-semibold">q<sub>c</sub></td><td>Presión viento corregida</td><td className="font-mono">{fmt(calc.qc, 2)}</td><td>kg/m²</td></tr>
                <tr><td className="font-mono font-semibold">A<sub>f</sub></td><td>Área frontal estructura</td><td className="font-mono">{fmt(estructura.areaFrontal, 2)}</td><td>m²</td></tr>
                <tr className="border-t-2 border-primary/30">
                  <td className="font-mono font-bold">F<sub>z</sub></td><td>Fuerza de viento</td>
                  <td className="font-mono font-bold text-primary">{fmt(calc.Fz, 1)}</td><td>kg</td>
                </tr>
              </tbody>
            </table>
          </div>

          {estructura.tipo === "reticulada" && (
            <div className="eng-note">
              <p className="text-xs">
                <Info className="w-3 h-3 inline mr-1" />
                <strong>Reticulada (§5.12):</strong> C<sub>f</sub> = 4.0·e² − 5.9·e + 4.0,
                donde e = A<sub>f</sub>/A<sub>g</sub> = {fmt(estructura.areaFrontal, 2)}/{fmt(estructura.areaGlobal, 2)} = <strong>{fmt(calc.solidez, 3)}</strong>
              </p>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* ── 8. Viento sobre conductores (§5.11) ── */}
      <CollapsibleSection title="8. Viento sobre Conductores y Cables" icon={Wind} badge="§5.11">
        <div className="space-y-4">
          <div className="eng-formula">
            <p className="text-sm mb-1"><strong>Fuerza de viento sobre conductor (§5.11.1):</strong></p>
            <p className="text-center text-sm">
              F<sub>v,cond</sub> = q<sub>c</sub> × Φ × L<sub>v</sub> = {fmt(calc.qc, 2)} × {(conductor.diametro / 1000).toFixed(5)} × {fmt(vano.vanoViento, 2)} = <strong className="text-primary">{fmt(calc.fuerzaVientoConductor, 2)} kg</strong>
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-foreground mb-1">Perpendicular (§5.11.1)</p>
              <p className="font-mono text-sm">{fmt(calc.fuerzaVientoConductor, 2)} kg</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-foreground mb-1">Paralelo (§5.11.2) = 1/4</p>
              <p className="font-mono text-sm">{fmt(calc.fuerzaVientoConductorParalelo, 2)} kg</p>
            </div>
          </div>
          <div className="eng-formula">
            <p className="text-sm">
              <strong>Viento sobre cable de guardia:</strong> F<sub>v,CG</sub> = {fmt(calc.qc, 2)} × {(cableGuardia.diametro / 1000).toFixed(5)} × {fmt(vano.vanoViento, 2)} = <strong className="text-primary">{fmt(calc.fuerzaVientoCG, 2)} kg</strong>
            </p>
          </div>
          <div className="eng-note">
            <p className="text-xs"><Info className="w-3 h-3 inline mr-1" /><strong>§5.11.6:</strong> Presión sobre cadena de aisladores = presión sobre conductor × 1,2</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 9. Tensiones Mecánicas y Coef. Seguridad (§5.10) ── */}
      <CollapsibleSection title="9. Tensiones Mecánicas y Coef. de Seguridad" icon={Zap} badge="§5.10">
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead><tr><th>Parámetro</th><th>Valor</th><th>Límite</th><th>Estado</th></tr></thead>
              <tbody>
                <tr>
                  <td>Tmáx (sin hielo) ≤ 50% Trupt</td>
                  <td className="font-mono">{fmt(conductor.tensionMaxima, 0)} kg</td>
                  <td className="font-mono">{fmt(calc.tensionMax50, 0)} kg</td>
                  <td>{conductor.tensionMaxima <= calc.tensionMax50
                    ? <span className="eng-badge eng-badge-primary">OK ✓</span>
                    : <span className="eng-badge eng-badge-warning">EXCEDE ✗</span>
                  }</td>
                </tr>
                <tr>
                  <td>Tmáx (con hielo) ≤ 70% Trupt</td>
                  <td className="font-mono">{fmt(conductor.tensionMaxima, 0)} kg</td>
                  <td className="font-mono">{fmt(calc.tensionMax70, 0)} kg</td>
                  <td>{conductor.tensionMaxima <= calc.tensionMax70
                    ? <span className="eng-badge eng-badge-primary">OK ✓</span>
                    : <span className="eng-badge eng-badge-warning">EXCEDE ✗</span>
                  }</td>
                </tr>
                <tr>
                  <td>CS normal (Trupt / Tn)</td>
                  <td className="font-mono font-bold text-primary">{fmt(calc.csNormal, 2)}</td>
                  <td className="font-mono">&gt; 1.0</td>
                  <td>{calc.csNormal > 1 ? <span className="eng-badge eng-badge-primary">OK</span> : <span className="eng-badge eng-badge-warning">BAJO</span>}</td>
                </tr>
                <tr>
                  <td>CS máximo (Trupt / Tmáx)</td>
                  <td className="font-mono font-bold">{fmt(calc.csMaximo, 2)}</td>
                  <td className="font-mono">≥ 2.0</td>
                  <td>{calc.csMaximo >= 2 ? <span className="eng-badge eng-badge-primary">OK</span> : <span className="eng-badge eng-badge-warning">BAJO</span>}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 10. Cortadura de Conductor (§5.14 Tabla N°3) ── */}
      <CollapsibleSection title="10. Cortadura de Conductor" icon={Zap} badge="§5.14 Tabla N°3">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <SelectField label="Tipo de Estructura" value={cortadura.tipoEstructura}
              options={[
                { value: "suspension", label: "Suspensión" },
                { value: "anclaje", label: "Anclaje / Remate" },
              ]}
              onChange={(v) => setCortadura({ ...cortadura, tipoEstructura: v as any })}
            />
            {cortadura.tipoEstructura === "suspension" && (
              <>
                <InputField label="Factor k" value={cortadura.factorK} onChange={(v) => setCortadura({ ...cortadura, factorK: parseFloat(v) || 0 })} hint="0.7 grampas deslizantes, 1.0 otro" />
                <InputField label="N° cond. cortados (n1)" value={cortadura.numConductoresCortados} onChange={(v) => setCortadura({ ...cortadura, numConductoresCortados: parseInt(v) || 0 })} />
              </>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead><tr><th>Elemento</th><th>Fórmula</th><th>Valor</th><th>Unidad</th></tr></thead>
              <tbody>
                <tr>
                  <td>Conductores</td>
                  <td className="font-mono text-xs">
                    {cortadura.tipoEstructura === "suspension"
                      ? `n1×k×Tn = ${cortadura.numConductoresCortados}×${cortadura.factorK}×${fmt(conductor.tensionNormal, 0)}`
                      : `n×Tmáx = ${project.numConductoresFase}×${fmt(conductor.tensionMaxima, 0)}`
                    }
                  </td>
                  <td className="font-mono font-bold text-primary">{fmt(calc.cortaduraCond, 0)}</td>
                  <td>kg</td>
                </tr>
                <tr>
                  <td>Cable de Guardia</td>
                  <td className="font-mono text-xs">
                    {cortadura.tipoEstructura === "suspension" ? `Tn = ${fmt(cableGuardia.tensionNormal, 0)}` : `Tmáx = ${fmt(cableGuardia.tensionMaxima, 0)}`}
                  </td>
                  <td className="font-mono font-bold text-primary">{fmt(calc.cortaduraCG, 0)}</td>
                  <td>kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 11. Solicitación de Ángulo (§5.13) ── */}
      <CollapsibleSection title="11. Solicitación de Ángulo" icon={Ruler} badge="§5.13" defaultOpen={false}>
        <div className="space-y-4">
          <div className="eng-formula">
            <p className="text-sm mb-1"><strong>Fuerza resultante en vértice angular:</strong></p>
            <p className="text-center text-sm">
              F<sub>ángulo</sub> = 2 × n × T<sub>máx</sub> × sin(δ/2)
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-foreground mb-1">Conductores (por fase)</p>
              <p className="text-sm">2 × {project.numConductoresFase} × {fmt(conductor.tensionMaxima, 0)} × sin({fmt(vano.anguloLinea, 1)}°/2)</p>
              <p className="font-mono text-base font-bold text-primary mt-1">{fmt(calc.fuerzaAnguloCond, 1)} kg</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs font-semibold text-foreground mb-1">Cable de Guardia</p>
              <p className="text-sm">2 × {fmt(cableGuardia.tensionMaxima, 0)} × sin({fmt(vano.anguloLinea, 1)}°/2)</p>
              <p className="font-mono text-base font-bold text-primary mt-1">{fmt(calc.fuerzaAnguloCG, 1)} kg</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 12. Cruces y Paralelismos (§5.7) ── */}
      <CollapsibleSection title="12. Cruces y Paralelismos" icon={Shield} badge="§5.7" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
            <InputField label="Distancia al punto de cruce (§5.7.5)" value={cruceTensionDist} onChange={(v) => setCruceTensionDist(parseFloat(v) || 0)} unit="m" />
            <InputField label="Tensión línea inferior (kV)" value={kVInferior} onChange={(v) => setKVInferior(parseFloat(v) || 0)} unit="kV" />
          </div>

          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead><tr><th>Concepto</th><th>Fórmula</th><th>Valor</th><th>Unidad</th></tr></thead>
              <tbody>
                <tr>
                  <td>Cruce tensión reducida (§5.7.5)</td>
                  <td className="font-mono text-xs">1.80 + 0.01×kV {cruceTensionDist > 50 ? `+ 0.003×(${cruceTensionDist}-50)` : ""}</td>
                  <td className="font-mono font-bold text-primary">{fmt(calc.cruceTensionRed, 2)}</td>
                  <td>m</td>
                </tr>
                <tr>
                  <td>Cruce horiz. (BT inferior) §5.7.7</td>
                  <td className="font-mono text-xs">1.5 + F/√2</td>
                  <td className="font-mono font-bold">{fmt(calc.cruceBTHoriz, 2)}</td>
                  <td>m</td>
                </tr>
                <tr>
                  <td>Cruce horiz. (MT/AT inferior) §5.7.7</td>
                  <td className="font-mono text-xs">1.5 + F/√2 + kV/170</td>
                  <td className="font-mono font-bold">{fmt(calc.cruceMTATHoriz, 2)}</td>
                  <td>m</td>
                </tr>
                <tr>
                  <td>Cruce vertical (MT/AT) §5.7.7</td>
                  <td className="font-mono text-xs">1.5 + (kVs+kVi)/170</td>
                  <td className="font-mono font-bold">{fmt(calc.cruceVertMTAT, 2)}</td>
                  <td>m</td>
                </tr>
                <tr>
                  <td>Paralelismo mínimo (§5.7.6)</td>
                  <td className="font-mono text-xs">1.5 × H<sub>total</sub></td>
                  <td className="font-mono font-bold">{fmt(calc.separacionParalelismo, 1)}</td>
                  <td>m</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="eng-note">
            <p className="text-xs"><Info className="w-3 h-3 inline mr-1" />
              Flecha estimada (catenaria simplificada): f ≈ p×L²/(8×Tn) = {fmt(calc.flechaEstimada, 2)} m
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── 13. Hielo (§5.21) ── */}
      {ambiente.espHielo > 0 && (
        <CollapsibleSection title="13. Sobrecarga de Hielo" icon={Wind} badge="§5.21">
          <div className="space-y-4">
            <div className="eng-formula">
              <p className="text-sm">
                <strong>Peso hielo:</strong> ρ<sub>hielo</sub> × π × (Φ + e<sub>h</sub>) × e<sub>h</sub> = {fmt(calc.pesoHielo, 4)} kg/m
              </p>
              <p className="text-sm mt-1">
                <strong>Peso conductor + hielo:</strong> {fmt(conductor.peso, 4)} + {fmt(calc.pesoHielo, 4)} = <strong className="text-primary">{fmt(calc.pesoConductorConHielo, 4)} kg/m</strong>
              </p>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* ── 14. Factores de Mínima Sobrecarga (§5.28.8 Tabla N°4) ── */}
      <CollapsibleSection title="14. Factores de Mínima Sobrecarga" icon={Building} badge="§5.28.8 Tabla N°4" defaultOpen={false}>
        <div className="overflow-x-auto">
          <table className="eng-table">
            <thead><tr><th>Condición</th><th>Factor</th></tr></thead>
            <tbody>
              {calc.factoresTabla4.map((row, i) => (
                <tr key={i}>
                  <td className="text-sm">{row.condicion}</td>
                  <td className="font-mono font-bold text-lg text-primary">{row.factor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="eng-note mt-3">
          <p className="text-xs"><Info className="w-3 h-3 inline mr-1" />
            Los factores se aplican a las solicitaciones calculadas para verificar la capacidad de la estructura.
          </p>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default CalculadoraRPTD11;
