import { BookOpen, AlertTriangle, Ruler, Wind, Zap, TreePine, Building2, Lightbulb } from "lucide-react";

const PliegoRPTD07 = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10">
            <Ruler className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">RPTD N° 07 — Franja y Distancias de Seguridad</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Resolución Exenta N° 33.277 (10/09/2020), modificada por R.E. N° 11.682 (07/04/2022) — SEC
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="eng-badge eng-badge-primary">DFL N° 4/20.018</span>
              <span className="eng-badge eng-badge-primary">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-warning">Transporte y Distribución</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Objetivo y Alcance */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <BookOpen className="w-5 h-5 text-primary" />
          1. Objetivo
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Definir la franja y las distancias de seguridad de las líneas de transporte y de distribución de energía eléctrica, incluyendo las de alumbrado público.
        </p>
        <h3 className="eng-section-title mt-6">
          <BookOpen className="w-5 h-5 text-primary" />
          2. Alcance
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Este pliego técnico aplica a las líneas de transporte y de distribución de energía eléctrica.
        </p>
      </div>

      {/* 3. Terminología */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <BookOpen className="w-5 h-5 text-primary" />
          3. Terminología y Definiciones
        </h3>
        <div className="space-y-3">
          {[
            { term: "3.1. Distancia de seguridad", def: "Distancia a un conductor energizado, que minimiza el riesgo de accidente de personas por acercamiento, o una descarga a elementos a potencial cero." },
            { term: "3.2. Franja de seguridad", def: "Área de exclusión, de una línea eléctrica, de edificios u otras construcciones o plantaciones fuera de norma o antirreglamentarias, cuyo fin es garantizar que no existan riesgos para la seguridad tanto de las personas como de las instalaciones que conforman dicha línea." },
            { term: "3.3. Flecha de un conductor", def: "En un vano de una línea aérea, es la distancia medida entre la línea recta imaginaria que une los apoyos del conductor y la tangente al conductor paralela a ella." },
            { term: "3.4. Flecha máxima de un conductor", def: "Es la flecha del conductor en reposo en la condición de corriente máxima y de temperatura ambiente de diseño de la línea." },
          ].map((item, i) => (
            <div key={i} className="eng-definition">
              <p className="font-semibold text-sm text-foreground">{item.term}</p>
              <p className="text-foreground/70 text-sm">{item.def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Franja de Seguridad */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Ruler className="w-5 h-5 text-primary" />
          4. Franja de Seguridad
        </h3>

        {/* 4.1 - 4.2 Fórmula principal */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">4.1 – 4.2 Cálculo de D<sub>eL</sub></h4>
          <p className="text-foreground/80 text-sm mb-3">
            Los límites laterales de la franja de seguridad serán rectas paralelas al eje del trazado de la línea eléctrica. Para un vano de una línea eléctrica aérea de corriente alterna:
          </p>
          <div className="eng-formula">
            <p className="text-base font-semibold text-center mb-3">
              D<sub>eL</sub> = d<sub>E</sub> + d<sub>f</sub> + d<sub>c</sub> + d<sub>s</sub> &nbsp;(metros)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {[
              { var: "dE", desc: "Distancia entre el eje de la estructura más espaciosa y el punto de fijación del conductor más externo." },
              { var: "df", desc: "Proyección sobre el suelo de la desviación, debido al viento, de la flecha del conductor más alejado del eje." },
              { var: "dc", desc: "Proyección sobre el suelo de la desviación, debido al viento, de la cadena de aisladores de suspensión." },
              { var: "ds", desc: "Distancia de seguridad asociada al conductor más alejado del eje (según punto 4.5)." },
            ].map((v, i) => (
              <div key={i} className="bg-muted/50 rounded-lg p-3">
                <p className="font-mono text-sm font-semibold text-primary">{v.var}</p>
                <p className="text-foreground/70 text-xs mt-1">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Caso sin conductores */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">Caso sin conductores en un lado</h4>
          <p className="text-foreground/80 text-sm mb-3">
            En caso de no existir conductores en el lado donde se calcula, D<sub>eL</sub> será el mayor valor entre:
          </p>
          <div className="eng-formula space-y-2">
            <p className="font-semibold text-center">
              D<sub>eL1</sub> = d<sub>f</sub>' + d<sub>c</sub>' + d<sub>s</sub>' − d<sub>E1</sub>' &nbsp;(metros)
            </p>
            <p className="font-semibold text-center">
              D<sub>eL2</sub> = d<sub>E2</sub>' + 2 &nbsp;(metros)
            </p>
          </div>
          <div className="eng-note mt-3">
            <p className="text-sm"><strong>Nota:</strong> Para líneas de baja y media tensión, la franja del lado sin conductor se calcula solo con D<sub>eL1</sub>.</p>
          </div>
        </div>

        {/* 4.3 Presiones de viento */}
        <div className="mb-6">
          <h4 className="eng-subsection-title flex items-center gap-2">
            <Wind className="w-4 h-4" />
            4.3 Desviación de Conductores – Presiones de Viento
          </h4>

          <p className="text-foreground/80 text-sm mb-3">
            Los conductores se supondrán desviados por la presión de viento según:
          </p>

          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead>
                <tr>
                  <th>Zona (según 5.8.1 RPTD N°11)</th>
                  <th>Presión de viento (kg/m²)</th>
                  <th>Temperatura ambiente (°C)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Zona II</td><td className="font-mono font-semibold">50</td><td className="font-mono">5</td></tr>
                <tr><td>Zona III</td><td className="font-mono font-semibold">40</td><td className="font-mono">10</td></tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <p className="text-sm text-foreground/80 mb-2">
              Para alturas h<sub>c</sub> &gt; 50 m, las presiones se amplifican por el factor G<sub>c</sub>:
            </p>
            <div className="eng-formula space-y-1">
              <p><strong>Zona II:</strong> G<sub>c</sub> = 0,2914 × Ln(h<sub>c</sub>) + 1,0468</p>
              <p><strong>Zona III:</strong> G<sub>c</sub> = 0,4936 × Ln(h<sub>c</sub>) + 0,9124</p>
            </div>
          </div>

          <h5 className="font-semibold text-sm mt-4 mb-2 text-foreground">Factores de reducción por longitud de vano (Tabla N° 2)</h5>
          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead>
                <tr><th>Vano (m)</th><th>Factor</th></tr>
              </thead>
              <tbody>
                <tr><td>&lt; 250</td><td className="font-mono font-semibold">1,0</td></tr>
                <tr><td>250 – 500</td><td className="font-mono font-semibold">0,9</td></tr>
                <tr><td>&gt; 500</td><td className="font-mono font-semibold">0,8</td></tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-2 text-sm text-foreground/80">
            <p>• Presión de viento sobre la cadena de aisladores = presión sobre conductor × <strong>1,2</strong></p>
            <p>• Tensión mecánica máxima admitida: <strong>50%</strong> de la tensión de ruptura del conductor.</p>
            <p>• Con manguito de hielo: hasta <strong>70%</strong> de la tensión de ruptura.</p>
          </div>
        </div>

        {/* 4.4 Flecha del conductor */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">4.4 Consideraciones para la Flecha del Conductor</h4>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2">
            <li>Utilizar el tiro mecánico en el punto donde se produce la flecha, suponiendo el conductor a temperatura de máxima potencia de diseño.</li>
            <li>Considerar la fuerza resultante: peso del conductor + sobrecarga de viento + hielo (si corresponde).</li>
            <li>La sobrecarga de viento según 4.3; sobrecarga por hielo según estudio.</li>
          </ul>
        </div>

        {/* 4.5 Tabla N°3 – Distancias de seguridad */}
        <div className="mb-6">
          <h4 className="eng-subsection-title flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-engineering-warning" />
            4.5 Distancias de Seguridad – Tabla N° 3
          </h4>
          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead>
                <tr>
                  <th>Tensión Máxima de la Línea (kV)</th>
                  <th>Distancia de Seguridad (m)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hasta 1", "1,50"],
                  ["Sobre 1 y hasta 36", "2,00"],
                  ["Sobre 36 y hasta 52", "2,48"],
                  ["Sobre 52 y hasta 72,5", "2,63"],
                  ["Sobre 72,5 y hasta 123", "3,10"],
                  ["Sobre 123 y hasta 145", "3,30"],
                  ["Sobre 145 y hasta 170", "3,50"],
                  ["Sobre 170 y hasta 245", "4,10"],
                  ["Sobre 245 y hasta 300", "5,10"],
                  ["Sobre 300 y hasta 362", "5,60"],
                  ["Sobre 362 y hasta 420", "6,20"],
                  ["Sobre 420 y hasta 550", "7,00"],
                  ["Sobre 550 y hasta 800", "11,40"],
                ].map(([tension, dist], i) => (
                  <tr key={i}>
                    <td>{tension}</td>
                    <td className="font-mono font-semibold">{dist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="eng-note mt-3">
            <p className="text-sm"><strong>4.6:</strong> Para altitudes &gt; 1.000 m.s.n.m., corregir según punto 5.6 (incremento 3% cada 300 m sobre 1.000 m).</p>
          </div>
        </div>

        {/* 4.7 Campo electromagnético */}
        <div className="mb-6">
          <h4 className="eng-subsection-title flex items-center gap-2">
            <Zap className="w-4 h-4 text-engineering-warning" />
            4.7 Límites de Campo Electromagnético
          </h4>
          <p className="text-sm text-foreground/80 mb-3">
            Evaluado en el exterior de la franja de seguridad, a 1 m sobre el nivel del suelo, conductores en reposo (50 Hz):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">5 kV/m</p>
              <p className="text-xs text-muted-foreground mt-1">Campo eléctrico (RMS)</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">100 μT</p>
              <p className="text-xs text-muted-foreground mt-1">Campo magnético (RMS)</p>
            </div>
          </div>
        </div>

        {/* 4.9 - 4.15 Restricciones */}
        <div className="mb-6">
          <h4 className="eng-subsection-title flex items-center gap-2">
            <TreePine className="w-4 h-4" />
            4.9 – 4.15 Restricciones dentro de la Franja
          </h4>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2">
            <li>No se permite edificios, plantaciones, construcciones u obras que perturben la operación.</li>
            <li>No se permiten corrales, huertos, parques, jardines o patios dentro de la franja (excepto baja tensión).</li>
            <li>Excepcionalmente árboles/arbustos si cumplen distancias verticales mínimas.</li>
            <li>No modificar niveles del suelo que afecten estabilidad de estructuras.</li>
            <li>No almacenar combustibles sólidos, líquidos, gaseosos o volátiles inflamables.</li>
            <li>No emplazar riego por aspersión con cañón de gran alcance.</li>
            <li>No estacionar maquinaria de gran altura que disminuya distancias de seguridad.</li>
          </ul>
          <div className="eng-note mt-3">
            <p className="text-sm"><strong>Árboles (4.10):</strong> Distancia vertical mínima: <strong>2,00 m</strong> (BT/MT) o <strong>2,50 m + 0,01 m/kV</strong> (AT/EAT), en flecha máxima a 15°C.</p>
          </div>
        </div>
      </div>

      {/* 5. Distancias de seguridad > 23 kV */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Zap className="w-5 h-5 text-primary" />
          5. Distancias de Seguridad en Líneas Aéreas &gt; 23 kV
        </h3>

        {/* 5.2 Tabla N°4 */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.2 Distancia Mínima a Estructuras – Tabla N° 4</h4>
          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead>
                <tr>
                  <th>Tensión Nominal (kV)</th>
                  <th>D<sub>SW</sub> Sobretensión Transiente (mm)</th>
                  <th>D<sub>FI</sub> Frecuencia Industrial (mm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [33, 220, 100], [44, 295, 140], [66, 450, 225],
                  [110, 720, 370], [154, "1.120", 510], [220, "1.800", 750],
                  [345, "2.600", "1.200"], [500, "3.950", "1.600"],
                  [750, "5.700", "2.850"], [1000, "7.750", "3.810"],
                ].map(([kv, dsw, dfi], i) => (
                  <tr key={i}>
                    <td className="font-mono">{kv}</td>
                    <td className="font-mono font-semibold">{dsw}</td>
                    <td className="font-mono font-semibold">{dfi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="eng-note mt-3">
            <p className="text-sm">Para alturas &gt; 1.000 m.s.n.m., corregir valores según punto 5.6.</p>
          </div>
        </div>

        {/* 5.3 Aplicación de espaciamientos */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.3 Aplicación de Espaciamientos Mínimos</h4>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-2">
            <li><strong>D<sub>fi</sub>:</strong> Cadena desviada por la presión de viento completa (4.3) a temperatura ambiente.</li>
            <li><strong>D<sub>sw</sub>:</strong> Cadena desviada por <strong>1/4</strong> de la presión de viento (4.3) a 0°C.</li>
          </ul>
        </div>

        {/* 5.4 Separación fase-fase */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.4 Separación Mínima Fase–Fase (Zonas II y III)</h4>
          <div className="eng-formula">
            <p className="text-center font-semibold">
              Separación (m) = 0,36 × √F + kV/130 + 0,5 × C
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-mono text-sm font-semibold text-primary">F</p>
              <p className="text-xs text-foreground/70">Flecha máxima (m) sin sobrecarga</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-mono text-sm font-semibold text-primary">kV</p>
              <p className="text-xs text-foreground/70">Tensión nominal entre conductores (kV)</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="font-mono text-sm font-semibold text-primary">C</p>
              <p className="text-xs text-foreground/70">Longitud cadena de aisladores de suspensión (m)</p>
            </div>
          </div>
        </div>

        {/* 5.6 Corrección por altitud */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.6 Corrección por Altitud</h4>
          <div className="eng-formula">
            <p className="text-center">
              Incremento: <strong>3%</strong> por cada 300 m por encima de 1.000 m.s.n.m.
            </p>
          </div>
        </div>

        {/* 5.7 Altura mínima sobre suelo – Tabla N°5 */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.7 Altura Mínima sobre el Suelo – Tabla N° 5</h4>
          <p className="text-sm text-foreground/80 mb-3">Flecha máxima del conductor, temperatura ambiente 15°C:</p>
          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead>
                <tr><th>Lugar</th><th>Distancia vertical (m)</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Regiones poco transitables (montañas, praderas, cursos de agua no navegables)</td>
                  <td className="font-mono font-semibold">6,00 + 0,006/kV</td>
                </tr>
                <tr>
                  <td>Regiones transitables (localidades, carreteras, autopistas, calles)</td>
                  <td className="font-mono font-semibold">6,50 + 0,006/kV</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5.8 Generadores eólicos */}
        <div className="mb-6">
          <h4 className="eng-subsection-title">5.8 Distancia a Generadores Eólicos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold text-sm text-foreground">Sin protección antivibración</p>
              <p className="text-xl font-mono font-bold text-primary mt-1">L ≥ 3D</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-semibold text-sm text-foreground">Con protección antivibración</p>
              <p className="text-xl font-mono font-bold text-primary mt-1">L ≥ D</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Distancias ≤ 23 kV */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border eng-section">
        <h3 className="eng-section-title">
          <Building2 className="w-5 h-5 text-primary" />
          6. Distancias de Seguridad en Líneas ≤ 23 kV
        </h3>

        <div className="mb-6">
          <h4 className="eng-subsection-title">6.1 Separación Horizontal Mínima en Soportes Fijos</h4>
          <div className="overflow-x-auto">
            <table className="eng-table">
              <thead>
                <tr><th>Tipo de Línea</th><th>Separación mínima (mm)</th></tr>
              </thead>
              <tbody>
                <tr><td>Baja tensión</td><td className="font-mono font-semibold">150</td></tr>
                <tr><td>Media tensión hasta 15 kV</td><td className="font-mono font-semibold">300</td></tr>
                <tr><td>Media tensión &gt; 15 kV hasta 23 kV</td><td className="font-mono font-semibold">380</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="eng-subsection-title">6.2 Separación Vertical Mínima – Tabla N° 6</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr>
                  <th>Cond. en nivel inferior</th>
                  <th>BT (m)</th>
                  <th>MT ≤ 15 kV (m)</th>
                  <th>MT &gt; 15 – 23 kV (m)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Tensión reducida</td><td className="font-mono">1,0</td><td className="font-mono">1,5</td><td className="font-mono">1,5</td></tr>
                <tr><td>Baja tensión</td><td className="font-mono">0,4</td><td className="font-mono">1,0</td><td className="font-mono">1,0</td></tr>
                <tr><td>MT ≤ 15 kV</td><td className="font-mono">—</td><td className="font-mono">1,0</td><td className="font-mono">1,0</td></tr>
                <tr><td>MT &gt; 15 kV – 23 kV</td><td className="font-mono">—</td><td className="font-mono">—</td><td className="font-mono">1,0</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="eng-subsection-title">6.3 Altura Mínima sobre el Suelo – Tabla N° 8</h4>
          <div className="overflow-x-auto">
            <table className="eng-table text-xs">
              <thead>
                <tr>
                  <th>Lugar</th>
                  <th>Tirantes/CG (m)</th>
                  <th>BT aislados (m)</th>
                  <th>BT desnudos (m)</th>
                  <th>MT aislados (m)</th>
                  <th>MT desnudos (m)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Regiones transitables</td>
                  <td className="font-mono">5</td>
                  <td className="font-mono">5</td>
                  <td className="font-mono">5,5</td>
                  <td className="font-mono">6</td>
                  <td className="font-mono">6,5</td>
                </tr>
                <tr>
                  <td>Regiones poco transitables</td>
                  <td className="font-mono">4,6</td>
                  <td className="font-mono">4,6</td>
                  <td className="font-mono">5</td>
                  <td className="font-mono">5,5</td>
                  <td className="font-mono">6</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 7. Alumbrado Público */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <h3 className="eng-section-title">
          <Lightbulb className="w-5 h-5 text-primary" />
          7. Distancias Mínimas de Seguridad en Alumbrado Público
        </h3>
        <div className="overflow-x-auto">
          <table className="eng-table">
            <thead>
              <tr><th>Rango de voltaje (kV)</th><th>Distancia mínima (m)</th></tr>
            </thead>
            <tbody>
              <tr><td>Mayor a 1 kV hasta 15 kV</td><td className="font-mono font-semibold">0,7</td></tr>
              <tr><td>Mayor a 15 kV hasta 23 kV</td><td className="font-mono font-semibold">0,8</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PliegoRPTD07;
