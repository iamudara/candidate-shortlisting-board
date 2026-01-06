import { PrismaClient, ExperienceLevel, CandidateStatus } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const candidates = [
  {
    name: "Kamal Perera",
    email: "kamal.perera@email.com",
    phone: "+94 71 234 5678",
    role: "Full Stack Intern",
    skills: ["React", "Node.js", "MongoDB"],
    experienceLevel: "Intern",
    status: "APPLIED",
    bio: "Passionate computer science student looking for internship opportunities. Eager to learn full-stack development.",
    location: "Colombo, Western Province",
    education: [
      { degree: "BSc in Computer Science", institution: "University of Colombo", year: "2024" },
      { degree: "A/L Physical Science", institution: "Royal College", year: "2020" }
    ],
    experience: []
  },
  {
    name: "Nimali Fernando",
    email: "nimali.fernando@email.com",
    phone: "+94 77 345 6789",
    role: "Backend Developer",
    skills: ["Laravel", "PHP", "MySQL", "REST APIs"],
    experienceLevel: "Junior",
    status: "APPLIED",
    bio: "Backend developer with 1 year of experience in building scalable web applications using PHP and Laravel.",
    location: "Kandy, Central Province",
    education: [
         { degree: "BSc in IT", institution: "SLIIT", year: "2023" }
    ],
    experience: [
        { role: "Junior Developer", company: "TechSolutions", duration: "2023 - Present", description: "Developed REST APIs for e-commerce platforms." }
    ]
  },
  {
    name: "Saman Jayasinghe",
    email: "saman.j@email.com",
    phone: "+94 76 456 7890",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    experienceLevel: "Mid",
    status: "SHORTLISTED",
    bio: "Frontend specialist with a keen eye for design and user experience. Proficient in modern React ecosystem.",
    location: "Galle, Southern Province",
    education: [
        { degree: "BIT", institution: "University of Moratuwa", year: "2021" }
    ],
    experience: [
        { role: "Frontend Developer", company: "CreativeWebs", duration: "2021 - Present", description: "Led the frontend migration to React." },
        { role: "Trainee Developer", company: "WebCorp", duration: "2020 - 2021", description: "Assisted in UI implementation." }
    ]
  },
  {
    name: "Kumari Silva",
    email: "kumari.silva@email.com",
    phone: "+94 70 567 8901",
    role: "DevOps Engineer",
    skills: ["Docker", "AWS", "CI/CD", "Linux"],
    experienceLevel: "Junior",
    status: "APPLIED",
    bio: "Aspiring DevOps engineer with hands-on experience in cloud infrastructure and automation.",
    location: "Colombo, Western Province",
    education: [
        { degree: "BSc in Network Engineering", institution: "NSBM", year: "2023" }
    ],
    experience: [
        { role: "Junior DevOps", company: "CloudSys", duration: "2023 - Present", description: "Managed AWS infrastructure." }
    ]
  },
  {
    name: "Ruwan Bandara",
    email: "ruwan.b@email.com",
    phone: "+94 75 678 9012",
    role: "Full Stack Developer",
    skills: ["Node.js", "React", "PostgreSQL", "GraphQL"],
    experienceLevel: "Mid",
    status: "REJECTED",
    rejectionNote: "Technical skills not matching senior requirements, good for mid-level fit later.",
    bio: "Versatile developer comfortable with both frontend and backend technologies.",
    location: "Negombo, Western Province",
    education: [
        { degree: "BSc in Software Engineering", institution: "IIT", year: "2020" }
    ],
    experience: [
        { role: "Software Engineer", company: "GlobalTech", duration: "2020 - Present", description: "Full stack development using MERN stack." }
    ]
  },
  {
    name: "Dinesh Rajapaksha",
    email: "dinesh.r@email.com",
    phone: "+94 78 789 0123",
    role: "Backend Intern",
    skills: ["Python", "Django", "SQL"],
    experienceLevel: "Intern",
    status: "APPLIED",
    bio: "Python enthusiast looking to start a career in backend development.",
    location: "Matara, Southern Province",
    education: [
        { degree: "HND in Computing", institution: "ESOFT", year: "2024" }
    ],
    experience: []
  },
  {
    name: "Malini Wickramasinghe",
    email: "malini.w@email.com",
    phone: "+94 72 890 1234",
    role: "Mobile Developer",
    skills: ["React Native", "JavaScript", "Firebase"],
    experienceLevel: "Junior",
    status: "APPLIED",
    bio: "Mobile app developer with a focus on cross-platform solutions.",
    location: "Kurunegala, North Western Province",
    education: [
        { degree: "BSc in Computer Systems", institution: "NIBM", year: "2023" }
    ],
    experience: [
        { role: "Mobile Dev", company: "AppWorks", duration: "2023 - Present", description: "Built 2 production apps." }
    ]
  },
  {
    name: "Sunil Gunawardena",
    email: "sunil.g@email.com",
    phone: "+94 74 901 2345",
    role: "Data Engineer",
    skills: ["Python", "SQL", "MongoDB", "ETL"],
    experienceLevel: "Mid",
    status: "APPLIED",
    bio: "Data wrangler and pipeline builder. Loves turning raw data into insights.",
    location: "Colombo, Western Province",
    education: [
        { degree: "MSc in Data Science", institution: "University of Colombo", year: "2022" },
        { degree: "BSc in Statistics", institution: "University of Peradeniya", year: "2019" }
    ],
    experience: [
        { role: "Data Analyst", company: "DataCorp", duration: "2019 - 2021", description: "Analyzed market trends." },
        { role: "Data Engineer", company: "BigData Co", duration: "2021 - Present", description: "Built ETL pipelines." }
    ]
  },
    // New Candidates
  {
    name: "Priya De Silva",
    email: "priya.desilva@email.com",
    phone: "+94 71 111 2222",
    role: "UX Designer",
    skills: ["Figma", "Adobe XD", "Wireframing"],
    experienceLevel: "Mid",
    status: "SHORTLISTED",
    bio: "User-centric designer with a passion for creating intuitive digital experiences.",
    location: "Colombo, Western Province",
    education: [ { degree: "BA in Graphic Design", institution: "AOD", year: "2019" } ],
    experience: [ { role: "UX Designer", company: "DesignStudio", duration: "2019 - Present", description: "Lead UX for mobile apps." } ]
  },
  {
    name: "Kasun Perera",
    email: "kasun.p@email.com",
    phone: "+94 77 999 8888",
    role: "DevOps Engineer",
    skills: ["Kubernetes", "Terraform", "Azure"],
    experienceLevel: "Mid",
    status: "APPLIED",
    bio: "Experienced DevOps engineer specializing in cloud automation and infrastructure as code.",
    location: "Colombo, Western Province",
    education: [ { degree: "BSc in IT", institution: "SLIIT", year: "2018" } ],
    experience: [ { role: "Senior DevOps", company: "TechGlobal", duration: "2018 - Present", description: "Managed multi-cloud environments." } ]
  },
  {
    name: "Amara Weerasinghe",
    email: "amara.w@email.com",
    phone: "+94 70 333 4444",
    role: "QA Engineer",
    skills: ["Selenium", "Cypress", "Java"],
    experienceLevel: "Junior",
    status: "APPLIED",
    bio: "Detail-oriented QA engineer focused on automation testing.",
    location: "Gampaha, Western Province",
    education: [ { degree: "BSc in CS", institution: "UCSC", year: "2023" } ],
    experience: [ { role: "QA Intern", company: "QualiTest", duration: "2023 - 2024", description: "Automated regression suites." } ]
  },
  {
    name: "Ravi Kumara",
    email: "ravi.k@email.com",
    phone: "+94 76 555 6666",
    role: "Full Stack Developer",
    skills: ["Angular", ".NET", "SQL Server"],
    experienceLevel: "Mid",
    status: "APPLIED",
    bio: "Full stack dev with strong background in enterprise application development.",
    location: "Kandy, Central Province",
    education: [ { degree: "BSc in SE", institution: "Plymouth", year: "2020" } ],
    experience: [ { role: "Software Engineer", company: "EntCorp", duration: "2020 - Present", description: "Maintained legacy .NET apps." } ]
  }
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
        bio: candidate.bio,
        location: candidate.location,
        rejectionNote: candidate.rejectionNote || null,
        education: candidate.education as any,
        experience: candidate.experience as any,
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
