import { useState } from "react";
import { BookOpen, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

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

const PliegoRPTD09 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 09 — Señalización de Seguridad de Instalaciones</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Zonas de Trabajos Eléctricos</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Definir las exigencias de las señales de seguridad, en forma clara, precisa y de fácil entendimiento, con la finalidad de mantener la seguridad y evitar riesgos eléctricos u otros peligros.
        </p>
        <h4 className="eng-subsection-title mt-4">2. Alcance</h4>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Aplica a las zonas en las que se ejecutan trabajos eléctricos o en zonas de operación de máquinas, equipos o instalaciones eléctricas.
        </p>
      </CollapsibleSection>

      {/* 3. Referencias normativas */}
      <CollapsibleSection title="3. Referencias Normativas" icon={BookOpen}>
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead><tr><th>Ítem</th><th>Norma</th><th>Año</th><th>Descripción</th></tr></thead>
            <tbody>
              {[
                ["3.1", "ISO 3864-1", "2011", "Safety colours and signs – Design principles"],
                ["3.2", "ISO 3864-2", "2016", "Design principles for product safety labels"],
                ["3.3", "ISO 3864-3", "2012", "Design principles for graphical symbols"],
                ["3.4", "ISO 3864-4", "2011", "Colorimetric and photometric properties"],
                ["3.5", "NCh 1411/1", "Of. 78", "Prevención de Riesgos – Letreros de Seguridad"],
                ["3.6", "NCh 1411/2", "Of. 78", "Prevención de Riesgos – Señales de Seguridad"],
                ["3.7", "NCh 1411/3", "Of. 78", "Prevención de Riesgos – Tarjetas de Seguridad"],
                ["3.8", "NCh 1411/4", "Of. 78", "Prevención de Riesgos – Identificación de Riesgos de Materiales"],
                ["3.9", "NCh 1410", "Of. 78", "Prevención de Riesgos – Colores de Seguridad"],
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
            { term: "4.1. Circuito", def: "Camino cerrado por donde fluye la corriente eléctrica, desde el polo negativo hasta el polo positivo de una fuente de alimentación." },
            { term: "4.2. Equipo", def: "Término genérico que incluye accesorios, dispositivos, artefactos, aparatos y similares, utilizados como parte de o en conexión con un suministro eléctrico." },
            { term: "4.3. Estructura", def: "Todo aquello que puede ser construido o edificado. Puede ser fija o móvil, estar en el aire, sobre o bajo la tierra o en el agua." },
            { term: "4.4. Señales de seguridad", def: "Indicaciones, letreros o rótulos que contienen mensajes de prevención, prohibición o información, para evitar riesgo eléctrico u otros peligros." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 5. Especificaciones */}
      <CollapsibleSection title="5. Especificaciones" icon={AlertTriangle}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>5.1</strong> Las señales se clasifican en <strong>informativas</strong>, <strong>de advertencia</strong> y <strong>de obligación o prohibición</strong>, aplicando formas geométricas y colores según NCh 1411/1-4, NCh 1410 o ISO 3864-1/2/3/4, con pictogramas en su interior.</p>
          <p><strong>5.2</strong> Escritura en idioma español, localizadas en sitios visibles.</p>
          <p><strong>5.3</strong> Todas las puertas que den acceso a recintos con aparatos de <strong>alta tensión</strong> estarán provistas de rótulos indicando la existencia de instalaciones de alta tensión.</p>
          <p><strong>5.4</strong> Muros, cercos y/o rejas de recintos con instalaciones de EAT, AT, MT y BT estarán provistos de letreros con indicación informativa de advertencia y prohibición de ingreso a personas ajenas.</p>
          <p><strong>5.5</strong> Todas las máquinas, aparatos principales, celdas, paneles de control y circuitos deberán estar diferenciados entre sí con marcas claramente establecidas y rótulos de fácil lectura.</p>
          <p><strong>5.6</strong> Las señales se emplearán en condiciones que permitan su visualización.</p>

          <div className="bg-muted/30 rounded-lg p-3 border border-border mt-3">
            <h4 className="eng-subsection-title">5.7 Coordinación aeronáutica</h4>
            <p className="text-sm mt-1">Las empresas que proyecten líneas eléctricas aéreas deberán coordinarse con la <strong>Dirección General de Aeronáutica Civil (DGAC)</strong> para determinar si las instalaciones constituyen peligro para la navegación aérea y si requieren señalización, balizamiento o iluminación, según Decreto Supremo N° 173/2004 del Ministerio de Defensa Nacional.</p>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD09;
