import { CandidateRepository, CandidateFilters } from '../data/repositories/candidate.repository';
import { Candidate, CandidateStatus } from '../data/models/candidate.model';

export class CandidateService {
  private repository: CandidateRepository;

  constructor() {
    this.repository = new CandidateRepository();
  }

  async getCandidates(filters?: CandidateFilters): Promise<Candidate[]> {
    return this.repository.findAll(filters);
  }

  async getCandidateById(id: string): Promise<Candidate | null> {
    return this.repository.findById(id);
  }

  async updateStatus(id: string, status: CandidateStatus, rejectionNote?: string): Promise<Candidate> {
    const candidate = await this.repository.findById(id);
    if (!candidate) {
      throw new Error('Candidate not found');
    }

    if (status === CandidateStatus.REJECTED && !rejectionNote) {
      throw new Error('Rejection note is required when rejecting a candidate');
    }

    // Force note to be null if not rejected?
    const noteToSave = status === CandidateStatus.REJECTED ? rejectionNote : null;

    return this.repository.updateStatus(id, status, noteToSave);
  }
}
