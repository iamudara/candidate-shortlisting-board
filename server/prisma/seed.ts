import { PrismaClient, ExperienceLevel, CandidateStatus } from '@prisma/client';

const prisma = new PrismaClient();

const candidates = [
  {
    name: "Kamal Perera",
    email: "kamal.perera@email.com",
    phone: "+94 71 234 5678",
    role: "Full Stack Intern",
    skills: ["React", "Node.js", "MongoDB"],
    experienceLevel: "Intern",
    status: "APPLIED",
  },
  {
    name: "Nimali Fernando",
    email: "nimali.fernando@email.com",
    phone: "+94 77 345 6789",
    role: "Backend Developer",
    skills: ["Laravel", "PHP", "MySQL", "REST APIs"],
    experienceLevel: "Junior",
    status: "APPLIED",
  },
  {
    name: "Saman Jayasinghe",
    email: "saman.j@email.com",
    phone: "+94 76 456 7890",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    experienceLevel: "Mid",
    status: "APPLIED",
  },
  {
    name: "Kumari Silva",
    email: "kumari.silva@email.com",
    phone: "+94 70 567 8901",
    role: "DevOps Engineer",
    skills: ["Docker", "AWS", "CI/CD", "Linux"],
    experienceLevel: "Junior",
    status: "APPLIED",
  },
  {
    name: "Ruwan Bandara",
    email: "ruwan.b@email.com",
    phone: "+94 75 678 9012",
    role: "Full Stack Developer",
    skills: ["Node.js", "React", "PostgreSQL", "GraphQL"],
    experienceLevel: "Mid",
    status: "APPLIED",
  },
  {
    name: "Dinesh Rajapaksha",
    email: "dinesh.r@email.com",
    phone: "+94 78 789 0123",
    role: "Backend Intern",
    skills: ["Python", "Django", "SQL"],
    experienceLevel: "Intern",
    status: "APPLIED",
  },
  {
    name: "Malini Wickramasinghe",
    email: "malini.w@email.com",
    phone: "+94 72 890 1234",
    role: "Mobile Developer",
    skills: ["React Native", "JavaScript", "Firebase"],
    experienceLevel: "Junior",
    status: "APPLIED",
  },
  {
    name: "Sunil Gunawardena",
    email: "sunil.g@email.com",
    phone: "+94 74 901 2345",
    role: "Data Engineer",
    skills: ["Python", "SQL", "MongoDB", "ETL"],
    experienceLevel: "Mid",
    status: "APPLIED",
  },
] as const;

async function main() {
  console.log('🌱 Starting seed...');

  // Delete all existing candidates
  await prisma.candidate.deleteMany();
  console.log('Deleted existing candidates');

  // Create new candidates
  for (const candidate of candidates) {
    const result = await prisma.candidate.create({
      data: {
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        role: candidate.role,
        skills: [...candidate.skills],
        experienceLevel: candidate.experienceLevel as any,
        status: candidate.status as any,
      },
    });
    console.log(`Created candidate: ${result.name}`);
  }

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
