import { useState, useMemo } from "react";
import { Calculator, Zap, Settings, ChevronDown, ChevronUp, Info, Shield, CheckCircle, Mountain, Droplets } from "lucide-react";

const fmt = (v: number | undefined | null, d = 2) => Number(v ?? 0).toFixed(d);

const CollapsibleSection = ({
  title, icon: Icon, children, defaultOpen = false, badge,
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

const formatDisplay = (v: number | string) =>
  typeof v === "number" ? (Number.isInteger(v) ? String(v) : v.toFixed(4).replace(/\.?0+$/, "")) : v;

const InputField = ({
  label, value, onChange, unit, hint, readOnly = false, highlight = false,
}: {
  label: string; value: number | string; onChange?: (v: string) => void; unit?: string; hint?: string; readOnly?: boolean; highlight?: boolean;
}) => {
  const [localVal, setLocalVal] = useState<string>(formatDisplay(value));
  const [focused, setFocused] = useState(false);
  const displayValue = focused ? localVal : formatDisplay(value);
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-1">
        <input type="text" value={displayValue}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, ".").replace(/[^\d.\-]/g, "").replace(/^(-?\d*\.\d*).*$/, "$1");
            setLocalVal(raw); onChange?.(raw);
          }}
          onFocus={() => { setFocused(true); setLocalVal(formatDisplay(value)); }}
          onBlur={() => setFocused(false)}
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
};

