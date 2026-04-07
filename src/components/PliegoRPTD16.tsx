import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, FileCheck, FileText, ClipboardList } from "lucide-react";

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

const PliegoRPTD16 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <FileCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 16 — Puesta en Servicio</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Puesta en Servicio</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd16" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen} defaultOpen>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer el <strong>procedimiento para la puesta en servicio</strong> de una instalación eléctrica.
          Aplica a las instalaciones destinadas a la producción, transporte, prestación de servicios complementarios,
          sistemas de almacenamiento y distribución de energía eléctrica.
        </p>
      </CollapsibleSection>

      {/* 3. Terminología */}
      <CollapsibleSection title="3. Terminología y Definiciones" icon={FileText}>
        <div className="overflow-x-auto">
          <table className="eng-table w-full text-xs">
            <thead>
              <tr>
                <th className="text-left">Término</th>
                <th className="text-left">Definición</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="font-medium whitespace-nowrap">As built</td><td>Según lo construido.</td></tr>
              <tr><td className="font-medium whitespace-nowrap">Empresa</td><td>Propietaria(s) u operadora(s) de instalaciones destinadas a la producción, transporte y/o distribución de energía eléctrica sujetas al cumplimiento del presente pliego.</td></tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 4. Procedimiento */}
      <CollapsibleSection title="4. Procedimiento de Puesta en Servicio" icon={ClipboardList}>
        <div className="space-y-4">
          <div className="p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs font-semibold text-foreground mb-1">Plazo de comunicación previa</p>
            <p className="text-lg font-bold text-primary">15 días</p>
            <p className="text-xs text-muted-foreground">
              mínimo de anticipación para comunicar la puesta en servicio a la Superintendencia (SEC).
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">4.1 Comunicación Previa</h4>
            <p className="text-sm text-foreground/80">
              Las obras no podrán ser puestas en servicio sin comunicación previa a la SEC. La comunicación debe incluir:
            </p>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1 mt-2">
              <li>Descripción general de las obras</li>
              <li>Relación de principales equipos y materiales, con características técnicas</li>
              <li>Indicación de si los equipos son <strong>nuevos o reacondicionados</strong></li>
              <li>Para empresas de servicio público: <strong>costo desglosado</strong> (equipo/material y mano de obra)</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">4.2 Descripción General (contenido mínimo)</h4>
            <div className="overflow-x-auto">
              <table className="eng-table w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left">Literal</th>
                    <th className="text-left">Requisito</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-mono">a</td><td>Indicación del emplazamiento de la instalación</td></tr>
                  <tr><td className="font-mono">b</td><td>Descripción de la instalación: características, principales equipos y elementos instalados</td></tr>
                  <tr><td className="font-mono">c</td><td>Declaración de cumplimiento de la normativa (reglamentos y normas técnicas aplicables)</td></tr>
                  <tr><td className="font-mono">d</td><td>Fecha de puesta en servicio</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">4.3 Lugar de Comunicación</h4>
            <p className="text-sm text-foreground/80">
              La comunicación se efectúa en las oficinas de la SEC correspondientes a la(s) región(es) donde se ejecutarán
              las instalaciones, o según los procedimientos que defina la Superintendencia.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">4.4 Antecedentes a Disposición de la SEC</h4>
            <p className="text-sm text-foreground/80 mb-2">
              Los siguientes antecedentes deberán estar disponibles y presentarse a requerimiento de la SEC:
            </p>
            <div className="overflow-x-auto">
              <table className="eng-table w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left">Literal</th>
                    <th className="text-left">Antecedente</th>
                    <th className="text-left">Referencia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-mono">a</td><td>Estudios y criterios de diseño</td><td>RPTD N° 03</td></tr>
                  <tr><td className="font-mono">b</td><td>Planos as built de disposición general (incluidos accesos)</td><td>—</td></tr>
                  <tr><td className="font-mono">c</td><td>Diagrama unilineal general as built</td><td>—</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD16;
