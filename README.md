# Candidate Shortlisting Board

A full-stack application for managing and shortlisting job candidates. Built with React (Vite), Express, Prisma, and PostgreSQL.

## 🚀 Technology Stack

- **Frontend:**
  - React (Vite)
  - TypeScript
  - Tailwind CSS
  - shadcn/ui (Radix UI)
  - Axios
  - TanStack Query (not used yet, using Context/Hooks)
- **Backend:**
  - Node.js (Express)
  - TypeScript
  - Prisma ORM
  - PostgreSQL

## 🛣️ Implementation Path

**Chosen Path: Path A (React frontend + API backend)**

This project implements a full-stack solution with a dedicated backend API served by Express.js and a React frontend. The selection of Path A allows for:

- Scalable and secure data management using a real database (PostgreSQL).
- Clean separation of concerns between client and server logic.
- A foundation closer to production-readiness compared to a mocked API approach.

## ⚖️ Assumptions & Tradeoffs

1.  **No Authentication:** To focus on the core core functionality of shortlisting/rejecting candidates, authentication was omitted. In a real environment, JWT or Session-based auth would be essential.
2.  **Simplified Rejection Logic:** Rejection is handled with a simple note. A production system might require predefined rejection reasons, email notification triggers, or a cooling-off period.
3.  **UI/UX Decisions:**
    - Used standard Tailwind/shadcn components for speed.
    - Mobile layout prioritizes the list view with a drawer for details. This assumes mobile users primarily triage candidates quickly.
4.  **Database Seeding:** The database is seeded with static mock data on initialization. A real app would rely on candidate applications submission forms or Resume Parsing integration.

## 🚀 Future Improvements

With more time, the following enhancements would be prioritized:

1.  **Authentication & Authorization:** Secure the API and Dashboard.
2.  **Resume Parsing:** Upload PDF resumes and auto-extract skills/experience (using AI or standard parsers).
3.  **Advanced Filtering:** Filter by years of experience, specific skills, or location radius.
4.  **Candidate Submission Forms:** Implement a public-facing application form to populate the database dynamically, replacing static seed data.

## 🛠️ Prerequisites

- Node.js (v18+)
- PostgreSQL (running locally or via Docker)
- npm or pnpm

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd candidate-shortlisting-board
    ```

2.  **Install dependencies (Root, Client, Server):**

    ```bash
    # Root
    npm install

    # Client
    cd client
    npm install

    # Server
    cd ../server
    npm install
    ```

3.  **Environment Setup:**

    - **Server:** Create `server/.env`

      ```env
      DATABASE_URL="postgresql://postgres:password@localhost:5432/candidate_board?schema=public"
      PORT=3001
      ```

    - **Client:** Create `client/.env` (optional, defaults to localhost:3001)

4.  **Database Setup:**
    ```bash
    cd server
    npx prisma generate
    npx prisma migrate dev --name init
    npx prisma db seed
    ```

## 🏃‍♂️ Running the Application

From the root directory, you can run both client and server simultaneously:

```bash
npm run dev
```

- **Client:** http://localhost:5173
- **Server:** http://localhost:3001

## 📂 Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── data/          # API & Models
│   │   ├── presentation/  # UI Components & Pages
│   │   └── lib/           # Utilities
├── server/                 # Express Backend
│   ├── src/
│   │   ├── data/          # Database Repositories
│   │   ├── services/      # Business Logic
│   │   └── controllers/   # Route Handlers
│   └── prisma/            # Database Schema & Seeds
└── package.json            # Root configuration
```

## ✨ Features

- **Candidate List:** Search, filter, and sort candidates.
- **Detailed View:** View comprehensive candidate profiles including bio, experience, and education.
- **Shortlisting:** Mark candidates as shortlisted with visual feedback.
- **Rejection:** Reject candidates with an optional reason note.
- **Responsive:** Mobile-friendly interface with adaptive layout.
