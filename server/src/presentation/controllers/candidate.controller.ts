import { Request, Response } from 'express';
import { CandidateService } from '../../services/candidate.service';
import { CandidateStatus, ExperienceLevel } from '../../data/models/candidate.model';
import { CandidateFilters } from '../../data/repositories/candidate.repository';

export class CandidateController {
  private service: CandidateService;

  constructor() {
    this.service = new CandidateService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const filters: CandidateFilters = {
        search: req.query.search as string,
        // Optional: Add proper validation that these strings match Enum values
        status: req.query.status as CandidateStatus,
        experienceLevel: req.query.experienceLevel as ExperienceLevel,
        sort: req.query.sort as 'asc' | 'desc',
      };
      const candidates = await this.service.getCandidates(filters);
      res.json({ data: candidates });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const candidate = await this.service.getCandidateById(id);
      if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
      res.json({ data: candidate });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, rejectionNote } = req.body;

      if (!status) {
         return res.status(400).json({ error: 'Status is required' });
      }

      const updated = await this.service.updateStatus(id, status, rejectionNote);
      res.json({ data: updated });
    } catch (error: any) {
      // Basic approach: if service throws "Candidate not found", 404 would be better, but 400 covers "Bad Request" logic too.
      // Differentiating errors would require customError classes.
      // For now, checks message.
      if (error.message === 'Candidate not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };
}
