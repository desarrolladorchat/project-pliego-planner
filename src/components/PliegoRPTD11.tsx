import { BookOpen, Wind, Zap, Shield, Building, Wrench, Mountain, Hammer, Snowflake } from "lucide-react";

const PliegoRPTD11 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <div className="flex items-start gap-2 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-foreground">RPTD N° 11 — Líneas de Alta y Extra Alta Tensión</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020), modificada por R.E. N° 11.682 (07/04/2022) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">Tensión &gt; 23 kV</span>
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-warning">Transporte</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Objetivo y Alcance */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <BookOpen className="w-5 h-5 text-primary" />
          1 – 2. Objetivo y Alcance
        </h3>
        <p className="text-foreground/80 leading-relaxed text-sm">
          Establecer los requisitos de seguridad que deberán cumplir las líneas eléctricas aéreas, subterráneas o subacuáticas, cuya tensión nominal de operación sea superior a 23.000 volts. Aplica a instalaciones de transporte de energía eléctrica.
        </p>
      </div>

      {/* 3. Referencias normativas */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <BookOpen className="w-5 h-5 text-primary" />
          3. Referencias Normativas
        </h3>
        <div className="overflow-x-auto">
          <table className="eng-table text-xs">
            <thead>
              <tr><th>Ítem</th><th>Norma</th><th>Año</th><th>Descripción</th></tr>
            </thead>
            <tbody>
              {[
                ["3.1", "IEC 60287-1-1 ed2.0", "2006", "Current rating equations (100% load factor) and losses – General"],
                ["3.2", "IEC 60287-1-2 ed1.0", "1993", "Sheath eddy current loss factors for two circuits in flat formation"],
                ["3.3", "IEC 60287-1-3 ed1.0", "2002", "Current sharing between parallel single-core cables"],
                ["3.4", "IEC 60287-2-1 ed1.1", "2001", "Thermal resistance – Calculation"],
                ["3.5", "IEC 60287-2-2 ed1.0", "1995", "Reduction factors for groups of cables in free air"],
                ["3.6", "IEC 60287-3-1 ed1.1", "1999", "Reference operating conditions and selection of cable type"],
                ["3.7", "IEC 60287-3-2 ed2.0", "2012", "Economic optimization of power cable size"],
                ["3.8", "IEC 60287-3-3 ed1.0", "2007", "Cables crossing external heat sources"],
                ["3.9", "IEC 60826 ed3.0", "2003", "Design criteria of overhead transmission lines"],
                ["3.10", "NCH 926", "1972", "Ensayo de impacto sobre probeta con entalle"],
              ].map(([item, norma, year, desc], i) => (
                <tr key={i}>
                  <td className="font-mono">{item}</td>
                  <td className="font-semibold">{norma}</td>
                  <td className="font-mono">{year}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Terminología */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <BookOpen className="w-5 h-5 text-primary" />
          4. Terminología y Definiciones (selección)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ["Aislador", "Elemento de material aislante para soportar y separar eléctricamente un conductor."],
            ["Anclaje", "Estructura para establecer puntos fijos del conductor a lo largo de la línea."],
            ["Cable de guardia", "Conductor conectado a tierra, sobre los conductores energizados, para protección contra descargas."],
            ["Haz de conductores", "Conjunto de 2+ conductores como un solo conductor, con separadores."],
            ["Flecha máxima", "Flecha del conductor en reposo en condición de corriente máxima y temp. ambiente de diseño."],
            ["Galloping", "Oscilaciones de baja frecuencia y gran amplitud debido al viento."],
            ["Sleet Jump", "Salto del conductor por desprendimiento repentino de manguito de hielo."],
            ["Coef. de seguridad", "Cociente entre capacidad máxima del sistema y requerimiento esperado real (> 1)."],
          ].map(([term, def], i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{term}</p>
              <p className="text-foreground/70 text-xs">{def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Líneas de transporte aéreas */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Shield className="w-5 h-5 text-primary" />
          5.1 – 5.7 Requisitos Básicos y Cruces
        </h3>
        <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2 mb-4">
          <li>Diseñada y construida para cumplir su propósito sin riesgo de lesiones o daños.</li>
          <li>Coordinación de tensiones mecánicas de todos los componentes.</li>
          <li>Soportes en lugares concurridos deben llevar placas de peligro (RPTD N°09).</li>
          <li>No fijar líneas de transporte a edificios (excepto explotación eléctrica).</li>
          <li>Temperatura máxima del conductor no superior a la definida por el fabricante.</li>
        </ul>

        <h4 className="eng-subsection-title mt-6">5.7 Cruces y Paralelismos</h4>
        <div className="space-y-3 text-sm text-foreground/80">
          <p><strong>5.7.5 Cruces con tensión reducida:</strong> Distancia vertical mínima = <span className="font-mono font-semibold">1,80 m + 0,01 m/kV</span>. Si distancia al punto de cruce &gt; 50 m, incrementar 0,003 m por metro de exceso.</p>
          <p><strong>5.7.6 Paralelismos:</strong> Separación mínima 1,5 × altura del apoyo más alto. Separación horizontal mínima entre conductores contiguos:</p>
          <div className="overflow-x-auto mt-2">
            <table className="eng-table">
              <thead><tr><th>Línea de referencia</th><th>Distancia mínima (m)</th></tr></thead>
              <tbody>
                <tr><td>Baja Tensión</td><td className="font-mono font-semibold">1</td></tr>
                <tr><td>Media Tensión</td><td className="font-mono font-semibold">2</td></tr>
                <tr><td>Alta Tensión o superior</td><td className="font-mono font-semibold">3</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3"><strong>5.7.7 Cruces entre líneas aéreas:</strong></p>
          <div className="eng-formula space-y-1 text-xs">
            <p><strong>Distancia horizontal (BT inferior):</strong> 1,5 + F/√2 (m)</p>
            <p><strong>Distancia horizontal (MT/AT inferior):</strong> 1,5 + F/√2 + kV/170 (m)</p>
            <p><strong>Distancia vertical (MT/AT):</strong> 1,5 + (kV<sub>s</sub> + kV<sub>i</sub>)/170 (m)</p>
          </div>
        </div>
      </div>

      {/* 5.8 Condiciones geográficas y meteorológicas */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Mountain className="w-5 h-5 text-primary" />
          5.8 Condiciones Geográficas y Meteorológicas
        </h3>

        <h4 className="eng-subsection-title">5.8.1 Zonificación del País – Tabla N° 1</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold mb-2 text-foreground">Zona I – Altitudes superiores a:</p>
            <div className="overflow-x-auto">
              <table className="eng-table text-xs">
                <thead><tr><th>Ubicación</th><th>Altitud (m)</th></tr></thead>
                <tbody>
                  <tr><td>Puerto Montt – Los Ángeles</td><td className="font-mono">600</td></tr>
                  <tr><td>Los Ángeles – La Serena</td><td className="font-mono">1.000</td></tr>
                  <tr><td>La Serena – Copiapó</td><td className="font-mono">1.500</td></tr>
                  <tr><td>Al Norte de Copiapó</td><td className="font-mono">2.000</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-semibold text-sm text-primary">Zona II</p>
              <p className="text-xs text-foreground/70">Faja costera de 20 km, entre Tongoy y Puerto Montt.</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-semibold text-sm text-primary">Zona III</p>
              <p className="text-xs text-foreground/70">Resto del país al norte del paralelo de Puerto Montt.</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-semibold text-sm text-primary">Zona IV</p>
              <p className="text-xs text-foreground/70">Resto del país al sur del paralelo de Puerto Montt.</p>
            </div>
          </div>
        </div>

        <h4 className="eng-subsection-title">5.8.2 Condiciones Meteorológicas Mínimas – Tabla N° 2</h4>
        <div className="overflow-x-auto mb-4">
          <table className="eng-table">
            <thead>
              <tr><th>Zona</th><th>Presión de viento (kg/m²)</th><th>Temperatura ambiente (°C)</th></tr>
            </thead>
            <tbody>
              <tr><td>Zona II</td><td className="font-mono font-semibold">50</td><td className="font-mono">5</td></tr>
              <tr><td>Zona III</td><td className="font-mono font-semibold">40</td><td className="font-mono">10</td></tr>
            </tbody>
          </table>
        </div>

        <h4 className="eng-subsection-title">5.8.4 Factor de Amplificación G<sub>c</sub> (h<sub>c</sub> &gt; 50 m)</h4>
        <div className="eng-formula space-y-1">
          <p><strong>Zona II:</strong> G<sub>c</sub> = 0,2914 × Ln(h<sub>c</sub>) + 1,0468</p>
          <p><strong>Zona III:</strong> G<sub>c</sub> = 0,4936 × Ln(h<sub>c</sub>) + 0,9124</p>
        </div>

        <div className="eng-note mt-4">
          <p className="text-sm"><strong>5.8.7 Zonas I y IV:</strong> Se requiere estudio climático con: estudio meteorológico, escenarios extremos, zonificación, combinaciones de cargas, riesgo de tormentas eléctricas.</p>
        </div>
      </div>

      {/* 5.9 Estructuras de soporte */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Building className="w-5 h-5 text-primary" />
          5.9 Estructuras de Soporte
        </h3>
        <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2">
          <li>Pueden ser metálicas reticuladas, postes metálicos, postes de hormigón u otro material.</li>
          <li><strong>Suspensión:</strong> Soportan esfuerzos moderados en dirección de la línea. Rectas y ángulos pequeños.</li>
          <li><strong>Anclaje:</strong> Resisten esfuerzos en múltiples direcciones, dividen la línea en sectores mecánicamente independientes.</li>
        </ul>
      </div>

      {/* 5.10 Solicitaciones estructurales */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Hammer className="w-5 h-5 text-primary" />
          5.10 Solicitaciones Estructurales
        </h3>
        <div className="mb-4">
          <p className="text-sm text-foreground/80 mb-3">Solicitaciones a considerar en el diseño:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["Viento máximo", "Ángulo", "Cortadura de conductor", "Desequilibrio de tensiones", "Tendido de conductores", "Remate", "Montaje y mantenimiento", "Hielo máximo", "Desequilibrio por hielo", "Torsión por hielo"].map((s, i) => (
              <div key={i} className="bg-muted/50 rounded px-3 py-2 text-xs font-medium text-foreground/80">
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm text-foreground/80">
          <p>• Tensión mecánica máxima: <strong>50%</strong> de la tensión de ruptura del conductor.</p>
          <p>• Con hielo: hasta <strong>70%</strong> de la tensión de ruptura.</p>
          <p>• Tensión normal a 15°C, sin sobrecarga.</p>
          <p>• Solicitaciones sísmicas no se requieren (proporcionalmente menores que peso y tensión mecánica).</p>
        </div>
      </div>

      {/* 5.11-5.12 Solicitación de viento */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Wind className="w-5 h-5 text-primary" />
          5.11 – 5.12 Solicitación de Viento
        </h3>

        <div className="mb-4 space-y-2 text-sm text-foreground/80">
          <p><strong>5.11.1 Perpendicular:</strong> Sobre soporte, crucetas, aisladores y conductores en los dos semivanos contiguos.</p>
          <p><strong>5.11.2 Paralelo:</strong> = 1/4 de la presión sobre conductores.</p>
          <p><strong>5.11.3 A 45°:</strong> Componentes proyectadas perpendicular y paralelo.</p>
          <p><strong>5.11.6:</strong> Presión sobre cadena de aisladores = presión sobre conductor × <strong>1,2</strong></p>
        </div>

        <h4 className="eng-subsection-title">5.12 Fuerza de Viento sobre la Estructura</h4>
        <div className="eng-formula">
          <p className="text-center font-semibold text-base">F<sub>z</sub> = G<sub>t</sub> × C<sub>f</sub> × q<sub>c</sub> × A<sub>f</sub></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="font-mono text-sm font-semibold text-primary">G<sub>t</sub> – Factor de turbulencia</p>
            <ul className="text-xs text-foreground/70 mt-1 space-y-1">
              <li>1,0 — Postes hormigón / circulares &lt; 50 cm</li>
              <li>1,2 — Postes circulares ≥ 50 cm</li>
              <li>1,25 — Reticuladas cuadradas/rectangulares</li>
            </ul>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="font-mono text-sm font-semibold text-primary">C<sub>f</sub> – Factor de forma</p>
            <ul className="text-xs text-foreground/70 mt-1 space-y-1">
              <li>2,0 — Postes hormigón</li>
              <li>1,4 — Poligonales ≤ 8 lados</li>
              <li>1,0 — Circulares / poligonales &gt; 8 lados</li>
            </ul>
          </div>
        </div>
        <div className="eng-formula mt-3">
          <p className="text-sm"><strong>Reticulada:</strong> C<sub>f</sub> = 4.0·e² − 5.9·e + 4.0 &nbsp;&nbsp;donde e = A<sub>f</sub>/A<sub>g</sub> (factor de solidez)</p>
        </div>
      </div>

      {/* 5.13-5.14 Cortadura */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Wrench className="w-5 h-5 text-primary" />
          5.13 – 5.14 Solicitaciones de Ángulo y Cortadura
        </h3>

        <h4 className="eng-subsection-title">5.14.6 Cortadura de Conductor (Zonas II y III) – Tabla N° 3</h4>
        <div className="overflow-x-auto mb-4">
          <table className="eng-table">
            <thead>
              <tr><th>Estructura</th><th>Conductores</th><th>Cable de Guardia</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Suspensión</td>
                <td className="font-mono">n1 × k × T<sub>n</sub></td>
                <td className="font-mono">T<sub>n</sub></td>
              </tr>
              <tr>
                <td>Anclaje y Remate</td>
                <td className="font-mono">n × T<sub>máx</sub></td>
                <td className="font-mono">T<sub>máx</sub></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/80">
          <div>
            <p><strong>n</strong> = conductores por fase</p>
            <p><strong>n1</strong> = mínimo conductores cortados en suspensión</p>
            <p><strong>T<sub>n</sub></strong> = tensión normal de cada conductor</p>
          </div>
          <div>
            <p><strong>T<sub>máx</sub></strong> = tensión máxima de cada conductor</p>
            <p><strong>k = 0,7</strong> con grampas deslizantes, crucetas móviles</p>
            <p><strong>k = 1,0</strong> en otro caso</p>
          </div>
        </div>
      </div>

      {/* 5.28 Diseño de estructuras */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Building className="w-5 h-5 text-primary" />
          5.28 Diseño de Estructuras de Soporte
        </h3>

        <h4 className="eng-subsection-title">5.28.8 Factor de Mínima Sobrecarga – Tabla N° 4</h4>
        <div className="overflow-x-auto mb-4">
          <table className="eng-table">
            <thead>
              <tr><th>Condición</th><th>Factor</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Condiciones normales (viento máximo, ángulo, desequilibrio, remate)</td>
                <td className="font-mono font-bold text-lg text-primary">1,5</td>
              </tr>
              <tr>
                <td>Hielo máximo, desequilibrio viento+hielo, remate viento+hielo</td>
                <td className="font-mono font-bold text-lg text-primary">1,4</td>
              </tr>
              <tr>
                <td>Condiciones eventuales (cortadura, mantenimiento, montaje, tendido, deseq. hielo)</td>
                <td className="font-mono font-bold text-lg text-primary">1,2</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2 text-sm text-foreground/80">
          <h4 className="eng-subsection-title">Tipos de Estructuras</h4>
          <p><strong>Reticuladas (5.28.5):</strong> Sección cuadrada/rectangular, perfiles angulares. Espesor mínimo 5 mm (principales) / 3 mm (otros). Pernos ≥ 12 mm.</p>
          <p><strong>Postes metálicos (5.28.6):</strong> Tubos laminados o lámina doblada (forma poligonal), soldadura por soldadores calificados.</p>
          <p><strong>Postes de hormigón (5.28.7):</strong> Tipo armado vibrado, coef. seguridad ≥ 2 respecto a ruptura. Longitud hasta 18 m.</p>
        </div>
      </div>

      {/* 5.21-5.24 Hielo y Galloping */}
      <div className="bg-card rounded-xl p-3 sm:p-6 shadow-sm border border-border">
        <h3 className="eng-section-title">
          <Snowflake className="w-5 h-5 text-primary" />
          5.21 – 5.24 Hielo, Galloping y Sleet Jump
        </h3>
        <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2">
          <li><strong>5.21 Hielo máximo:</strong> Cargas verticales por manguito de hielo sobre conductores y cable de guardia. Peso específico hielo: 0,9 gr/cm³.</li>
          <li><strong>5.22 Desequilibrio/torsión por hielo:</strong> Según IEC 60826.</li>
          <li><strong>5.24 Galloping y Sleet Jump:</strong> Solo en Zonas I y IV.</li>
        </ul>
      </div>
    </div>
  );
};

export default PliegoRPTD11;
