import DownloadPdfButton from "@/components/DownloadPdfButton";
import { useState } from "react";
import { BookOpen, Cable, Shield, Ruler, ChevronDown, ChevronUp, Zap, Building2, AlertTriangle, Wrench, Layers } from "lucide-react";

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

const PliegoRPTD13 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Layers className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 13 — Líneas Eléctricas de Media y Baja Tensión</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">MT y BT</span>
            </div>
            <div className="mt-3"><DownloadPdfButton pliegoId="rptd13" /></div>
          </div>
        </div>
      </div>

      {/* 1-2. Objetivo y Alcance */}
      <CollapsibleSection title="1 – 2. Objetivo y Alcance" icon={BookOpen} defaultOpen>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer los requisitos de seguridad que deberán cumplir las <strong>líneas eléctricas aéreas, subterráneas y subacuáticas
          de baja y media tensión</strong>, en particular las redes de distribución. Aplica a las instalaciones de transporte y de distribución
          de energía eléctrica.
        </p>
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
              <tr><td className="font-mono">ANSI/SCTE 77 (2013)</td><td>Specification for Underground Enclosure Integrity</td></tr>
              <tr><td className="font-mono">IEC 60076-SER</td><td>Power transformers — ALL PARTS</td></tr>
              <tr><td className="font-mono">IEC 60502-4</td><td>Cables de potencia con aislación extruida, 1 kV a 30 kV — Ensayos</td></tr>
              <tr><td className="font-mono">IEC 60840</td><td>Cables de potencia &gt; 30 kV hasta 150 kV — Métodos de ensayo</td></tr>
              <tr><td className="font-mono">IEC 62271-1</td><td>Aparamenta de AT — Especificaciones comunes</td></tr>
              <tr><td className="font-mono">IEEE 48</td><td>Terminaciones de cables AC</td></tr>
              <tr><td className="font-mono">IEEE 404</td><td>Empalmes de cables con aislación extruida y laminada</td></tr>
              <tr><td className="font-mono">IEEE C57.12.00</td><td>Requisitos generales para transformadores de distribución</td></tr>
              <tr><td className="font-mono">IEEE C57.12.20</td><td>Transformadores de distribución aéreos ≤ 500 kVA</td></tr>
              <tr><td className="font-mono">IEEE 1584</td><td>Guía para cálculos de riesgo de arco eléctrico</td></tr>
              <tr><td className="font-mono">IEEE C37.20.7</td><td>Ensayos de arco interno en aparamenta ≤ 38 kV</td></tr>
              <tr><td className="font-mono">NChElec. 4/2003</td><td>Instalaciones de consumo en BT</td></tr>
              <tr><td className="font-mono">NFPA 70E (2018)</td><td>Standard for Electrical Safety in the Workplace</td></tr>
              <tr><td className="font-mono">UNE-EN 50541-1/2</td><td>Transformadores de distribución tipo seco, 100 a 3.150 kVA</td></tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 5. Tecnología y Equipamiento */}
      <CollapsibleSection title="5. Tecnología y Equipamiento" icon={Cable}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">5.1 Conductores</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Deberán cumplir requerimientos eléctricos y mecánicos según condiciones de instalación (ref. punto 5.14 del RPTD N° 11).</li>
              <li>Protección contra calentamiento excesivo mediante sistemas de detección y protección adecuados.</li>
              <li><strong>Conductores desnudos aéreos:</strong> Uniones garantizando no deslizamiento al 80% (BT) y 90% (MT) de la tensión de ruptura.</li>
              <li><strong>Conductores protegidos:</strong> Según punto 6 del RPTD N° 04.</li>
              <li><strong>Conductores aislados:</strong> Según punto 7 del RPTD N° 04.</li>
              <li><strong>Cables subterráneos:</strong> Según punto 6.2.1 del RPTD N° 11.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">5.2 Aislación</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Nivel de aislación según punto 5 del RPTD N° 05.</li>
              <li>Aisladores según punto 6 del RPTD N° 05.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">5.3 Transformadores</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Seleccionados e instalados de acuerdo con condiciones de servicio.</li>
              <li>Tensión nominal según RPTD N° 01 (puntos 5.2.a y 5.2.b).</li>
              <li>Centros de transformación prefabricados según RPTD N° 10 (punto 5.6.1).</li>
              <li>Protección contra cortocircuito con interruptor automático para transformadores ≥ <strong>1.000 kVA</strong>.</li>
              <li>Placa de características obligatoria: marca, serie, fases, frecuencia, potencia nominal, tensiones, corrientes, impedancia de cortocircuito, grupo de conexión.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">5.4 Equipamiento</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Equipos deben proveer espacios para operación y mantenimiento.</li>
              <li>Indicación clara de posición "abierto" / "cerrado".</li>
              <li>Mecanismos de seguridad para evitar operaciones no deseadas en lugares accesibles a personas no calificadas.</li>
              <li>Equipos subterráneos adecuados al entorno y con protección anticorrosión.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">5.5 Estructuras de Soporte</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Postes de hormigón según punto 5.28.7 del RPTD N° 11.</li>
              <li>Postes de madera: coeficiente de seguridad ≥ <strong>4</strong> respecto a la ruptura.</li>
              <li>Soportes de acero según punto 5.28.6 del RPTD N° 11.</li>
              <li>Tirantes según punto 8 del RPTD N° 06; protección visible en parte cercana al suelo.</li>
              <li>No instalar frente a accesos peatonales o de vehículos.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 6.1 Líneas Aéreas */}
      <CollapsibleSection title="6.1 Líneas Aéreas — Criterios de Diseño" icon={Ruler}>
        <div className="space-y-3">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
            <li>Cumplir requerimientos de aislamiento para evitar contactos por disminución de distancias de seguridad.</li>
            <li>Considerar el criterio de <strong>pérdidas técnicas</strong> en la selección del conductor económico.</li>
            <li>Privilegiar uso de estructuras en común para circuitos en carreteras, caminos, calles y pasajes.</li>
            <li>Estructuras en bordes de caminos no deben quedar expuestas a daños por vehículos ni obstruir la circulación.</li>
            <li>En cruces entre líneas de diferentes tensiones, la de mayor tensión debe ir en el <strong>nivel más alto</strong>.</li>
            <li>Equipos colocados en posiciones uniformes, debidamente identificados.</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 6.2 Redes Subterráneas */}
      <CollapsibleSection title="6.2 Redes Subterráneas" icon={Layers}>
        <div className="space-y-3">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
            <li>Diseño según tensión, corriente, cortocircuito, temperatura y condiciones mecánicas/ambientales.</li>
            <li>Cables en instalaciones verticales deben soportarse contra deslizamiento.</li>
            <li>Prohibido instalar cables de tensión reducida de otros servicios en el mismo ducto.</li>
            <li>Pantallas de aislamiento y empalmes puestas a tierra; cubiertas conectadas a tierra común en cámaras.</li>
            <li>Terminaciones de cables según <strong>IEEE 48</strong> o <strong>IEC 60840</strong> (Clase 1).</li>
            <li>Uniones y accesorios según <strong>IEEE 404</strong> o <strong>IEC 60502-4</strong>.</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 6.3 Alumbrado Público */}
      <CollapsibleSection title="6.3 Redes de Alumbrado Público" icon={Zap}>
        <div className="space-y-3">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
            <li>Conductores de alimentación continuos, sin uniones ni derivaciones.</li>
            <li>Luminarias en postes de distribución: distancia mínima según RPTD N° 07.</li>
            <li>Soportes y abrazaderas de material resistente a la corrosión.</li>
            <li>Protección, conexión y desconexión para aislar fallas y permitir mantenimiento.</li>
            <li>Postación ubicada sin provocar ni recibir daño de vehículos o peatones.</li>
            <li>Alimentación desde el transformador del mismo sector.</li>
            <li>Modificaciones y mantenimiento según RPTD N° 15.</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 6.5–6.7 Canalizaciones */}
      <CollapsibleSection title="6.5 – 6.7 Canalizaciones y Ductos" icon={Building2}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Canalizaciones</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>No metálicas a la vista: incombustibles o autoextinguibles, resistentes a impacto y compresión.</li>
              <li>Cámaras tipos A, B o C según NChElec. 4/2003.</li>
              <li>No contener cañerías de agua ni gas en cámaras eléctricas.</li>
              <li>Drenaje para evacuación de aguas; impermeabilización en zonas de napas freáticas.</li>
              <li>Tapas metálicas con resistencia mínima de <strong>6.000 kg</strong> en zonas de tránsito vehicular.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Cables Directamente Enterrados (6.6)</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Profundidad mínima: <strong>1 m</strong> respecto de la superficie.</li>
              <li>Cinta de señalización a 20–30 cm sobre el cable.</li>
              <li>Prohibido bajo calzadas, aceras o recintos pavimentados; cruces mediante ducto apropiado.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Ductos (6.7)</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Distancia máxima entre cámaras: <strong>90 m</strong> (con curvas) o <strong>120 m</strong> (tramos rectos, ducto ≥ 50 mm Ø).</li>
              <li>Máximo 2 curvas, desviación ≤ 60°; radio de curvatura ≥ 10× diámetro del ducto.</li>
              <li>Cubiertos por <strong>0,60 m</strong> de tierra; <strong>0,80 m</strong> en zona de tránsito vehicular.</li>
              <li>Pendiente mínima <strong>0,25%</strong> hacia cámaras próximas.</li>
              <li>No en contacto con tuberías de drenaje, agua, vapor o combustible.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 6.9 Puestas a Tierra */}
      <CollapsibleSection title="6.9 Puestas a Tierra" icon={Shield}>
        <div className="space-y-3">
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
            <li>Cumplir criterios y disposiciones del RPTD N° 06.</li>
            <li>Tierra de servicio: tensión de conductor activo con respecto a tierra no debe sobrepasar <strong>250 V</strong> ante falla permanente.</li>
            <li>Neutro a tierra en proximidad de subestación y cada <strong>200 m</strong> máximo en redes BT; también en extremos de líneas.</li>
            <li>Resistencia combinada de todas las puestas a tierra ≤ <strong>5 Ω</strong>.</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 6.10 Protecciones Eléctricas */}
      <CollapsibleSection title="6.10 Protecciones Eléctricas" icon={AlertTriangle}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Sobrecorrientes y Sobrecargas</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Protección contra efectos térmicos y dinámicos de cortocircuito y sobrecarga.</li>
              <li>Coordinación de actuación entre dispositivos para desconectar la parte mínima posible.</li>
              <li>Cada circuito BT de subestación de distribución protegido independientemente.</li>
              <li>Fusibles e interruptores automáticos deben interrumpir el máximo nivel de cortocircuito del punto de instalación.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Sobretensiones</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Construcción apropiada o aparatos atenuadores (DPS).</li>
              <li>Toda subestación BT/MT debe tener protección contra sobretensiones al menos en el lado primario (ref. RPTD N° 10, punto 5.12.5).</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 7. Cruces y Paralelismos */}
      <CollapsibleSection title="7. Cruces y Paralelismos" icon={Wrench}>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Consideraciones Generales</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Cruzamientos de conductores del mismo circuito sujetados en la misma estructura.</li>
              <li>Separaciones determinadas en el punto de mayor acercamiento.</li>
              <li>Análisis con presión de viento de <strong>30 kg/m²</strong> (reducible a 20 en áreas protegidas).</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Paralelismos (7.2)</h4>
            <p className="text-sm text-foreground/80">
              Separación horizontal mínima entre conductores aéreos adyacentes en distintas estructuras: <strong>2 m</strong> para tensiones ≤ 23 kV.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Tabla N° 1 — Separación Vertical Mínima en Cruces (m)</h4>
            <div className="overflow-x-auto">
              <table className="eng-table w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left">Conductor inferior ↓ / Superior →</th>
                    <th>Tensión reducida</th>
                    <th>Baja Tensión</th>
                    <th>Tirantes</th>
                    <th>Media Tensión</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-medium">Tensión reducida y mensajeros</td><td className="text-center">—</td><td className="text-center">1,0</td><td className="text-center">1,0</td><td className="text-center">1,2</td></tr>
                  <tr><td className="font-medium">Baja Tensión</td><td className="text-center">—</td><td className="text-center">1,0</td><td className="text-center">1,3</td><td className="text-center">1,75</td></tr>
                  <tr><td className="font-medium">Tirantes</td><td className="text-center">—</td><td className="text-center">—</td><td className="text-center">—</td><td className="text-center">1,75</td></tr>
                  <tr><td className="font-medium">Media Tensión</td><td className="text-center">—</td><td className="text-center">—</td><td className="text-center">2,0</td><td className="text-center">2,0</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Cruces Férreos (7.4)</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>MT con conductores desnudos o aislados: altura mínima <strong>10,7 m</strong> en la zona de cruce.</li>
              <li>BT cruzando vías con tensión de contacto ≥ 1.500 V: cruce <strong>subterráneo</strong> obligatorio.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Cruces Subterráneos con Otros Servicios (7.5 – 7.6)</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
              <li>Distancia mínima a gas, agua, alcantarillado: <strong>0,20 m</strong>; si no es posible, separación con ladrillos dieléctricos ≥ 5 cm.</li>
              <li>Separación con instalaciones de combustibles líquidos: <strong>1 m</strong>.</li>
              <li>Cruces con líneas AT o tensión reducida: distancia mínima <strong>20 cm</strong>; línea de mayor tensión a mayor profundidad.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 8. Instalaciones Subacuáticas */}
      <CollapsibleSection title="8. Instalaciones Subacuáticas" icon={Cable}>
        <p className="text-sm text-foreground/80">
          Las líneas eléctricas de BT y MT cuyo trazado pase por fondos acuáticos (marinos, lacustres o fluviales) deberán cumplir
          con las disposiciones del <strong>punto 6 del RPTD N° 11</strong>.
        </p>
      </CollapsibleSection>
    </div>
  );
};

export default PliegoRPTD13;
