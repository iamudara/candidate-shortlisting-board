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
  status: CandidateStatus;
  rejectionNote?: string | null;
  createdAt: string; 
  updatedAt: string;
}

export interface CandidatesResponse {
  candidates: Candidate[];
  total: number;
}

export interface UpdateStatusRequest {
  status: CandidateStatus;
  rejectionNote?: string | null;
}
