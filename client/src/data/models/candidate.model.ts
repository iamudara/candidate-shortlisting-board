export enum ExperienceLevel {
  Intern = 'Intern',
  Junior = 'Junior',
  Mid = 'Mid',
  Senior = 'Senior',
}

export enum CandidateStatus {
  APPLIED = 'APPLIED',
  SHORTLISTED = 'SHORTLISTED',
  REJECTED = 'REJECTED',
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
  status: CandidateStatus;
  rejectionNote?: string | null;
  createdAt: string; 
  updatedAt: string;
  // Extended details
  location?: string;
  bio?: string;
  experience: Experience[];
  education: Education[];
}

export interface CandidatesResponse {
  candidates: Candidate[];
  total: number;
}

export interface UpdateStatusRequest {
  status: CandidateStatus;
  rejectionNote?: string | null;
}