const SelectField = ({
  label, value, options, onChange,
}: {
  label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring">
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

// ── Tabla N° 1 RPTD N° 05 ──
const tablaBIL = [
  { vNom: 2.4, vMax: 2.75, bil: 20 },
  { vNom: 3.3, vMax: 3.6, bil: 40 },
  { vNom: 4.16, vMax: 4.4, bil: 40 },
  { vNom: 6.6, vMax: 7.2, bil: 60 },
  { vNom: 12, vMax: 15, bil: 75 },
  { vNom: 13.2, vMax: 15, bil: 75 },
  { vNom: 13.8, vMax: 15, bil: 75 },
  { vNom: 15, vMax: 17.5, bil: 95 },
  { vNom: 23, vMax: 26.4, bil: 145 },
  { vNom: 33, vMax: 36, bil: 170 },
  { vNom: 44, vMax: 48.3, bil: 250 },
  { vNom: 66, vMax: 72.5, bil: 325 },
  { vNom: 110, vMax: 123, bil: 550 },
  { vNom: 121, vMax: 145, bil: 650 },
  { vNom: 154, vMax: 170, bil: 750 },
  { vNom: 220, vMax: 245, bil: 1050 },
  { vNom: 345, vMax: 362, bil: 1175 },
  { vNom: 500, vMax: 550, bil: 1550 },
  { vNom: 750, vMax: 800, bil: 1800 },
  { vNom: 1000, vMax: 1200, bil: 2100 },
];

// Tabla N° 2 BSL
const tablaBSL = [
  { vNom: 345, vMax: 362, bsl: 950 },
  { vNom: 500, vMax: 550, bsl: 1175 },
  { vNom: 750, vMax: 800, bsl: 1425 },
  { vNom: 1000, vMax: 1200, bsl: 1550 },
];

// Niveles de contaminación IEC 60815
const nivelesContaminacion = [
  { value: "a", label: "a — Muy ligera", dfMin: 22, dfTyp: 22 },
  { value: "b", label: "b — Ligera", dfMin: 28, dfTyp: 28 },
  { value: "c", label: "c — Media", dfMin: 35, dfTyp: 35 },
  { value: "d", label: "d — Pesada", dfMin: 44, dfTyp: 44 },
  { value: "e", label: "e — Muy pesada", dfMin: 55, dfTyp: 55 },
];

// Nivel de aislación cables según tiempo despeje (Pto. 5.11)
const nivelesAislacionCable = [
  { value: "100", label: "100% — Falla despejada ≤ 1 min" },
  { value: "133", label: "133% — Falla despejada ≤ 1 hora" },
  { value: "173", label: "173% — Tiempo de despeje indefinido" },
];

// Factor corrección por altitud (RPTD N° 07 Pto. 5.6 / IEC 60071-2)
// Ka = e^(H/8150) para alturas > 1000 m.s.n.m.
function factorAltitud(altitud: number): number {
  if (altitud <= 1000) return 1.0;
  return Math.exp((altitud - 1000) / 8150);
}

const CalculadoraRPTD05 = () => {
  const [tensionIdx, setTensionIdx] = useState(15); // 220 kV default
  const [altitud, setAltitud] = useState(131);
  const [nivelContaminacion, setNivelContaminacion] = useState("c");
  const [nivelCable, setNivelCable] = useState("100");
  const [numAisladores, setNumAisladores] = useState(14);
  const [distFugaUnitaria, setDistFugaUnitaria] = useState(370); // mm per insulator

  const entry = tablaBIL[tensionIdx];
  const bslEntry = tablaBSL.find(b => b.vNom === entry.vNom);
  const contam = nivelesContaminacion.find(n => n.value === nivelContaminacion)!;

  const results = useMemo(() => {
    const Ka = factorAltitud(altitud);
    const BIL_corr = entry.bil * Ka;
    const BSL_corr = bslEntry ? bslEntry.bsl * Ka : null;

    // Distancia de fuga requerida (IEC 60815)
    const dfRequerida = contam.dfTyp * entry.vMax; // mm
    // Distancia de fuga total de la cadena
    const dfCadena = numAisladores * distFugaUnitaria; // mm
    const cumpleDistFuga = dfCadena >= dfRequerida;

    // Relación distancia de fuga específica
    const dfEspecifica = dfCadena / entry.vMax; // mm/kV

    // Nivel aislación cable
    const factorCable = Number(nivelCable) / 100;

    return { Ka, BIL_corr, BSL_corr, dfRequerida, dfCadena, cumpleDistFuga, dfEspecifica, factorCable };
  }, [tensionIdx, altitud, nivelContaminacion, numAisladores, distFugaUnitaria, nivelCable, entry, bslEntry, contam]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">Calculadora — Aislación (RPTD N° 05)</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Selección de BIL/BSL, distancia de fuga y corrección por altitud según IEC 60071 e IEC 60815
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">IEC 60071-1/2</span>
              <span className="eng-badge eng-badge-primary">IEC 60815</span>
              <span className="eng-badge eng-badge-warning">RPTD N° 05</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Parámetros de entrada */}
      <CollapsibleSection title="1. Tensión Nominal y Nivel de Aislación" icon={Zap} defaultOpen badge="Entrada">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectField label="Tensión nominal del sistema" value={String(tensionIdx)}
            options={tablaBIL.map((e, i) => ({ value: String(i), label: `${e.vNom} kV (Vmax = ${e.vMax} kV)` }))}
            onChange={(v) => setTensionIdx(Number(v))}
          />
          <InputField label="Tensión máxima de equipos" value={entry.vMax} unit="kV" readOnly />
          <InputField label="BIL (Tabla N° 1)" value={entry.bil} unit="kV" readOnly highlight />
        </div>
        {bslEntry && (
          <div className="mt-3">
            <InputField label="BSL — Nivel básico impulso maniobra (Tabla N° 2)" value={bslEntry.bsl} unit="kV" readOnly highlight />
          </div>
        )}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="Nivel de aislación cable (Pto. 5.11)" value={nivelCable}
            options={nivelesAislacionCable.map(n => ({ value: n.value, label: n.label }))}
            onChange={(v) => setNivelCable(v)}
          />
          <InputField label="Factor de aislación cable" value={fmt(results.factorCable * 100, 0) + "%"} readOnly />
        </div>
      </CollapsibleSection>

      {/* 2. Corrección por altitud */}
      <CollapsibleSection title="2. Corrección por Altitud" icon={Mountain} defaultOpen badge="Pto. 8.2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Altitud de la instalación" value={altitud} onChange={(v) => setAltitud(Number(v) || 0)} unit="m.s.n.m." hint="Corrección aplica sobre 1000 m" />
          <InputField label="Ka — Factor corrección altitud" value={fmt(results.Ka, 4)} readOnly highlight />
          <InputField label="BIL corregido por altitud" value={fmt(results.BIL_corr, 0)} unit="kV" readOnly highlight />
        </div>
        {results.BSL_corr !== null && (
          <div className="mt-3">
            <InputField label="BSL corregido por altitud" value={fmt(results.BSL_corr, 0)} unit="kV" readOnly highlight />
          </div>
        )}
        <div className="mt-3 p-3 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p><strong>Fórmula:</strong> K<sub>a</sub> = e<sup>(H − 1000) / 8150</sup> para H &gt; 1000 m.s.n.m. (IEC 60071-2)</p>
              <p className="mt-1">BIL<sub>corr</sub> = BIL × K<sub>a</sub> — El nivel de aislación debe incrementarse para compensar la menor rigidez dieléctrica del aire a mayor altitud.</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 3. Distancia de fuga */}
      <CollapsibleSection title="3. Distancia de Fuga (IEC 60815)" icon={Droplets} defaultOpen badge="Pto. 5.9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectField label="Nivel de contaminación (IEC 60815)" value={nivelContaminacion}
            options={nivelesContaminacion.map(n => ({ value: n.value, label: n.label }))}
            onChange={(v) => setNivelContaminacion(v)}
          />
          <InputField label="Dist. fuga específica mínima" value={contam.dfTyp} unit="mm/kV" readOnly />
          <InputField label="Dist. fuga total requerida" value={fmt(results.dfRequerida, 0)} unit="mm" readOnly highlight />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="N° de aisladores en la cadena" value={numAisladores} onChange={(v) => setNumAisladores(Math.max(1, Math.round(Number(v) || 1)))} unit="ud" />
          <InputField label="Dist. fuga unitaria (por aislador)" value={distFugaUnitaria} onChange={(v) => setDistFugaUnitaria(Number(v) || 1)} unit="mm" hint="Dato de catálogo del fabricante" />
          <InputField label="Dist. fuga total de la cadena" value={fmt(results.dfCadena, 0)} unit="mm" readOnly highlight />
        </div>
        <div className="mt-3">
          <InputField label="Dist. fuga específica real" value={fmt(results.dfEspecifica, 1)} unit="mm/kV" readOnly highlight />
        </div>

        {/* Verificación */}
        <div className={`mt-4 flex items-center gap-2 p-3 rounded-lg border ${results.cumpleDistFuga ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
          {results.cumpleDistFuga
            ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            : <Shield className="w-5 h-5 text-red-500 flex-shrink-0" />}
          <div>
            <p className="text-sm font-medium text-foreground">
              {results.cumpleDistFuga ? "CUMPLE" : "NO CUMPLE"} — Distancia de fuga
            </p>
            <p className="text-xs text-muted-foreground">
              Cadena ({fmt(results.dfCadena, 0)} mm) {results.cumpleDistFuga ? "≥" : "<"} Requerida ({fmt(results.dfRequerida, 0)} mm)
              — Específica: {fmt(results.dfEspecifica, 1)} mm/kV {results.cumpleDistFuga ? "≥" : "<"} {contam.dfTyp} mm/kV
            </p>
          </div>
        </div>

        {/* Tabla niveles contaminación */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-foreground mb-2">Niveles de contaminación (IEC 60815)</p>
          <div className="overflow-x-auto">
            <table className="eng-table w-full text-xs">
              <thead>
                <tr><th>Nivel</th><th>Descripción</th><th>Dist. fuga específica (mm/kV)</th></tr>
              </thead>
              <tbody>
                {nivelesContaminacion.map(n => (
                  <tr key={n.value} className={n.value === nivelContaminacion ? "bg-primary/10" : ""}>
                    <td className="font-mono font-semibold">{n.value}</td>
                    <td>{n.label.split(" — ")[1]}</td>
                    <td className="text-center font-mono">{n.dfTyp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Tabla BIL/BSL completa */}
      <CollapsibleSection title="4. Tabla N° 1 — BIL por Tensión Nominal" icon={Zap} badge="Referencia">
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr><th>V Nominal (kV)</th><th>V Máx. Equipos (kV)</th><th>BIL (kV)</th></tr>
            </thead>
            <tbody>
              {tablaBIL.map((e, i) => (
                <tr key={i} className={i === tensionIdx ? "bg-primary/10 font-bold" : ""}>
                  <td className="font-mono">{e.vNom}</td>
                  <td className="font-mono">{e.vMax}</td>
                  <td className="font-mono">{e.bil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 5. Tabla resumen */}
      <CollapsibleSection title="5. Tabla de Resumen y Verificación" icon={Shield} defaultOpen badge="Memoria">
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Parámetro</th>
                <th className="text-left">Símbolo</th>
                <th className="text-right">Valor</th>
                <th className="text-left">Unidad</th>
                <th className="text-left">Referencia</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Tensión nominal</td><td className="font-mono">V<sub>n</sub></td><td className="text-right font-mono">{entry.vNom}</td><td>kV</td><td>RPTD N° 01</td></tr>
              <tr><td>Tensión máxima equipos</td><td className="font-mono">V<sub>max</sub></td><td className="text-right font-mono">{entry.vMax}</td><td>kV</td><td>RPTD N° 05 Tabla 1</td></tr>
              <tr><td>BIL (nivel del mar)</td><td className="font-mono">BIL</td><td className="text-right font-mono">{entry.bil}</td><td>kV</td><td>RPTD N° 05 Pto. 5.7</td></tr>
              {bslEntry && <tr><td>BSL (nivel del mar)</td><td className="font-mono">BSL</td><td className="text-right font-mono">{bslEntry.bsl}</td><td>kV</td><td>RPTD N° 05 Tabla 2</td></tr>}
              <tr className="border-t-2 border-primary/30"><td>Altitud</td><td className="font-mono">H</td><td className="text-right font-mono">{altitud}</td><td>m.s.n.m.</td><td>—</td></tr>
              <tr><td>Factor corrección altitud</td><td className="font-mono">K<sub>a</sub></td><td className="text-right font-mono font-bold">{fmt(results.Ka, 4)}</td><td>—</td><td>IEC 60071-2 / RPTD N° 07</td></tr>
              <tr><td>BIL corregido</td><td className="font-mono">BIL<sub>corr</sub></td><td className="text-right font-mono font-bold">{fmt(results.BIL_corr, 0)}</td><td>kV</td><td>BIL × K<sub>a</sub></td></tr>
              {results.BSL_corr !== null && <tr><td>BSL corregido</td><td className="font-mono">BSL<sub>corr</sub></td><td className="text-right font-mono font-bold">{fmt(results.BSL_corr, 0)}</td><td>kV</td><td>BSL × K<sub>a</sub></td></tr>}
              <tr className="border-t-2 border-primary/30"><td>Nivel contaminación</td><td>—</td><td className="text-right font-mono">{contam.label}</td><td>—</td><td>IEC 60815</td></tr>
              <tr><td>Dist. fuga específica mín.</td><td className="font-mono">USCD</td><td className="text-right font-mono">{contam.dfTyp}</td><td>mm/kV</td><td>IEC 60815</td></tr>
              <tr><td>Dist. fuga requerida</td><td className="font-mono">D<sub>f,req</sub></td><td className="text-right font-mono font-bold">{fmt(results.dfRequerida, 0)}</td><td>mm</td><td>USCD × V<sub>max</sub></td></tr>
              <tr><td>Dist. fuga cadena</td><td className="font-mono">D<sub>f,cad</sub></td><td className="text-right font-mono font-bold">{fmt(results.dfCadena, 0)}</td><td>mm</td><td>N × d<sub>f,unit</sub></td></tr>
              <tr><td>Dist. fuga específica real</td><td className="font-mono">USCD<sub>real</sub></td><td className="text-right font-mono font-bold">{fmt(results.dfEspecifica, 1)}</td><td>mm/kV</td><td>D<sub>f,cad</sub> / V<sub>max</sub></td></tr>
              <tr className="border-t-2 border-primary/30">
                <td>Verificación dist. fuga</td><td>—</td>
                <td className={`text-right font-bold ${results.cumpleDistFuga ? "text-green-600" : "text-red-600"}`}>
                  {results.cumpleDistFuga ? "CUMPLE" : "NO CUMPLE"}
                </td>
                <td>—</td><td>RPTD N° 05 Pto. 5.9</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 italic">
          Nota: Para un diseño completo, la coordinación de aislamiento debe realizarse según IEC 60071-1/2, considerando
          sobretensiones atmosféricas, de maniobra y la ubicación de los dispositivos de protección (DPS).
        </p>
      </CollapsibleSection>
    </div>
  );
};

export default CalculadoraRPTD05;
