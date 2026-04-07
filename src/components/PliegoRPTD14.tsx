import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Shield, Ruler, Users, FileText, AlertTriangle } from "lucide-react";

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

const PliegoRPTD14 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 14 — Apoyo en Postes por Terceros</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Tensión Reducida</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd14" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen} defaultOpen>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer los requisitos y condiciones de seguridad que deben cumplir los <strong>apoyos de terceros en postes</strong> de
          propiedad de la empresa distribuidora eléctrica. Aplica a redes de distribución e instalaciones de tensión reducida.
          <strong> No es aplicable</strong> para paralelismo de instalaciones eléctricas de tensión diferente (líneas multitensión).
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
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 4. Terminología */}
      <CollapsibleSection title="4. Terminología y Definiciones" icon={FileText}>
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Término</th>
                <th className="text-left">Definición</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="font-medium whitespace-nowrap">Apoyo</td><td>Dispositivo genérico de soporte de conductores y aisladores (postes, torres u otro tipo de estructura).</td></tr>
              <tr><td className="font-medium whitespace-nowrap">Apoyo en poste</td><td>Apoyos de elementos de red, líneas de tensión reducida, equipos y luminaria pública con sujeción física a postes de distribución.</td></tr>
              <tr><td className="font-medium whitespace-nowrap">Empresa Distribuidora</td><td>Concesionaria del servicio público de distribución o quien opere instalaciones de distribución de energía eléctrica.</td></tr>
              <tr><td className="font-medium whitespace-nowrap">Instalación de tensión reducida</td><td>Instalaciones con tensiones nominales ≤ 100 V (telefonía, comunicaciones, TV cable, monitoreo, vigilancia, cámaras de tránsito).</td></tr>
              <tr><td className="font-medium whitespace-nowrap">Servicio de apoyo</td><td>Servicio prestado por la distribuidora para que terceros utilicen la infraestructura de postación.</td></tr>
              <tr><td className="font-medium whitespace-nowrap">Usuario de apoyo</td><td>Empresa, sociedad o persona que utiliza el servicio de apoyo de la distribuidora.</td></tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 5. Condiciones para la prestación del servicio */}
      <CollapsibleSection title="5. Condiciones para la Prestación del Servicio" icon={FileText}>
        <div className="space-y-3">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
            <li>El servicio comprende <strong>exclusivamente</strong> el uso de la estructura de postación como elemento de sustentación mecánica.</li>
            <li>Instalación, modificación o retiro requiere <strong>solicitud y autorización por escrito</strong> de la distribuidora.</li>
            <li>La distribuidora es responsable ante la autoridad de garantizar la seguridad y calidad de servicio de sus instalaciones.</li>
          </ul>
          <div className="p-3 bg-muted/50 rounded-lg border border-border mt-3">
            <h4 className="text-xs font-semibold text-foreground mb-1.5">Contenido mínimo del proyecto (punto 5.4):</h4>
            <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-0.5">
              <li>Naturaleza de los trabajos a ejecutar</li>
              <li>Indicación precisa de las instalaciones a intervenir</li>
              <li>Especificación de cables proyectados</li>
              <li>Cantidad de nuevos apoyos solicitados</li>
              <li>Autorizaciones previas requeridas</li>
              <li>Indicación de líneas y apoyos existentes en el sector</li>
              <li>Elementos de red y líneas en desuso a retirar</li>
              <li>Plano de elevación y planta del proyecto (con estabilidad mecánica)</li>
            </ol>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs font-semibold text-foreground">Plazo de respuesta</p>
              <p className="text-lg font-bold text-primary">30 días</p>
              <p className="text-xs text-muted-foreground">corridos para emitir informe de autorización o rechazo</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs font-semibold text-foreground">Validez de autorización</p>
              <p className="text-lg font-bold text-primary">60 días</p>
              <p className="text-xs text-muted-foreground">corridos para ejecutar las obras</p>
            </div>
          </div>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1 mt-3">
            <li>La distribuidora debe convenir exigencias de construcción, operación, mantenimiento, tiempos de respuesta ante fallas y retiro.</li>
            <li>Para tendidos de telecomunicaciones: cumplir además la <strong>Ley 18.168</strong>.</li>
            <li>Inspección final obligatoria por la distribuidora para verificar ausencia de riesgos.</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 6. Condiciones de Seguridad */}
      <CollapsibleSection title="6. Condiciones de Seguridad" icon={Shield}>
        <div className="space-y-4">
          <p className="text-sm text-foreground/80">
            Quien ejecute trabajos de apoyo en poste deberá cumplir todas las medidas de seguridad, incluyendo
            procedimientos de trabajo seguro y EPP, conforme a la norma <strong>NFPA 70E</strong>.
          </p>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Tabla N° 1 — Distancias Mínimas de Seguridad</h4>
            <div className="overflow-x-auto">
              <table className="eng-table w-full text-xs">
                <thead>
                  <tr>
                    <th>Tensión de la red entre fases (V)</th>
                    <th>Distancia mínima de seguridad (m)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>380</td><td className="text-center font-semibold">0,30</td></tr>
                  <tr><td>&gt; 380 y hasta 15.000</td><td className="text-center font-semibold">0,70</td></tr>
                  <tr><td>&gt; 15.000 y hasta 23.000</td><td className="text-center font-semibold">0,80</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
            <li>La red eléctrica de BT <strong>no deberá ser usada</strong> como fuente de energía de instalaciones de tensión reducida.</li>
            <li>Líneas de tensión reducida que crucen calles o caminos: altura mínima <strong>4,5 m</strong> desde el punto más bajo al suelo.</li>
            <li>Cruces en carreteras, autopistas o salidas portuarias: la altura puede incrementarse por acuerdo entre partes.</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 7. Retiro de cables */}
      <CollapsibleSection title="7. Retiro de Cables de Tensión Reducida" icon={AlertTriangle}>
        <div className="space-y-3">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1.5">
            <li>La existencia de instalaciones en desuso será motivo de <strong>rechazo</strong> de nuevas solicitudes de apoyo.</li>
            <li>Líneas de tensión reducida, sus equipos y accesorios que estén <strong>fuera de servicio o en desuso</strong> deberán ser retirados
              por el usuario de apoyo.</li>
            <li>El retiro de instalaciones en desuso es <strong>responsabilidad del usuario de apoyo</strong>.</li>
          </ul>
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Nota:</strong> La distribuidora deberá verificar el cumplimiento de esta obligación durante
              la inspección final y como condición previa a la autorización de nuevos apoyos.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 8. Distancias en postes */}
      <CollapsibleSection title="8. Distancias y Disposición en Postes" icon={Ruler}>
        <div className="space-y-3">
          <p className="text-sm text-foreground/80">
            La disposición de los elementos en el poste debe respetar las zonas de seguridad y las distancias mínimas
            entre conductores de diferentes servicios, garantizando el acceso seguro para trabajos de mantenimiento.
          </p>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
            <li>Zona de líneas eléctricas de MT en la parte superior del poste.</li>
            <li>Zona de líneas eléctricas de BT debajo de las de MT.</li>
            <li>Zona de líneas de tensión reducida en la parte inferior, respetando las distancias de la Tabla N° 1.</li>
            <li>Los apoyos no deben interferir con el acceso del personal a las instalaciones eléctricas.</li>
            <li>Los cables de tensión reducida deben mantener un <strong>espacio libre de 30 cm</strong> mínimo respecto a los conductores de BT.</li>
          </ul>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD14;
