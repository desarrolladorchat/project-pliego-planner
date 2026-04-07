import { useState } from "react";
import { BookOpen, Cable, Shield, Flame, Zap, ChevronDown, ChevronUp } from "lucide-react";

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

const PliegoRPTD04 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Cable className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 04 — Conductores</h2>
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
          Establecer los requisitos que deben cumplir los diferentes tipos de conductores utilizados en las instalaciones de producción, transporte, prestación de servicios complementarios, sistemas de almacenamiento y distribución de energía eléctrica.
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
                ["3.1", "ANSI/NEMA WC 70", "2009", "Power Cables Rated 2000 V or Less"],
                ["3.2", "ANSI/ICEA S-76-474", "2011", "Neutral Supported Power Cable Assemblies 600 V"],
                ["3.3", "ANSI/ICEA S-94-649", "2013", "Concentric Neutral Cables 5–46 kV"],
                ["3.4", "ANSI/NEMA WC 74", "2012", "5–46 kV Shielded Power Cable"],
                ["3.5", "ANSI/ICEA S-108-720", "2012", "Extruded Insulation Power Cables 46–345 kV"],
                ["3.7–3.10", "ASTM B1/B2/B3/B8", "2011–13", "Copper Wire Specifications"],
                ["3.11–3.16", "ASTM B230–B524", "2010–15", "Aluminum Conductors (1350, ACSR, ACAR, 6201)"],
                ["3.17–3.19", "EN 50182/50183/50189", "2000–02", "Overhead Line Conductors (Al-Mg-Si, Zn Steel)"],
                ["3.20–3.30", "IEC 60331/60332", "1999–09", "Fire Condition Tests (circuit integrity, flame propagation)"],
                ["3.31", "IEC 60468", "1974", "Resistivity of Metallic Materials"],
                ["3.32–3.34", "IEC 60502/60840", "2009–14", "Power Cables 1–170 kV"],
                ["3.35–3.38", "IEC 60889/61089/61232/61395", "1987–98", "Overhead Conductors (Al wire, creep test)"],
                ["3.39", "IEC 62067", "2011", "Power Cables 150–500 kV"],
                ["3.40", "IEC 60228", "2004", "Conductors of Insulated Cables"],
                ["3.41–3.44", "IEC 60754/61034", "2005–11", "Halogen, Acidity & Smoke Density Tests"],
                ["3.45", "IRAM 2263", "2005", "Cables preensamblados Al, líneas aéreas ≤ 1 kV"],
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
            { term: "4.1. Cable", def: "Conductor formado por uno o más alambres trenzados, con o sin aislamiento o cubiertas protectoras." },
            { term: "4.2. Cable apantallado o blindado", def: "Conductor recubierto por una malla o tubo metálico que actúa de jaula de Faraday para evitar el acople de ruidos e interferencias." },
            { term: "4.3. Cable subacuático", def: "Conductor aislado instalado bajo agua sobre el lecho marino, destinado al transporte de energía eléctrica." },
            { term: "4.4. Cable subterráneo", def: "Conductor aislado, con una o más cubiertas, instalado bajo el nivel del terreno, en ducto o directamente enterrado." },
            { term: "4.5. Cable retardante de llama", def: "Cable cuya aislación podría quemarse con fuego directo, pero las llamas se extinguen por sí solas tras retirar la fuente de ignición." },
            { term: "4.6. Cable no propagador de incendio", def: "Cable cuya aislación podría quemarse con fuego directo, pero las llamas no se propagan y se extinguen por sí solas." },
            { term: "4.7. Cable resistente al fuego", def: "Cable que mantiene la integridad del circuito durante un periodo suficiente para mantener operativos los sistemas de seguridad para evacuación." },
            { term: "4.8. Capacidad de corriente", def: "Capacidad de un conductor eléctrico de conducir corriente bajo condiciones térmicas establecidas." },
            { term: "4.9. Conductor", def: "Material, usualmente en forma de alambre, cable o barra, capaz de conducir corriente eléctrica." },
            { term: "4.10. Conductor aislado", def: "Conductor cubierto con material dieléctrico diferente al aire, con nivel de aislamiento igual o superior al voltaje nominal." },
            { term: "4.11. Conductor protegido", def: "Conductor con nivel de aislamiento inferior a la tensión del circuito en el cual es utilizado." },
            { term: "4.13. Haz de conductores", def: "Conjunto de dos o más conductores usados como uno solo, con separadores para mantener una configuración predeterminada." },
            { term: "4.20. Uniones o manguitos de unión", def: "Elementos que permiten la continuidad de los conductores para lograr una conexión eléctrica y mecánica segura." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 5. Conductores Desnudos */}
      <CollapsibleSection title="5. Conductores Desnudos" icon={Zap}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>5.1</strong> Deberán ser diseñados, seleccionados y ensayados para cumplir con los requisitos eléctricos y mecánicos de la instalación.</p>
          <p><strong>5.2</strong> Los conductores desnudos para líneas aéreas sobre 1 kV deberán cumplir con: EN 50183, EN 50189, IEC 60889, IEC 61232, IEC 61395, EN 50182, ASTM B1, B2, B8, B231, B399, B524, B232, B398M, IEC 61089, IEC 60468 y ANSI H35.1.</p>
          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <h4 className="eng-subsection-title">Secciones mínimas</h4>
            <div className="overflow-x-auto">
              <table className="eng-table text-xs mt-2">
                <thead>
                  <tr><th>Nivel de tensión</th><th>Sección mínima (mm²)</th><th>Tensión mecánica de ruptura (kg)</th></tr>
                </thead>
                <tbody>
                  <tr><td>Baja Tensión</td><td className="font-mono text-center">6</td><td className="font-mono text-center">200</td></tr>
                  <tr><td>Media, Alta y Extra Alta Tensión</td><td className="font-mono text-center">10</td><td className="font-mono text-center">350</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p><strong>5.4</strong> En líneas aéreas cuya sección sea ≥ 25 mm², deberán utilizarse cables.</p>
          <p><strong>5.5</strong> Se prohíbe colocar más de una unión por vano y conductor. En reparación se permite transitoriamente un máximo de dos uniones.</p>
          <p><strong>5.6</strong> Se prohíbe la ejecución de uniones mediante soldadura en líneas aéreas.</p>
          <p><strong>5.9</strong> En vanos de cruces de líneas &gt; 23 kV con otras instalaciones, no se permiten uniones de ningún tipo.</p>
        </div>
      </CollapsibleSection>

      {/* 6. Conductores Protegidos */}
      <CollapsibleSection title="6. Conductores Protegidos" icon={Shield}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>6.1</strong> Deberán emplearse dentro de los rangos de temperatura ambiente y condiciones indicadas en las normas de fabricación.</p>
          <p><strong>6.2</strong> Cada conductor deberá contar con bloqueo longitudinal y transversal contra la penetración de agua, mediante material químicamente compatible con la cubierta protectora.</p>
          <p><strong>6.3</strong> Deberá estar marcada de forma permanente y legible, a intervalos ≤ 1 m, la leyenda:</p>
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-center">
            <span className="font-bold text-destructive text-xs">⚠️ PELIGRO ALTA TENSIÓN — NO TOCAR — CABLE NO AISLADO</span>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7. Cables Aislados */}
      <CollapsibleSection title="7. Cables Aislados" icon={Cable}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>7.1</strong> Deberán ser adecuados para la ubicación, uso y tensión, con la capacidad de corriente apropiada.</p>
          <p><strong>7.2</strong> Diseño, fabricación, ensayos e instalación según: IEC 60502-1/2, IEC 60228, ANSI/NEMA WC 74, ANSI/ICEA S-94-649, IEC 60840, IEC 62067, entre otras.</p>
          <p><strong>7.3</strong> Cables subterráneos de MT y transporte: conductores de cobre o aluminio, aislados, apantallados, protegidos contra corrosión.</p>

          <div className="bg-muted/30 rounded-lg p-3 border border-border">
            <h4 className="eng-subsection-title">7.6 Métodos de puesta a tierra de la pantalla metálica</h4>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              <li>a) Puesta a tierra directa en todos los extremos</li>
              <li>b) Single point (voltaje inducido en extremo libre ≤ 100 V)</li>
              <li>c) Cross-bonded</li>
            </ul>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 border border-border mt-3">
            <h4 className="eng-subsection-title">7.7 Identificación obligatoria en cubierta</h4>
            <div className="overflow-x-auto">
              <table className="eng-table text-xs mt-2">
                <thead><tr><th>Dato</th><th>Detalle</th></tr></thead>
                <tbody>
                  {[
                    ["a)", "Calibre del conductor (MCM, AWG o mm²)"],
                    ["b)", "Material del conductor"],
                    ["c)", "Fabricante"],
                    ["d)", "Tensión nominal"],
                    ["e)", "Tipo de aislamiento"],
                    ["f)", "Temperatura máxima de operación"],
                    ["g)", "Año de fabricación"],
                  ].map(([letra, dato], i) => (
                    <tr key={i}><td className="font-mono">{letra}</td><td>{dato}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p><strong>7.10</strong> Se deberá respetar el radio mínimo de curvatura, tensión máxima de tiro y máxima presión lateral recomendados por el fabricante.</p>
          <p><strong>7.11</strong> En recintos cerrados o con materiales inflamables, los cables deberán ser: no propagadores de incendio, resistentes al fuego, baja emisión de humos, libres de halógenos y baja toxicidad.</p>
        </div>
      </CollapsibleSection>

      {/* Cables contra incendio */}
      <CollapsibleSection title="7.12 – 7.15 Requisitos contra Incendio" icon={Flame}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr><th>Tipo</th><th>Normas aplicables</th><th>Requisitos</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Retardante de llama</td>
                  <td className="font-mono">IEC 60332-1-1/1-2/1-3</td>
                  <td>Llamas se extinguen tras retirar ignición</td>
                </tr>
                <tr>
                  <td className="font-semibold">No propagador de incendio (TIPO TC)</td>
                  <td className="font-mono">IEC 60332-3-24</td>
                  <td>Prueba de llama en escalerilla vertical</td>
                </tr>
                <tr>
                  <td className="font-semibold">Resistente al fuego</td>
                  <td className="font-mono">IEC 60331-1/2/3/11/21/23/25</td>
                  <td>Mantiene integridad de circuito + no propagador + baja emisión + libre halógenos</td>
                </tr>
                <tr>
                  <td className="font-semibold">Libre de halógenos</td>
                  <td className="font-mono">IEC 60502-1 (ST8), IEC 60754, IEC 61034</td>
                  <td>Gas ácido, emisión de humos y toxicidad controlados</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD04;
