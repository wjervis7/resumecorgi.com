declare global {
  interface Window {
    PdfTeXEngine: new () => PdfTeXEngine;
    pdfjsLib: {
      version: string;
      GlobalWorkerOptions: {
        workerSrc: string;
      };
    };
  }
}

export interface PdfTeXEngine {
  writeMemFSFile(fileName: string, compiledLaTeX: string): void;
  setEngineMainFile(fileName: string): void;
  compileLaTeX(): Promise<any>;
  loadEngine: () => Promise<void>;
}

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
  [key:string]: any;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export interface Sortable {
  sortable: boolean;
  originalOrder: number;
  sortOrder: number;
}

export interface NavSection extends Sortable {
  id: string;
  displayName: string;
  href: string;
  selected: boolean;
}

export interface Section extends Sortable, NavSection {
  id: string;
  displayName: string;
  href: string;
  selected: boolean;
  originalOrder: number;
  sortOrder: number;
  required: boolean;
  sortable: boolean;
}