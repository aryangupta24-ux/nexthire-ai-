"use client";

import { ResumeData } from "@/types/resume";
import { Plus, Trash2, Wand2 } from "lucide-react";
import { enhanceTextWithAI } from "@/app/actions";
import { useState } from "react";

export default function ResumeForm({ data, onChange }: { data: ResumeData, onChange: (d: ResumeData) => void }) {
  const [enhancingSection, setEnhancingSection] = useState<string | null>(null);

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const handleEnhance = async (text: string, type: string, id?: string) => {
    if (!text.trim()) return;
    setEnhancingSection(id || type);
    try {
      const enhanced = await enhanceTextWithAI(text, type);
      if (type === "summary") {
        onChange({ ...data, summary: enhanced });
      } else if (type === "experience" && id) {
        onChange({
          ...data,
          experience: data.experience.map(e => e.id === id ? { ...e, description: enhanced } : e)
        });
      } else if (type === "project" && id) {
        onChange({
          ...data,
          projects: data.projects.map(p => p.id === id ? { ...p, description: enhanced } : p)
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEnhancingSection(null);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Personal Info */}
      <section className="glass-panel p-6 rounded-xl border border-white/5">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <label className="text-xs text-muted-foreground">Full Name</label>
            <input type="text" value={data.personalInfo.fullName} onChange={(e) => updatePersonalInfo("fullName", e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <label className="text-xs text-muted-foreground">Job Title</label>
            <input type="text" value={data.personalInfo.jobTitle} onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <label className="text-xs text-muted-foreground">Email</label>
            <input type="email" value={data.personalInfo.email} onChange={(e) => updatePersonalInfo("email", e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <label className="text-xs text-muted-foreground">Phone</label>
            <input type="text" value={data.personalInfo.phone} onChange={(e) => updatePersonalInfo("phone", e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-1 col-span-2 sm:col-span-1">
            <label className="text-xs text-muted-foreground">Location</label>
            <input type="text" value={data.personalInfo.location} onChange={(e) => updatePersonalInfo("location", e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="glass-panel p-6 rounded-xl border border-white/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Professional Summary</h2>
          <button 
            onClick={() => handleEnhance(data.summary, "summary")}
            disabled={enhancingSection === "summary" || !data.summary.trim()}
            className="flex items-center gap-2 text-xs bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
          >
            <Wand2 className="w-3 h-3" /> {enhancingSection === "summary" ? "Enhancing..." : "AI Enhance"}
          </button>
        </div>
        <textarea 
          value={data.summary} 
          onChange={(e) => onChange({ ...data, summary: e.target.value })} 
          className="w-full h-24 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          placeholder="Briefly describe your professional background..."
        />
      </section>

      {/* Experience */}
      <section className="glass-panel p-6 rounded-xl space-y-6 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-foreground">Experience</h2>
          <button 
            onClick={() => onChange({ ...data, experience: [...data.experience, { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", description: "" }]})}
            className="flex items-center gap-1 text-xs bg-muted hover:bg-muted/80 px-2 py-1.5 rounded-md transition-colors"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-border/50 rounded-lg space-y-4 relative">
            <button 
              onClick={() => onChange({ ...data, experience: data.experience.filter(e => e.id !== exp.id) })}
              className="absolute top-4 right-4 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Company</label>
                <input type="text" value={exp.company} onChange={(e) => {
                  const newExp = [...data.experience]; newExp[index].company = e.target.value; onChange({ ...data, experience: newExp });
                }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Position</label>
                <input type="text" value={exp.position} onChange={(e) => {
                  const newExp = [...data.experience]; newExp[index].position = e.target.value; onChange({ ...data, experience: newExp });
                }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Start Date</label>
                <input type="text" placeholder="Jan 2020" value={exp.startDate} onChange={(e) => {
                  const newExp = [...data.experience]; newExp[index].startDate = e.target.value; onChange({ ...data, experience: newExp });
                }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">End Date</label>
                <input type="text" placeholder="Present" value={exp.endDate} onChange={(e) => {
                  const newExp = [...data.experience]; newExp[index].endDate = e.target.value; onChange({ ...data, experience: newExp });
                }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-muted-foreground">Description (Bullet points)</label>
                <button 
                  onClick={() => handleEnhance(exp.description, "experience", exp.id)}
                  disabled={enhancingSection === exp.id || !exp.description.trim()}
                  className="flex items-center gap-1 text-[10px] text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                >
                  <Wand2 className="w-3 h-3" /> {enhancingSection === exp.id ? "Enhancing..." : "AI Enhance"}
                </button>
              </div>
              <textarea 
                value={exp.description} 
                onChange={(e) => {
                  const newExp = [...data.experience]; newExp[index].description = e.target.value; onChange({ ...data, experience: newExp });
                }} 
                className="w-full h-24 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="glass-panel p-6 rounded-xl space-y-6 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-foreground">Education</h2>
          <button 
            onClick={() => onChange({ ...data, education: [...data.education, { id: Date.now().toString(), school: "", degree: "", graduationDate: "" }]})}
            className="flex items-center gap-1 text-xs bg-muted hover:bg-muted/80 px-2 py-1.5 rounded-md transition-colors"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="p-4 border border-border/50 rounded-lg grid grid-cols-2 gap-4 relative">
            <button 
              onClick={() => onChange({ ...data, education: data.education.filter(e => e.id !== edu.id) })}
              className="absolute top-4 right-4 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="space-y-1 col-span-2">
              <label className="text-xs text-muted-foreground">School / University</label>
              <input type="text" value={edu.school} onChange={(e) => {
                const newEdu = [...data.education]; newEdu[index].school = e.target.value; onChange({ ...data, education: newEdu });
              }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Degree</label>
              <input type="text" value={edu.degree} onChange={(e) => {
                const newEdu = [...data.education]; newEdu[index].degree = e.target.value; onChange({ ...data, education: newEdu });
              }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Graduation Date</label>
              <input type="text" value={edu.graduationDate} onChange={(e) => {
                const newEdu = [...data.education]; newEdu[index].graduationDate = e.target.value; onChange({ ...data, education: newEdu });
              }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="glass-panel p-6 rounded-xl space-y-6 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-foreground">Projects</h2>
          <button 
            onClick={() => onChange({ ...data, projects: [...data.projects, { id: Date.now().toString(), name: "", link: "", description: "" }]})}
            className="flex items-center gap-1 text-xs bg-muted hover:bg-muted/80 px-2 py-1.5 rounded-md transition-colors"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        {data.projects.map((proj, index) => (
          <div key={proj.id} className="p-4 border border-border/50 rounded-lg space-y-4 relative">
            <button 
              onClick={() => onChange({ ...data, projects: data.projects.filter(p => p.id !== proj.id) })}
              className="absolute top-4 right-4 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Project Name</label>
                <input type="text" value={proj.name} onChange={(e) => {
                  const newProj = [...data.projects]; newProj[index].name = e.target.value; onChange({ ...data, projects: newProj });
                }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Link</label>
                <input type="text" value={proj.link} onChange={(e) => {
                  const newProj = [...data.projects]; newProj[index].link = e.target.value; onChange({ ...data, projects: newProj });
                }} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-muted-foreground">Description</label>
                <button 
                  onClick={() => handleEnhance(proj.description, "project", proj.id)}
                  disabled={enhancingSection === proj.id || !proj.description.trim()}
                  className="flex items-center gap-1 text-[10px] text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                >
                  <Wand2 className="w-3 h-3" /> {enhancingSection === proj.id ? "Enhancing..." : "AI Enhance"}
                </button>
              </div>
              <textarea 
                value={proj.description} 
                onChange={(e) => {
                  const newProj = [...data.projects]; newProj[index].description = e.target.value; onChange({ ...data, projects: newProj });
                }} 
                className="w-full h-24 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="glass-panel p-6 rounded-xl border border-white/5">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Skills</h2>
        <textarea 
          value={data.skills} 
          onChange={(e) => onChange({ ...data, skills: e.target.value })} 
          className="w-full h-20 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          placeholder="React, Next.js, TypeScript, Tailwind CSS..."
        />
      </section>
    </div>
  );
}
