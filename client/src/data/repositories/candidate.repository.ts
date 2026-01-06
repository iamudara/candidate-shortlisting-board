import api from '../sources/api';
import type { Candidate, CandidatesResponse, UpdateStatusRequest } from '../models/candidate.model';
import { CandidateStatus } from '../models/candidate.model';

export interface GetCandidatesParams {
  search?: string;
  status?: CandidateStatus | 'ALL';
  sortOrder?: 'asc' | 'desc';
  sortBy?: 'createdAt' | 'name';
}

export const fetchCandidates = async (params?: GetCandidatesParams): Promise<CandidatesResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    
    // Only append status if it's a specific status (not 'ALL' or undefined)
    if (params?.status && params.status !== 'ALL') {
      queryParams.append('status', params.status);
    }
    
    if (params?.sortOrder) {
      queryParams.append('sortOrder', params.sortOrder);
    }

    if (params?.sortBy) {
      queryParams.append('sortBy', params.sortBy);
    }

    const response = await api.get<CandidatesResponse>(`/candidates?${queryParams.toString()}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw new Error('Failed to fetch candidates. Please try again later.');
  }
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  try {
    const response = await api.get<Candidate>(`/candidates/${id}`);
    
    return response.data;
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
