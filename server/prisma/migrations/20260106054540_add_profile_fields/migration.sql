-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('Intern', 'Junior', 'Mid');

-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('APPLIED', 'SHORTLISTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "skills" TEXT[],
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "education" JSONB[],
    "experience" JSONB[],
    "status" "CandidateStatus" NOT NULL DEFAULT 'APPLIED',
    "rejectionNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);
