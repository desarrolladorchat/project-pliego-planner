import { useState, useMemo } from "react";
import { Layers, Ruler, CheckCircle, AlertTriangle, Info, Cable, Building2 } from "lucide-react";

/* ── Tabla N° 1 — Separación Vertical Mínima en Cruces (m) ── */
type TipoConductor = "tension_reducida" | "baja_tension" | "tirantes" | "media_tension";

const tipoLabels: Record<TipoConductor, string> = {
  tension_reducida: "Tensión Reducida / Mensajeros",
  baja_tension: "Baja Tensión",
  tirantes: "Tirantes",
  media_tension: "Media Tensión",
};

// tabla[inferior][superior] = distancia mínima en metros (null = no aplica / no permitido)
const tablaCruces: Record<TipoConductor, Record<TipoConductor, number | null>> = {
  tension_reducida: { tension_reducida: null, baja_tension: 1.0, tirantes: 1.0, media_tension: 1.2 },
  baja_tension: { tension_reducida: null, baja_tension: 1.0, tirantes: 1.3, media_tension: 1.75 },
  tirantes: { tension_reducida: null, baja_tension: null, tirantes: null, media_tension: 1.75 },
  media_tension: { tension_reducida: null, baja_tension: null, tirantes: 2.0, media_tension: 2.0 },
};

/* ── Profundidades mínimas subterráneas ── */
const profundidades = [
  { tipo: "Cable directamente enterrado", profundidad: 1.0, ref: "Pto. 6.6" },
  { tipo: "Ducto bajo tierra (sin tránsito)", profundidad: 0.6, ref: "Pto. 6.7" },
  { tipo: "Ducto bajo zona de tránsito vehicular", profundidad: 0.8, ref: "Pto. 6.7" },
  { tipo: "Cinta señalización sobre cable", profundidad: 0.7, ref: "Pto. 6.6 (20-30 cm sobre cable)" },
];

/* ── Distancias subterráneas a otros servicios ── */
const distanciasServicios = [
  { servicio: "Gas, Agua, Alcantarillado", distancia: 0.20, ref: "Pto. 7.5" },
  { servicio: "Combustibles líquidos", distancia: 1.0, ref: "Pto. 7.5" },
  { servicio: "Líneas AT o tensión reducida", distancia: 0.20, ref: "Pto. 7.6" },
];

/* ── Alturas mínimas en cruces férreos ── */
const alturasFerreos = [
  { caso: "MT desnudos/aislados sobre vía férrea", altura: 10.7, ref: "Pto. 7.4" },
];

const fmt = (v: number | null | undefined, d = 2) => (v != null && !isNaN(v) ? v.toFixed(d) : "—");

