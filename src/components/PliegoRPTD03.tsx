import { useState } from "react";
import { BookOpen, FileText, Shield, Settings, ChevronDown, ChevronUp } from "lucide-react";

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

const PliegoRPTD03 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 03 — Proyectos y Estudios</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Distribución</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer los requisitos que deben cumplir los proyectos y estudios de las instalaciones de distribución.
        </p>
        <h4 className="eng-subsection-title mt-4">2. Alcance</h4>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Este pliego técnico aplica a las instalaciones eléctricas de distribución de energía eléctrica, así como otras instalaciones eléctricas que se conecten a dichas instalaciones.
        </p>
      </CollapsibleSection>

      {/* 3. Referencias normativas */}
      <CollapsibleSection title="3. Referencias Normativas" icon={BookOpen}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Todo proyecto y/o estudio se elaborará en conformidad con la normativa vigente o instrucciones de carácter general que emita la SEC.
        </p>
        <p className="text-foreground/80 leading-relaxed text-sm mt-2">
          En ausencia de estas deberán utilizarse las normas y recomendaciones internacionales reconocidas tales como <strong>IEC</strong>, y en su defecto, <strong>CIGRE</strong>, <strong>NFPA</strong> y <strong>ANSI/IEEE</strong>, los que se denominan "Criterios de Diseño".
        </p>
      </CollapsibleSection>

      {/* 4. Terminología */}
      <CollapsibleSection title="4. Terminología y Definiciones" icon={BookOpen}>
        <div className="space-y-3">
          {[
            { term: "4.1. Coordinador", def: "Coordinador independiente del sistema eléctrico nacional al que se refiere el Título VI bis de la Ley." },
            { term: "4.2. Circuito", def: "Camino cerrado por donde fluye la corriente eléctrica producto de una fuente de alimentación (pila, batería, generador, etc.)." },
            { term: "4.3. Equipo", def: "Término genérico que incluye accesorios, dispositivos, artefactos, aparatos y similares, utilizados como parte de o en conexión con un suministro eléctrico." },
            { term: "4.4. Puesta a tierra", def: "Toma o conexión que permite el establecimiento de un circuito de retorno a tierra y el mantenimiento de su potencial de tierra." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 5. Criterios de Diseño */}
      <CollapsibleSection title="5. Criterios de Diseño" icon={Settings}>
        <p className="text-foreground/80 leading-relaxed text-sm mb-4">
          Para efectos de diseño de las instalaciones eléctricas de distribución deberá cumplir los estándares de calidad, continuidad y seguridad existentes en el sistema. Todo proyecto tendrá un documento inicial denominado <strong>"Criterios de Diseño"</strong>, que informará los siguientes parámetros y criterios técnicos mínimos:
        </p>
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead>
              <tr><th>Ítem</th><th>Criterio</th></tr>
            </thead>
            <tbody>
              {[
                ["5.2.1", "Dimensionamiento de equipos principales (capacidad, cortocircuito, redundancia)"],
                ["5.2.2", "Factor de potencia"],
                ["5.2.3", "Criterios de regulación de tensión"],
                ["5.2.4", "Nivel de armónicos en el punto de conexión"],
                ["5.2.5", "Coordinación de aislamiento eléctrico"],
                ["5.2.6", "Protección contra sobretensiones"],
                ["5.2.7", "Niveles de tensión adoptados"],
                ["5.2.8", "Niveles de campos electromagnéticos"],
                ["5.2.9", "Sistema de puesta a tierra"],
                ["5.2.10", "Criterios de selección de conductores"],
                ["5.2.11", "Selección de protecciones eléctricas y coordinación"],
                ["5.2.12", "Criterios sobre canalizaciones eléctricas"],
                ["5.2.13", "Cálculos de pérdidas de energía (armónicos y factor de potencia)"],
                ["5.2.14", "Criterios sobre distancias de seguridad adoptadas"],
                ["5.2.15", "Otros criterios (condiciones sísmicas, acústicas, mecánicas o térmicas)"],
                ["5.2.16", "Condiciones ambientales"],
                ["5.2.17", "Instalación In Door u Out Door"],
                ["5.2.18", "Datos de georeferenciación y ubicación (coordenadas UTM, región, provincia, comuna)"],
                ["5.2.19", "Cálculo de franja y/o distancias de seguridad"],
              ].map(([item, criterio], i) => (
                <tr key={i}>
                  <td className="font-mono">{item}</td>
                  <td>{criterio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD03;
