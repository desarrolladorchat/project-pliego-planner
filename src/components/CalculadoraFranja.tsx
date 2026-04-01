import { useState, useMemo } from "react";
import { Calculator, Wind, Ruler, Zap, Settings, ChevronDown, ChevronUp, Info } from "lucide-react";

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
  zona: "III" as "II" | "III",
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

  // Auto-update wind pressure when zone changes
  const presionViento = useMemo(() => getPresionVientoZona(ambiente.zona), [ambiente.zona]);
  const tempAmbienteZona = useMemo(() => getTempAmbienteZona(ambiente.zona), [ambiente.zona]);

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

    // Ángulo de desviación de la cadena de aisladores
    // Numerador: Pv × fp × [ncp × ΦCP × Lv + na × Aa]
    // Denominador: ncp × MCP × Lp + na × Ma
    const fp = 1.2; // factor amplificación presión sobre cadena
    const ncp = project.numConductoresFase;
    const numeradorCadena =
      presionViento * fp * (
        ncp * (conductor.diametro / 1000) * vano.vanoViento +
        vano.numAislacionFase * vano.areaAislacion
      );
    const denominadorCadena =
      ncp * conductor.peso * vano.vanoPeso +
      vano.numAislacionFase * vano.pesoAislacion;
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

    return {
      fr,
      pvEfectiva,
      fuerzaVientoCond,
      tanAlphaC,
      alphaCDeg,
      df,
      fp,
      tanAlphaCadena,
      alphaCadenaDeg,
      dc,
      dE,
      dsBase,
      ds,
      DeL,
      FS,
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
              <p className={`text-base sm:text-xl font-bold font-mono ${r.color}`}>{r.value.toFixed(2)}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                {r.label === "FS" ? "FS" : r.label} <span className="hidden sm:inline">[{r.unit}]</span>
              </p>
            </div>
          ))}
        </div>
        <div className="eng-formula mt-3 sm:mt-4">
          <p className="text-center text-[10px] sm:text-sm leading-relaxed">
            <strong>D<sub>eL</sub></strong> = {calc.dE.toFixed(2)} + {calc.df.toFixed(2)} + {calc.dc.toFixed(2)} + {calc.ds.toFixed(2)} = <strong>{calc.DeL.toFixed(2)} m</strong>
            <br className="sm:hidden" />
            <span className="hidden sm:inline">&nbsp;&nbsp;→&nbsp;&nbsp;</span>
            <span className="sm:hidden">→ </span>
            <strong>FS</strong> = 2 × {calc.DeL.toFixed(2)} = <strong className="text-primary">{calc.FS.toFixed(2)} m</strong>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <SelectField
            label="Zona Geográfica (RPTD N°11 §5.8.1)"
            value={ambiente.zona}
            options={[
              { value: "II", label: "Zona II — Costera (50 kg/m²)" },
              { value: "III", label: "Zona III — Interior (40 kg/m²)" },
            ]}
            onChange={(v) => setAmbiente({ ...ambiente, zona: v as "II" | "III" })}
          />
          <InputField
            label="Presión de Viento (auto)"
            value={presionViento}
            readOnly
            unit="kg/m²"
            hint="Según zona seleccionada"
          />
          <InputField
            label="Temperatura Ambiente (auto)"
            value={tempAmbienteZona}
            readOnly
            unit="°C"
            hint="Según zona seleccionada"
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
              ds corregida: {calc.dsBase.toFixed(2)} × (1 + {(Math.floor((ambiente.altitud - 1000) / 300) * 0.03).toFixed(2)}) = <strong>{calc.ds.toFixed(2)} m</strong>
            </p>
          </div>
        )}
      </CollapsibleSection>

      {/* 4. Datos del Vano */}
      <CollapsibleSection title="4. Datos del Vano y Estructura" icon={Ruler} badge="Editable">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
      </CollapsibleSection>

      {/* 5. Cálculo Detallado dE */}
      <CollapsibleSection title="5. Cálculo de dE — Distancia al Eje" icon={Ruler} badge="§4.1">
        <div className="eng-formula">
          <p className="text-sm mb-2">
            <strong>d<sub>E</sub></strong> = máx(Ancho cruceta inicio, Ancho cruceta fin)
          </p>
          <p className="text-sm">
            d<sub>E</sub> = máx({vano.anchoCrucetaInicio.toFixed(2)}, {vano.anchoCrucetaFin.toFixed(2)}) = <strong className="text-primary">{calc.dE.toFixed(2)} m</strong>
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
                  <td className="font-mono">{presionViento} × {calc.fr} = {calc.pvEfectiva.toFixed(1)}</td>
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
                  <td className="font-mono">{conductor.peso.toFixed(4)}</td>
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
                  <td className="font-mono font-semibold">{calc.tanAlphaC.toFixed(4)}</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td className="font-mono font-semibold">α<sub>C</sub></td>
                  <td>Ángulo de desviación del conductor</td>
                  <td className="font-mono font-semibold text-primary">{calc.alphaCDeg.toFixed(2)}</td>
                  <td>°</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="eng-formula">
            <p className="text-sm mb-1"><strong>Proyección horizontal:</strong></p>
            <p className="text-center text-sm">
              d<sub>f</sub> = Flecha × sin(α<sub>C</sub>) = {vano.flecha.toFixed(2)} × sin({calc.alphaCDeg.toFixed(2)}°) = <strong className="text-primary">{calc.df.toFixed(2)} m</strong>
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
              <p className="text-sm mb-1"><strong>Ángulo de desviación de la cadena:</strong></p>
              <p className="text-center text-sm mb-2">
                tan(α<sub>cadena</sub>) = P<sub>v</sub> × f<sub>p</sub> × [n<sub>cp</sub> × Φ<sub>C</sub> × L<sub>v</sub> + n<sub>a</sub> × A<sub>a</sub>] / [n<sub>cp</sub> × M<sub>CP</sub> × L<sub>p</sub> + n<sub>a</sub> × M<sub>a</sub>]
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="eng-table">
                <thead>
                  <tr><th>Variable</th><th>Valor</th><th>Unidad</th></tr>
                </thead>
                <tbody>
                  <tr><td className="font-mono">P<sub>v</sub></td><td className="font-mono">{presionViento}</td><td>kg/m²</td></tr>
                  <tr><td className="font-mono">f<sub>p</sub></td><td className="font-mono">1.2</td><td>—</td></tr>
                  <tr><td className="font-mono">n<sub>cp</sub></td><td className="font-mono">{numConductoresFase}</td><td>—</td></tr>
                  <tr><td className="font-mono">Φ<sub>C</sub></td><td className="font-mono">{(conductor.diametro / 1000).toFixed(5)}</td><td>m</td></tr>
                  <tr><td className="font-mono">L<sub>v</sub></td><td className="font-mono">{vano.vanoViento}</td><td>m</td></tr>
                  <tr><td className="font-mono">n<sub>a</sub></td><td className="font-mono">{vano.numAislacionFase}</td><td>—</td></tr>
                  <tr><td className="font-mono">A<sub>a</sub></td><td className="font-mono">{vano.areaAislacion}</td><td>m²</td></tr>
                  <tr><td className="font-mono">M<sub>CP</sub></td><td className="font-mono">{conductor.peso}</td><td>kg/m</td></tr>
                  <tr><td className="font-mono">L<sub>p</sub></td><td className="font-mono">{vano.vanoPeso}</td><td>m</td></tr>
                  <tr><td className="font-mono">M<sub>a</sub></td><td className="font-mono">{vano.pesoAislacion}</td><td>kg</td></tr>
                  <tr>
                    <td className="font-mono font-semibold">α<sub>cadena</sub></td>
                    <td className="font-mono font-semibold text-primary">{calc.alphaCadenaDeg.toFixed(2)}</td>
                    <td>°</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="eng-formula">
              <p className="text-center text-sm">
                d<sub>c</sub> = L<sub>c</sub> × sin(α<sub>cadena</sub>) = {vano.largoCadena.toFixed(2)} × sin({calc.alphaCadenaDeg.toFixed(2)}°) = <strong className="text-primary">{calc.dc.toFixed(2)} m</strong>
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
            d<sub>s</sub> = <strong className="text-primary">{calc.ds.toFixed(2)} m</strong>
            {ambiente.altitud > 1000 && (
              <span className="text-engineering-warning"> (corregida por altitud)</span>
            )}
          </p>
        </div>
      </CollapsibleSection>

      {/* 9. Resultado Final */}
      <div className="bg-card rounded-xl p-6 shadow-sm border-2 border-primary/40">
        <h3 className="eng-section-title">
          <Calculator className="w-5 h-5 text-primary" />
          9. Resultado — Franja de Seguridad
        </h3>

        <div className="eng-formula">
          <p className="text-center text-base mb-2">
            <strong>D<sub>eL</sub></strong> = d<sub>E</sub> + d<sub>f</sub> + d<sub>c</sub> + d<sub>s</sub>
          </p>
          <p className="text-center text-sm mb-3">
            D<sub>eL</sub> = {calc.dE.toFixed(2)} + {calc.df.toFixed(2)} + {calc.dc.toFixed(2)} + {calc.ds.toFixed(2)} = <strong>{calc.DeL.toFixed(2)} m</strong>
          </p>
          <p className="text-center text-lg font-bold text-primary">
            Franja de Seguridad (FS) = 2 × D<sub>eL</sub> = 2 × {calc.DeL.toFixed(2)} = {calc.FS.toFixed(2)} m
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
                <td className="font-mono font-semibold">{calc.dE.toFixed(2)} m</td>
                <td className="text-xs">RPTD N°07 §4.1</td>
              </tr>
              <tr>
                <td className="font-semibold">d<sub>f</sub></td>
                <td>Flecha × sin(α<sub>C</sub>) = {vano.flecha.toFixed(2)} × sin({calc.alphaCDeg.toFixed(2)}°)</td>
                <td className="font-mono font-semibold">{calc.df.toFixed(2)} m</td>
                <td className="text-xs">RPTD N°07 §4.3</td>
              </tr>
              <tr>
                <td className="font-semibold">d<sub>c</sub></td>
                <td>{vano.tipoCadena === "anclaje" ? "Cadena anclaje → 0" : `Lc × sin(α) = ${vano.largoCadena.toFixed(2)} × sin(${calc.alphaCadenaDeg.toFixed(2)}°)`}</td>
                <td className="font-mono font-semibold">{calc.dc.toFixed(2)} m</td>
                <td className="text-xs">RPTD N°07 §4.3</td>
              </tr>
              <tr>
                <td className="font-semibold">d<sub>s</sub></td>
                <td>Tabla N°3 ({project.tensionNominal} kV){ambiente.altitud > 1000 ? " + corr. altitud" : ""}</td>
                <td className="font-mono font-semibold">{calc.ds.toFixed(2)} m</td>
                <td className="text-xs">RPTD N°07 §4.5</td>
              </tr>
              <tr className="!bg-primary/5">
                <td className="font-bold text-primary">D<sub>eL</sub></td>
                <td className="font-semibold">d<sub>E</sub> + d<sub>f</sub> + d<sub>c</sub> + d<sub>s</sub></td>
                <td className="font-mono font-bold text-primary text-lg">{calc.DeL.toFixed(2)} m</td>
                <td className="text-xs">RPTD N°07 §4.2</td>
              </tr>
              <tr className="!bg-primary/10">
                <td className="font-bold text-primary">FS</td>
                <td className="font-semibold">2 × D<sub>eL</sub></td>
                <td className="font-mono font-bold text-primary text-lg">{calc.FS.toFixed(2)} m</td>
                <td className="text-xs">RPTD N°07 §4.2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraFranja;
