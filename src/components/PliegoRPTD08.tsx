import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, Flame, Building2, Zap, Cable, Shield, ChevronDown, ChevronUp } from "lucide-react";

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

const PliegoRPTD08 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Flame className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 08 — Protección contra Incendios</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Centrales, Subestaciones y Edificaciones</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd08" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer medidas de seguridad para la protección contra incendios.
        </p>
        <h4 className="eng-subsection-title mt-4">2. Alcance</h4>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Aplica al diseño y construcción de centrales, subestaciones de transmisión y edificaciones que contienen instalaciones eléctricas reguladas en el reglamento de seguridad.
        </p>
      </CollapsibleSection>

      {/* 3. Referencias normativas */}
      <CollapsibleSection title="3. Referencias Normativas" icon={BookOpen}>
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead><tr><th>Ítem</th><th>Norma</th><th>Año</th><th>Descripción</th></tr></thead>
            <tbody>
              {[
                ["3.1", "NFPA 10", "2013", "Portable Fire Extinguishers"],
                ["3.2", "NFPA 12", "2011", "Carbon Dioxide Extinguishing Systems"],
                ["3.3", "NFPA 25", "2014", "Inspection, Testing & Maintenance – Water-Based Systems"],
                ["3.4", "NFPA 72", "2013", "National Fire Alarm and Signaling Code"],
                ["3.5", "NFPA 2001", "2012", "Clean Agent Fire Extinguishing Systems"],
                ["3.6", "NFPA 850", "2015", "Fire Protection for Electric Generating Plants & HVDC"],
                ["3.7", "NFPA 92", "2018", "Standard for Smoke Control Systems"],
                ["3.8", "NFPA 101", "2018", "Life Safety Code"],
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
            { term: "4.1. Automático", def: "Que opera por sí mismo o por su propio mecanismo. El control remoto que requiera intervención de personas no se considera automático, sino manual." },
            { term: "4.3. Estructura", def: "Todo aquello que puede ser construido o edificado. Puede ser fija o móvil, estar en el aire, sobre o bajo la tierra o en el agua." },
            { term: "4.4. HVDC", def: "Corriente continua de alta tensión (high-voltage direct current)." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 5. Transformadores de poder */}
      <CollapsibleSection title="5. Medidas de Seguridad — Transformadores de Poder" icon={Zap}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>5.1</strong> Transformadores &gt; 10 MVA: distancia mínima de <strong>6 m</strong> a edificaciones y <strong>9 m</strong> a otro transformador del mismo tipo.</p>
          <p><strong>5.2</strong> Si no se cumple 5.1: muro cortafuego con resistencia al fuego de al menos <strong>2 horas (F120)</strong>, validado por estudio de carga combustible (NCh1916).</p>
          <p><strong>5.3</strong> Altura del muro: al menos <strong>0,30 m</strong> por encima del depósito de aceite lleno y conservador. Extensión horizontal: ≥ <strong>0,6 m</strong> más allá de la línea de visión entre transformadores adyacentes.</p>

          <div className="mt-4">
            <h4 className="eng-subsection-title">5.4 Tabla N° 1 — Distancias para transformadores &lt; 7.600 L aceite</h4>
            <div className="overflow-x-auto">
              <table className="eng-table text-xs">
                <thead><tr><th>Capacidad nominal</th><th>Distancia a edificación (m)</th></tr></thead>
                <tbody>
                  <tr><td>75 kVA o menos</td><td className="font-mono text-center">3,0</td></tr>
                  <tr><td>76 – 333 kVA</td><td className="font-mono text-center">6,0</td></tr>
                  <tr><td>Más de 333 kVA</td><td className="font-mono text-center">9,0</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-3"><strong>5.5</strong> En recintos cerrados: transformadores tipo seco. Alternativa: barreras de incendio <strong>F180</strong> (3 hrs). Con supresión automática: reducible a <strong>F60</strong> (1 hr).</p>
        </div>
      </CollapsibleSection>

      {/* 6. Casas de control y edificaciones */}
      <CollapsibleSection title="6. Casas de Control y Edificaciones" icon={Building2}>
        {/* 6.1 Construcción */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">6.1 Construcción</h4>
          <div className="space-y-2 text-foreground/80 text-sm">
            <p>• <strong>a.</strong> Construir con elementos resistentes al fuego (Ordenanza General de Urbanismo).</p>
            <p>• <strong>b.</strong> Ubicación tal que el incendio de mayor intensidad no afecte la operación. Accesos y puertas para evacuación expedita (NCh 2114).</p>
            <p>• <strong>c.</strong> Paredes, puertas, pisos y techos con resistencia al fuego acorde al mayor incendio posible. Puertas con barras antipánico y cierra puerta automática.</p>
            <p>• <strong>d.</strong> Estructuras de varios pisos: sellar todas las aberturas sin reducir resistencia al fuego.</p>
            <p>• <strong>e.</strong> Conductos sellados en techo, piso y paredes (metálicos o retardantes).</p>
            <p>• <strong>f.</strong> Sistemas de control de humo en salas de control, distribución de cables y equipos sensibles (NFPA 850/92).</p>
            <p>• <strong>g.</strong> Previsiones de drenaje de líquidos a áreas seguras (NFPA 850).</p>
            <p>• <strong>h.</strong> Iluminación de emergencia para medios de salida.</p>
            <p>• <strong>i.</strong> Procedimientos de parada de emergencia según NFPA 101.</p>
            <p>• <strong>j.</strong> No usar materiales celulares o espuma plástica como acabado interior.</p>
          </div>
        </div>

        {/* 6.2 Cables */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">6.2 Cables eléctricos y canalizaciones</h4>
          <div className="space-y-2 text-foreground/80 text-sm">
            <p>• <strong>a.</strong> Cables al menos del tipo <strong>no propagador de incendio</strong>.</p>
            <p>• <strong>b.</strong> Tapas de canaletas de metal o material retardante del fuego.</p>
            <p>• <strong>c.</strong> Instalar cortafuegos en bandejas cubiertas, bajo pisos elevados o en canaletas.</p>
            <p>• <strong>d.</strong> Cables agrupados lejos de fuentes de ignición y líquidos inflamables.</p>
            <p>• <strong>e.</strong> Bandejas sujetas a polvo de carbón o vertimiento de aceite: cubierta metálica obligatoria.</p>
          </div>
        </div>

        {/* 6.3 Extintores */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">6.3 Extintores</h4>
          <div className="space-y-2 text-foreground/80 text-sm">
            <p>• <strong>a.</strong> Cantidad y tipo según normas nacionales o <strong>NFPA 10</strong>.</p>
            <p>• <strong>b.</strong> Ubicados adyacentes a puertas de entrada y salida, revisados periódicamente.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 6.4-6.7 Detección, Supresión, Señalización, Control de Humos */}
      <CollapsibleSection title="6.4 – 6.7 Detección, Supresión y Señalización" icon={Shield}>
        <div className="mb-4">
          <h4 className="eng-subsection-title">6.4 Detección de incendios</h4>
          <p className="text-foreground/80 text-sm">Sistemas de detección automática según <strong>NFPA 72</strong> en: salas de control, salas de cables, salas de equipos eléctricos sensibles y áreas con líquidos inflamables.</p>
        </div>

        <div className="mb-4">
          <h4 className="eng-subsection-title">6.5 Sistemas de supresión de incendios</h4>
          <p className="text-foreground/80 text-sm">Según <strong>NFPA 12</strong>, <strong>NFPA 25</strong> y/o <strong>NFPA 2001</strong>. Sistemas de rociadores, CO₂ o agentes limpios según el área protegida. Mantenimiento periódico obligatorio.</p>
        </div>

        <div className="mb-4">
          <h4 className="eng-subsection-title">6.6 Señalización y Plan de emergencia</h4>
          <p className="text-foreground/80 text-sm">Lista visible de números de emergencia (Bomberos, SAMU, Carabineros), precedida del nombre, dirección y teléfono de la instalación.</p>
        </div>

        <div>
          <h4 className="eng-subsection-title">6.7 Control de Humos</h4>
          <p className="text-foreground/80 text-sm">Sistemas de manejo de humo en: salas de control, salas de distribución de cables, equipos electrónicos sensibles. Según <strong>NFPA 92</strong> y <strong>NFPA 850</strong>.</p>
        </div>
      </CollapsibleSection>

      {/* 7. HVDC */}
      <CollapsibleSection title="7. Estaciones Convertidoras HVDC" icon={Zap}>
        <p className="text-foreground/80 text-sm mb-3">
          Las estaciones convertidoras deberán estar equipadas con un sistema de protección contra incendios con al menos los siguientes componentes:
        </p>
        <div className="space-y-2 text-foreground/80 text-sm">
          <p><strong>7.1</strong> Muros cortafuegos para transformadores (según punto 5.2), con materiales no propagantes a la llama.</p>
          <p><strong>7.2</strong> Sistema de detección en salas de válvulas, salas de control, transformadores y reactores aislados en aceite, con indicación de áreas afectadas.</p>
          <p><strong>7.3</strong> Sistema de combate a incendio: rociadores en transformadores y reactores, sistema inerte en edificio de control, mangueras y extintores portátiles.</p>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD08;
