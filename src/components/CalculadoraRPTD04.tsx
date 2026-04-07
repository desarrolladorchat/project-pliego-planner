import { useState, useMemo } from "react";
import { Cable, Zap, AlertTriangle, CheckCircle, Info, Shield } from "lucide-react";

/* ── Catálogo de conductores comunes ── */
const conductores = [
  // ACSR
  { nombre: "Linnet 336.4 MCM (ACSR)", material: "ACSR", seccion: 170.5, resistencia20: 0.1901, ampacidad: 529, cargaRotura: 5171, gmr: 0.00814, reactancia: 0.371 },
  { nombre: "Oriole 336.4 MCM (ACSR)", material: "ACSR", seccion: 170.5, resistencia20: 0.1805, ampacidad: 535, cargaRotura: 4585, gmr: 0.00841, reactancia: 0.369 },
  { nombre: "Partridge 266.8 MCM (ACSR)", material: "ACSR", seccion: 135.2, resistencia20: 0.2394, ampacidad: 475, cargaRotura: 5126, gmr: 0.00725, reactancia: 0.385 },
  { nombre: "Hawk 477 MCM (ACSR)", material: "ACSR", seccion: 241.7, resistencia20: 0.1340, ampacidad: 659, cargaRotura: 6950, gmr: 0.00973, reactancia: 0.354 },
  { nombre: "Drake 795 MCM (ACSR)", material: "ACSR", seccion: 403.0, resistencia20: 0.0804, ampacidad: 907, cargaRotura: 14360, gmr: 0.01257, reactancia: 0.335 },
  { nombre: "Cardinal 954 MCM (ACSR)", material: "ACSR", seccion: 483.4, resistencia20: 0.0670, ampacidad: 996, cargaRotura: 13842, gmr: 0.01378, reactancia: 0.327 },
  { nombre: "Bluejay 1113 MCM (ACSR)", material: "ACSR", seccion: 564.4, resistencia20: 0.0574, ampacidad: 1076, cargaRotura: 16143, gmr: 0.01489, reactancia: 0.321 },
  { nombre: "Chukar 1780 MCM (ACSR)", material: "ACSR", seccion: 902.1, resistencia20: 0.0359, ampacidad: 1400, cargaRotura: 22727, gmr: 0.01884, reactancia: 0.304 },
  // ACAR
  { nombre: "ACAR 750 MCM", material: "ACAR", seccion: 380.0, resistencia20: 0.0855, ampacidad: 870, cargaRotura: 8940, gmr: 0.01220, reactancia: 0.338 },
  { nombre: "ACAR 1000 MCM", material: "ACAR", seccion: 507.0, resistencia20: 0.0642, ampacidad: 1030, cargaRotura: 11340, gmr: 0.01410, reactancia: 0.325 },
  // AAC
  { nombre: "AAC Petunia 4/0 AWG", material: "AAC", seccion: 107.2, resistencia20: 0.2988, ampacidad: 390, cargaRotura: 2807, gmr: 0.00648, reactancia: 0.397 },
  { nombre: "AAC Poppy 336.4 MCM", material: "AAC", seccion: 170.5, resistencia20: 0.1879, ampacidad: 519, cargaRotura: 4463, gmr: 0.00817, reactancia: 0.371 },
  // Cobre
  { nombre: "Cu 4/0 AWG (desnudo)", material: "Cu", seccion: 107.2, resistencia20: 0.1609, ampacidad: 490, cargaRotura: 4925, gmr: 0.00592, reactancia: 0.397 },
  { nombre: "Cu 350 MCM (desnudo)", material: "Cu", seccion: 177.3, resistencia20: 0.0973, ampacidad: 650, cargaRotura: 7718, gmr: 0.00762, reactancia: 0.368 },
];

const fmt = (v: number | null | undefined, d = 2) => (v != null && !isNaN(v) ? v.toFixed(d) : "—");

