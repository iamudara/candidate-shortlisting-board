import { prisma } from '../prisma-client';
import { Candidate, CandidateStatus, ExperienceLevel } from '../models/candidate.model';
import { ExperienceLevel as PrismaExperienceLevel, CandidateStatus as PrismaCandidateStatus } from '@prisma/client';

export interface CandidateFilters {
  search?: string;
  status?: CandidateStatus;
  experienceLevel?: ExperienceLevel;
  sortOrder?: 'asc' | 'desc';
  sortBy?: 'createdAt' | 'name';
}

export class CandidateRepository {
  async findAll(filters?: CandidateFilters): Promise<Candidate[]> {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status as unknown as PrismaCandidateStatus;
    }
    if (filters?.experienceLevel) {
      where.experienceLevel = filters.experienceLevel as unknown as PrismaExperienceLevel;
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { role: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const sortBy = filters?.sortBy || 'createdAt';
    const sortOrder = filters?.sortOrder || 'desc';

    const candidates = await prisma.candidate.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
    });
    return candidates as unknown as Candidate[];
  }

  async findById(id: string): Promise<Candidate | null> {
    const candidate = await prisma.candidate.findUnique({
      where: { id },
    });
    return candidate as unknown as Candidate | null;
  }

  async create(data: {
    name: string;
    email: string;
    phone: string;
    role: string;
    skills: string[];
    experienceLevel: ExperienceLevel;
    status: CandidateStatus;
  }): Promise<Candidate> {
    const candidate = await prisma.candidate.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        skills: data.skills,
        experienceLevel: data.experienceLevel as unknown as PrismaExperienceLevel,
        status: data.status as unknown as PrismaCandidateStatus,
      },
    });
    return candidate as unknown as Candidate;
  }

  async updateStatus(id: string, status: CandidateStatus, rejectionNote?: string | null): Promise<Candidate> {
    const candidate = await prisma.candidate.update({
      where: { id },
      data: {
        status: status as unknown as PrismaCandidateStatus,
        rejectionNote,
      },
    });
    return candidate as unknown as Candidate;
  }
}
