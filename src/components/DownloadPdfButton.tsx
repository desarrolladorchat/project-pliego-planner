import { Download } from "lucide-react";
import { pdfLinks } from "@/lib/pdfLinks";

const DownloadPdfButton = ({ pliegoId }: { pliegoId: string }) => {
  const pdf = pdfLinks[pliegoId];
  if (!pdf) return null;

  return (
    <a
      href={pdf.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
    >
      <Download className="w-3.5 h-3.5" />
      Descargar PDF Oficial SEC
    </a>
  );
};

export default DownloadPdfButton;
