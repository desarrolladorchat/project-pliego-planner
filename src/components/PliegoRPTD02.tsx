import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, Zap, Factory, Building2, Cable, Network, ChevronDown, ChevronUp } from "lucide-react";

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

const PliegoRPTD02 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Network className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 02 — Clasificación de Instalaciones</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Producción, Transporte y Distribución</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd02" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer cómo se clasifican los sistemas y las instalaciones destinadas a la producción, transporte, prestación de servicios complementarios, sistemas de almacenamiento y distribución de energía eléctrica.
        </p>
      </CollapsibleSection>

      {/* 3. Terminología */}
      <CollapsibleSection title="3. Terminología y Definiciones" icon={BookOpen}>
        <div className="space-y-3">
          {[
            { term: "3.1. Central productora de energía eléctrica", def: "Conjunto de instalaciones y equipos diseñados para producir energía eléctrica a partir de las diversas fuentes de energías primarias disponibles." },
            { term: "3.2. Línea eléctrica", def: "Conjunto de conductores, materiales aislantes y accesorios utilizados para transferir electricidad entre dos puntos de una red." },
            { term: "3.3. Subestación eléctrica", def: "Conjunto de equipos eléctricos, elementos y obras complementarias, destinadas a la transferencia, rectificación y/o transformación de la energía eléctrica." },
            { term: "3.4. Sistema de Distribución o Red de Distribución", def: "Conjunto de instalaciones de tensión nominal igual o inferior a 23 kV, según lo establecido en la Norma Técnica de Calidad de Servicio para Sistemas de Distribución." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 4. Clasificación según nivel de tensión */}
      <CollapsibleSection title="4. Clasificación de Sistemas según Nivel de Tensión" icon={Zap}>
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead>
              <tr><th>Ítem</th><th>Clasificación</th><th>Rango de Tensión</th></tr>
            </thead>
            <tbody>
              {[
                ["4.1", "Baja Tensión", "Hasta 1 kV"],
                ["4.2", "Media Tensión", "Sobre 1 kV y hasta 23 kV"],
                ["4.3", "Alta Tensión", "Sobre 23 kV y hasta 230 kV"],
                ["4.4", "Extra Alta Tensión", "Sobre 230 kV"],
              ].map(([item, clasif, rango], i) => (
                <tr key={i}>
                  <td className="font-mono">{item}</td>
                  <td className="font-semibold">{clasif}</td>
                  <td>{rango}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 5. Clasificación de centrales */}
      <CollapsibleSection title="5. Clasificación de Centrales Productoras" icon={Factory}>
        <div className="space-y-2">
          {[
            ["5.1", "Central hidráulica", "Energía potencial y/o cinética contenida en una masa de agua."],
            ["5.2", "Central térmica", "Combustión de combustibles fósiles (petróleo, carbón o gas natural)."],
            ["5.3", "Central solar", "Calentamiento de un fluido mediante radiación solar y ciclo termodinámico."],
            ["5.4", "Central eólica", "Energía del viento."],
            ["5.5", "Central mareomotriz", "Variaciones del nivel del agua del mar."],
            ["5.6", "Central de biomasa", "Recursos biológicos, mediante proceso termoquímico o bioquímico."],
            ["5.7", "Central geotérmica", "Calor interno de la tierra."],
            ["5.8", "Central fotovoltaica", "Energía solar mediante efecto fotovoltaico."],
            ["5.9", "Central nuclear", "Reacciones con combustible nuclear."],
            ["5.10", "Central undimotriz", "Energía mecánica generada por el movimiento de las olas."],
          ].map(([item, tipo, desc], i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">
                <span className="font-mono text-muted-foreground mr-2">{item}</span>{tipo}
              </p>
              <p className="text-foreground/70 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 6-8. Clasificación de subestaciones */}
      <CollapsibleSection title="6 – 8. Clasificación de Subestaciones" icon={Building2}>
        {/* 6 */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">6. Según nivel de tensión</h4>
          <div className="space-y-2">
            {[
              ["6.1", "Subestación o transformador de distribución", "La mayor tensión nominal de uno de los lados del transformador es mayor a 1 kV e igual o inferior a 23 kV."],
              ["6.2", "Subestación primaria de distribución", "Transforma energía eléctrica desde el nivel de tensión de transmisión al de alta o baja tensión de distribución."],
            ].map(([item, tipo, desc], i) => (
              <div key={i} className="eng-definition">
                <p className="font-semibold text-sm text-foreground">
                  <span className="font-mono text-muted-foreground mr-2">{item}</span>{tipo}
                </p>
                <p className="text-foreground/70 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7 */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">7. Subestaciones de distribución según tipo constructivo</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead><tr><th>Ítem</th><th>Tipo</th><th>Descripción</th></tr></thead>
              <tbody>
                {[
                  ["7.1", "En poste", "Instalada a la intemperie, en uno o dos postes."],
                  ["7.2", "Sobre plataforma", "Instalada a la intemperie, a nivel de suelo."],
                  ["7.3", "Interior", "Instalada en el interior de una edificación."],
                  ["7.4", "Subterránea", "Instalada bajo el nivel del suelo."],
                ].map(([item, tipo, desc], i) => (
                  <tr key={i}>
                    <td className="font-mono">{item}</td>
                    <td className="font-semibold">{tipo}</td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 8 */}
        <div>
          <h4 className="eng-subsection-title">8. Subestaciones de transmisión según tipo constructivo</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead><tr><th>Ítem</th><th>Tipo</th><th>Descripción</th></tr></thead>
              <tbody>
                {[
                  ["8.1", "Tipo intemperie", "Emplazada en terreno abierto."],
                  ["8.2", "Interior", "Instalada en el interior de una edificación."],
                  ["8.3", "Subterránea", "Instalada bajo el nivel del suelo."],
                  ["8.4", "Mixta", "Incorpora componentes interiores y a la intemperie."],
                ].map(([item, tipo, desc], i) => (
                  <tr key={i}>
                    <td className="font-mono">{item}</td>
                    <td className="font-semibold">{tipo}</td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 9-10. Clasificación de líneas */}
      <CollapsibleSection title="9 – 10. Clasificación de Líneas Eléctricas" icon={Cable}>
        <div className="mb-6">
          <h4 className="eng-subsection-title">9. Según tensión nominal de operación</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead><tr><th>Ítem</th><th>Clasificación</th><th>Tensión Nominal entre Fases</th></tr></thead>
              <tbody>
                {[
                  ["9.1", "Baja Tensión", "≤ 1 kV"],
                  ["9.2", "Media Tensión", "> 1 kV y ≤ 23 kV"],
                  ["9.3", "Alta Tensión", "> 23 kV y ≤ 230 kV"],
                  ["9.4", "Extra Alta Tensión", "> 230 kV"],
                ].map(([item, clasif, rango], i) => (
                  <tr key={i}>
                    <td className="font-mono">{item}</td>
                    <td className="font-semibold">{clasif}</td>
                    <td>{rango}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="eng-subsection-title">10. Según tipo de instalación</h4>
          <div className="space-y-2">
            {[
              ["10.1", "Líneas eléctricas aéreas"],
              ["10.2", "Líneas eléctricas subterráneas"],
              ["10.3", "Líneas eléctricas subacuáticas"],
            ].map(([item, tipo], i) => (
              <div key={i} className="eng-definition">
                <p className="text-sm text-foreground">
                  <span className="font-mono text-muted-foreground mr-2">{item}</span>
                  <span className="font-semibold">{tipo}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 11-12. Clasificación de redes de distribución */}
      <CollapsibleSection title="11 – 12. Clasificación de Redes de Distribución" icon={Network}>
        <div className="mb-6">
          <h4 className="eng-subsection-title">11. Según nivel de tensión</h4>
          <div className="space-y-2">
            {[
              ["11.1", "Distribución de Baja Tensión", "Tensión nominal de 380 V entre fases y de 220 V fase a tierra."],
              ["11.2", "Distribución de Media Tensión", "Tensión nominal entre fases mayor a 1 kV y menor o igual a 23 kV."],
            ].map(([item, tipo, desc], i) => (
              <div key={i} className="eng-definition">
                <p className="font-semibold text-sm text-foreground">
                  <span className="font-mono text-muted-foreground mr-2">{item}</span>{tipo}
                </p>
                <p className="text-foreground/70 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eng-subsection-title">12. Según tipo de construcción</h4>
          <div className="space-y-2">
            {[
              ["12.1", "Distribución aérea", "Líneas de Media Tensión y de Baja Tensión construidas en forma aérea."],
              ["12.2", "Distribución subterránea", "Líneas de Media Tensión y de Baja Tensión construidas en forma subterránea."],
            ].map(([item, tipo, desc], i) => (
              <div key={i} className="eng-definition">
                <p className="font-semibold text-sm text-foreground">
                  <span className="font-mono text-muted-foreground mr-2">{item}</span>{tipo}
                </p>
                <p className="text-foreground/70 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD02;
