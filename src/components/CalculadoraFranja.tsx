import { useState, useMemo } from "react";
import { Calculator, Wind, Ruler, Zap, Settings, ChevronDown, ChevronUp, Info } from "lucide-react";

// Safe number formatting helper
const fmt = (v: number | undefined | null, d = 2) => Number(v ?? 0).toFixed(d);

// Default values from Monteaguila 220 kV project
const defaultProject = {
  projectName: "Nueva S/E Seccionadora Monteaguila 220 kV",
  tensionNominal: 220,
  frecuencia: 50,
  numCircuitos: 2,
  numFases: 3,
  numConductoresFase: 2,
};

const defaultConductor = {
  tipo: "AAAC 1400 MCM",
  diametro: 34.63, // mm
  peso: 1.9465, // kg/m
  seccion: 709.4, // mm²
  tensionRotura: 20649, // kg
  coefDilatacion: 23e-6, // 1/°C
  moduloElasticidad: 5550, // kg/mm²
};

const defaultAmbiente = {
  zona: "III" as "II" | "III" | "custom",
  altitud: 131, // m.s.n.m.
  tempAmbiente: 10, // °C
  tempMaxima: 35, // °C
  tempMinima: -5, // °C
  presionViento: 40, // kg/m² (auto from zona)
};

const defaultVano = {
  longitudVano: 380.12, // m
  flecha: 10.67, // m
  tensionLongitudinal: 4350.11, // kg
  largoCadena: 2.37, // m
  anchoCrucetaInicio: 6.4, // m
  anchoCrucetaFin: 6.4, // m
  tipoCadena: "suspension" as "suspension" | "anclaje",
  pesoAislacion: 120, // kg (inventado)
  areaAislacion: 0.15, // m² (inventado)
  numAislacionFase: 1,
  vanoViento: 293.72, // m
  vanoPeso: 293.72, // m
   // Variables para fórmula completa tan(α) cadena (RPTD N°07)
   k: 1.0, // coeficiente ≤ 1.0
  diametroAislador: 280, // mm — diámetro del disco del aislador
  Nca: 1, // número de cadenas de aisladores en paralelo
  Na: 14, // número de aisladores que forman cada cadena
  pesoUnitarioAislador: 8.5, // kg — peso unitario del aislador
  Qva: 40, // kg/m² — presión máxima de viento sobre aisladores
  Tc: 4350, // kg — tensión mecánica de un subconductor
  anguloLinea: 0, // ° — ángulo de la línea (δ)
};

// ds table from RPTD N°07 punto 4.5
const dsTable: { min: number; max: number; ds: number }[] = [
  { min: 0, max: 1, ds: 1.5 },
  { min: 1, max: 36, ds: 2.0 },
  { min: 36, max: 52, ds: 2.48 },
  { min: 52, max: 72.5, ds: 2.63 },
  { min: 72.5, max: 123, ds: 3.1 },
  { min: 123, max: 145, ds: 3.3 },
  { min: 145, max: 170, ds: 3.5 },
  { min: 170, max: 245, ds: 4.1 },
  { min: 245, max: 300, ds: 5.1 },
  { min: 300, max: 362, ds: 5.6 },
  { min: 362, max: 420, ds: 6.2 },
  { min: 420, max: 550, ds: 7.0 },
  { min: 550, max: 800, ds: 11.4 },
];

function getDs(tensionKv: number): number {
  const entry = dsTable.find((e) => tensionKv > e.min && tensionKv <= e.max);
  return entry ? entry.ds : 4.1;
}

function getFactorReduccion(vano: number): number {
  if (vano < 250) return 1.0;
  if (vano <= 500) return 0.9;
  return 0.8;
}

function getPresionVientoZona(zona: "II" | "III"): number {
  return zona === "II" ? 50 : 40;
}

function getTempAmbienteZona(zona: "II" | "III"): number {
  return zona === "II" ? 5 : 10;
}

function getCorreccionAltitud(altitud: number, ds: number): number {
  if (altitud <= 1000) return ds;
  const incremento = Math.floor((altitud - 1000) / 300) * 0.03;
  return ds * (1 + incremento);
}

// Section collapse component
const CollapsibleSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  badge,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-foreground truncate">{title}</h3>
          {badge && <span className="eng-badge eng-badge-primary hidden sm:inline-flex">{badge}</span>}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2">{children}</div>}
    </div>
  );
};

const formatDisplay = (v: number | string) =>
  typeof v === "number" ? (Number.isInteger(v) ? String(v) : v.toFixed(4).replace(/\.?0+$/, "")) : v;

