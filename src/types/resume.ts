export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    graduationDate: string;
  }>;
  skills: string;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    link: string;
  }>;
}

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: "",
  projects: [],
};
