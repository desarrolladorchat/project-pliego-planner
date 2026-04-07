import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, Zap, Building2, Shield, Settings, Battery, ChevronDown, ChevronUp } from "lucide-react";

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

const PliegoRPTD10 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 10 — Centrales de Producción y Subestaciones</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Producción y Transmisión</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd10" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen}>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer los requisitos de seguridad para las centrales de producción y subestaciones de transporte.
        </p>
        <h4 className="eng-subsection-title mt-4">2. Alcance</h4>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Aplica a las instalaciones de producción y transformación de energía eléctrica.
        </p>
      </CollapsibleSection>

      {/* 3. Referencias normativas */}
      <CollapsibleSection title="3. Referencias Normativas" icon={BookOpen}>
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead><tr><th>Ítem</th><th>Norma</th><th>Año</th><th>Descripción</th></tr></thead>
            <tbody>
              {[
                ["3.1–3.2", "ANSI C37.55 / C37.60", "2002–12", "Medium & High-Voltage Switchgear"],
                ["3.3–3.4", "IEC 62001 / 62344", "2009–13", "HVDC Systems – Filters & Earth Electrode"],
                ["3.5", "IEC 60071-SER", "2011", "Insulation co-ordination – ALL PARTS"],
                ["3.6", "IEC 60076-SER", "2013", "Power transformers – ALL PARTS"],
                ["3.7–3.8", "IEC 60099-4/5", "2009–13", "Surge arresters (metal-oxide, selection)"],
                ["3.11", "IEC 60529", "2013", "Degrees of protection (IP Code)"],
                ["3.14–3.15", "IEC 61378-2/3", "2001–06", "Converter transformers (HVDC)"],
                ["3.18–3.22", "IEC 61869-1 a 5", "2007–13", "Instrument transformers (CT, VT, CVT)"],
                ["3.23", "IEC 61936-1", "2010", "Power installations exceeding 1 kV a.c."],
                ["3.25–3.30", "IEC 62271-SER", "2011–18", "HV switchgear & controlgear – ALL PARTS"],
                ["3.31", "IEC 62305-SER", "2013", "Protection against lightning – ALL PARTS"],
                ["3.34", "IEEE 18", "2012", "Shunt Power Capacitors"],
                ["3.35–3.36", "IEEE 141/142", "1993–07", "Power Distribution & Grounding (Industrial)"],
                ["3.37", "IEEE C57.12.00", "2010", "Liquid-Immersed Transformers"],
                ["3.41–3.43", "NCh 2369/2745/433", "2003–13", "Diseño sísmico (estructuras y edificios)"],
                ["3.45", "NCh Elec. 4", "2003", "Instalaciones de consumo en baja tensión"],
                ["3.49", "NTSyCS", "2019", "Norma Técnica de Seguridad y Calidad de Servicio"],
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

      {/* 4. Terminología (selección) */}
      <CollapsibleSection title="4. Terminología y Definiciones" icon={BookOpen}>
        <div className="space-y-3">
          {[
            { term: "4.7. BIL", def: "Nivel básico de aislamiento ante impulsos tipo rayo." },
            { term: "4.13. Conductor", def: "Material, usualmente en forma de alambre, cable o barra, capaz de conducir corriente eléctrica." },
            { term: "4.17. Equipo", def: "Término genérico que incluye accesorios, dispositivos, artefactos, aparatos y similares, utilizados como parte de o en conexión con un suministro eléctrico." },
            { term: "4.23. Instalaciones eléctricas auxiliares", def: "Las requeridas para el consumo propio de las centrales generadoras y subestaciones que forman parte de éstas." },
            { term: "4.24. Malla de puesta a tierra", def: "Sistema de electrodos interconectados, compuesto de conductores desnudos enterrados, que proporciona una base de potencial común." },
            { term: "4.29. Pararrayos", def: "Equipo de protección utilizado para controlar sobrevoltaje transitorio (rayo o maniobra) en equipos e instalaciones eléctricas." },
            { term: "4.31. Régimen de ecualización", def: "Etapa de carga de baterías para igualar el nivel de gas del ácido electrolito en todas las celdas." },
            { term: "4.32. Régimen de flotación", def: "Etapa de carga donde la batería está al 100% y el regulador compensa la autodescarga." },
            { term: "4.33. SF₆", def: "Hexafluoruro de azufre." },
            { term: "4.35. Transformación", def: "Proceso de modificación de parámetros de tensión y corriente mediante transformadores." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 5.1 Generalidades */}
      <CollapsibleSection title="5.1 Generalidades" icon={Settings}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>5.1.1</strong> Instalaciones y equipos capaces de resistir exigencias operacionales y esfuerzos dinámicos (eléctricos, mecánicos, sísmicos, climáticos y ambientales).</p>
          <p><strong>5.1.2</strong> Cercos, rejas, tabiques o muros perimetrales para evitar entrada de personas no autorizadas. Accesos cerrados con llave y avisos visibles de prohibición.</p>
          <p><strong>5.1.3</strong> Si la instalación comprende tensiones diferentes, las partes correspondientes deberán estar agrupadas e identificadas.</p>
          <p><strong>5.1.4</strong> Diseño que permita mantener servicio parcial durante desconexiones por averías o revisiones. Equipos intervenidos desconectados con corte visible (o enclavamiento mecánico en GIS según IEC 62271-1).</p>
          <p><strong>5.1.6</strong> En cada entrada: señal con símbolo de riesgo eléctrico.</p>
          <p><strong>5.1.7</strong> Prohibido almacenamiento de materiales en zona de patios o equipos primarios.</p>
          <div className="bg-muted/30 rounded-lg p-3 border border-border mt-2">
            <h4 className="eng-subsection-title">5.1.9 Límites de campo electromagnético (fuera del deslinde)</h4>
            <div className="overflow-x-auto">
              <table className="eng-table text-xs mt-2">
                <thead><tr><th>Tipo</th><th>Límite máximo</th></tr></thead>
                <tbody>
                  <tr><td>Campo eléctrico</td><td className="font-mono">5 kV/m</td></tr>
                  <tr><td>Campo magnético</td><td className="font-mono">100 μT</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5.2 Centrales de generación */}
      <CollapsibleSection title="5.2 Centrales de Generación" icon={Zap}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p><strong>a.</strong> Edificio independiente de toda construcción no relacionada con el proceso de generación (excepción: cogeneración).</p>
          <p><strong>b.</strong> Prohibido materiales combustibles ajenos al proceso cerca de canalizaciones y equipos energizados.</p>
          <p><strong>c.</strong> Puentes grúa con limitadores de recorrido, señalización de altura y peso máximo, e indicador sonoro.</p>
          <p><strong>d.</strong> Diagrama unilineal en pantallas o paneles en el centro de control.</p>
          <p><strong>e.</strong> Edificaciones en caverna: transformadores tipo seco obligatorios para auxiliares y BT.</p>
          <p><strong>f.</strong> Transformadores ≥ 100 kVA al interior: celdas con muros antiexplosión, extinción automática y renovación de aire.</p>
          <p><strong>k.</strong> Sistema automático de extinción de incendios y plan de emergencias según RPTD N° 08.</p>
          <p><strong>l.</strong> Cumplimiento de exigencias antisísmicas.</p>

          <div className="bg-muted/30 rounded-lg p-3 border border-border mt-2">
            <h4 className="eng-subsection-title">5.2.2 Generadores — Placa característica mínima</h4>
            <div className="grid grid-cols-2 gap-1 text-xs mt-2">
              {["Fabricante", "Tensión nominal", "Corriente nominal", "Potencia nominal (kVA/kW)", "Factor de potencia", "Frecuencia", "Velocidad nominal (RPM)", "Clase de aislamiento", "Tipo de excitación", "Año de fabricación"].map((item, i) => (
                <span key={i} className="text-foreground/70">• {item}</span>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5.3 Subestaciones tipo intemperie */}
      <CollapsibleSection title="5.3 Subestaciones Tipo Intemperie" icon={Building2}>
        <div className="space-y-4 text-foreground/80 text-sm">
          <div>
            <h4 className="eng-subsection-title">5.3.1 Terreno</h4>
            <p>Acondicionamiento del terreno con control de malezas, drenaje y accesos vehiculares adecuados.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.3.2 Cierros</h4>
            <p>Cercos perimetrales de altura mínima según nivel de tensión, con malla o elementos que impidan el acceso no autorizado.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.3.3 Disposición de equipos</h4>
            <p>Equipos dispuestos respetando distancias eléctricas y de seguridad, con pasillos de circulación y acceso para mantenimiento.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.3.4 Casa de Control</h4>
            <p>Edificación resistente al fuego, con diagrama unilineal, sistemas de comunicación y medios de salida adecuados.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5.4-5.6 Subestaciones especiales */}
      <CollapsibleSection title="5.4 – 5.6 Subestaciones Interiores, CC y Equipos Compactos" icon={Building2}>
        <div className="space-y-4 text-foreground/80 text-sm">
          <div>
            <h4 className="eng-subsection-title">5.4 Subestaciones tipo interior</h4>
            <p>Requisitos constructivos de resistencia al fuego, ventilación, iluminación y accesos de emergencia para instalaciones en edificaciones.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.5 Subestaciones de corriente continua (HVDC)</h4>
            <p>Requisitos específicos para estaciones convertidoras, incluyendo conexión de tierra de las estaciones convertidoras según IEC/TS 62344.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.6 Equipos compactos</h4>
            <p><strong>5.6.1</strong> Subestaciones GIS (Gas Insulated Switchgear): aisladas en SF₆, con manejo según IEC 62271-4 y monitoreo de presión de gas.</p>
            <p><strong>5.6.2</strong> Celdas de Media y Alta Tensión: cumplimiento con IEC 62271-200 (≤ 52 kV) o IEC 62271-203 (&gt; 52 kV).</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5.7-5.8 Distancias y Transformadores */}
      <CollapsibleSection title="5.7 – 5.8 Distancias de Seguridad y Transformadores de Poder" icon={Shield}>
        <div className="space-y-4 text-foreground/80 text-sm">
          <div>
            <h4 className="eng-subsection-title">5.7 Distancias eléctricas y de seguridad</h4>
            <p>Las distancias eléctricas en subestaciones deberán garantizar la coordinación de aislación según IEC 60071-SER, IEEE 1427 e IEC 61936-1.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.8 Transformadores de poder</h4>
            <p>Diseño, fabricación y ensayo según <strong>IEC 60076-SER</strong>. Para HVDC: <strong>IEC 61378-2/3</strong>. Requisitos de instalación incluyen foso de contención de aceite, muros cortafuego y protección contra incendios.</p>
            <p className="mt-2"><strong>Placa de características obligatoria:</strong> fabricante, potencia, tensión, corriente, grupo de conexión, tipo de refrigeración, peso, año de fabricación.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5.9-5.10 Equipos primarios y compensación */}
      <CollapsibleSection title="5.9 – 5.10 Equipos Primarios y Compensación Reactiva" icon={Zap}>
        <div className="space-y-4 text-foreground/80 text-sm">
          <div>
            <h4 className="eng-subsection-title">5.9 Equipos primarios</h4>
            <p>Interruptores, seccionadores, transformadores de medida (CT, VT, CVT) según <strong>IEC 62271-SER</strong> e <strong>IEC 61869-1 a 5</strong>.</p>
            <p className="mt-1"><strong>5.9.5 Pararrayos:</strong> selección según <strong>IEC 60099-4/5</strong>, instalados en cada entrada de línea y transformador.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.10 Equipos de compensación reactiva</h4>
            <p><strong>5.10.1 Condensadores en derivación:</strong> diseño según <strong>IEEE 18</strong> e <strong>IEC/TS 60871-3</strong>. Protección con fusibles, relés de desbalance y protección de sobrecorriente.</p>
            <p><strong>5.10.2 Condensadores en serie:</strong> sistema de by-pass, protección contra sobretensiones y descarga automática.</p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5.11 Baterías */}
      <CollapsibleSection title="5.11 Baterías de Sistemas de Protección y Control" icon={Battery}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <p>Requisitos para bancos de baterías de respaldo (plomo-ácido o Ni-Cd) en subestaciones y centrales:</p>
          <p>• Autonomía mínima según criticidad de la instalación.</p>
          <p>• Sala de baterías con ventilación adecuada para evacuar gases.</p>
          <p>• Régimen de flotación y ecualización controlados.</p>
          <p>• Monitoreo de tensión individual por celda.</p>
          <p><strong>5.11.14 Cargadores:</strong> dimensionados para mantener la carga de flotación y simultáneamente alimentar las cargas permanentes de CC.</p>
        </div>
      </CollapsibleSection>

      {/* 5.12 Protecciones */}
      <CollapsibleSection title="5.12 Protecciones y Control de las Instalaciones" icon={Shield}>
        <div className="space-y-3 text-foreground/80 text-sm">
          <div>
            <h4 className="eng-subsection-title">5.12.1 Aspectos generales</h4>
            <p>Sistemas de protección según <strong>NTSyCS</strong>. Redundancia en protecciones principales. Selectividad y coordinación de protecciones.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.12.2 Protección de bancos de condensadores</h4>
            <p>Relés de desbalance, protección de sobrecorriente y fusibles individuales por elemento.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.12.3 Protección de reactancias y resistencias</h4>
            <p>Protección contra sobrecorrientes y fallas internas.</p>
          </div>
          <div>
            <h4 className="eng-subsection-title">5.12.4 Protección de bancos de baterías</h4>
            <p>Protección contra cortocircuito y sobrecarga en circuitos de CC.</p>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD10;