const CalculadoraRPTD13 = () => {
  const [inferior, setInferior] = useState<TipoConductor>("baja_tension");
  const [superior, setSuperior] = useState<TipoConductor>("media_tension");
  const [distanciaStr, setDistanciaStr] = useState("1.5");
  const [profundidadStr, setProfundidadStr] = useState("0.8");
  const [tipoInstalacion, setTipoInstalacion] = useState(0);
  const [distServicioStr, setDistServicioStr] = useState("0.25");
  const [servicioIdx, setServicioIdx] = useState(0);

  const distancia = parseFloat(distanciaStr) || 0;
  const profundidad = parseFloat(profundidadStr) || 0;
  const distServicio = parseFloat(distServicioStr) || 0;

  /* ── Verificación de cruce ── */
  const cruceResult = useMemo(() => {
    const minima = tablaCruces[inferior][superior];
    if (minima == null) return { minima: null, cumple: false, noAplica: true };
    return { minima, cumple: distancia >= minima, noAplica: false };
  }, [inferior, superior, distancia]);

  /* ── Verificación de profundidad ── */
  const profResult = useMemo(() => {
    const req = profundidades[tipoInstalacion];
    return { ...req, cumple: profundidad >= req.profundidad };
  }, [tipoInstalacion, profundidad]);

  /* ── Verificación de distancia a servicios ── */
  const servResult = useMemo(() => {
    const req = distanciasServicios[servicioIdx];
    return { ...req, cumple: distServicio >= req.distancia };
  }, [servicioIdx, distServicio]);

  const tipos: TipoConductor[] = ["tension_reducida", "baja_tension", "tirantes", "media_tension"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">
              Calculadora — Líneas MT y BT
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              RPTD N° 13 — Cruces, Profundidades y Distancias a Servicios
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">RPTD N° 13</span>
              <span className="eng-badge eng-badge-warning">Distribución MT/BT</span>
            </div>
          </div>
        </div>
      </div>

      {/* ① Separación vertical en cruces */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Ruler className="w-4 h-4 text-primary" /> ① Separación Vertical en Cruces (Tabla N° 1)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Conductor Inferior</label>
            <select value={inferior} onChange={(e) => setInferior(e.target.value as TipoConductor)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none">
              {tipos.map((t) => <option key={t} value={t}>{tipoLabels[t]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Conductor Superior</label>
            <select value={superior} onChange={(e) => setSuperior(e.target.value as TipoConductor)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none">
              {tipos.map((t) => <option key={t} value={t}>{tipoLabels[t]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Distancia de Diseño [m]</label>
            <input type="text" inputMode="decimal" value={distanciaStr} onChange={(e) => setDistanciaStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
        </div>

        {/* Resultado cruce */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Separación Mínima</p>
            <p className="text-2xl font-bold text-foreground">
              {cruceResult.noAplica ? "N/A" : fmt(cruceResult.minima, 2)}
            </p>
            <p className="text-xs text-muted-foreground">metros</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Distancia de Diseño</p>
            <p className="text-2xl font-bold text-foreground">{fmt(distancia, 2)}</p>
            <p className="text-xs text-muted-foreground">metros</p>
          </div>
        </div>

        {cruceResult.noAplica ? (
          <div className="flex items-center gap-2 p-3 rounded-lg border bg-amber-500/10 border-amber-500/20">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-600">
              Combinación no aplicable — Verifique la disposición del cruce
            </span>
          </div>
        ) : (
          <div className={`flex items-center gap-2 p-3 rounded-lg border ${
            cruceResult.cumple ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
          }`}>
            {cruceResult.cumple ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
            <span className={`text-sm font-bold ${cruceResult.cumple ? "text-green-600" : "text-red-600"}`}>
              {cruceResult.cumple ? "CUMPLE" : "NO CUMPLE"} — Separación vertical mínima
            </span>
          </div>
        )}

        {/* Tabla completa de referencia */}
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Inferior ↓ / Superior →</th>
                <th className="text-center">Tensión Reducida</th>
                <th className="text-center">Baja Tensión</th>
                <th className="text-center">Tirantes</th>
                <th className="text-center">Media Tensión</th>
              </tr>
            </thead>
            <tbody>
              {tipos.map((inf) => (
                <tr key={inf} className={inf === inferior ? "bg-primary/10 font-semibold" : ""}>
                  <td>{tipoLabels[inf]}</td>
                  {tipos.map((sup) => {
                    const val = tablaCruces[inf][sup];
                    const isSelected = inf === inferior && sup === superior;
                    return (
                      <td key={sup} className={`text-center ${isSelected ? "bg-primary/20 font-bold" : ""}`}>
                        {val != null ? fmt(val, 2) : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-muted-foreground mt-1">Fuente: RPTD N° 13, Punto 7 — Tabla N° 1</p>
        </div>
      </div>

      {/* ② Profundidad de instalación subterránea */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" /> ② Profundidad de Instalación Subterránea
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Tipo de Instalación</label>
            <select value={tipoInstalacion} onChange={(e) => setTipoInstalacion(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none">
              {profundidades.map((p, i) => <option key={i} value={i}>{p.tipo}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Profundidad de Diseño [m]</label>
            <input type="text" inputMode="decimal" value={profundidadStr} onChange={(e) => setProfundidadStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Prof. Mínima</p>
            <p className="text-2xl font-bold text-foreground">{fmt(profResult.profundidad, 2)}</p>
            <p className="text-xs text-muted-foreground">metros</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Prof. Diseño</p>
            <p className="text-2xl font-bold text-foreground">{fmt(profundidad, 2)}</p>
            <p className="text-xs text-muted-foreground">metros</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 p-3 rounded-lg border ${
          profResult.cumple ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
        }`}>
          {profResult.cumple ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
          <span className={`text-sm font-bold ${profResult.cumple ? "text-green-600" : "text-red-600"}`}>
            {profResult.cumple ? "CUMPLE" : "NO CUMPLE"} — Ref. {profResult.ref}
          </span>
        </div>

        {/* Tabla resumen profundidades */}
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Tipo</th>
                <th className="text-center">Prof. Mín. [m]</th>
                <th className="text-left">Referencia</th>
              </tr>
            </thead>
            <tbody>
              {profundidades.map((p, i) => (
                <tr key={i} className={i === tipoInstalacion ? "bg-primary/10 font-semibold" : ""}>
                  <td>{p.tipo}</td>
                  <td className="text-center font-mono">{fmt(p.profundidad, 2)}</td>
                  <td>{p.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ③ Distancia a otros servicios */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Cable className="w-4 h-4 text-primary" /> ③ Distancia a Otros Servicios Subterráneos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Servicio Adyacente</label>
            <select value={servicioIdx} onChange={(e) => setServicioIdx(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none">
              {distanciasServicios.map((s, i) => <option key={i} value={i}>{s.servicio}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Distancia de Diseño [m]</label>
            <input type="text" inputMode="decimal" value={distServicioStr} onChange={(e) => setDistServicioStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Dist. Mínima</p>
            <p className="text-2xl font-bold text-foreground">{fmt(servResult.distancia, 2)}</p>
            <p className="text-xs text-muted-foreground">metros</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Dist. Diseño</p>
            <p className="text-2xl font-bold text-foreground">{fmt(distServicio, 2)}</p>
            <p className="text-xs text-muted-foreground">metros</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 p-3 rounded-lg border ${
          servResult.cumple ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
        }`}>
          {servResult.cumple ? <CheckCircle className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
          <span className={`text-sm font-bold ${servResult.cumple ? "text-green-600" : "text-red-600"}`}>
            {servResult.cumple ? "CUMPLE" : "NO CUMPLE"} — Ref. {servResult.ref}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Servicio</th>
                <th className="text-center">Dist. Mín. [m]</th>
                <th className="text-left">Referencia</th>
              </tr>
            </thead>
            <tbody>
              {distanciasServicios.map((s, i) => (
                <tr key={i} className={i === servicioIdx ? "bg-primary/10 font-semibold" : ""}>
                  <td>{s.servicio}</td>
                  <td className="text-center font-mono">{fmt(s.distancia, 2)}</td>
                  <td>{s.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ④ Criterios adicionales */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" /> Criterios Adicionales de Referencia
        </h3>

        <div className="space-y-3 text-sm">
          <div className="overflow-x-auto">
            <table className="eng-table w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left">Criterio</th>
                  <th className="text-center">Valor</th>
                  <th className="text-left">Referencia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Altura MT desnudo/aislado sobre vía férrea</td>
                  <td className="text-center font-mono">10,7 m</td>
                  <td>Pto. 7.4</td>
                </tr>
                <tr>
                  <td>Paralelismo horizontal mín. (≤ 23 kV)</td>
                  <td className="text-center font-mono">2,0 m</td>
                  <td>Pto. 7.2</td>
                </tr>
                <tr>
                  <td>Presión de viento para análisis de cruces</td>
                  <td className="text-center font-mono">30 kg/m²</td>
                  <td>Pto. 7.1</td>
                </tr>
                <tr>
                  <td>Presión viento reducida (áreas protegidas)</td>
                  <td className="text-center font-mono">20 kg/m²</td>
                  <td>Pto. 7.1</td>
                </tr>
                <tr>
                  <td>Dist. máx. entre cámaras (con curvas)</td>
                  <td className="text-center font-mono">90 m</td>
                  <td>Pto. 6.7</td>
                </tr>
                <tr>
                  <td>Dist. máx. entre cámaras (tramo recto)</td>
                  <td className="text-center font-mono">120 m</td>
                  <td>Pto. 6.7</td>
                </tr>
                <tr>
                  <td>Pendiente mínima hacia cámaras</td>
                  <td className="text-center font-mono">0,25%</td>
                  <td>Pto. 6.7</td>
                </tr>
                <tr>
                  <td>Resistencia combinada PAT (BT)</td>
                  <td className="text-center font-mono">≤ 5 Ω</td>
                  <td>Pto. 6.9</td>
                </tr>
                <tr>
                  <td>Neutro a tierra cada</td>
                  <td className="text-center font-mono">200 m</td>
                  <td>Pto. 6.9</td>
                </tr>
                <tr>
                  <td>Resistencia tapas en tránsito vehicular</td>
                  <td className="text-center font-mono">6.000 kg</td>
                  <td>Pto. 6.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraRPTD13;
