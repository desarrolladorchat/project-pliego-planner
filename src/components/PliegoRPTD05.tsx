import { useState } from "react";
import { BookOpen, Shield, Zap, Wrench, ClipboardCheck, ChevronDown, ChevronUp } from "lucide-react";

const CollapsibleSection = ({
  title, icon: Icon, children, defaultOpen = false,
}: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0"><Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /></div>
          <h3 className="text-sm sm:text-base font-bold text-foreground truncate">{title}</h3>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2">{children}</div>}
    </div>
  );
};

const PliegoRPTD05 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 05 — Aislación</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Producción, Transporte y Distribución</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer los requisitos para la aislación de las instalaciones y los componentes de un sistema eléctrico.
        </p>
        <h4 className="eng-subsection-title mt-4">2. Alcance</h4>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Aplica a las instalaciones de producción, transporte, prestación de servicios complementarios, sistemas de almacenamiento y distribución de energía eléctrica.
        </p>
      </CollapsibleSection>

      {/* 3. Referencias normativas */}
      <CollapsibleSection title="3. Referencias Normativas" icon={BookOpen}>
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead>
              <tr><th>Ítem</th><th>Norma</th><th>Año</th><th>Descripción</th></tr>
            </thead>
            <tbody>
              {[
                ["3.1", "IEC 60507", "2013", "Artificial pollution tests on HV insulators (a.c.)"],
                ["3.2", "IEC 60720", "1981", "Characteristics of line post insulators"],
                ["3.3–3.4", "IEC 61466-1/2", "1997–02", "Composite string insulator units > 1000 V"],
                ["3.5", "ANSI/ICEA S-94-649", "2013", "Concentric Neutral Cables 5–46 kV"],
                ["3.6", "IEEE 1427", "2006", "Electrical Clearances & Insulation Levels in Substations"],
                ["3.7", "IEC 60060-SER", "2011", "High-voltage test techniques – ALL PARTS"],
                ["3.8–3.10", "IEC 60071-1/2/5", "1996–2011", "Insulation co-ordination (principles, guide, HVDC)"],
                ["3.11", "IEC 61109", "2008", "Composite suspension/tension insulators > 1000 V"],
                ["3.12", "IEC 60433", "1998", "Long rod type ceramic insulators"],
                ["3.13", "IEC 60305", "1995", "Cap and pin type insulators"],
                ["3.14–3.15", "IEC 60383-1/2", "1993", "Ceramic/glass insulator units & strings"],
                ["3.16", "IEC 61284", "1997", "Overhead lines – Fittings requirements"],
                ["3.17", "IEC 61854", "1998", "Overhead lines – Spacers requirements"],
                ["3.18", "IEC 61897", "1998", "Stockbridge type aeolian vibration dampers"],
                ["3.19–3.21", "IEC/TS 60815-1/2/3", "2008", "HV insulators for polluted conditions"],
                ["3.22", "ANSI/NEMA WC 74", "2012", "Shielded Power Cables 5–46 kV"],
                ["3.23", "IEC 60168", "2001", "Indoor/outdoor post insulators > 1000 V"],
              ].map(([item, norma, year, desc], i) => (
                <tr key={i}>
                  <td className="font-mono">{item}</td>
                  <td className="font-semibold whitespace-nowrap">{norma}</td>
                  <td className="font-mono">{year}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 4. Terminología */}
      <CollapsibleSection title="4. Terminología y Definiciones" icon={BookOpen}>
        <div className="space-y-3">
          {[
            { term: "4.1. Aislador", def: "Elemento compuesto de material aislante, diseñado para soportar físicamente un conductor y separarlo eléctricamente de otros conductores u objetos." },
            { term: "4.2. BIL", def: "Nivel básico de aislamiento ante impulsos tipo rayo." },
            { term: "4.3. BSL", def: "Nivel básico de aislamiento ante impulsos tipo maniobra." },
            { term: "4.6. Herrajes", def: "Todos los elementos utilizados para la fijación de aisladores a la estructura, del conductor al aislador, del cable de guardia a la estructura, protección eléctrica de aisladores y accesorios del conductor." },
            { term: "4.8. Mástil", def: "Elemento metálico resistente a la corrosión, cuya función es interceptar los rayos que podrían impactar directamente sobre la instalación." },
            { term: "4.9. Material aislante", def: "Material con escasa capacidad de conducción de electricidad, utilizado para separar conductores eléctricos de elementos que puedan provocar descargas." },
            { term: "4.10. Pararrayos", def: "Varistores que evitan que la sobretensión (por rayo o maniobra) tenga un valor muy elevado en una subestación." },
            { term: "4.11. Sobretensión", def: "Tensión anormal entre dos puntos de una instalación, superior a la tensión máxima de operación normal." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 5. Nivel de aislación */}
      <CollapsibleSection title="5. Nivel de Aislación" icon={Zap}>
        <div className="space-y-3 text-foreground/80 text-sm mb-4">
          <p><strong>5.1</strong> La elección del nivel de aislación garantiza la seguridad de las personas y el servicio, considerando: método de puesta a tierra, sobretensiones de maniobra y atmosféricas, dispositivos de protección y nivel de contaminación.</p>
          <p><strong>5.2</strong> La aislación deberá resistir la tensión permanente a frecuencia industrial durante su vida útil, más las solicitaciones dieléctricas variables internas (maniobra) y externas (atmosféricas).</p>
          <p><strong>5.3</strong> Para protección contra sobretensiones: mástiles, cables de guardia o pararrayos.</p>
          <p><strong>5.5</strong> Coordinación de aislación según <strong>IEC 60071-1</strong>, <strong>IEC 60071-2</strong> o <strong>IEEE 1427</strong>. Para HVDC: <strong>IEC 60071-5</strong>.</p>
        </div>

        {/* Tabla BIL */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.7 Tabla N° 1 — Valores de BIL (alturas ≤ 1.000 m)</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr><th>Tensión Nominal (kV)</th><th>Tensión Máx. Equipos (kV)</th><th>BIL (kV)</th></tr>
              </thead>
              <tbody>
                {[
                  ["2,40","2,75","20"], ["3,30","3,6","40"], ["4,16","4,4","40"],
                  ["6,6","7,2","60"], ["12","15","75"], ["13,2","15","75"],
                  ["13,8","15","75"], ["15","17,5","95"], ["23","26,4","145"],
                  ["33","36","170"], ["44","48,3","250"], ["66","72,5","325"],
                  ["110","123","550"], ["121","145","650"], ["154","170","750"],
                  ["220","245","1.050"], ["345","362","1.175"], ["500","550","1.550"],
                  ["750","800","1.800"], ["1.000","1.200","2.100"],
                ].map(([nom, max, bil], i) => (
                  <tr key={i}>
                    <td className="font-mono text-center">{nom}</td>
                    <td className="font-mono text-center">{max}</td>
                    <td className="font-mono text-center font-semibold">{bil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla BSL */}
        <div className="mb-4">
          <h4 className="eng-subsection-title">Tabla N° 2 — Valores de BSL</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr><th>Tensión Nominal (kV)</th><th>Tensión Máx. Equipos (kV)</th><th>BSL (kV)</th></tr>
              </thead>
              <tbody>
                {[
                  ["345","362","950"], ["500","550","1.175"],
                  ["750","800","1.425"], ["1.000","1.200","1.550"],
                ].map(([nom, max, bsl], i) => (
                  <tr key={i}>
                    <td className="font-mono text-center">{nom}</td>
                    <td className="font-mono text-center">{max}</td>
                    <td className="font-mono text-center font-semibold">{bsl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-foreground/60 text-xs italic">
          5.8 Si se aplica un valor BIL o BSL inferior al correspondiente, deberá justificarse mediante un estudio de coordinación de aislamiento.
        </p>
      </CollapsibleSection>

      {/* 6. Aisladores */}
      <CollapsibleSection title="6. Aisladores" icon={Shield}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>6.1</strong> Los materiales (porcelana, vidrio, resina epóxica, esteatita u otros equivalentes) deberán resistir las acciones de la intemperie, conservando su condición aislante.</p>
          <p><strong>6.2</strong> Factor de seguridad mecánica de al menos <strong>2 veces</strong> el valor soportado garantizado.</p>
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <h4 className="eng-subsection-title">6.3 Normas aplicables por tipo de aislador</h4>
            <div className="overflow-x-auto">
              <table className="eng-table text-xs mt-2">
                <thead><tr><th>Tipo</th><th>Normas</th></tr></thead>
                <tbody>
                  <tr><td className="font-semibold">Cerámica o vidrio</td><td>IEC 60383-1, IEC 60720, IEC 60168</td></tr>
                  <tr><td className="font-semibold">Compuestos</td><td>IEC 61466-1, IEC 61466-2, IEC 61109</td></tr>
                  <tr><td className="font-semibold">Cadenas de aisladores</td><td>IEC 60305, IEC 60433, IEC 60383-2</td></tr>
                  <tr><td className="font-semibold">Ensayos contaminación</td><td>IEC 60507</td></tr>
                  <tr><td className="font-semibold">Protección corrosión</td><td>IEC 60815-1</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7. Herrajes */}
      <CollapsibleSection title="7. Herrajes" icon={Wrench}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>7.1</strong> Deberán cumplir con: <strong>IEC 61284</strong>, <strong>IEC 61854</strong> y/o <strong>IEC 61897</strong>.</p>
          <p><strong>7.2</strong> Coeficiente de seguridad mecánica ≥ <strong>3</strong> respecto a carga de trabajo nominal. Con ensayos, puede reducirse a <strong>2,5</strong>.</p>
          <p><strong>7.3</strong> Grampas de retención y empalmes: soportar ≥ <strong>90%</strong> de la carga de rotura del cable sin deslizamiento.</p>
          <p><strong>7.4</strong> La selección deberá considerar las características ambientales de la zona de instalación.</p>
        </div>
      </CollapsibleSection>

      {/* 8. Verificaciones */}
      <CollapsibleSection title="8. Verificaciones Requeridas" icon={ClipboardCheck}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>8.1</strong> Verificaciones según procedimiento de <strong>IEC 60071-2</strong> e <strong>IEC 60060</strong>.</p>
          <p><strong>8.2</strong> Para instalaciones a una altura sobre <strong>1.000 m s.n.m.</strong>, se deberá considerar el factor de corrección por altura en los niveles de aislamiento, señalado en el punto 5.6 del <strong>RPTD N° 07</strong>.</p>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD05;
