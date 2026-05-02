import { ResumeData } from "@/types/resume";

export default function LivePreview({ data }: { data: ResumeData }) {
  return (
    <div 
      id="resume-preview" 
      className="bg-white text-black w-full max-w-[210mm] min-h-[297mm] p-10 shadow-2xl origin-top"
      style={{ aspectRatio: "210/297" }}
    >
      {/* Header Info */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-900">{data.personalInfo.fullName || "Your Name"}</h1>
        <p className="text-gray-600 mt-1 text-lg">{data.personalInfo.jobTitle || "Job Title"}</p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 mt-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span>• {data.personalInfo.github}</span>}
        </div>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 uppercase mb-2">Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 uppercase border-b border-gray-300 mb-3 pb-1">Experience</h2>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600 font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm text-gray-700 font-medium mb-1">{exp.company}</div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap pl-4 list-disc">
                  {exp.description.split('\n').map((line, i) => (
                    line.trim() ? <li key={i}>{line.replace(/^[-*]\s*/, '')}</li> : null
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 uppercase border-b border-gray-300 mb-3 pb-1">Education</h2>
          <div className="flex flex-col gap-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <div className="text-sm text-gray-700">{edu.school}</div>
                </div>
                <span className="text-sm text-gray-600 font-medium">{edu.graduationDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 uppercase border-b border-gray-300 mb-3 pb-1">Projects</h2>
          <div className="flex flex-col gap-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  {proj.link && <span className="text-sm text-blue-600">{proj.link}</span>}
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap pl-4 list-disc">
                  {proj.description.split('\n').map((line, i) => (
                    line.trim() ? <li key={i}>{line.replace(/^[-*]\s*/, '')}</li> : null
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.skills}</p>
        </div>
      )}
    </div>
  );
}
