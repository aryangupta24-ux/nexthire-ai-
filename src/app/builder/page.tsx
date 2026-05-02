"use client";

import { useState } from "react";
import { ResumeData, initialResumeData } from "@/types/resume";
import ResumeForm from "@/components/ResumeForm";
import LivePreview from "@/components/LivePreview";
import { Sparkles, Download, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isExporting, setIsExporting] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  const handleExportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById("resume-preview");
    if (!element) {
      setIsExporting(false);
      return;
    }
    
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personalInfo.fullName || "resume"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const calculateAtsScore = () => {
    let score = 0;
    if (resumeData.personalInfo.fullName) score += 10;
    if (resumeData.personalInfo.email && resumeData.personalInfo.phone) score += 10;
    if (resumeData.summary.length > 50) score += 20;
    if (resumeData.experience.length > 0) score += 30;
    if (resumeData.education.length > 0) score += 10;
    if (resumeData.skills.length > 10) score += 20;
    setAtsScore(score);
  };

  return (
    <div className="min-h-screen flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between glass z-10 shrink-0 border-b border-border/50">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="text-primary w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">NextHire AI</span>
        </Link>
        <div className="flex items-center gap-4">
          {atsScore !== null && (
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${atsScore >= 80 ? 'bg-green-500/20 text-green-400' : atsScore >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
              ATS Score: {atsScore}
            </div>
          )}
          <button 
            onClick={calculateAtsScore}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-card/80 border border-border transition-colors text-sm font-medium"
          >
            <LayoutDashboard className="w-4 h-4" /> Check ATS Score
          </button>
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> {isExporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Form Panel */}
        <section className="w-full md:w-1/2 h-full overflow-y-auto p-6 border-r border-border/50 custom-scrollbar">
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </section>

        {/* Preview Panel */}
        <section className="hidden md:flex w-1/2 h-full overflow-y-auto p-8 bg-muted/10 custom-scrollbar justify-center items-start">
          <LivePreview data={resumeData} />
        </section>
      </main>
    </div>
  );
}
