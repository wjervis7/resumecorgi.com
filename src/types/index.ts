export interface PersonalInfo {
  name: string;
  contact0: string;
  contact1: string;
  contact2: string;
  contact3: string;
  summary: string;
}

export interface Experience {
  title: string;
  company: string;
  start: string;
  end: string;
  accomplishments: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa: string;
  accomplishments: string;
}

export interface Skill {
  category: string;
  skillList: string;
}

export interface FormData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}