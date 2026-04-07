import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Shield, Wrench, Zap, AlertTriangle, TreePine, Users } from "lucide-react";

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

const PliegoRPTD15 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Wrench className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 15 — Operación y Mantenimiento</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">O&M</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd15" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen} defaultOpen>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer los requisitos de seguridad en la <strong>operación y mantenimiento</strong> de las instalaciones de producción,
          transporte, prestación de servicios complementarios, sistemas de almacenamiento y distribución de energía eléctrica.
        </p>
      </CollapsibleSection>

      {/* 3. Referencias Normativas */}
      <CollapsibleSection title="3. Referencias Normativas" icon={BookOpen}>
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Norma</th>
                <th className="text-left">Año</th>
                <th className="text-left">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="font-mono">NFPA 70E</td><td>2012</td><td>Standard for Electrical Safety in the Workplace</td></tr>
              <tr><td className="font-mono">OSHA 1910.269</td><td>2014</td><td>Electric Power Generation, Transmission, and Distribution</td></tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 5. Aspectos Generales */}
      <CollapsibleSection title="5. Aspectos Generales de Operación y Mantenimiento" icon={Wrench}>
        <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
          <li>Cada propietario u operador deberá poseer <strong>procedimientos de operación y mantenimiento</strong> que cumplan los estándares de seguridad y calidad de la normativa vigente.</li>
          <li>Las instalaciones serán sometidas a inspección y mantenimiento según el <strong>Sistema de Gestión de Integridad de Instalaciones Eléctricas (SGIIE)</strong> del RPTD N° 17.</li>
        </ul>
      </CollapsibleSection>

      {/* 6. Seguridad en O&M */}
      <CollapsibleSection title="6. Seguridad en Labores de Operación y Mantenimiento" icon={Shield}>
        <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
          <li>Trabajos ejecutados evitando peligro para personas y sin causar daños a terceros.</li>
          <li>Procedimientos basados en <strong>NFPA 70E</strong> o <strong>OSHA 1910.269</strong>.</li>
          <li>Trabajos ejecutados por personal preparado con EPP apropiados, incluso sin presencia de tensión.</li>
          <li>Responsabilidad del propietario: instrucciones claras, identificación de riesgos y supervisión adecuada.</li>
          <li>Herramientas conservadas en estado satisfactorio según RPTD N° 17.</li>
          <li>Herramientas para líneas energizadas: completamente aisladas y sometidas a <strong>pruebas dieléctricas periódicas</strong>.</li>
        </ul>
      </CollapsibleSection>

      {/* 7. Operación en líneas energizadas */}
      <CollapsibleSection title="7. Operación en Instalaciones y Líneas Energizadas" icon={Zap}>
        <div className="space-y-4">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
            <li>Solo personal especializado, autorizado y con EPP adecuados.</li>
            <li>Nómina del personal autorizado mantenida actualizada por el propietario.</li>
            <li>Antes de iniciar: verificar condiciones de seguridad del entorno, inspeccionar herramientas, <strong>inhibir reconexión automática</strong> y cumplir distancias de seguridad.</li>
            <li>Métodos de trabajo en frontera de aproximación prohibida: a potencial, a contacto (aislado) o a distancia (pértigas).</li>
          </ul>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Tabla N° 1 — Límites de Aproximación en CA (metros)</h4>
            <div className="overflow-x-auto">
              <table className="eng-table w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left">Rango de Voltaje</th>
                    <th>Conductores Móviles</th>
                    <th>Circuitos Fijos</th>
                    <th>Aprox. Prohibida</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>0 – 50 V</td><td className="text-center">—</td><td className="text-center">—</td><td className="text-center">—</td></tr>
                  <tr><td>51 V – 300 V</td><td className="text-center">3,0</td><td className="text-center">1,0</td><td className="text-center">Evitar contacto</td></tr>
                  <tr><td>301 V – 750 V</td><td className="text-center">3,0</td><td className="text-center">1,0</td><td className="text-center">0,3</td></tr>
                  <tr><td>751 V – 15 kV</td><td className="text-center">3,0</td><td className="text-center">1,5</td><td className="text-center">0,7</td></tr>
                  <tr><td>15,1 kV – 36 kV</td><td className="text-center">3,0</td><td className="text-center">1,8</td><td className="text-center">0,8</td></tr>
                  <tr><td>36,1 kV – 46 kV</td><td className="text-center">3,0</td><td className="text-center">2,5</td><td className="text-center">0,8</td></tr>
                  <tr><td>46,1 kV – 72,5 kV</td><td className="text-center">3,0</td><td className="text-center">2,5</td><td className="text-center">1,0</td></tr>
                  <tr><td>72,6 kV – 121 kV</td><td className="text-center">3,3</td><td className="text-center">2,5</td><td className="text-center">1,0</td></tr>
                  <tr><td>138 kV – 145 kV</td><td className="text-center">3,4</td><td className="text-center">3,0</td><td className="text-center">1,2</td></tr>
                  <tr><td>161 kV – 169 kV</td><td className="text-center">3,6</td><td className="text-center">3,6</td><td className="text-center">1,3</td></tr>
                  <tr><td>230 kV – 242 kV</td><td className="text-center">4,0</td><td className="text-center">4,0</td><td className="text-center">1,7</td></tr>
                  <tr><td>345 kV – 362 kV</td><td className="text-center">4,7</td><td className="text-center">4,7</td><td className="text-center">2,8</td></tr>
                  <tr><td>500 kV – 550 kV</td><td className="text-center">5,8</td><td className="text-center">5,8</td><td className="text-center">3,6</td></tr>
                  <tr><td>765 kV – 800 kV</td><td className="text-center">7,2</td><td className="text-center">7,2</td><td className="text-center">4,9</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Tabla N° 2 — Límites de Aproximación en CC (metros)</h4>
            <div className="overflow-x-auto">
              <table className="eng-table w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left">Rango de Voltaje</th>
                    <th>Conductores Móviles</th>
                    <th>Circuitos Fijos</th>
                    <th>Aprox. Prohibida</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>0 – 100 V</td><td className="text-center">—</td><td className="text-center">—</td><td className="text-center">—</td></tr>
                  <tr><td>101 V – 300 V</td><td className="text-center">3,0</td><td className="text-center">1,0</td><td className="text-center">Evitar contacto</td></tr>
                  <tr><td>300 V – 1 kV</td><td className="text-center">3,0</td><td className="text-center">1,0</td><td className="text-center">0,3</td></tr>
                  <tr><td>1,1 kV – 5 kV</td><td className="text-center">3,0</td><td className="text-center">1,5</td><td className="text-center">0,5</td></tr>
                  <tr><td>5,1 kV – 15 kV</td><td className="text-center">3,0</td><td className="text-center">1,5</td><td className="text-center">0,7</td></tr>
                  <tr><td>15,1 kV – 45 kV</td><td className="text-center">3,0</td><td className="text-center">2,5</td><td className="text-center">0,8</td></tr>
                  <tr><td>45,1 kV – 75 kV</td><td className="text-center">3,0</td><td className="text-center">2,5</td><td className="text-center">1,0</td></tr>
                  <tr><td>75,1 kV – 150 kV</td><td className="text-center">3,3</td><td className="text-center">3,0</td><td className="text-center">1,2</td></tr>
                  <tr><td>150,1 kV – 250 kV</td><td className="text-center">3,6</td><td className="text-center">3,6</td><td className="text-center">1,6</td></tr>
                  <tr><td>250,1 kV – 500 kV</td><td className="text-center">6,0</td><td className="text-center">6,0</td><td className="text-center">3,5</td></tr>
                  <tr><td>500,1 kV – 800 kV</td><td className="text-center">8,0</td><td className="text-center">8,0</td><td className="text-center">5,0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 8. Exigencias para intervenciones seguras */}
      <CollapsibleSection title="8. Exigencias para Intervenciones Seguras" icon={AlertTriangle}>
        <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
          <li>Accesos principales de subestaciones MT/AT/EAT deben indicar peligros y EPP mínimos; señalética de prohibición en cerco perimetral (ref. RPTD N° 09).</li>
          <li>Delimitación visible de la zona de trabajo para prevenir ingreso de personas no involucradas.</li>
          <li>Cables subterráneos señalizados con <strong>cinta de peligro</strong> entre la superficie y el cable.</li>
        </ul>
      </CollapsibleSection>

      {/* 9. Coordinación */}
      <CollapsibleSection title="9. Coordinación de Intervenciones" icon={Users}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">9.1 Personal en Terreno</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Toda intervención requiere <strong>coordinación previa</strong> con propietarios de instalaciones que puedan verse afectadas.</li>
              <li>Excepción: riesgo inminente → solo maniobras de <strong>desenergización</strong>, informando a la brevedad.</li>
              <li>El encargado identifica riesgos y comunica medidas de seguridad por escrito.</li>
            </ul>
            <div className="p-3 bg-muted/50 rounded-lg border border-border mt-3">
              <h4 className="text-xs font-semibold text-foreground mb-1.5">Pasos previos a intervención en instalaciones desconectadas (9.1.5):</h4>
              <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-0.5">
                <li>Desconectar fuentes de energía (preferir corte visible)</li>
                <li>Bloquear cierre accidental de elementos de corte</li>
                <li>Señalizar puntos de bloqueo con carteles o tarjetas personales</li>
                <li>Verificar ausencia de tensión con instrumentos adecuados</li>
                <li>Realizar puesta a tierra (portátil o de operación)</li>
              </ol>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">9.2 Coordinación entre Empresas</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Protocolo de coordinación confeccionado por la distribuidora; discrepancias resueltas por la SEC.</li>
              <li>Alumbrado público puede compartir postes, pero solo intervenir en circuitos independientes bajo redes BT.</li>
              <li>Faenas externas: solicitar autorización con al menos <strong>20 días corridos</strong> de anticipación; respuesta en máximo <strong>10 días</strong>.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 10. Entorno */}
      <CollapsibleSection title="10. Entorno para Operación y Mantenimiento Seguros" icon={TreePine}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">10.1 Instalaciones Aéreas</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Monitoreo constante de árboles alrededor de la franja de seguridad (inclinados, volcados, enfermos).</li>
              <li>Medidas: podar, talar, elevar conductores, cambiar disposición de crucetas o alejar instalaciones.</li>
              <li>Franja de seguridad <strong>libre de vegetación o material</strong> que pueda generar riesgo de incendio.</li>
              <li>Cumplimiento del punto 4.9 del RPTD N° 07.</li>
              <li>Plan de reemplazo de componentes ante contaminación ambiental que degrade la aislación.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">10.2 Instalaciones Subterráneas</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Inspección y mantenimiento periódico de cámaras y bóvedas para evitar acumulación de basura, agua o tierra.</li>
              <li>Ventilación adecuada antes de intervenir cámaras subterráneas.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD15;
