import { Request, Response } from 'express';
import { z } from 'zod';
import { CandidateService } from '../../services/candidate.service';
import { CandidateStatus, ExperienceLevel } from '../../data/models/candidate.model';
import { CandidateFilters } from '../../data/repositories/candidate.repository';

// Define Zod schemas for validation
const CandidateStatusEnum = z.nativeEnum(CandidateStatus);
const ExperienceLevelEnum = z.nativeEnum(ExperienceLevel);

const GetCandidatesQuerySchema = z.object({
  search: z.string().optional(),
  status: CandidateStatusEnum.optional(),
  experienceLevel: ExperienceLevelEnum.optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  sortBy: z.enum(['createdAt', 'name']).optional(),
});

const UpdateStatusBodySchema = z.object({
  status: CandidateStatusEnum,
  rejectionNote: z.string().optional().nullable(),
});

export class CandidateController {
  private service: CandidateService;

  constructor() {
    this.service = new CandidateService();
  }

  getAll = async (req: Request, res: Response) => {
    try {
      // Validate query parameters
      const validationResult = GetCandidatesQuerySchema.safeParse(req.query);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid query parameters', 
          details: validationResult.error.format() 
        });
      }

      // Map 'sort' query param to 'sortOrder' for backward compatibility if needed, 
      // but let's stick to the schema.
      const filters = validationResult.data as CandidateFilters;
      const candidates = await this.service.getCandidates(filters);
      res.json({ candidates, total: candidates.length });
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
      res.json(candidate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Validate request body
      const validationResult = UpdateStatusBodySchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: 'Invalid request body', 
          details: validationResult.error.format() 
        });
      }

      const { status, rejectionNote } = validationResult.data;

      // Ensure rejectionNote is undefined if missing/null to match Service signature
      const noteArg = rejectionNote === null ? undefined : rejectionNote;

      const updated = await this.service.updateStatus(id, status, noteArg);
      res.json(updated);
    } catch (error: any) {
      if (error.message === 'Candidate not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };
}
