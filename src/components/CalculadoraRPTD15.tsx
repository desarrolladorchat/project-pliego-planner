import { useState, useMemo } from "react";
import { Wrench, Zap, Info, CheckCircle, AlertTriangle, Shield } from "lucide-react";

/* ── Data: Tabla N° 1 — CA ── */
const tablaCA = [
  { label: "0 – 50 V", min: 0, max: 50, movil: null, fijo: null, prohibida: null, prohibidaText: "—" },
  { label: "51 V – 300 V", min: 51, max: 300, movil: 3.0, fijo: 1.0, prohibida: null, prohibidaText: "Evitar contacto" },
  { label: "301 V – 750 V", min: 301, max: 750, movil: 3.0, fijo: 1.0, prohibida: 0.3, prohibidaText: "0,3" },
  { label: "751 V – 15 kV", min: 751, max: 15000, movil: 3.0, fijo: 1.5, prohibida: 0.7, prohibidaText: "0,7" },
  { label: "15,1 kV – 36 kV", min: 15001, max: 36000, movil: 3.0, fijo: 1.8, prohibida: 0.8, prohibidaText: "0,8" },
  { label: "36,1 kV – 46 kV", min: 36001, max: 46000, movil: 3.0, fijo: 2.5, prohibida: 0.8, prohibidaText: "0,8" },
  { label: "46,1 kV – 72,5 kV", min: 46001, max: 72500, movil: 3.0, fijo: 2.5, prohibida: 1.0, prohibidaText: "1,0" },
  { label: "72,6 kV – 121 kV", min: 72501, max: 121000, movil: 3.3, fijo: 2.5, prohibida: 1.0, prohibidaText: "1,0" },
  { label: "138 kV – 145 kV", min: 121001, max: 145000, movil: 3.4, fijo: 3.0, prohibida: 1.2, prohibidaText: "1,2" },
  { label: "161 kV – 169 kV", min: 145001, max: 169000, movil: 3.6, fijo: 3.6, prohibida: 1.3, prohibidaText: "1,3" },
  { label: "230 kV – 242 kV", min: 169001, max: 242000, movil: 4.0, fijo: 4.0, prohibida: 1.7, prohibidaText: "1,7" },
  { label: "345 kV – 362 kV", min: 242001, max: 362000, movil: 4.7, fijo: 4.7, prohibida: 2.8, prohibidaText: "2,8" },
  { label: "500 kV – 550 kV", min: 362001, max: 550000, movil: 5.8, fijo: 5.8, prohibida: 3.6, prohibidaText: "3,6" },
  { label: "765 kV – 800 kV", min: 550001, max: 800000, movil: 7.2, fijo: 7.2, prohibida: 4.9, prohibidaText: "4,9" },
];

/* ── Data: Tabla N° 2 — CC ── */
const tablaCC = [
  { label: "0 – 100 V", min: 0, max: 100, movil: null, fijo: null, prohibida: null, prohibidaText: "—" },
  { label: "101 V – 300 V", min: 101, max: 300, movil: 3.0, fijo: 1.0, prohibida: null, prohibidaText: "Evitar contacto" },
  { label: "300 V – 1 kV", min: 301, max: 1000, movil: 3.0, fijo: 1.0, prohibida: 0.3, prohibidaText: "0,3" },
  { label: "1,1 kV – 5 kV", min: 1001, max: 5000, movil: 3.0, fijo: 1.5, prohibida: 0.5, prohibidaText: "0,5" },
  { label: "5,1 kV – 15 kV", min: 5001, max: 15000, movil: 3.0, fijo: 1.5, prohibida: 0.7, prohibidaText: "0,7" },
  { label: "15,1 kV – 45 kV", min: 15001, max: 45000, movil: 3.0, fijo: 2.5, prohibida: 0.8, prohibidaText: "0,8" },
  { label: "45,1 kV – 75 kV", min: 45001, max: 75000, movil: 3.0, fijo: 2.5, prohibida: 1.0, prohibidaText: "1,0" },
  { label: "75,1 kV – 150 kV", min: 75001, max: 150000, movil: 3.3, fijo: 3.0, prohibida: 1.2, prohibidaText: "1,2" },
  { label: "150,1 kV – 250 kV", min: 150001, max: 250000, movil: 3.6, fijo: 3.6, prohibida: 1.6, prohibidaText: "1,6" },
  { label: "250,1 kV – 500 kV", min: 250001, max: 500000, movil: 6.0, fijo: 6.0, prohibida: 3.5, prohibidaText: "3,5" },
  { label: "500,1 kV – 800 kV", min: 500001, max: 800000, movil: 8.0, fijo: 8.0, prohibida: 5.0, prohibidaText: "5,0" },
];