const CalculadoraRPTD04 = () => {
  const [conductorIdx, setConductorIdx] = useState(4); // Drake default
  const [tensionKv, setTensionKv] = useState("220");
  const [corrienteStr, setCorrienteStr] = useState("400");
  const [longitudStr, setLongitudStr] = useState("50");
  const [fpStr, setFpStr] = useState("0.95");
  const [fases, setFases] = useState<"3" | "1">("3");
  const [tccStr, setTccStr] = useState("0.5");
  const [iccStr, setIccStr] = useState("20");
  const [tempIniStr, setTempIniStr] = useState("75");
  const [tempFinStr, setTempFinStr] = useState("250");
  const [traccionPctStr, setTraccionPctStr] = useState("25");

  const cond = conductores[conductorIdx];
  const tension = parseFloat(tensionKv) || 0;
  const corriente = parseFloat(corrienteStr) || 0;
  const longitud = parseFloat(longitudStr) || 0;
  const fp = parseFloat(fpStr) || 0;
  const tcc = parseFloat(tccStr) || 0;
  const icc = parseFloat(iccStr) || 0;
  const tempIni = parseFloat(tempIniStr) || 0;
  const tempFin = parseFloat(tempFinStr) || 0;
  const traccionPct = parseFloat(traccionPctStr) || 0;

  /* ── 1. Verificación de ampacidad ── */
  const ampacidadOk = corriente <= cond.ampacidad;

  /* ── 2. Caída de tensión ── */
  const caidaTension = useMemo(() => {
    if (tension <= 0 || corriente <= 0 || longitud <= 0) return null;
    const R = cond.resistencia20 * longitud; // Ω (longitud en km, resistencia en Ω/km)
    const X = cond.reactancia * longitud;
    const sinFp = Math.sqrt(1 - fp * fp);

    if (fases === "3") {
      const dV = Math.sqrt(3) * corriente * (R * fp + X * sinFp); // V
      const dVpct = (dV / (tension * 1000)) * 100;
      return { dV, dVpct, R, X };
    } else {
      const dV = 2 * corriente * (R * fp + X * sinFp);
      const dVpct = (dV / (tension * 1000)) * 100;
      return { dV, dVpct, R, X };
    }
  }, [tension, corriente, longitud, fp, fases, cond]);

  /* ── 3. Sección mínima por cortocircuito ── */
  const seccionCC = useMemo(() => {
    if (icc <= 0 || tcc <= 0) return null;
    // S = I * sqrt(t) / K  (K depende del material)
    // K: Cu=142, Al=76 (XLPE 90°→250°), ACSR≈76
    const K = cond.material === "Cu" ? 142 : 76;
    // Corrección por temperatura
    const alpha = cond.material === "Cu" ? 0.00393 : 0.00403;
    const beta = 1 / alpha;
    const Kcorr = Math.sqrt(Math.log((beta + tempFin) / (beta + tempIni))) / (1 / (alpha * (beta + 20)));
    const Smin = (icc * 1000 * Math.sqrt(tcc)) / (Kcorr > 0 ? Kcorr : K);
    return { Smin, K, Kcorr, cumple: cond.seccion >= Smin };
  }, [icc, tcc, tempIni, tempFin, cond]);

  /* ── 4. Verificación mecánica ── */
  const mecanica = useMemo(() => {
    const traccion80 = cond.cargaRotura * 0.80;
    const traccion90 = cond.cargaRotura * 0.90;
    const traccionAplicada = cond.cargaRotura * (traccionPct / 100);
    return {
      traccion80,
      traccion90,
      traccionAplicada,
      cumple80: traccionAplicada <= traccion80,
      cumple90: traccionAplicada <= traccion90,
    };
  }, [cond, traccionPct]);

  /* ── 5. Sección mínima normativa ── */
  const seccionMinNorm = tension > 1 ? 10 : 6;
  const cumpleSeccionMin = cond.seccion >= seccionMinNorm;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Cable className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">
              Calculadora — Conductores
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              RPTD N° 04 — Ampacidad, Caída de Tensión, Cortocircuito y Verificación Mecánica
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">RPTD N° 04</span>
              <span className="eng-badge eng-badge-warning">IEC / ASTM / ANSI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selector de conductor */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Cable className="w-4 h-4 text-primary" /> Selección de Conductor
        </h3>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Conductor</label>
          <select
            value={conductorIdx}
            onChange={(e) => setConductorIdx(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          >
            {conductores.map((c, i) => (
              <option key={i} value={i}>{c.nombre}</option>
            ))}
          </select>
        </div>

        {/* Datos del conductor */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Sección", value: `${fmt(cond.seccion, 1)} mm²` },
            { label: "Resistencia (20°C)", value: `${fmt(cond.resistencia20, 4)} Ω/km` },
            { label: "Ampacidad", value: `${cond.ampacidad} A` },
            { label: "Carga Rotura", value: `${cond.cargaRotura.toLocaleString()} kg` },
          ].map((d) => (
            <div key={d.label} className="p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.label}</p>
              <p className="text-sm font-bold text-foreground mt-0.5">{d.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Parámetros del circuito */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Parámetros del Circuito
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Tensión [kV]</label>
            <input type="text" inputMode="decimal" value={tensionKv} onChange={(e) => setTensionKv(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Corriente [A]</label>
            <input type="text" inputMode="decimal" value={corrienteStr} onChange={(e) => setCorrienteStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Longitud [km]</label>
            <input type="text" inputMode="decimal" value={longitudStr} onChange={(e) => setLongitudStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Factor Potencia</label>
            <input type="text" inputMode="decimal" value={fpStr} onChange={(e) => setFpStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Fases</label>
            <div className="flex gap-2">
              {(["3", "1"] as const).map((f) => (
                <button key={f} onClick={() => setFases(f)}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium transition-colors border ${
                    fases === f ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 text-muted-foreground border-border hover:bg-muted"
                  }`}>
                  {f === "3" ? "3φ" : "1φ"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resultados: Ampacidad + Caída de Tensión */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ampacidad */}
        <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-3">
          <h3 className="text-sm font-bold text-foreground">① Verificación de Ampacidad</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 p-4 rounded-lg bg-muted/30 border border-border text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Corriente de Diseño</p>
              <p className="text-2xl font-bold text-foreground">{fmt(corriente, 0)}</p>
              <p className="text-xs text-muted-foreground">A</p>
            </div>
            <span className="text-muted-foreground text-lg">≤</span>
            <div className="flex-1 p-4 rounded-lg bg-muted/30 border border-border text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Ampacidad</p>
              <p className="text-2xl font-bold text-foreground">{cond.ampacidad}</p>
              <p className="text-xs text-muted-foreground">A</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 p-3 rounded-lg border ${
            ampacidadOk ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
          }`}>
            {ampacidadOk ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
            <span className={`text-sm font-bold ${ampacidadOk ? "text-green-600" : "text-red-600"}`}>
              {ampacidadOk ? "CUMPLE" : "NO CUMPLE"} — Capacidad térmica
            </span>
          </div>
        </div>

        {/* Caída de tensión */}
        <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-3">
          <h3 className="text-sm font-bold text-foreground">② Caída de Tensión</h3>
          {caidaTension ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ΔV</p>
                  <p className="text-2xl font-bold text-foreground">{fmt(caidaTension.dV, 1)}</p>
                  <p className="text-xs text-muted-foreground">V</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ΔV %</p>
                  <p className={`text-2xl font-bold ${caidaTension.dVpct <= 5 ? "text-green-600" : "text-amber-600"}`}>
                    {fmt(caidaTension.dVpct, 2)}%
                  </p>
                  <p className="text-xs text-muted-foreground">del voltaje nominal</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 p-3 rounded-lg border ${
                caidaTension.dVpct <= 5 ? "bg-green-500/10 border-green-500/20" : "bg-amber-500/10 border-amber-500/20"
              }`}>
                {caidaTension.dVpct <= 5
                  ? <CheckCircle className="w-4 h-4 text-green-500" />
                  : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                <span className={`text-sm font-bold ${caidaTension.dVpct <= 5 ? "text-green-600" : "text-amber-600"}`}>
                  {caidaTension.dVpct <= 5 ? "ACEPTABLE" : "REVISAR"} — Límite típico 5%
                </span>
              </div>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">Ingrese parámetros del circuito.</p>
          )}
        </div>
      </div>

      {/* Cortocircuito */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> ③ Sección Mínima por Cortocircuito
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">I cortocircuito [kA]</label>
            <input type="text" inputMode="decimal" value={iccStr} onChange={(e) => setIccStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Tiempo despeje [s]</label>
            <input type="text" inputMode="decimal" value={tccStr} onChange={(e) => setTccStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">T° inicial [°C]</label>
            <input type="text" inputMode="decimal" value={tempIniStr} onChange={(e) => setTempIniStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">T° final [°C]</label>
            <input type="text" inputMode="decimal" value={tempFinStr} onChange={(e) => setTempFinStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
        </div>

        {seccionCC && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">S mínima requerida</p>
                <p className="text-2xl font-bold text-foreground">{fmt(seccionCC.Smin, 1)}</p>
                <p className="text-xs text-muted-foreground">mm²</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">S conductor</p>
                <p className="text-2xl font-bold text-foreground">{fmt(cond.seccion, 1)}</p>
                <p className="text-xs text-muted-foreground">mm²</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 p-3 rounded-lg border ${
              seccionCC.cumple ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
            }`}>
              {seccionCC.cumple ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
              <span className={`text-sm font-bold ${seccionCC.cumple ? "text-green-600" : "text-red-600"}`}>
                {seccionCC.cumple ? "CUMPLE" : "NO CUMPLE"} — S = I·√t / K
              </span>
            </div>
          </div>
        )}

        <div className="p-3 bg-muted/20 rounded-lg border border-border">
          <p className="text-[10px] text-muted-foreground flex items-start gap-1">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            K = {cond.material === "Cu" ? "142" : "76"} ({cond.material}, XLPE). Fórmula: S<sub>min</sub> = I<sub>cc</sub> · √t / K
          </p>
        </div>
      </div>

      {/* Verificación mecánica */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Cable className="w-4 h-4 text-primary" /> ④ Verificación Mecánica (Punto 5.7/5.8)
        </h3>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Tracción EDS (% de carga rotura)</label>
          <input type="text" inputMode="decimal" value={traccionPctStr} onChange={(e) => setTraccionPctStr(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tracción Aplicada</p>
            <p className="text-xl font-bold text-foreground">{fmt(mecanica.traccionAplicada, 0)}</p>
            <p className="text-xs text-muted-foreground">kg ({traccionPct}%)</p>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Límite 80%</p>
            <p className="text-xl font-bold text-foreground">{fmt(mecanica.traccion80, 0)}</p>
            <p className="text-xs text-muted-foreground">kg</p>
          </div>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Límite 90%</p>
            <p className="text-xl font-bold text-foreground">{fmt(mecanica.traccion90, 0)}</p>
            <p className="text-xs text-muted-foreground">kg</p>
          </div>
        </div>

        <div className="space-y-2">
          {[
            { label: "≤ 80% carga rotura (condición normal)", cumple: mecanica.cumple80 },
            { label: "≤ 90% carga rotura (condición excepcional)", cumple: mecanica.cumple90 },
          ].map((v) => (
            <div key={v.label} className={`flex items-center justify-between p-3 rounded-lg border ${
              v.cumple ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
            }`}>
              <div className="flex items-center gap-2">
                {v.cumple ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                <span className="text-sm text-foreground">{v.label}</span>
              </div>
              <span className={`text-sm font-bold ${v.cumple ? "text-green-600" : "text-red-600"}`}>
                {v.cumple ? "CUMPLE" : "NO CUMPLE"}
              </span>
            </div>
          ))}
        </div>

        {/* Sección mínima normativa */}
        <div className={`flex items-center justify-between p-3 rounded-lg border ${
          cumpleSeccionMin ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
        }`}>
          <div className="flex items-center gap-2">
            {cumpleSeccionMin ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
            <span className="text-sm text-foreground">Sección mínima normativa: {seccionMinNorm} mm² ({tension > 1 ? "MT/AT/EAT" : "BT"})</span>
          </div>
          <span className={`text-sm font-bold ${cumpleSeccionMin ? "text-green-600" : "text-red-600"}`}>
            {cumpleSeccionMin ? "CUMPLE" : "NO CUMPLE"}
          </span>
        </div>
      </div>

      {/* Resumen técnico */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <h3 className="text-sm font-bold text-foreground mb-3">Resumen — Memoria de Cálculo</h3>
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Parámetro</th>
                <th className="text-center">Valor</th>
                <th className="text-center">Estado</th>
                <th className="text-left">Referencia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Conductor</td>
                <td className="text-center font-mono">{cond.nombre}</td>
                <td className="text-center">—</td>
                <td>RPTD N° 04, Pto. 5</td>
              </tr>
              <tr>
                <td>Ampacidad</td>
                <td className="text-center font-mono">{corriente} / {cond.ampacidad} A</td>
                <td className="text-center">{ampacidadOk ? "✅" : "❌"}</td>
                <td>Pto. 4.8</td>
              </tr>
              <tr>
                <td>Caída de tensión</td>
                <td className="text-center font-mono">{caidaTension ? `${fmt(caidaTension.dVpct, 2)}%` : "—"}</td>
                <td className="text-center">{caidaTension ? (caidaTension.dVpct <= 5 ? "✅" : "⚠️") : "—"}</td>
                <td>Criterio ≤ 5%</td>
              </tr>
              <tr>
                <td>Sección por CC</td>
                <td className="text-center font-mono">{seccionCC ? `${fmt(seccionCC.Smin, 1)} / ${fmt(cond.seccion, 1)} mm²` : "—"}</td>
                <td className="text-center">{seccionCC ? (seccionCC.cumple ? "✅" : "❌") : "—"}</td>
                <td>IEC 60949</td>
              </tr>
              <tr>
                <td>Tracción mecánica</td>
                <td className="text-center font-mono">{traccionPct}% → {fmt(mecanica.traccionAplicada, 0)} kg</td>
                <td className="text-center">{mecanica.cumple80 ? "✅" : "❌"}</td>
                <td>Pto. 5.7 / 5.8</td>
              </tr>
              <tr>
                <td>Sección mínima norm.</td>
                <td className="text-center font-mono">{fmt(cond.seccion, 1)} ≥ {seccionMinNorm} mm²</td>
                <td className="text-center">{cumpleSeccionMin ? "✅" : "❌"}</td>
                <td>Pto. 5.3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraRPTD04;
