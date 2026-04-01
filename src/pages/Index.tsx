import { useState } from "react";
import { Zap, Ruler, FileText, ChevronRight } from "lucide-react";
import PliegoRPTD07 from "@/components/PliegoRPTD07";
import PliegoRPTD11 from "@/components/PliegoRPTD11";

const tabs = [
  {
    id: "rptd07",
    label: "RPTD N° 07",
    subtitle: "Franja y Distancias de Seguridad",
    icon: Ruler,
  },
  {
    id: "rptd11",
    label: "RPTD N° 11",
    subtitle: "Líneas AT y EAT",
    icon: Zap,
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("rptd07");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-foreground leading-tight">
                  Pliegos Técnicos Normativos
                </h1>
                <p className="text-xs text-muted-foreground">
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

      {/* Tab Navigation */}
      <nav className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="hidden md:inline text-xs opacity-80">— {tab.subtitle}</span>
                  {isActive && <ChevronRight className="w-3 h-3 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "rptd07" && <PliegoRPTD07 />}
        {activeTab === "rptd11" && <PliegoRPTD11 />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-muted-foreground text-center">
            Referencia normativa para diseño de líneas eléctricas — Basado en Pliegos Técnicos RPTD de la SEC, Chile.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