const fmt = (v: number | null | undefined, d = 2) => (v != null ? v.toFixed(d) : "—");

const CalculadoraRPTD15 = () => {
  const [tipo, setTipo] = useState<"CA" | "CC">("CA");
  const [voltajeStr, setVoltajeStr] = useState("23000");
  const [distanciaTrabajoStr, setDistanciaTrabajoStr] = useState("2.0");

  const voltaje = parseFloat(voltajeStr) || 0;
  const distanciaTrabajo = parseFloat(distanciaTrabajoStr) || 0;

  const tabla = tipo === "CA" ? tablaCA : tablaCC;

  const fila = useMemo(() => {
    return tabla.find((r) => voltaje >= r.min && voltaje <= r.max) ?? null;
  }, [voltaje, tabla]);

  const verificacion = useMemo(() => {
    if (!fila) return null;
    const checks = [];

    if (fila.movil != null) {
      checks.push({
        label: "Conductores Móviles",
        limite: fila.movil,
        cumple: distanciaTrabajo >= fila.movil,
      });
    }
    if (fila.fijo != null) {
      checks.push({
        label: "Circuitos Fijos",
        limite: fila.fijo,
        cumple: distanciaTrabajo >= fila.fijo,
      });
    }
    if (fila.prohibida != null) {
      checks.push({
        label: "Aproximación Prohibida",
        limite: fila.prohibida,
        cumple: distanciaTrabajo >= fila.prohibida,
      });
    }

    return checks;
  }, [fila, distanciaTrabajo]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Wrench className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">
              Calculadora — Distancias de Aproximación
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              RPTD N° 15 — Tablas N° 1 (CA) y N° 2 (CC) · NFPA 70E / OSHA 1910.269
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">RPTD N° 15</span>
              <span className="eng-badge eng-badge-warning">Seguridad O&M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Parámetros de Entrada
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Tipo de corriente */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Tipo de Corriente</label>
            <div className="flex gap-2">
              {(["CA", "CC"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${
                    tipo === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {t === "CA" ? "CA (Alterna)" : "CC (Continua)"}
                </button>
              ))}
            </div>
          </div>

          {/* Voltaje */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Tensión Nominal [V]</label>
            <input
              type="text"
              inputMode="decimal"
              value={voltajeStr}
              onChange={(e) => setVoltajeStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              placeholder="Ej: 23000"
            />
          </div>

          {/* Distancia de trabajo */}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Distancia de Trabajo [m]</label>
            <input
              type="text"
              inputMode="decimal"
              value={distanciaTrabajoStr}
              onChange={(e) => setDistanciaTrabajoStr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
              placeholder="Ej: 2.0"
            />
          </div>
        </div>
      </div>

      {/* Resultado */}
      {fila ? (
        <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Distancias de Aproximación — {tipo}
          </h3>

          <div className="p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              Rango seleccionado: <strong className="text-foreground">{fila.label}</strong> ({tipo})
            </p>
          </div>

          {/* Distancias */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Cond. Móviles</p>
              <p className="text-2xl font-bold text-foreground">{fila.movil != null ? fmt(fila.movil, 1) : "—"}</p>
              <p className="text-xs text-muted-foreground">metros</p>
            </div>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Circuitos Fijos</p>
              <p className="text-2xl font-bold text-foreground">{fila.fijo != null ? fmt(fila.fijo, 1) : "—"}</p>
              <p className="text-xs text-muted-foreground">metros</p>
            </div>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Aprox. Prohibida</p>
              <p className="text-2xl font-bold text-foreground">{fila.prohibidaText}</p>
              <p className="text-xs text-muted-foreground">metros</p>
            </div>
          </div>

          {/* Verificación */}
          {verificacion && verificacion.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Verificación vs. Distancia de Trabajo ({fmt(distanciaTrabajo, 1)} m)
              </h4>
              {verificacion.map((v) => (
                <div
                  key={v.label}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    v.cumple
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-red-500/10 border-red-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {v.cumple ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm text-foreground">{v.label}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${v.cumple ? "text-green-600" : "text-red-600"}`}>
                      {v.cumple ? "CUMPLE" : "NO CUMPLE"}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">(mín. {fmt(v.limite, 1)} m)</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Visual diagram */}
          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-primary" /> Esquema de Zonas de Aproximación
            </h4>
            <div className="relative h-16 rounded-lg overflow-hidden border border-border">
              {fila.movil != null && (
                <div
                  className="absolute inset-y-0 left-0 bg-blue-500/15 border-r-2 border-blue-500/40 flex items-center justify-center"
                  style={{ width: "100%" }}
                >
                  <span className="text-[9px] text-blue-600 font-medium">Zona Libre</span>
                </div>
              )}
              {fila.fijo != null && fila.movil != null && (
                <div
                  className="absolute inset-y-0 bg-amber-500/20 border-r-2 border-amber-500/50 flex items-center justify-center"
                  style={{
                    left: `${100 - (fila.fijo / fila.movil) * 100}%`,
                    width: `${((fila.fijo - (fila.prohibida ?? 0)) / fila.movil) * 100}%`,
                  }}
                >
                  <span className="text-[9px] text-amber-700 font-medium">Restringida</span>
                </div>
              )}
              {fila.prohibida != null && fila.movil != null && (
                <div
                  className="absolute inset-y-0 right-0 bg-red-500/25 flex items-center justify-center"
                  style={{ width: `${(fila.prohibida / fila.movil) * 100}%` }}
                >
                  <span className="text-[9px] text-red-700 font-medium">Prohibida</span>
                </div>
              )}
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
              <span>Persona</span>
              <span>Conductor</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border text-center">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            {voltaje === 0
              ? "Ingrese una tensión nominal para consultar las distancias de aproximación."
              : `No se encontró un rango para ${voltaje} V en la Tabla N° ${tipo === "CA" ? "1" : "2"} (${tipo}).`}
          </p>
        </div>
      )}

      {/* Tabla completa de referencia */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <h3 className="text-sm font-bold text-foreground mb-3">
          Tabla N° {tipo === "CA" ? "1" : "2"} — Límites de Aproximación en {tipo} (metros)
        </h3>
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Rango de Voltaje</th>
                <th className="text-center">Cond. Móviles</th>
                <th className="text-center">Circuitos Fijos</th>
                <th className="text-center">Aprox. Prohibida</th>
              </tr>
            </thead>
            <tbody>
              {tabla.map((r) => {
                const isActive = fila?.label === r.label;
                return (
                  <tr key={r.label} className={isActive ? "bg-primary/10 font-semibold" : ""}>
                    <td>{r.label}</td>
                    <td className="text-center">{r.movil != null ? fmt(r.movil, 1) : "—"}</td>
                    <td className="text-center">{r.fijo != null ? fmt(r.fijo, 1) : "—"}</td>
                    <td className="text-center">{r.prohibidaText}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">
          Fuente: RPTD N° 15, Punto 7 — Ref. NFPA 70E / OSHA 1910.269
        </p>
      </div>
    </div>
  );
};

export default CalculadoraRPTD15;
