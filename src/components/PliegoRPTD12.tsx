import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, Cable, Shield, Ruler, ChevronDown, ChevronUp, Zap, Building2, AlertTriangle } from "lucide-react";

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

const PliegoRPTD12 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Cable className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 12 — Líneas de Distribución en Media Tensión</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Media Tensión (MT)</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd12" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen} defaultOpen>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer las exigencias técnicas mínimas de seguridad que deben cumplir las líneas aéreas y subterráneas de distribución
          en <strong>media tensión (MT)</strong>, desde 1 kV hasta 23 kV inclusive, tanto para construcción nueva como para
          modificaciones, reconstrucciones o ampliaciones de líneas existentes.
        </p>
        <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Alcance:</strong> Líneas aéreas y subterráneas de distribución en MT de sistemas eléctricos, 
            incluyendo redes urbanas, rurales, cruce de caminos, ríos, y paralelismos con otras instalaciones.
          </p>
        </div>
      </CollapsibleSection>

      {/* 3. Referencias Normativas */}
      <CollapsibleSection title="3. Referencias Normativas" icon={BookOpen}>
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Norma</th>
                <th className="text-left">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="font-mono">NCh Elec. 4/2003</td><td>Instalaciones de consumo en BT</td></tr>
              <tr><td className="font-mono">IEC 60826</td><td>Criterios de diseño de líneas aéreas de AT</td></tr>
              <tr><td className="font-mono">IEC 61089</td><td>Conductores para líneas aéreas — Conductores de Al-Ac</td></tr>
              <tr><td className="font-mono">ANSI C2 (NESC)</td><td>National Electrical Safety Code</td></tr>
              <tr><td className="font-mono">IEC 60502</td><td>Cables de potencia con aislación extruida y accesorios</td></tr>
              <tr><td className="font-mono">IEC 60287</td><td>Cálculo de la intensidad de corriente admisible</td></tr>
              <tr><td className="font-mono">NTSyCS</td><td>Norma Técnica de Seguridad y Calidad de Servicio</td></tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 4. Conductores y Cables */}
      <CollapsibleSection title="4. Conductores y Cables" icon={Cable}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Conductores Aéreos</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Se deben utilizar conductores de aleación de aluminio o aluminio-acero (AAAC o ACSR).</li>
              <li>La sección mínima será de <strong>25 mm² (AAAC)</strong> o <strong>35 mm² (Cu)</strong>.</li>
              <li>Los conductores desnudos deben cumplir IEC 61089 o ASTM equivalente.</li>
              <li>En zonas costeras o con alta contaminación se deben usar conductores con protección anti-corrosiva.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Cables Subterráneos</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Aislación de XLPE o EPR conforme a IEC 60502.</li>
              <li>Pantalla metálica con conexión a tierra en ambos extremos.</li>
              <li>Profundidad mínima de instalación: <strong>0,80 m</strong> en acera, <strong>1,00 m</strong> en calzada.</li>
              <li>Capacidad de corriente calculada según IEC 60287.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 5. Estructuras y Postes */}
      <CollapsibleSection title="5. Estructuras y Postes" icon={Building2}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Tipos de Postes</h4>
            <div className="overflow-x-auto">
              <table className="eng-table w-full text-xs">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Alturas Típicas (m)</th>
                    <th>Aplicación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Hormigón armado</td><td>9 – 12</td><td>Urbano y rural</td></tr>
                  <tr><td>Madera impregnada</td><td>9 – 12</td><td>Rural</td></tr>
                  <tr><td>Acero galvanizado</td><td>10 – 15</td><td>Urbano / vanos largos</td></tr>
                  <tr><td>Fibra de vidrio</td><td>9 – 12</td><td>Zonas costeras / corrosivas</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Requisitos</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Factor de seguridad mínimo de <strong>2,0</strong> para postes de hormigón y acero.</li>
              <li>Empotramiento mínimo: <strong>10%</strong> de la longitud del poste + 0,60 m.</li>
              <li>Distancia mínima entre postes según vano regulador y tensión mecánica del conductor.</li>
              <li>En retenidas, ángulo mínimo de <strong>30°</strong> respecto a la vertical.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 6. Aislación */}
      <CollapsibleSection title="6. Aislación" icon={Shield}>
        <div className="space-y-4">
          <p className="text-sm text-foreground/80">
            Los aisladores para líneas de distribución MT deben cumplir con las exigencias de nivel de aislación
            correspondientes a la tensión nominal de la red, considerando sobretensiones atmosféricas y de maniobra.
          </p>
          <div className="overflow-x-auto">
            <table className="eng-table w-full text-xs">
              <thead>
                <tr>
                  <th>Tensión Nominal (kV)</th>
                  <th>BIL Mínimo (kV)</th>
                  <th>Distancia de Fuga Mín. (mm/kV)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>12</td><td>95</td><td>20 (zona limpia) / 25 (contaminada)</td></tr>
                <tr><td>15</td><td>110</td><td>20 / 25</td></tr>
                <tr><td>23</td><td>150</td><td>20 / 25</td></tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Nota:</strong> En zonas con alto nivel de contaminación salina o industrial, la distancia de fuga
              específica debe incrementarse a <strong>31 mm/kV</strong> o más, según evaluación del nivel de contaminación (IEC 60815).
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7. Distancias de Seguridad */}
      <CollapsibleSection title="7. Distancias de Seguridad" icon={Ruler}>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">Distancias Mínimas Verticales</h4>
          <div className="overflow-x-auto">
            <table className="eng-table w-full text-xs">
              <thead>
                <tr>
                  <th>Situación</th>
                  <th>Distancia Mín. (m)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Sobre terreno transitable por peatones</td><td>6,0</td></tr>
                <tr><td>Sobre caminos y calles</td><td>6,5</td></tr>
                <tr><td>Sobre vías férreas</td><td>8,0</td></tr>
                <tr><td>Sobre techos accesibles</td><td>4,0</td></tr>
                <tr><td>Sobre techos no accesibles</td><td>3,0</td></tr>
              </tbody>
            </table>
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-2 mt-4">Distancias Mínimas Horizontales</h4>
          <div className="overflow-x-auto">
            <table className="eng-table w-full text-xs">
              <thead>
                <tr>
                  <th>Elemento</th>
                  <th>Distancia Mín. (m)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Edificaciones</td><td>2,5</td></tr>
                <tr><td>Árboles</td><td>2,0</td></tr>
                <tr><td>Líneas de BT / telecomunicaciones</td><td>1,5</td></tr>
                <tr><td>Líneas de AT</td><td>Según RPTD N° 07</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 8. Puesta a Tierra */}
      <CollapsibleSection title="8. Puesta a Tierra" icon={Zap}>
        <div className="space-y-3">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
            <li>Resistencia de puesta a tierra máxima: <strong>20 Ω</strong> para líneas MT.</li>
            <li>Cada estructura con equipos de maniobra o transformación debe tener puesta a tierra independiente.</li>
            <li>Conductores de tierra: cobre desnudo mínimo <strong>16 mm²</strong> o acero galvanizado <strong>50 mm²</strong>.</li>
            <li>Los neutros de transformadores de distribución deben conectarse a tierra con resistencia ≤ <strong>10 Ω</strong>.</li>
            <li>Electrodo tipo varilla: mínimo <strong>2,4 m</strong> de longitud, copperweld 5/8".</li>
          </ul>
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Referencia:</strong> Ver RPTD N° 06 para requisitos detallados de sistemas de puesta a tierra.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 9. Protecciones */}
      <CollapsibleSection title="9. Protecciones y Equipamiento" icon={AlertTriangle}>
        <div className="space-y-3">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
            <li>Toda línea MT debe contar con protección de sobrecorriente y cortocircuito.</li>
            <li>Instalación de seccionadores fusibles en derivaciones y transformadores de distribución.</li>
            <li>Pararrayos en transformadores de distribución y puntos críticos (clase IEC 60099).</li>
            <li>Reconectadores automáticos en alimentadores principales.</li>
            <li>Coordinación de protecciones según criterios de selectividad y sensibilidad.</li>
          </ul>
          <div className="overflow-x-auto mt-3">
            <table className="eng-table w-full text-xs">
              <thead>
                <tr>
                  <th>Equipo</th>
                  <th>Norma Aplicable</th>
                  <th>Ubicación Típica</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Seccionador fusible</td><td>IEC 60282</td><td>Derivaciones, transformadores</td></tr>
                <tr><td>Reconectador</td><td>IEEE C37.60</td><td>Alimentador principal</td></tr>
                <tr><td>Pararrayos</td><td>IEC 60099</td><td>Transformadores, cabeceras</td></tr>
                <tr><td>Seccionador bajo carga</td><td>IEC 62271-103</td><td>Puntos de seccionamiento</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD12;
