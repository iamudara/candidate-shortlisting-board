import api from '../sources/api';
import type { Candidate, CandidatesResponse, UpdateStatusRequest } from '../models/candidate.model';
import { CandidateStatus } from '../models/candidate.model';

interface CandidateFilters {
  search?: string;
  status?: CandidateStatus | 'ALL';
  sort?: 'asc' | 'desc';
}

export const fetchCandidates = async (params?: CandidateFilters): Promise<CandidatesResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    
    // Only append status if it's a specific status (not 'ALL' or undefined)
    if (params?.status && params.status !== 'ALL') {
      queryParams.append('status', params.status);
    }
    
    if (params?.sort) {
      queryParams.append('sort', params.sort);
    }

    const response = await api.get<CandidatesResponse>(`/candidates?${queryParams.toString()}`);
    
    // MOCK DATA INJECTION (Temporary until backend update)
    const mockedCandidates = response.data.candidates.map(c => ({
      ...c,
      location: 'New York, USA',
      bio: 'Experienced software engineer with a passion for building scalable web applications. Proven track record of delivering high-quality code and leading teams.',
      experience: [
        {
          company: 'Tech Corp',
          role: 'Senior Developer',
          duration: '2020 - Present',
          description: 'Leading the frontend team, migrating legacy app to React.'
        },
        {
          company: 'Startup Inc',
          role: 'Full Stack Dev',
          duration: '2018 - 2020',
          description: 'Built the MVP from scratch using Node.js and React.'
        }
      ],
      education: [
        {
          degree: 'B.S. Computer Science',
          institution: 'State University',
          year: '2018'
        }
      ]
    }));

    return { ...response.data, candidates: mockedCandidates };
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw new Error('Failed to fetch candidates. Please try again later.');
  }
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  try {
    const response = await api.get<Candidate>(`/candidates/${id}`);
    
    // MOCK DATA INJECTION
    return {
      ...response.data,
      location: 'New York, USA',
      bio: 'Experienced software engineer with a passion for building scalable web applications.',
      experience: [
        {
            company: 'Tech Corp',
            role: 'Senior Developer',
            duration: '2020 - Present',
            description: 'Leading the frontend team.'
        }
      ],
      education: [
        {
            degree: 'B.S. Computer Science',
            institution: 'State University',
            year: '2018'
        }
      ]
    };
  } catch (error) {
    console.error(`Error fetching candidate ${id}:`, error);
    throw new Error('Failed to fetch candidate details.');
  }
};

export const updateCandidateStatus = async (id: string, data: UpdateStatusRequest): Promise<Candidate> => {
  try {
    const response = await api.patch<Candidate>(`/candidates/${id}/status`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating status for candidate ${id}:`, error);
    throw new Error('Failed to update candidate status.');
  }
};
