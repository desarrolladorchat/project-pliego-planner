import { useState, useMemo } from "react";
import { Calculator, Zap, Settings, ChevronDown, ChevronUp, Info, Shield, CircuitBoard, CheckCircle, XCircle } from "lucide-react";

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
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            const raw = e.target.value.replace(/,/g, ".").replace(/[^\d.\-]/g, "").replace(/^(-?\d*\.\d*).*$/, "$1");
            setLocalVal(raw);
            onChange?.(raw);
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

// ── IEEE 80 formulas for single vertical rod ──
function resistanciaVarilla(rho: number, L: number, d: number): number {
  // R = (ρ / 2πL) * ln(4L/d)  — IEEE 80 Eq. for single rod
  return (rho / (2 * Math.PI * L)) * Math.log((4 * L) / d);
}

// Parallel rods (simplified Schwarz)
function resistanciaVarillasParalelas(rho: number, L: number, d: number, n: number, s: number): number {
  const R1 = resistanciaVarilla(rho, L, d);
  // Simplified: R_n ≈ R1/n * (1 + λ*(n-1)/n) where λ depends on spacing
  // Using Schwarz approximation: λ = ρ/(2πsR1) * ln(4L/d) simplified
  const lambda = (2 * L) / s; // coupling factor approximation
  const factor = 1 + lambda * (n - 1) / n;
  // Clamp factor to avoid unrealistic values
  const clampedFactor = Math.min(factor, n);
  return (R1 / n) * clampedFactor;
}

// Grid/mesh resistance (IEEE 80 simplified Schwarz formula)
function resistanciaMalla(rho: number, Lt: number, A: number, h: number): number {
  // R_grid = ρ * (1/Lt + 1/√(20A) * (1 + 1/(1+h*√(20/A))))
  const sqrtA = Math.sqrt(A);
  const sqrt20A = Math.sqrt(20 * A);
  return rho * (1 / Lt + 1 / sqrt20A * (1 + 1 / (1 + h * Math.sqrt(20 / A))));
}

