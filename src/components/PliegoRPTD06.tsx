import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, Zap, Shield, Settings, ClipboardCheck, ChevronDown, ChevronUp } from "lucide-react";

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

const PliegoRPTD06 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 06 — Puesta a Tierra</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020), modificada por R.E. N° 34.770 (22/07/2021) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Producción, Transporte y Distribución</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd06" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer los requisitos de seguridad que deben cumplir las instalaciones de puesta a tierra.
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
            <thead><tr><th>Ítem</th><th>Norma</th><th>Año</th><th>Descripción</th></tr></thead>
            <tbody>
              {[
                ["3.1", "ASTM F 1136", "2011", "Zinc/Aluminum Corrosion Protective Coatings for Fasteners"],
                ["3.2", "IEC 60364-5-54", "2011", "Low-voltage installations – Earthing arrangements"],
                ["3.3", "IEC 61936-1", "2010", "Power installations exceeding 1 kV a.c. – Common rules"],
                ["3.4", "IEC 62305-3", "2010", "Protection against lightning – Physical damage"],
                ["3.5", "IEC 62305-SER", "2013", "Protection against lightning – ALL PARTS"],
                ["3.6", "IEEE 80", "2013", "Guide for Safety in AC Substation Grounding"],
                ["3.7", "IEEE Std. 81", "2012", "Guide for Measuring Earth Resistivity & Ground Impedance"],
                ["3.8", "IEEE 837", "2002", "Qualifying Permanent Connections in Substation Grounding"],
                ["3.9", "UL 467", "2013", "Grounding and Bonding Equipment"],
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
            { term: "4.2. Aumento de potencial de tierra", def: "Potencial eléctrico que una malla de puesta a tierra puede alcanzar respecto de un punto de conexión a tierra distante (potencial de tierra remota)." },
            { term: "4.3. Cable de guardia", def: "Conductor conectado a tierra, colocado a una altura superior de los conductores energizados, para protegerlos de descargas atmosféricas." },
            { term: "4.4. Malla de puesta a tierra", def: "Sistema de electrodos interconectados, compuesto de conductores desnudos enterrados, que proporciona una base de potencial común minimizando tensiones de paso o contacto." },
            { term: "4.7. Puesta a tierra", def: "Toma o conexión que permite el establecimiento de un circuito de retorno a tierra y el mantenimiento de su potencial de tierra." },
            { term: "4.10. Tensión de contacto", def: "Diferencia de potencial entre el aumento de potencial de tierra y el potencial de superficie donde una persona está de pie mientras toca una estructura conectada a tierra." },
            { term: "4.12. Tensión de paso", def: "Diferencia de potencial que experimenta una persona con separación de 1 metro entre sus pies, sin tocar ningún objeto conectado a tierra." },
            { term: "4.14. Tierra de protección", def: "Destinada a evitar tensiones peligrosas entre partes sin tensión y otras partes vecinas al potencial local de tierra." },
            { term: "4.15. Tierra de servicio", def: "Destinada a conectar en forma permanente a tierra ciertos puntos del circuito eléctrico." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 5. Tensiones tolerables */}
      <CollapsibleSection title="5. Tensión de Paso y Contacto Tolerables" icon={Zap}>
        <p className="text-foreground/80 text-sm mb-4">
          La seguridad de una persona depende de que la cantidad crítica de energía no sea absorbida antes de que la falla sea despejada y el sistema se desenergice.
        </p>

        {/* Tensión de paso */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.1 Tensión de Paso Tolerable</h4>
          <div className="eng-formula my-3">
            V<sub>paso</sub> = (R<sub>c</sub> + 2·R<sub>f</sub>) · I<sub>c</sub>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="bg-muted/30 rounded-lg p-3 border border-border">
              <p className="text-xs font-semibold text-foreground mb-1">Cuerpo de 50 kg:</p>
              <div className="eng-formula text-xs">
                V<sub>paso50</sub> = (1000 + 6·C<sub>s</sub>·ρ<sub>s</sub>) · 0,116 / √t<sub>s</sub>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 border border-border">
              <p className="text-xs font-semibold text-foreground mb-1">Cuerpo de 70 kg:</p>
              <div className="eng-formula text-xs">
                V<sub>paso70</sub> = (1000 + 6·C<sub>s</sub>·ρ<sub>s</sub>) · 0,157 / √t<sub>s</sub>
              </div>
            </div>
          </div>
        </div>

        {/* Tensión de contacto */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.2 Tensión de Contacto Tolerable</h4>
          <div className="eng-formula my-3">
            V<sub>contacto</sub> = (R<sub>c</sub> + R<sub>f</sub>/2) · I<sub>c</sub>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="bg-muted/30 rounded-lg p-3 border border-border">
              <p className="text-xs font-semibold text-foreground mb-1">Cuerpo de 50 kg:</p>
              <div className="eng-formula text-xs">
                V<sub>contacto50</sub> = (1000 + 1,5·C<sub>s</sub>·ρ<sub>s</sub>) · 0,116 / √t<sub>s</sub>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 border border-border">
              <p className="text-xs font-semibold text-foreground mb-1">Cuerpo de 70 kg:</p>
              <div className="eng-formula text-xs">
                V<sub>contacto70</sub> = (1000 + 1,5·C<sub>s</sub>·ρ<sub>s</sub>) · 0,157 / √t<sub>s</sub>
              </div>
            </div>
          </div>
        </div>

        {/* Factor Cs */}
        <div className="mb-4">
          <h4 className="eng-subsection-title">Factor C<sub>s</sub></h4>
          <div className="eng-formula my-3">
            C<sub>s</sub> = 1 − 0,09·(1 − ρ/ρ<sub>s</sub>) / (2·h<sub>s</sub> + 0,09)
          </div>
        </div>

        {/* Variables */}
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead><tr><th>Variable</th><th>Definición</th></tr></thead>
            <tbody>
              {[
                ["R_c", "Resistencia del cuerpo (Ω)"],
                ["R_f", "Resistencia a tierra de un pie (Ω)"],
                ["I_c", "Corriente RMS a través del cuerpo (A)"],
                ["C_s", "Factor de corrección por capa superficial"],
                ["ρ_s", "Resistividad de la superficie del terreno (Ω·m)"],
                ["ρ", "Resistividad de la tierra bajo la superficie (Ω·m)"],
                ["t_s", "Duración de la corriente de falla a tierra (s)"],
                ["h_s", "Espesor del material de superficie (m)"],
              ].map(([v, def], i) => (
                <tr key={i}>
                  <td className="font-mono font-semibold">{v}</td>
                  <td>{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-foreground/60 text-xs italic mt-2">
          Si no se utiliza capa protectora de superficie: C<sub>s</sub> = 1 y ρ<sub>s</sub> = ρ.
        </p>
      </CollapsibleSection>

      {/* 6. Consideraciones de diseño */}
      <CollapsibleSection title="6. Principales Consideraciones de Diseño" icon={Settings}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>6.1</strong> El sistema de puesta a tierra deberá limitar gradientes de potencial a niveles que no pongan en peligro la seguridad de personas o equipos, garantizando continuidad de servicio.</p>
          <p><strong>6.2</strong> Los conductores se colocarán en líneas paralelas formando una malla de puesta a tierra.</p>
          <p><strong>6.3</strong> La malla deberá cubrir al menos el área de patios, bahías, equipos y salas de comando.</p>
          <p><strong>6.4</strong> Se utilizarán cables de tierra múltiples o conductor continuo para interconectar equipos.</p>
        </div>
      </CollapsibleSection>

      {/* 7. Medidas de seguridad */}
      <CollapsibleSection title="7. Medidas de Seguridad" icon={Shield}>
        <p className="text-foreground/80 text-sm mb-3">
          En zonas donde las tensiones de paso o contacto puedan superar los valores tolerables, se adoptarán medidas adicionales:
        </p>
        <div className="space-y-2 text-foreground/80 text-sm">
          <p>• <strong>a.</strong> Hacer inaccesibles las zonas peligrosas.</p>
          <p>• <strong>b.</strong> Disponer suelos o pavimentos aislantes en zonas de servicio peligrosas.</p>
          <p>• <strong>c.</strong> Aislar empuñaduras o mandos que deban ser tocados.</p>
          <p>• <strong>d.</strong> Establecer conexiones equipotenciales entre la zona de servicio y elementos conductores accesibles.</p>
          <p>• <strong>e.</strong> Aislar los conductores de tierra a su entrada en el terreno.</p>
        </div>
      </CollapsibleSection>

      {/* 8. Exigencias */}
      <CollapsibleSection title="8. Exigencias para el Sistema de Puesta a Tierra" icon={ClipboardCheck}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>8.1</strong> Conectar al sistema todas las partes metálicas sin tensión (carcasas, chasis, estructuras).</p>
          <p><strong>8.2</strong> Conectar dispositivos de puesta a tierra de líneas aéreas y cable de guardia.</p>
          <p><strong>8.3</strong> Conectar limitadores, descargadores, autoválvulas, mástiles y pararrayos (<strong>IEC 62305-SER</strong>).</p>
          <p><strong>8.12</strong> Conductores a tierra dimensionados para la mayor corriente de cortocircuito a tierra previsible.</p>
          <p><strong>8.13</strong> No intercalar dispositivos de desconexión ni fusibles en circuitos de tierra de protección.</p>
          <p><strong>8.14</strong> Sección mínima del conductor: <strong>25 mm²</strong> (cuando sea de cobre).</p>
          <p><strong>8.15</strong> Conductores desnudos y electrodos principalmente de cobre. Se prohíbe aluminio desnudo en contacto directo con el suelo.</p>

          <div className="bg-muted/30 rounded-lg p-3 border border-border mt-3">
            <h4 className="eng-subsection-title">8.17 Conexiones bajo nivel de suelo</h4>
            <p className="text-sm mt-1">Mediante <strong>soldadura exotérmica</strong> o conector apropiado para enterramiento, conforme a <strong>IEEE 837</strong>.</p>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 border border-border mt-3">
            <h4 className="eng-subsection-title">8.18 Electrodos de puesta a tierra</h4>
            <p className="text-sm mt-1">Picas, varillas, conductores, chapas o perfiles con resistencia a la corrosión. Según <strong>IEC 62305-3</strong>, <strong>IEC 60364-5-54</strong>, <strong>UL 467</strong> o <strong>ASTM F 1136</strong>.</p>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 border border-border mt-3">
            <h4 className="eng-subsection-title">8.20 – 8.23 Verificación e inspección</h4>
            <p className="text-sm mt-1">Cajas de inspección mínimo <strong>30×30 cm</strong> (o Ø 30 cm). Verificación según <strong>IEEE Std. 81</strong> o <strong>IEC 61936-1</strong>. Se debe documentar: condiciones de conductores, corrosión, uniones, valores de resistencia y cambios.</p>
          </div>

          <p><strong>8.25</strong> Cálculos según <strong>IEEE Std 80-2013</strong> "Guide for Safety in AC Substation Grounding".</p>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD06;