// Input field component
const InputField = ({
  label,
  value,
  onChange,
  unit,
  hint,
  readOnly = false,
  highlight = false,
}: {
  label: string;
  value: number | string;
  onChange?: (v: string) => void;
  unit?: string;
  hint?: string;
  readOnly?: boolean;
  highlight?: boolean;
}) => {
  const [localVal, setLocalVal] = useState<string>(formatDisplay(value));
  const [focused, setFocused] = useState(false);
  const displayValue = focused ? localVal : formatDisplay(value);

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-1">
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            const raw = e.target.value
              .replace(/,/g, ".")
              .replace(/[^\d.\-]/g, "")
              .replace(/^(-?\d*\.\d*).*$/, "$1");
            setLocalVal(raw);
            onChange?.(raw);
          }}
          onFocus={() => { setFocused(true); setLocalVal(formatDisplay(value)); }}
          onBlur={() => setFocused(false)}
          readOnly={readOnly}
          className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm font-mono transition-colors
            ${readOnly
              ? "bg-muted/50 border-border cursor-default text-foreground/70"
              : "bg-background border-input focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            }
            ${highlight ? "!bg-primary/10 !border-primary/40 !text-primary font-bold" : ""}
          `}
        />
        {unit && <span className="text-xs text-muted-foreground whitespace-nowrap min-w-[40px]">{unit}</span>}
      </div>
      {hint && <p className="text-[10px] text-muted-foreground/70">{hint}</p>}
    </div>
  );
};

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
);

const CalculadoraFranja = () => {
  const [project, setProject] = useState(defaultProject);
  const [conductor, setConductor] = useState(defaultConductor);
  const [ambiente, setAmbiente] = useState(defaultAmbiente);
  const [vano, setVano] = useState(defaultVano);

  // Auto-update wind pressure when zone changes (or use custom values)
  const presionViento = useMemo(() =>
    ambiente.zona === "custom" ? ambiente.presionViento : getPresionVientoZona(ambiente.zona as "II" | "III"),
    [ambiente.zona, ambiente.presionViento]
  );
  const tempAmbienteZona = useMemo(() =>
    ambiente.zona === "custom" ? ambiente.tempAmbiente : getTempAmbienteZona(ambiente.zona as "II" | "III"),
    [ambiente.zona, ambiente.tempAmbiente]
  );

  const calc = useMemo(() => {
    // Factor de reducción por vano
    const fr = getFactorReduccion(vano.longitudVano);

    // Presión de viento efectiva sobre conductor
    const pvEfectiva = presionViento * fr;

    // Ángulo de desviación del conductor: tan(αC) = Pv × Fr × ΦC / PC
    const fuerzaVientoCond = pvEfectiva * (conductor.diametro / 1000); // kg/m
    const tanAlphaC = fuerzaVientoCond / conductor.peso;
    const alphaCRad = Math.atan(tanAlphaC);
    const alphaCDeg = (alphaCRad * 180) / Math.PI;

    // df = flecha × sin(αC)
    const df = vano.flecha * Math.sin(alphaCRad);

     // Ángulo de desviación de la cadena de aisladores (fórmula completa RPTD N°07)
     // tan(α) = [k × (Lv × Nsc × d × Qvc + 0.5 × Nca × da × Lc × Qva) × 10⁻³ + Tr] / [Lp × Nsc × p + 0.5 × Nca × Na × Pa]
    // Tr = 2 × Nsc × Tc × sin(δ/2)
    const fp = 1.2; // factor amplificación (legacy display)
    const ncp = project.numConductoresFase; // Nsc
    const deltaRad = (vano.anguloLinea * Math.PI) / 180;
    const Tr = 2 * ncp * vano.Tc * Math.sin(deltaRad / 2);

    const numeradorCadena =
      vano.k * (
        vano.vanoViento * ncp * (conductor.diametro / 1000) * presionViento +
        0.5 * vano.Nca * (vano.diametroAislador / 1000) * vano.largoCadena * vano.Qva
      ) + Tr; // ×10⁻³ already handled by using meters for d

     const denominadorCadena =
       vano.vanoPeso * ncp * conductor.peso +
       0.5 * vano.Nca * vano.Na * vano.pesoUnitarioAislador;

    const tanAlphaCadena = numeradorCadena / denominadorCadena;
    const alphaCadenaRad = Math.atan(tanAlphaCadena);
    const alphaCadenaDeg = (alphaCadenaRad * 180) / Math.PI;

    // dc = Lc × sin(αCadena) — solo para suspensión
    const dc = vano.tipoCadena === "suspension" ? vano.largoCadena * Math.sin(alphaCadenaRad) : 0;

    // dE = max(anchoCrucetaInicio, anchoCrucetaFin)
    const dE = Math.max(vano.anchoCrucetaInicio, vano.anchoCrucetaFin);

    // ds from table
    const dsBase = getDs(project.tensionNominal);
    const ds = getCorreccionAltitud(ambiente.altitud, dsBase);

    // DeL = dE + df + dc + ds
    const DeL = dE + df + dc + ds;

    // Franja de seguridad = 2 × DeL
    const FS = 2 * DeL;

    // Altura mínima transitable (Tab 5 / Tab 8): 6.5 + 0.006 × kV
    const alturaMinTransitable = 6.5 + 0.006 * project.tensionNominal;

    // Separación fase-fase (Pto 5.4): 0.36 × √f + kV/130 + 0.5 × C
    const C = conductor.diametro / 1000; // diámetro en metros
    const separacionFF = 0.36 * Math.sqrt(vano.flecha) + project.tensionNominal / 130 + 0.5 * C;

    // Factor Gc (mismo que RPTD 11, simplificado)
    const Gc = 1.0; // RPTD 07 no define Gc explícitamente, se asume 1.0

    // Corrección altitud factor Ka
    const Ka = ambiente.altitud > 1000 ? 1 + Math.floor((ambiente.altitud - 1000) / 300) * 0.03 : 1.0;

    return {
      fr,
      pvEfectiva,
      fuerzaVientoCond,
      tanAlphaC,
      alphaCDeg,
      df,
      fp,
      Tr,
      numeradorCadena,
      denominadorCadena,
      tanAlphaCadena,
      alphaCadenaDeg,
      dc,
      dE,
      dsBase,
      ds,
      DeL,
      FS,
      alturaMinTransitable,
      separacionFF,
      Gc,
      Ka,
    };
  }, [project, conductor, ambiente, vano, presionViento]);

  const numConductoresFase = project.numConductoresFase; // used in JSX

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-xl font-bold text-foreground">Calculadora de Franja de Seguridad</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Según RPTD N° 07 — Franja y Distancias de Seguridad (SEC)
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">D<sub>eL</sub> = d<sub>E</sub> + d<sub>f</sub> + d<sub>c</sub> + d<sub>s</sub></span>
              <span className="eng-badge eng-badge-warning">Interactiva</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result Summary - Always visible */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border-2 border-primary/30">
        <h3 className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4">Resultado del Cálculo</h3>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {[
            { label: "dE", value: calc.dE, unit: "m", color: "text-foreground" },
            { label: "df", value: calc.df, unit: "m", color: "text-foreground" },
            { label: "dc", value: calc.dc, unit: "m", color: "text-foreground" },
            { label: "ds", value: calc.ds, unit: "m", color: "text-foreground" },
            { label: "DeL", value: calc.DeL, unit: "m", color: "text-primary" },
            { label: "FS", value: calc.FS, unit: "m", color: "text-primary" },
          ].map((r) => (
            <div key={r.label} className={`rounded-lg p-2 sm:p-3 text-center ${r.label === "FS" ? "bg-primary/10 border border-primary/30" : "bg-muted/50"}`}>
              <p className={`text-base sm:text-xl font-bold font-mono ${r.color}`}>{fmt(r.value, 2)}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                {r.label === "FS" ? "FS" : r.label} <span className="hidden sm:inline">[{r.unit}]</span>
              </p>
            </div>
          ))}
        </div>
        <div className="eng-formula mt-3 sm:mt-4">
          <p className="text-center text-[10px] sm:text-sm leading-relaxed">
            <strong>D<sub>eL</sub></strong> = {fmt(calc.dE, 2)} + {fmt(calc.df, 2)} + {fmt(calc.dc, 2)} + {fmt(calc.ds, 2)} = <strong>{fmt(calc.DeL, 2)} m</strong>
            <br className="sm:hidden" />
            <span className="hidden sm:inline">&nbsp;&nbsp;→&nbsp;&nbsp;</span>
            <span className="sm:hidden">→ </span>
            <strong>FS</strong> = 2 × {fmt(calc.DeL, 2)} = <strong className="text-primary">{fmt(calc.FS, 2)} m</strong>
          </p>
        </div>
      </div>

      {/* 1. Datos del Proyecto */}
      <CollapsibleSection title="1. Datos del Proyecto" icon={Settings} badge="General">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="sm:col-span-2 md:col-span-3">
            <InputField
              label="Nombre del Proyecto"
              value={project.projectName}
              onChange={(v) => setProject({ ...project, projectName: v })}
            />
          </div>
          <InputField
            label="Tensión Nominal"
            value={project.tensionNominal}
            onChange={(v) => setProject({ ...project, tensionNominal: parseFloat(v) || 0 })}
            unit="kV"
          />
          <InputField
            label="Frecuencia"
            value={project.frecuencia}
            onChange={(v) => setProject({ ...project, frecuencia: parseFloat(v) || 0 })}
            unit="Hz"
          />
          <InputField
            label="N° Circuitos"
            value={project.numCircuitos}
            onChange={(v) => setProject({ ...project, numCircuitos: parseInt(v) || 0 })}
          />
          <InputField
            label="N° Fases"
            value={project.numFases}
            onChange={(v) => setProject({ ...project, numFases: parseInt(v) || 0 })}
          />
          <InputField
            label="Conductores por Fase"
            value={project.numConductoresFase}
            onChange={(v) => setProject({ ...project, numConductoresFase: parseInt(v) || 0 })}
          />
        </div>
      </CollapsibleSection>

      {/* 2. Conductor */}
      <CollapsibleSection title="2. Características del Conductor" icon={Zap} badge="RPTD N°07 §4.3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <InputField
            label="Tipo de Conductor"
            value={conductor.tipo}
            onChange={(v) => setConductor({ ...conductor, tipo: v })}
          />
          <InputField
            label="Diámetro Nominal (ΦC)"
            value={conductor.diametro}
            onChange={(v) => setConductor({ ...conductor, diametro: parseFloat(v) || 0 })}
            unit="mm"
          />
          <InputField
            label="Peso Nominal (PC)"
            value={conductor.peso}
            onChange={(v) => setConductor({ ...conductor, peso: parseFloat(v) || 0 })}
            unit="kg/m"
          />
          <InputField
            label="Sección Transversal"
            value={conductor.seccion}
            onChange={(v) => setConductor({ ...conductor, seccion: parseFloat(v) || 0 })}
            unit="mm²"
          />
          <InputField
            label="Tensión de Rotura"
            value={conductor.tensionRotura}
            onChange={(v) => setConductor({ ...conductor, tensionRotura: parseFloat(v) || 0 })}
            unit="kg"
          />
          <InputField
            label="Módulo de Elasticidad"
            value={conductor.moduloElasticidad}
            onChange={(v) => setConductor({ ...conductor, moduloElasticidad: parseFloat(v) || 0 })}
            unit="kg/mm²"
          />
        </div>
      </CollapsibleSection>

      {/* 3. Condiciones Ambientales */}
      <CollapsibleSection title="3. Condiciones Ambientales" icon={Wind} badge="RPTD N°11 §5.8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <SelectField
            label="Zona Geográfica (RPTD N°11 §5.8.1)"
            value={ambiente.zona}
            options={[
              { value: "II", label: "Zona II — Costera (50 kg/m²)" },
              { value: "III", label: "Zona III — Interior (40 kg/m²)" },
              { value: "custom", label: "Personalizada — Definida por usuario" },
            ]}
            onChange={(v) => setAmbiente({ ...ambiente, zona: v as "II" | "III" | "custom" })}
          />
          <InputField
            label={ambiente.zona === "custom" ? "Presión de Viento" : "Presión de Viento (auto)"}
            value={ambiente.zona === "custom" ? ambiente.presionViento : presionViento}
            onChange={ambiente.zona === "custom" ? (v) => setAmbiente({ ...ambiente, presionViento: parseFloat(v) || 0 }) : undefined}
            readOnly={ambiente.zona !== "custom"}
            unit="kg/m²"
            hint={ambiente.zona === "custom" ? "Valor definido manualmente" : "Según zona seleccionada"}
          />
          <InputField
            label={ambiente.zona === "custom" ? "Temperatura Ambiente" : "Temperatura Ambiente (auto)"}
            value={ambiente.zona === "custom" ? ambiente.tempAmbiente : tempAmbienteZona}
            onChange={ambiente.zona === "custom" ? (v) => setAmbiente({ ...ambiente, tempAmbiente: parseFloat(v) || 0 }) : undefined}
            readOnly={ambiente.zona !== "custom"}
            unit="°C"
            hint={ambiente.zona === "custom" ? "Valor definido manualmente" : "Según zona seleccionada"}
          />
          <InputField
            label="Altitud"
            value={ambiente.altitud}
            onChange={(v) => setAmbiente({ ...ambiente, altitud: parseFloat(v) || 0 })}
            unit="m.s.n.m."
            hint={ambiente.altitud > 1000 ? "⚠ Se aplica corrección por altitud" : "Sin corrección (< 1000 m)"}
          />
          <InputField
            label="Temperatura Máxima"
            value={ambiente.tempMaxima}
            onChange={(v) => setAmbiente({ ...ambiente, tempMaxima: parseFloat(v) || 0 })}
            unit="°C"
          />
          <InputField
            label="Temperatura Mínima"
            value={ambiente.tempMinima}
            onChange={(v) => setAmbiente({ ...ambiente, tempMinima: parseFloat(v) || 0 })}
            unit="°C"
          />
        </div>
        {ambiente.altitud > 1000 && (
          <div className="eng-note mt-4">
            <p className="text-sm">
              <strong>Corrección por altitud (§4.6 / §5.6):</strong> Incremento del 3% cada 300 m sobre 1.000 m.s.n.m.
              <br />
              ds corregida: {fmt(calc.dsBase, 2)} × (1 + {(Math.floor((ambiente.altitud - 1000) / 300) * 0.03).toFixed(2)}) = <strong>{fmt(calc.ds, 2)} m</strong>
            </p>
          </div>
        )}
      </CollapsibleSection>

      {/* 4. Datos del Vano */}
      <CollapsibleSection title="4. Datos del Vano y Estructura" icon={Ruler} badge="Editable">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <InputField
            label="Longitud del Vano"
            value={vano.longitudVano}
            onChange={(v) => setVano({ ...vano, longitudVano: parseFloat(v) || 0 })}
            unit="m"
          />
          <InputField
            label="Factor Reducción (auto)"
            value={calc.fr}
            readOnly
            hint={`Vano ${vano.longitudVano < 250 ? "< 250" : vano.longitudVano <= 500 ? "250-500" : "> 500"} m`}
          />
          <InputField
            label="Flecha del Conductor"
            value={vano.flecha}
            onChange={(v) => setVano({ ...vano, flecha: parseFloat(v) || 0 })}
            unit="m"
            hint="Flecha en condición de viento máximo"
          />
          <InputField
            label="Tensión Longitudinal"
            value={vano.tensionLongitudinal}
            onChange={(v) => setVano({ ...vano, tensionLongitudinal: parseFloat(v) || 0 })}
            unit="kg"
          />
          <InputField
            label="Largo Cadena Aisladores (Lc)"
            value={vano.largoCadena}
            onChange={(v) => setVano({ ...vano, largoCadena: parseFloat(v) || 0 })}
            unit="m"
          />
          <SelectField
            label="Tipo de Cadena"
            value={vano.tipoCadena}
            options={[
              { value: "suspension", label: "Suspensión" },
              { value: "anclaje", label: "Anclaje / Rígida (dc=0)" },
            ]}
            onChange={(v) => setVano({ ...vano, tipoCadena: v as "suspension" | "anclaje" })}
          />
          <InputField
            label="Ancho Cruceta Estr. Inicio (dE)"
            value={vano.anchoCrucetaInicio}
            onChange={(v) => setVano({ ...vano, anchoCrucetaInicio: parseFloat(v) || 0 })}
            unit="m"
          />
          <InputField
            label="Ancho Cruceta Estr. Fin (dE)"
            value={vano.anchoCrucetaFin}
            onChange={(v) => setVano({ ...vano, anchoCrucetaFin: parseFloat(v) || 0 })}
            unit="m"
          />
          <InputField
            label="Vano Viento (Lv)"
            value={vano.vanoViento}
            onChange={(v) => setVano({ ...vano, vanoViento: parseFloat(v) || 0 })}
            unit="m"
          />
          <InputField
            label="Vano Peso (Lp)"
            value={vano.vanoPeso}
            onChange={(v) => setVano({ ...vano, vanoPeso: parseFloat(v) || 0 })}
            unit="m"
          />
          <InputField
            label="Peso Conjunto Aislación (Ma)"
            value={vano.pesoAislacion}
            onChange={(v) => setVano({ ...vano, pesoAislacion: parseFloat(v) || 0 })}
            unit="kg"
          />
          <InputField
            label="Área Proyectada Aislación (Aa)"
            value={vano.areaAislacion}
            onChange={(v) => setVano({ ...vano, areaAislacion: parseFloat(v) || 0 })}
            unit="m²"
          />
          <InputField
            label="N° Conjuntos Aislación/Fase (na)"
            value={vano.numAislacionFase}
            onChange={(v) => setVano({ ...vano, numAislacionFase: parseInt(v) || 0 })}
          />
        </div>

        {/* Variables adicionales para fórmula completa tan(α) cadena */}
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Variables fórmula tan(α) cadena — RPTD N°07
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <InputField
              label="Coeficiente k (≤ 1.0)"
              value={vano.k}
              onChange={(v) => setVano({ ...vano, k: parseFloat(v) || 0 })}
              hint="Coeficiente de reducción"
            />
            <InputField
              label="N° Cadenas en Paralelo (Nca)"
              value={vano.Nca}
              onChange={(v) => setVano({ ...vano, Nca: parseInt(v) || 1 })}
            />
            <InputField
              label="Diámetro Disco Aislador (da)"
              value={vano.diametroAislador}
              onChange={(v) => setVano({ ...vano, diametroAislador: parseFloat(v) || 0 })}
              unit="mm"
            />
            <InputField
              label="N° Aisladores por Cadena (Na)"
              value={vano.Na}
              onChange={(v) => setVano({ ...vano, Na: parseInt(v) || 0 })}
            />
            <InputField
              label="Peso Unitario Aislador (Pa)"
              value={vano.pesoUnitarioAislador}
              onChange={(v) => setVano({ ...vano, pesoUnitarioAislador: parseFloat(v) || 0 })}
              unit="kg"
            />
            <InputField
              label="Presión Viento Aisladores (Qva)"
              value={vano.Qva}
              onChange={(v) => setVano({ ...vano, Qva: parseFloat(v) || 0 })}
              unit="kg/m²"
            />
            <InputField
              label="Tensión Mecánica Subconductor (Tc)"
              value={vano.Tc}
              onChange={(v) => setVano({ ...vano, Tc: parseFloat(v) || 0 })}
              unit="kg"
              hint="Tensión en condición de viento"
            />
            <InputField
              label="Ángulo de la Línea (δ)"
              value={vano.anguloLinea}
              onChange={(v) => setVano({ ...vano, anguloLinea: parseFloat(v) || 0 })}
              unit="°"
              hint="0° = línea recta (Tr = 0)"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Cálculo Detallado dE */}
      <CollapsibleSection title="5. Cálculo de dE — Distancia al Eje" icon={Ruler} badge="§4.1">
        <div className="eng-formula">
          <p className="text-sm mb-2">
            <strong>d<sub>E</sub></strong> = máx(Ancho cruceta inicio, Ancho cruceta fin)
          </p>
          <p className="text-sm">
            d<sub>E</sub> = máx({fmt(vano.anchoCrucetaInicio, 2)}, {fmt(vano.anchoCrucetaFin, 2)}) = <strong className="text-primary">{fmt(calc.dE, 2)} m</strong>
          </p>
        </div>
        <div className="eng-note">
          <p className="text-xs flex items-start gap-1">
            <Info className="w-3 h-3 mt-0.5 shrink-0" />
            Distancia horizontal entre el centro de la estructura y el punto de engrampe del conductor más alejado de la estructura más espaciosa del vano.
          </p>
        </div>
      </CollapsibleSection>

      {/* 6. Cálculo Detallado df */}
      <CollapsibleSection title="6. Cálculo de df — Desviación del Conductor" icon={Wind} badge="§4.3">
        <div className="space-y-4">
          <div className="eng-formula">
            <p className="text-sm mb-1"><strong>Ecuación del ángulo de desviación:</strong></p>
            <p className="text-center text-base font-semibold mb-3">
              tan(α<sub>C</sub>) = P<sub>v</sub> × F<sub>r</sub> × Φ<sub>C</sub> / P<sub>C</sub>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Descripción</th>
                  <th>Valor</th>
                  <th>Unidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono font-semibold">P<sub>v</sub></td>
                  <td>Presión de viento × Factor reducción</td>
                  <td className="font-mono">{presionViento} × {calc.fr} = {fmt(calc.pvEfectiva, 1)}</td>
                  <td>kg/m²</td>
                </tr>
                <tr>
                  <td className="font-mono font-semibold">Φ<sub>C</sub></td>
                  <td>Diámetro del conductor</td>
                  <td className="font-mono">{(conductor.diametro / 1000).toFixed(5)}</td>
                  <td>m</td>
                </tr>
                <tr>
                  <td className="font-mono font-semibold">P<sub>C</sub></td>
                  <td>Peso del conductor</td>
                  <td className="font-mono">{fmt(conductor.peso, 4)}</td>
                  <td>kg/m</td>
                </tr>
                <tr>
                  <td className="font-mono font-semibold">F<sub>r</sub></td>
                  <td>Factor de reducción por vano</td>
                  <td className="font-mono">{calc.fr}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-mono font-semibold">tan(α<sub>C</sub>)</td>
                  <td>Tangente del ángulo</td>
                  <td className="font-mono font-semibold">{fmt(calc.tanAlphaC, 4)}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-mono font-semibold">α<sub>C</sub></td>
                  <td>Ángulo de desviación del conductor</td>
                  <td className="font-mono font-semibold text-primary">{fmt(calc.alphaCDeg, 2)}</td>
                  <td>°</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="eng-formula">
            <p className="text-sm mb-1"><strong>Proyección horizontal:</strong></p>
            <p className="text-center text-sm">
              d<sub>f</sub> = Flecha × sin(α<sub>C</sub>) = {fmt(vano.flecha, 2)} × sin({fmt(calc.alphaCDeg, 2)}°) = <strong className="text-primary">{fmt(calc.df, 2)} m</strong>
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7. Cálculo Detallado dc */}
      <CollapsibleSection title="7. Cálculo de dc — Desviación de la Cadena" icon={Wind} badge="§4.3">
        {vano.tipoCadena === "anclaje" ? (
          <div className="eng-note">
            <p className="text-sm"><strong>dc = 0 m</strong> — Cadena de anclaje o rígida: no se considera desviación lateral.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="eng-formula">
              <p className="text-sm mb-1"><strong>Fórmula completa — Ángulo de desviación de la cadena (RPTD N°07):</strong></p>
              <p className="text-center text-sm mb-2">
                tan(α) = [k × (L<sub>v</sub> × N<sub>sc</sub> × d × Q<sub>vc</sub> + 0.5 × N<sub>ca</sub> × d<sub>a</sub> × L<sub>c</sub> × Q<sub>va</sub>) + T<sub>r</sub>] / [(L<sub>v</sub>/R<sub>vp</sub>) × N<sub>sc</sub> × p + 0.5 × N<sub>ca</sub> × N<sub>a</sub> × P<sub>a</sub>]
              </p>
              <p className="text-center text-xs text-muted-foreground mb-1">
                Donde: T<sub>r</sub> = 2 × N<sub>sc</sub> × T<sub>c</sub> × sin(δ/2)
              </p>
            </div>

            {/* Cálculo de Tr */}
            <div className="eng-note">
              <p className="text-sm mb-1"><strong>Cálculo de T<sub>r</sub> — Resultante de tensiones mecánicas:</strong></p>
              <p className="text-center text-sm">
                T<sub>r</sub> = 2 × {project.numConductoresFase} × {fmt(vano.Tc, 1)} × sin({fmt(vano.anguloLinea, 1)}°/2) = <strong className="text-primary">{fmt(calc.Tr, 2)} kg</strong>
              </p>
              {vano.anguloLinea === 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  <Info className="w-3 h-3 inline mr-1" />
                  δ = 0° (línea recta) → T<sub>r</sub> = 0 kg. Para vértices angulares, ingresar el ángulo de la línea.
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="eng-table">
                <thead>
                  <tr><th>Variable</th><th>Descripción</th><th>Valor</th><th>Unidad</th></tr>
                </thead>
                <tbody>
                  <tr><td className="font-mono">k</td><td>Coeficiente (≤ 1.0)</td><td className="font-mono">{vano.k}</td><td>—</td></tr>
                  <tr><td className="font-mono">L<sub>v</sub></td><td>Luz de viento</td><td className="font-mono">{vano.vanoViento}</td><td>m</td></tr>
                  <tr><td className="font-mono">N<sub>sc</sub></td><td>N° subconductores/fase</td><td className="font-mono">{project.numConductoresFase}</td><td>—</td></tr>
                  <tr><td className="font-mono">d</td><td>Diámetro subconductor</td><td className="font-mono">{conductor.diametro}</td><td>mm</td></tr>
                  <tr><td className="font-mono">Q<sub>vc</sub></td><td>Presión viento conductores</td><td className="font-mono">{presionViento}</td><td>kg/m²</td></tr>
                  <tr><td className="font-mono">N<sub>ca</sub></td><td>N° cadenas en paralelo</td><td className="font-mono">{vano.Nca}</td><td>—</td></tr>
                  <tr><td className="font-mono">d<sub>a</sub></td><td>Diámetro disco aislador</td><td className="font-mono">{vano.diametroAislador}</td><td>mm</td></tr>
                  <tr><td className="font-mono">L<sub>c</sub></td><td>Longitud cadena aisladores</td><td className="font-mono">{vano.largoCadena}</td><td>m</td></tr>
                  <tr><td className="font-mono">Q<sub>va</sub></td><td>Presión viento aisladores</td><td className="font-mono">{vano.Qva}</td><td>kg/m²</td></tr>
                  <tr className="border-t-2 border-primary/30"><td className="font-mono font-semibold">T<sub>r</sub></td><td>Resultante tensiones mecánicas</td><td className="font-mono font-semibold text-primary">{fmt(calc.Tr, 2)}</td><td>kg</td></tr>
                  <tr><td className="font-mono">L<sub>p</sub></td><td>Vano peso</td><td className="font-mono">{vano.vanoPeso}</td><td>m</td></tr>
                  <tr><td className="font-mono">p</td><td>Peso unitario subconductor</td><td className="font-mono">{conductor.peso}</td><td>kg/m</td></tr>
                  <tr><td className="font-mono">N<sub>a</sub></td><td>N° aisladores por cadena</td><td className="font-mono">{vano.Na}</td><td>—</td></tr>
                  <tr><td className="font-mono">P<sub>a</sub></td><td>Peso unitario aislador</td><td className="font-mono">{vano.pesoUnitarioAislador}</td><td>kg</td></tr>
                  <tr><td className="font-mono">T<sub>c</sub></td><td>Tensión mecánica subconductor</td><td className="font-mono">{vano.Tc}</td><td>kg</td></tr>
                  <tr><td className="font-mono">δ</td><td>Ángulo de la línea</td><td className="font-mono">{vano.anguloLinea}</td><td>°</td></tr>
                  <tr className="border-t-2 border-primary/30">
                    <td className="font-mono font-semibold">Numerador</td><td>—</td>
                    <td className="font-mono font-semibold">{fmt(calc.numeradorCadena, 4)}</td><td>—</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-semibold">Denominador</td><td>—</td>
                    <td className="font-mono font-semibold">{fmt(calc.denominadorCadena, 4)}</td><td>—</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-semibold">tan(α)</td><td>—</td>
                    <td className="font-mono font-semibold">{fmt(calc.tanAlphaCadena, 6)}</td><td>—</td>
                  </tr>
                  <tr>
                    <td className="font-mono font-semibold">α<sub>cadena</sub></td><td>Ángulo de desviación</td>
                    <td className="font-mono font-semibold text-primary">{fmt(calc.alphaCadenaDeg, 2)}</td>
                    <td>°</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="eng-formula">
              <p className="text-center text-sm">
                d<sub>c</sub> = L<sub>c</sub> × sin(α<sub>cadena</sub>) = {fmt(vano.largoCadena, 2)} × sin({fmt(calc.alphaCadenaDeg, 2)}°) = <strong className="text-primary">{fmt(calc.dc, 2)} m</strong>
              </p>
            </div>
          </div>
        )}
      </CollapsibleSection>

      {/* 8. Cálculo de ds */}
      <CollapsibleSection title="8. Cálculo de ds — Distancia de Seguridad" icon={Ruler} badge="§4.5 Tabla N°3">
        <div className="overflow-x-auto mb-4">
          <table className="eng-table">
            <thead>
              <tr>
                <th>Tensión Máxima de la Línea (kV)</th>
                <th>Distancia de Seguridad (m)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dsTable.map((row, i) => {
                const isActive = project.tensionNominal > row.min && project.tensionNominal <= row.max;
                return (
                  <tr key={i} className={isActive ? "!bg-primary/10" : ""}>
                    <td className={isActive ? "font-bold" : ""}>
                      {row.min === 0 ? "Hasta" : `Sobre ${row.min} y hasta`} {row.max}
                    </td>
                    <td className={`font-mono font-semibold ${isActive ? "text-primary" : ""}`}>{row.ds.toFixed(2)}</td>
                    <td>{isActive && <span className="eng-badge eng-badge-primary">← Seleccionado</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="eng-formula">
          <p className="text-sm">
            Para tensión nominal de <strong>{project.tensionNominal} kV</strong>:
            d<sub>s</sub> = <strong className="text-primary">{fmt(calc.ds, 2)} m</strong>
            {ambiente.altitud > 1000 && (
              <span className="text-engineering-warning"> (corregida por altitud)</span>
            )}
          </p>
        </div>
      </CollapsibleSection>

      {/* 9. Resultado Final */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border-2 border-primary/40">
        <h3 className="eng-section-title">
          <Calculator className="w-5 h-5 text-primary" />
          9. Resultado — Franja de Seguridad
        </h3>

        <div className="eng-formula">
          <p className="text-center text-base mb-2">
            <strong>D<sub>eL</sub></strong> = d<sub>E</sub> + d<sub>f</sub> + d<sub>c</sub> + d<sub>s</sub>
          </p>
          <p className="text-center text-sm mb-3">
            D<sub>eL</sub> = {fmt(calc.dE, 2)} + {fmt(calc.df, 2)} + {fmt(calc.dc, 2)} + {fmt(calc.ds, 2)} = <strong>{fmt(calc.DeL, 2)} m</strong>
          </p>
          <p className="text-center text-lg font-bold text-primary">
            Franja de Seguridad (FS) = 2 × D<sub>eL</sub> = 2 × {fmt(calc.DeL, 2)} = {fmt(calc.FS, 2)} m
          </p>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="eng-table">
            <thead>
              <tr>
                <th>Componente</th>
                <th>Fórmula / Criterio</th>
                <th>Valor</th>
                <th>Referencia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold">d<sub>E</sub></td>
                <td>Máx. ancho cruceta</td>
                <td className="font-mono font-semibold">{fmt(calc.dE, 2)} m</td>
                <td className="text-xs">RPTD N°07 §4.1</td>
              </tr>
              <tr>
                <td className="font-semibold">d<sub>f</sub></td>
                <td>Flecha × sin(α<sub>C</sub>) = {fmt(vano.flecha, 2)} × sin({fmt(calc.alphaCDeg, 2)}°)</td>
                <td className="font-mono font-semibold">{fmt(calc.df, 2)} m</td>
                <td className="text-xs">RPTD N°07 §4.3</td>
              </tr>
              <tr>
                <td className="font-semibold">d<sub>c</sub></td>
                <td>{vano.tipoCadena === "anclaje" ? "Cadena anclaje → 0" : `Lc × sin(α) = ${fmt(vano.largoCadena, 2)} × sin(${fmt(calc.alphaCadenaDeg, 2)}°)`}</td>
                <td className="font-mono font-semibold">{fmt(calc.dc, 2)} m</td>
                <td className="text-xs">RPTD N°07 §4.3</td>
              </tr>
              <tr>
                <td className="font-semibold">d<sub>s</sub></td>
                <td>Tabla N°3 ({project.tensionNominal} kV){ambiente.altitud > 1000 ? " + corr. altitud" : ""}</td>
                <td className="font-mono font-semibold">{fmt(calc.ds, 2)} m</td>
                <td className="text-xs">RPTD N°07 §4.5</td>
              </tr>
              <tr className="!bg-primary/5">
                <td className="font-bold text-primary">D<sub>eL</sub></td>
                <td className="font-semibold">d<sub>E</sub> + d<sub>f</sub> + d<sub>c</sub> + d<sub>s</sub></td>
                <td className="font-mono font-bold text-primary text-lg">{fmt(calc.DeL, 2)} m</td>
                <td className="text-xs">RPTD N°07 §4.2</td>
              </tr>
              <tr className="!bg-primary/10">
                <td className="font-bold text-primary">FS</td>
                <td className="font-semibold">2 × D<sub>eL</sub></td>
                <td className="font-mono font-bold text-primary text-lg">{fmt(calc.FS, 2)} m</td>
                <td className="text-xs">RPTD N°07 §4.2</td>
              </tr>
             </tbody>
           </table>
         </div>
       </div>

      {/* ── Lista de Verificación RPTD N°07 ── */}
      <CollapsibleSection title="Lista de Verificación RPTD N°07" icon={Info} badge="Resumen">
        <p className="text-xs text-muted-foreground mb-4">Resumen de parámetros calculados</p>
        <div className="overflow-x-auto">
          <table className="eng-table">
            <thead>
              <tr>
                <th className="min-w-[200px]">Parámetro</th>
                <th>Referencia</th>
                <th>Ecuación</th>
                <th className="text-right min-w-[120px]">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  param: <>Franja de Servidumbre (D<sub>eL</sub>)</>,
                  ref: "Pto 4.2",
                  eq: <>d<sub>E</sub> + d<sub>f</sub> + d<sub>c</sub> + (d<sub>s</sub> · K<sub>a</sub>)</>,
                  value: calc.DeL,
                  unit: "m",
                  highlight: true,
                },
                {
                  param: <>Desviación de Flecha (d<sub>f</sub>)</>,
                  ref: "Pto 4.3",
                  eq: <>f · sin(α<sub>c</sub>)</>,
                  value: calc.df,
                  unit: "m",
                },
                {
                  param: <>Desviación de Cadena (d<sub>c</sub>)</>,
                  ref: "Pto 4.3",
                  eq: <>L<sub>c</sub> · sin(α<sub>cs</sub>)</>,
                  value: calc.dc,
                  unit: "m",
                },
                {
                  param: "Altura Mínima Transitable",
                  ref: "Tab 5 / Tab 8",
                  eq: "6.5 + 0.006·kV",
                  value: calc.alturaMinTransitable,
                  unit: "m",
                },
                {
                  param: "Separación Fase-Fase (S)",
                  ref: "Pto 5.4",
                  eq: <>0.36·√f + (kV/130) + 0.5·C</>,
                  value: calc.separacionFF,
                  unit: "m",
                },
                {
                  param: <>Factor Viento (G<sub>c</sub>)</>,
                  ref: "Pto 4.3.b",
                  eq: "Func(hc)",
                  value: calc.Gc,
                  unit: "u",
                },
                {
                  param: <>Distancia de Seguridad (d<sub>s</sub>)</>,
                  ref: "Pto 4.5 / Tab 3",
                  eq: "Según tensión nominal",
                  value: calc.ds,
                  unit: "m",
                },
                {
                  param: <>Corrección Altitud (K<sub>a</sub>)</>,
                  ref: "Pto 4.5",
                  eq: "1 + 3%/300m (>1000 m)",
                  value: calc.Ka,
                  unit: "",
                },
                {
                  param: "Franja Total (FS = 2×DeL)",
                  ref: "Pto 4.2",
                  eq: <>2 × D<sub>eL</sub></>,
                  value: calc.FS,
                  unit: "m",
                  highlight: true,
                },
              ].map((row, i) => (
                <tr key={i} className={row.highlight ? "!bg-primary/5" : ""}>
                  <td className={`font-semibold ${row.highlight ? "text-primary" : ""}`}>{row.param}</td>
                  <td className="text-xs text-muted-foreground">{row.ref}</td>
                  <td className="font-mono text-xs" style={{ color: "hsl(var(--engineering-info))" }}>{row.eq}</td>
                  <td className="text-right">
                    <span className={`font-mono font-bold ${row.highlight ? "text-primary text-lg" : ""}`}>
                      {fmt(row.value, 3)}
                    </span>
                    {row.unit && <span className="text-xs text-muted-foreground ml-1">{row.unit}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default CalculadoraFranja;
