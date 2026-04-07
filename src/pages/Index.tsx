import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Zap, Ruler, ChevronRight, Calculator, Building, Activity, Menu, X, Network, FileText, Cable, Shield, CircuitBoard, Flame, AlertTriangle, Building2, Power, Layers, Users, Wrench, FileCheck } from "lucide-react";
import PliegoRPTD01 from "@/components/PliegoRPTD01";
import PliegoRPTD02 from "@/components/PliegoRPTD02";
import PliegoRPTD03 from "@/components/PliegoRPTD03";
import PliegoRPTD04 from "@/components/PliegoRPTD04";
import PliegoRPTD05 from "@/components/PliegoRPTD05";
import PliegoRPTD06 from "@/components/PliegoRPTD06";
import PliegoRPTD07 from "@/components/PliegoRPTD07";
import PliegoRPTD08 from "@/components/PliegoRPTD08";
import PliegoRPTD09 from "@/components/PliegoRPTD09";
import PliegoRPTD10 from "@/components/PliegoRPTD10";
import PliegoRPTD11 from "@/components/PliegoRPTD11";
import PliegoRPTD12 from "@/components/PliegoRPTD12";
import PliegoRPTD13 from "@/components/PliegoRPTD13";
import PliegoRPTD14 from "@/components/PliegoRPTD14";
import PliegoRPTD15 from "@/components/PliegoRPTD15";
import PliegoRPTD16 from "@/components/PliegoRPTD16";
import CalculadoraFranja from "@/components/CalculadoraFranja";
import CalculadoraRPTD11 from "@/components/CalculadoraRPTD11";
import CalculadoraRPTD06 from "@/components/CalculadoraRPTD06";
import CalculadoraRPTD05 from "@/components/CalculadoraRPTD05";
import CalculadoraRPTD04 from "@/components/CalculadoraRPTD04";
import CalculadoraRPTD13 from "@/components/CalculadoraRPTD13";
import CalculadoraRPTD15 from "@/components/CalculadoraRPTD15";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
  {
    group: "Pliegos Técnicos",
    items: [
      { id: "rptd01", label: "RPTD N° 01", subtitle: "Tensiones y Frecuencias", icon: Activity },
      { id: "rptd02", label: "RPTD N° 02", subtitle: "Clasificación Instalaciones", icon: Network },
      { id: "rptd03", label: "RPTD N° 03", subtitle: "Proyectos y Estudios", icon: FileText },
      { id: "rptd04", label: "RPTD N° 04", subtitle: "Conductores", icon: Cable },
      { id: "rptd05", label: "RPTD N° 05", subtitle: "Aislación", icon: Shield },
      { id: "rptd06", label: "RPTD N° 06", subtitle: "Puesta a Tierra", icon: CircuitBoard },
      { id: "rptd07", label: "RPTD N° 07", subtitle: "Franja y Distancias", icon: Ruler },
      { id: "rptd08", label: "RPTD N° 08", subtitle: "Protección contra Incendios", icon: Flame },
      { id: "rptd09", label: "RPTD N° 09", subtitle: "Señalización de Seguridad", icon: AlertTriangle },
      { id: "rptd10", label: "RPTD N° 10", subtitle: "Centrales y Subestaciones", icon: Building2 },
      { id: "rptd11", label: "RPTD N° 11", subtitle: "Líneas AT y EAT", icon: Zap },
      { id: "rptd12", label: "RPTD N° 12", subtitle: "Líneas Distribución MT", icon: Power },
      { id: "rptd13", label: "RPTD N° 13", subtitle: "Líneas MT y BT", icon: Layers },
      { id: "rptd14", label: "RPTD N° 14", subtitle: "Apoyo en Postes", icon: Users },
      { id: "rptd15", label: "RPTD N° 15", subtitle: "Operación y Mantenimiento", icon: Wrench },
      { id: "rptd16", label: "RPTD N° 16", subtitle: "Puesta en Servicio", icon: FileCheck },
    ],
  },
  {
    group: "Calculadoras",
    items: [
      { id: "calculadora", label: "Calc. Franja", subtitle: "RPTD N° 07", icon: Calculator },
      { id: "calculadora11", label: "Calc. RPTD 11", subtitle: "Líneas AT/EAT", icon: Building },
      { id: "calculadora04", label: "Calc. Conductores", subtitle: "RPTD N° 04", icon: Cable },
      { id: "calculadora06", label: "Calc. PAT", subtitle: "RPTD N° 06", icon: CircuitBoard },
      { id: "calculadora05", label: "Calc. Aislación", subtitle: "RPTD N° 05", icon: Shield },
      { id: "calculadora13", label: "Calc. MT/BT", subtitle: "RPTD N° 13", icon: Layers },
      { id: "calculadora15", label: "Calc. Distancias", subtitle: "RPTD N° 15", icon: Wrench },
    ],
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("rptd01");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1.5 rounded-md hover:bg-muted transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <a href="https://transmissionline.cl/" target="_blank" rel="noopener noreferrer">
                <img src="/logo-trli.png" alt="TransmissionLine Logo" className="h-7 sm:h-9 w-auto flex-shrink-0 object-contain cursor-pointer hover:opacity-80 transition-opacity" />
              </a>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-bold text-foreground leading-tight truncate">
                  Pliegos Técnicos Normativos
                </h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                  SEC — Superintendencia de Electricidad y Combustibles
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="eng-badge eng-badge-primary">RPTD</span>
              <span>Decreto N° 109/2017</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-64 bg-card border-r border-border
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}>
          <ScrollArea className="h-full">
            <div className="p-3 space-y-4">
              {sidebarItems.map((group) => (
                <div key={group.group}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-1.5">
                    {group.group}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <div className="text-left min-w-0">
                            <span className="block text-sm font-medium leading-tight truncate">{item.label}</span>
                            <span className={`block text-[10px] leading-tight truncate ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              {item.subtitle}
                            </span>
                          </div>
                          {isActive && <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
            {activeTab === "rptd01" && <PliegoRPTD01 />}
            {activeTab === "rptd02" && <PliegoRPTD02 />}
            {activeTab === "rptd03" && <PliegoRPTD03 />}
            {activeTab === "rptd04" && <PliegoRPTD04 />}
            {activeTab === "rptd05" && <PliegoRPTD05 />}
            {activeTab === "rptd06" && <PliegoRPTD06 />}
            {activeTab === "rptd07" && <PliegoRPTD07 />}
            {activeTab === "rptd08" && <PliegoRPTD08 />}
            {activeTab === "rptd09" && <PliegoRPTD09 />}
            {activeTab === "rptd10" && <PliegoRPTD10 />}
            {activeTab === "rptd11" && <PliegoRPTD11 />}
            {activeTab === "rptd12" && <PliegoRPTD12 />}
            {activeTab === "rptd13" && <PliegoRPTD13 />}
            {activeTab === "rptd14" && <PliegoRPTD14 />}
            {activeTab === "rptd15" && <PliegoRPTD15 />}
            {activeTab === "rptd16" && <PliegoRPTD16 />}
            {activeTab === "calculadora" && <CalculadoraFranja />}
            {activeTab === "calculadora11" && <CalculadoraRPTD11 />}
            {activeTab === "calculadora06" && <CalculadoraRPTD06 />}
            {activeTab === "calculadora04" && <CalculadoraRPTD04 />}
            {activeTab === "calculadora05" && <CalculadoraRPTD05 />}
            {activeTab === "calculadora15" && <CalculadoraRPTD15 />}
            {activeTab === "calculadora13" && <CalculadoraRPTD13 />}
          </div>

          {/* Footer */}
          <footer className="border-t border-border bg-card mt-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <p className="text-xs text-muted-foreground text-center">
                Referencia normativa para diseño de líneas eléctricas — Basado en Pliegos Técnicos RPTD de la SEC, Chile.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
