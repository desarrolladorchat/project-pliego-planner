import { Zap, Calculator, BookOpen, FileText, ArrowRight, Shield, Activity, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "16 Pliegos Técnicos RPTD",
    description: "Acceso completo a los pliegos normativos del Decreto 109/2017, organizados por secciones con tablas, fórmulas y criterios de diseño.",
  },
  {
    icon: Calculator,
    title: "7 Calculadoras Especializadas",
    description: "Herramientas de cálculo interactivas para franja de seguridad, conductores, aislación, puesta a tierra, líneas AT/EAT y MT/BT.",
  },
  {
    icon: FileText,
    title: "PDFs Oficiales SEC",
    description: "Descarga directa de cada pliego técnico normativo desde la fuente oficial de la Superintendencia de Electricidad y Combustibles.",
  },
  {
    icon: Shield,
    title: "Verificación Normativa",
    description: "Cada calculadora valida automáticamente el cumplimiento de los criterios normativos con indicadores visuales de aprobación.",
  },
];

const pliegos = [
  { num: "01", title: "Tensiones y Frecuencias" },
  { num: "02", title: "Clasificación Instalaciones" },
  { num: "03", title: "Proyectos y Estudios" },
  { num: "04", title: "Conductores" },
  { num: "05", title: "Aislación" },
  { num: "06", title: "Puesta a Tierra" },
  { num: "07", title: "Franja y Distancias" },
  { num: "08", title: "Protección contra Incendios" },
  { num: "09", title: "Señalización de Seguridad" },
  { num: "10", title: "Centrales y Subestaciones" },
  { num: "11", title: "Líneas AT y EAT" },
  { num: "12", title: "Líneas Multitensión" },
  { num: "13", title: "Líneas MT y BT" },
  { num: "14", title: "Apoyo en Postes" },
  { num: "15", title: "Operación y Mantenimiento" },
  { num: "16", title: "Puesta en Servicio" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="flex items-center gap-3 mb-6">
            <a href="https://transmissionline.cl/" target="_blank" rel="noopener noreferrer">
              <img src="/logo-trli.png" alt="TransmissionLine Logo" className="h-10 sm:h-14 w-auto object-contain hover:opacity-80 transition-opacity" />
            </a>
          </div>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="eng-badge eng-badge-primary">RPTD</span>
              <span className="eng-badge eng-badge-warning">Decreto N° 109/2017</span>
              <span className="eng-badge eng-badge-primary">SEC Chile</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              Pliegos Técnicos Normativos
              <span className="block text-primary mt-1">para Ingeniería Eléctrica</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Plataforma de referencia y cálculo basada en los 16 Pliegos Técnicos RPTD de la Superintendencia de Electricidad y Combustibles. 
              Diseñada para ingenieros eléctricos que trabajan en proyectos de producción, transporte y distribución de energía eléctrica en Chile.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/app")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md"
              >
                <Zap className="w-4 h-4" />
                Acceder a la Plataforma
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://www.sec.cl/decreto-n109-aprueba-reglamento-de-seguridad-de-las-instalaciones-electricas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
              >
                <FileText className="w-4 h-4" />
                Fuente Oficial SEC
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-8">¿Qué ofrece esta herramienta?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1.5">{f.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pliegos Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pliegos Técnicos RPTD N° 01 al 16</h2>
        <p className="text-muted-foreground text-sm mb-8">
          Cada pliego contiene las exigencias normativas, tablas de referencia y criterios de diseño según el Decreto 109/2017.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {pliegos.map((p) => (
            <button
              key={p.num}
              onClick={() => navigate(`/app?tab=rptd${p.num}`)}
              className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all text-left group"
            >
              <span className="text-xs font-bold text-primary">RPTD N° {p.num}</span>
              <p className="text-sm font-medium text-foreground mt-1 group-hover:text-primary transition-colors">{p.title}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Calculators */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Calculadoras de Verificación</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Herramientas interactivas que verifican el cumplimiento normativo con resultados instantáneos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "calculadora", label: "Franja de Seguridad", pliego: "RPTD 07", icon: Activity },
              { id: "calculadora11", label: "Líneas AT/EAT", pliego: "RPTD 11", icon: Zap },
              { id: "calculadora04", label: "Conductores", pliego: "RPTD 04", icon: Layers },
              { id: "calculadora05", label: "Aislación", pliego: "RPTD 05", icon: Shield },
              { id: "calculadora06", label: "Puesta a Tierra", pliego: "RPTD 06", icon: Activity },
              { id: "calculadora13", label: "Líneas MT/BT", pliego: "RPTD 13", icon: Layers },
              { id: "calculadora15", label: "Distancias de Seguridad", pliego: "RPTD 15", icon: Shield },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/app?tab=${c.id}`)}
                className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 hover:shadow-md transition-all text-left flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <c.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.label}</p>
                  <span className="text-xs text-muted-foreground">{c.pliego}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>Referencia normativa para diseño de líneas eléctricas — Basado en Pliegos Técnicos RPTD de la SEC, Chile.</p>
            <a href="https://transmissionline.cl/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              transmissionline.cl
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
