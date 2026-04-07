import { useState } from "react";
import { BookOpen, Zap, Train, ChevronDown, ChevronUp, Activity } from "lucide-react";

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

const PliegoRPTD01 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 01 — Tensiones y Frecuencias Nominales</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020), modificada por R.E. N° 34.069 (05/02/2021) — SEC
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
          Establecer la frecuencia nominal, así como los niveles de tensión y sus variaciones, de la energía eléctrica.
        </p>
        <h4 className="eng-subsection-title mt-4">2. Alcance</h4>
        <p className="text-foreground/80 leading-relaxed text-sm">
          La aplicación de este pliego técnico será sobre las instalaciones destinadas a la producción, transporte, prestación de servicios complementarios, sistemas de almacenamiento y distribución de energía eléctrica.
        </p>
      </CollapsibleSection>

      {/* 3. Terminología */}
      <CollapsibleSection title="3. Terminología y Definiciones" icon={BookOpen}>
        <div className="space-y-3">
          {[
            { term: "3.1. Tensión Nominal", def: "Valor convencional de la tensión con el cual se designa un sistema, instalación o equipo, y para el que ha sido previsto su funcionamiento." },
            { term: "3.2. Tensión Máxima del Equipo", def: "Es el valor superior de tensión para el cual el equipo ha sido diseñado." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 4. Frecuencias */}
      <CollapsibleSection title="4. Frecuencias" icon={Activity}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          En los sistemas de corriente alterna la frecuencia nominal será de <strong>50 ciclos por segundo (50 Hz)</strong>.
        </p>
      </CollapsibleSection>

      {/* 5. Tensiones */}
      <CollapsibleSection title="5. Tensiones Nominales de Corriente Alterna" icon={Zap}>
        {/* 5.1 */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.1 Variaciones de la Tensión</h4>
          <div className="space-y-2 text-foreground/80 text-sm">
            <p><strong>a.</strong> El rango de variación de la tensión en los sistemas eléctricos será el establecido en la norma técnica correspondiente.</p>
            <p><strong>b.</strong> Las variaciones u holguras permitidas de la tensión nominal en el punto de conexión, en baja y en media tensión, serán las establecidas en el Reglamento de la Ley General de Servicios Eléctricos o en la norma técnica correspondiente.</p>
          </div>
        </div>

        {/* 5.2a Baja Tensión */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.2a Baja Tensión — Tabla N° 1</h4>
          <p className="text-foreground/70 text-xs mb-2">
            La tensión nominal de los sistemas de servicio público de distribución deberá ser de 380 V entre fases y de 220 V entre fase y neutro.
          </p>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr>
                  <th>Tensión Nominal entre fases (V)</th>
                  <th>Tensión Nominal fase-neutro (V)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["380", "220"],
                  ["480", "277"],
                  ["660", "380"],
                ].map(([fases, neutro], i) => (
                  <tr key={i}>
                    <td className="font-mono text-center">{fases}</td>
                    <td className="font-mono text-center">{neutro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5.2b Media Tensión */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.2b Media Tensión — Tabla N° 2</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr>
                  <th>Tensión Máxima de Equipos (kV)</th>
                  <th>Tensión Nominal de Sistemas (kV)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2,75", "2,4"],
                  ["3,6", "3,3"],
                  ["4,4", "4,16"],
                  ["7,2", "6,6"],
                  ["12", "11"],
                  ["15", "12"],
                  ["15", "13,2"],
                  ["15", "13,8"],
                  ["17,5", "15"],
                  ["24", "20"],
                  ["25,8", "23"],
                ].map(([maxEq, nomSist], i) => (
                  <tr key={i}>
                    <td className="font-mono text-center">{maxEq}</td>
                    <td className="font-mono text-center">{nomSist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5.2c Alta Tensión */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.2c Alta Tensión — Tabla N° 3</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr>
                  <th>Tensión Máxima de Equipos (kV)</th>
                  <th>Tensión Nominal de Sistemas (kV)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["36", "33"],
                  ["48,3", "44"],
                  ["72,5", "66"],
                  ["123", "110"],
                  ["145", "121"],
                  ["170", "154"],
                  ["245", "220"],
                ].map(([maxEq, nomSist], i) => (
                  <tr key={i}>
                    <td className="font-mono text-center">{maxEq}</td>
                    <td className="font-mono text-center">{nomSist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5.2d Extra Alta Tensión */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.2d Extra Alta Tensión — Tabla N° 4</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr>
                  <th>Tensión Máxima de Equipos (kV)</th>
                  <th>Tensión Nominal de Sistemas (kV)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["362", "345"],
                  ["550", "500"],
                  ["800", "750"],
                  ["1.200", "1.000"],
                ].map(([maxEq, nomSist], i) => (
                  <tr key={i}>
                    <td className="font-mono text-center">{maxEq}</td>
                    <td className="font-mono text-center">{nomSist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-foreground/60 text-xs mt-2 italic">
            Los valores de las tablas N° 2, N° 3 y N° 4 se refieren a sistemas e instalaciones trifásicos sin conductor de neutro y corresponden a las tensiones entre fases.
          </p>
        </div>
      </CollapsibleSection>

      {/* 6. Tensiones de Sistemas de Tracción */}
      <CollapsibleSection title="6. Tensiones de Sistemas de Tracción" icon={Train}>
        <h4 className="eng-subsection-title">Tabla N° 5 — Tensiones Nominales de Tracción</h4>
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead>
              <tr>
                <th>Sistema</th>
                <th>Mínima (V)</th>
                <th>Nominal (V)</th>
                <th>Máxima (V)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={4} className="font-semibold bg-muted/30 text-foreground">Sistemas de corriente continua</td></tr>
              {[
                ["400", "600", "720"],
                ["500", "750", "950"],
                ["1.000", "1.500", "1.800"],
                ["2.000", "3.000", "3.600"],
              ].map(([min, nom, max], i) => (
                <tr key={`dc-${i}`}>
                  <td></td>
                  <td className="font-mono text-center">{min}</td>
                  <td className="font-mono text-center font-semibold">{nom}</td>
                  <td className="font-mono text-center">{max}</td>
                </tr>
              ))}
              <tr><td colSpan={4} className="font-semibold bg-muted/30 text-foreground">Sistemas monofásicos de corriente alterna</td></tr>
              {[
                ["4.750", "6.250", "6.900"],
                ["12.000", "15.000", "16.500"],
                ["19.000", "25.000", "27.500"],
              ].map(([min, nom, max], i) => (
                <tr key={`ac-${i}`}>
                  <td></td>
                  <td className="font-mono text-center">{min}</td>
                  <td className="font-mono text-center font-semibold">{nom}</td>
                  <td className="font-mono text-center">{max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 7. Tensiones Nominales CC */}
      <CollapsibleSection title="7. Tensiones Nominales de Corriente Continua" icon={Zap}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Las tensiones nominales de instalaciones de alta tensión y de extra alta tensión en corriente continua, son las mismas de corriente alterna indicadas en el punto 5.2.
        </p>
        <p className="text-foreground/80 leading-relaxed text-sm mt-2">
          No obstante, se podrán utilizar valores de tensión nominal en corriente continua distintos, los cuales deberán ser <strong>debidamente justificados</strong> en los proyectos y previamente presentados a la SEC para su autorización.
        </p>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD01;
