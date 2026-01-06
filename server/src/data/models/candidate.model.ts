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

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
  education: any[]; // Using any[] for JSON fields for now, can be stricter later
  experience: any[];
  bio?: string | null;
  location?: string | null;
  status: CandidateStatus;
  rejectionNote?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