const CalculadoraRPTD06 = () => {
  // ── Soil parameters ──
  const [rho, setRho] = useState(100);         // Ω·m resistividad del suelo
  const [rhoS, setRhoS] = useState(3000);      // Ω·m resistividad capa superficial (grava)
  const [hs, setHs] = useState(0.15);           // m espesor capa superficial
  const [ts, setTs] = useState(0.5);            // s duración falla
  const [pesoPersona, setPesoPersona] = useState<"50" | "70">("70");

  // ── Electrode: single rod ──
  const [tipoElectrodo, setTipoElectrodo] = useState<"varilla" | "varillas" | "malla">("varilla");
  const [largoVarilla, setLargoVarilla] = useState(2.4);   // m
  const [diametroVarilla, setDiametroVarilla] = useState(0.01588); // m (5/8")
  const [numVarillas, setNumVarillas] = useState(4);
  const [separacionVarillas, setSeparacionVarillas] = useState(3); // m

  // ── Grid/mesh ──
  const [largoMalla, setLargoMalla] = useState(30);   // m
  const [anchoMalla, setAnchoMalla] = useState(20);   // m
  const [profMalla, setProfMalla] = useState(0.6);     // m
  const [espacMalla, setEspacMalla] = useState(3);     // m spacing between conductors
  const [diamConductor, setDiamConductor] = useState(0.01063); // m (4/0 AWG ≈ 10.63mm)

  // ── Fault current (for GPR) ──
  const [corrienteFalla, setCorrienteFalla] = useState(5000); // A

  const results = useMemo(() => {
    // Factor Cs
    const Cs = 1 - (0.09 * (1 - rho / rhoS)) / (2 * hs + 0.09);
    const CsClamped = Math.max(0, Math.min(Cs, 1));

    // Tolerable voltages
    const k = pesoPersona === "50" ? 0.116 : 0.157;
    const Vpaso_tol = (1000 + 6 * CsClamped * rhoS) * k / Math.sqrt(ts);
    const Vcontacto_tol = (1000 + 1.5 * CsClamped * rhoS) * k / Math.sqrt(ts);

    // Electrode resistance
    let Rg = 0;
    let tipoCalc = "";

    if (tipoElectrodo === "varilla") {
      Rg = resistanciaVarilla(rho, largoVarilla, diametroVarilla);
      tipoCalc = "Varilla vertical única";
    } else if (tipoElectrodo === "varillas") {
      Rg = resistanciaVarillasParalelas(rho, largoVarilla, diametroVarilla, numVarillas, separacionVarillas);
      tipoCalc = `${numVarillas} varillas en paralelo`;
    } else {
      // Grid
      const A = largoMalla * anchoMalla;
      const nH = Math.floor(anchoMalla / espacMalla) + 1; // horizontal conductors
      const nV = Math.floor(largoMalla / espacMalla) + 1; // vertical conductors
      const Lt = nH * largoMalla + nV * anchoMalla; // total conductor length
      Rg = resistanciaMalla(rho, Lt, A, profMalla);
      tipoCalc = `Malla ${largoMalla}×${anchoMalla} m`;
    }

    // GPR (Ground Potential Rise)
    const GPR = corrienteFalla * Rg;

    // Check
    const cumplePaso = GPR < Vpaso_tol;
    const cumpleContacto = GPR < Vcontacto_tol;

    return { Cs: CsClamped, Vpaso_tol, Vcontacto_tol, Rg, GPR, tipoCalc, cumplePaso, cumpleContacto };
  }, [rho, rhoS, hs, ts, pesoPersona, tipoElectrodo, largoVarilla, diametroVarilla, numVarillas, separacionVarillas, largoMalla, anchoMalla, profMalla, espacMalla, corrienteFalla]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">Calculadora — Puesta a Tierra (RPTD N° 06)</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Cálculo de resistencia de electrodos, tensiones de paso y contacto tolerables según IEEE Std 80-2013
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">IEEE 80-2013</span>
              <span className="eng-badge eng-badge-primary">RPTD N° 06</span>
              <span className="eng-badge eng-badge-warning">Pto. 5 y 8.25</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Parámetros del suelo */}
      <CollapsibleSection title="1. Parámetros del Suelo" icon={Settings} defaultOpen badge="Entrada">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="ρ — Resistividad del suelo" value={rho} onChange={(v) => setRho(Number(v) || 0)} unit="Ω·m" hint="Valor medido según IEEE 81" />
          <InputField label="ρs — Resistividad capa superficial" value={rhoS} onChange={(v) => setRhoS(Number(v) || 0)} unit="Ω·m" hint="Grava típica: 2000–5000 Ω·m" />
          <InputField label="hs — Espesor capa superficial" value={hs} onChange={(v) => setHs(Number(v) || 0)} unit="m" hint="Típico: 0.10 – 0.15 m" />
          <InputField label="ts — Duración falla a tierra" value={ts} onChange={(v) => setTs(Number(v) || 0.1)} unit="s" hint="≤ tiempo protección respaldo" />
          <InputField label="Ig — Corriente de falla a tierra" value={corrienteFalla} onChange={(v) => setCorrienteFalla(Number(v) || 0)} unit="A" hint="Corriente máxima de falla monofásica" />
          <SelectField label="Peso de la persona" value={pesoPersona}
            options={[{ value: "50", label: "50 kg" }, { value: "70", label: "70 kg" }]}
            onChange={(v) => setPesoPersona(v as "50" | "70")}
          />
        </div>
        <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p><strong>Factor Cs:</strong> C<sub>s</sub> = 1 − 0,09·(1 − ρ/ρ<sub>s</sub>) / (2·h<sub>s</sub> + 0,09)</p>
              <p className="mt-1">Si no se usa capa protectora: C<sub>s</sub> = 1, ρ<sub>s</sub> = ρ</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 2. Tipo de electrodo */}
      <CollapsibleSection title="2. Configuración del Electrodo" icon={CircuitBoard} defaultOpen badge="Entrada">
        <div className="mb-4">
          <SelectField label="Tipo de electrodo" value={tipoElectrodo}
            options={[
              { value: "varilla", label: "Varilla vertical única" },
              { value: "varillas", label: "Varillas en paralelo" },
              { value: "malla", label: "Malla de puesta a tierra" },
            ]}
            onChange={(v) => setTipoElectrodo(v as any)}
          />
        </div>

        {(tipoElectrodo === "varilla" || tipoElectrodo === "varillas") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="L — Largo de la varilla" value={largoVarilla} onChange={(v) => setLargoVarilla(Number(v) || 0.1)} unit="m" hint="Mín. 2.4 m (copperweld 5/8&quot;)" />
            <InputField label="d — Diámetro de la varilla" value={diametroVarilla} onChange={(v) => setDiametroVarilla(Number(v) || 0.001)} unit="m" hint="5/8&quot; = 0.01588 m" />
            {tipoElectrodo === "varillas" && (
              <>
                <InputField label="n — Número de varillas" value={numVarillas} onChange={(v) => setNumVarillas(Math.max(1, Math.round(Number(v) || 1)))} unit="ud" />
                <InputField label="s — Separación entre varillas" value={separacionVarillas} onChange={(v) => setSeparacionVarillas(Number(v) || 0.1)} unit="m" hint="Recomendado ≥ 2×L" />
              </>
            )}
          </div>
        )}

        {tipoElectrodo === "malla" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="Largo de la malla" value={largoMalla} onChange={(v) => setLargoMalla(Number(v) || 1)} unit="m" />
            <InputField label="Ancho de la malla" value={anchoMalla} onChange={(v) => setAnchoMalla(Number(v) || 1)} unit="m" />
            <InputField label="h — Profundidad de enterramiento" value={profMalla} onChange={(v) => setProfMalla(Number(v) || 0.1)} unit="m" hint="Típico: 0.5 – 0.8 m" />
            <InputField label="D — Espaciamiento conductores" value={espacMalla} onChange={(v) => setEspacMalla(Number(v) || 0.5)} unit="m" hint="Típico: 3 – 7 m" />
            <InputField label="Diámetro conductor" value={diamConductor} onChange={(v) => setDiamConductor(Number(v) || 0.001)} unit="m" hint="4/0 AWG ≈ 0.01063 m" />
          </div>
        )}

        {tipoElectrodo === "malla" && (
          <div className="mt-3 p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Fórmula (Schwarz simplificada):</strong> R<sub>g</sub> = ρ · (1/L<sub>T</sub> + 1/√(20A) · (1 + 1/(1 + h·√(20/A))))
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Donde L<sub>T</sub> = longitud total de conductor enterrado, A = área de la malla.
            </p>
          </div>
        )}

        {(tipoElectrodo === "varilla" || tipoElectrodo === "varillas") && (
          <div className="mt-3 p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Fórmula:</strong> R = (ρ / 2πL) · ln(4L/d) — IEEE 80, varilla vertical
            </p>
          </div>
        )}
      </CollapsibleSection>

      {/* 3. Resultados */}
      <CollapsibleSection title="3. Resultados del Cálculo" icon={Zap} defaultOpen badge="Resultado">
        <div className="space-y-4">
          {/* Factor Cs y Resistencia */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputField label="Cs — Factor corrección capa superficial" value={fmt(results.Cs, 4)} readOnly highlight />
            <InputField label="Rg — Resistencia de puesta a tierra" value={fmt(results.Rg, 3)} unit="Ω" readOnly highlight />
            <InputField label="GPR — Aumento potencial de tierra" value={fmt(results.GPR, 1)} unit="V" readOnly highlight />
          </div>

          {/* Tensiones tolerables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Tensión de Paso Tolerable (V<sub>paso</sub>)</p>
              <p className="text-2xl font-bold text-primary font-mono">{fmt(results.Vpaso_tol, 1)} V</p>
              <p className="text-xs text-muted-foreground mt-1">
                = (1000 + 6·{fmt(results.Cs, 3)}·{rhoS}) · {pesoPersona === "50" ? "0,116" : "0,157"} / √{ts}
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Tensión de Contacto Tolerable (V<sub>contacto</sub>)</p>
              <p className="text-2xl font-bold text-primary font-mono">{fmt(results.Vcontacto_tol, 1)} V</p>
              <p className="text-xs text-muted-foreground mt-1">
                = (1000 + 1,5·{fmt(results.Cs, 3)}·{rhoS}) · {pesoPersona === "50" ? "0,116" : "0,157"} / √{ts}
              </p>
            </div>
          </div>

          {/* Verificación */}
          <div className="p-4 rounded-lg border border-border bg-muted/20">
            <h4 className="text-sm font-semibold text-foreground mb-3">Verificación de Seguridad (Pto. 5.3 RPTD N° 06)</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Configuración: <strong>{results.tipoCalc}</strong> — GPR = I<sub>g</sub> × R<sub>g</sub> = {fmt(corrienteFalla, 0)} × {fmt(results.Rg, 3)} = <strong>{fmt(results.GPR, 1)} V</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`flex items-center gap-2 p-3 rounded-lg border ${results.cumplePaso ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
                {results.cumplePaso
                  ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                <div>
                  <p className="text-sm font-medium text-foreground">Tensión de Paso</p>
                  <p className="text-xs text-muted-foreground">
                    GPR ({fmt(results.GPR, 1)} V) {results.cumplePaso ? "<" : "≥"} V<sub>paso</sub> ({fmt(results.Vpaso_tol, 1)} V)
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 p-3 rounded-lg border ${results.cumpleContacto ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
                {results.cumpleContacto
                  ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                <div>
                  <p className="text-sm font-medium text-foreground">Tensión de Contacto</p>
                  <p className="text-xs text-muted-foreground">
                    GPR ({fmt(results.GPR, 1)} V) {results.cumpleContacto ? "<" : "≥"} V<sub>contacto</sub> ({fmt(results.Vcontacto_tol, 1)} V)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 4. Tabla de resumen */}
      <CollapsibleSection title="4. Tabla de Resumen y Verificación" icon={Shield} defaultOpen badge="Memoria">
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
              <tr><td>Resistividad del suelo</td><td className="font-mono">ρ</td><td className="text-right font-mono">{fmt(rho, 1)}</td><td>Ω·m</td><td>IEEE 81 / Medición</td></tr>
              <tr><td>Resistividad capa superficial</td><td className="font-mono">ρ<sub>s</sub></td><td className="text-right font-mono">{fmt(rhoS, 0)}</td><td>Ω·m</td><td>RPTD N° 06 Pto. 5</td></tr>
              <tr><td>Espesor capa superficial</td><td className="font-mono">h<sub>s</sub></td><td className="text-right font-mono">{fmt(hs, 2)}</td><td>m</td><td>—</td></tr>
              <tr><td>Duración de falla</td><td className="font-mono">t<sub>s</sub></td><td className="text-right font-mono">{fmt(ts, 2)}</td><td>s</td><td>NTSyCS</td></tr>
              <tr><td>Corriente de falla a tierra</td><td className="font-mono">I<sub>g</sub></td><td className="text-right font-mono">{fmt(corrienteFalla, 0)}</td><td>A</td><td>Estudio cortocircuito</td></tr>
              <tr className="border-t-2 border-primary/30"><td>Factor de corrección</td><td className="font-mono">C<sub>s</sub></td><td className="text-right font-mono font-bold">{fmt(results.Cs, 4)}</td><td>—</td><td>RPTD N° 06 Pto. 5</td></tr>
              <tr><td>Resistencia puesta a tierra</td><td className="font-mono">R<sub>g</sub></td><td className="text-right font-mono font-bold">{fmt(results.Rg, 3)}</td><td>Ω</td><td>IEEE 80 / Schwarz</td></tr>
              <tr><td>Aumento potencial de tierra</td><td className="font-mono">GPR</td><td className="text-right font-mono font-bold">{fmt(results.GPR, 1)}</td><td>V</td><td>GPR = I<sub>g</sub>·R<sub>g</sub></td></tr>
              <tr className="border-t-2 border-primary/30"><td>Tensión paso tolerable ({pesoPersona} kg)</td><td className="font-mono">V<sub>paso</sub></td><td className="text-right font-mono font-bold">{fmt(results.Vpaso_tol, 1)}</td><td>V</td><td>RPTD N° 06 Pto. 5.1</td></tr>
              <tr><td>Tensión contacto tolerable ({pesoPersona} kg)</td><td className="font-mono">V<sub>contacto</sub></td><td className="text-right font-mono font-bold">{fmt(results.Vcontacto_tol, 1)}</td><td>V</td><td>RPTD N° 06 Pto. 5.2</td></tr>
              <tr className="border-t-2 border-primary/30">
                <td>Verificación paso</td><td>—</td>
                <td className={`text-right font-bold ${results.cumplePaso ? "text-green-600" : "text-red-600"}`}>{results.cumplePaso ? "CUMPLE" : "NO CUMPLE"}</td>
                <td>—</td><td>RPTD N° 06 Pto. 5.3</td>
              </tr>
              <tr>
                <td>Verificación contacto</td><td>—</td>
                <td className={`text-right font-bold ${results.cumpleContacto ? "text-green-600" : "text-red-600"}`}>{results.cumpleContacto ? "CUMPLE" : "NO CUMPLE"}</td>
                <td>—</td><td>RPTD N° 06 Pto. 5.3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 italic">
          Nota: La verificación compara el GPR con las tensiones tolerables como criterio simplificado. Para un diseño completo,
          se deben calcular las tensiones de malla y paso reales según IEEE 80-2013 (Secciones 16.5 y 16.6).
        </p>
      </CollapsibleSection>
    </div>
  );
};

export default CalculadoraRPTD06;
