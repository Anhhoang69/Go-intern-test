# G-Scores

High School Graduation Exam 2024 Score Portal. This web application allows students to lookup their scores, view statistics on score distributions, and check the top 10 ranked students of Group A.

## Live Demo & Deployed URLs
- **Live Demo (Frontend)**: [https://go-intern-test.vercel.app/](https://go-intern-test.vercel.app/)
- **Live Backend API**: [https://go-intern-test-zt8l.onrender.com](https://go-intern-test-zt8l.onrender.com)

---

## Features
- **Score Lookup**: Enter registration number (SBD) to get instant detailed results (with Vietnamese/English language toggle support).
- **Reports (Charts)**: View color-coded score distribution stats across 4 levels (Excellent `>=8`, Good `6-8`, Average `4-6`, Weak `<4`) for all 9 subjects.
- **Top 10 Group A**: Displays the top 10 students ranked by total Group A score (Mathematics, Physics, Chemistry) along with score comparison chart.
- **Responsive Layout**: Works seamlessly on Mobile, Tablet, and Desktop screens.
- **Dockerized Setup**: Quick local deployment using Docker Compose.

---

## Technical Stack
- **Frontend**: React 18, Vite, Recharts, Lucide Icons, Vanilla CSS, i18next (Localization)
- **Backend**: Express, Node.js, Prisma ORM, `pg` (PostgreSQL Client Pool)
- **Database**: PostgreSQL (Supabase)

---

## Application Mockups & Screenshots

### 1. Dashboard Page
![Dashboard](./screenshots/dashboard.png)

### 2. Score Lookup Page (Search)
![Search Scores](./screenshots/search.png)

### 3. Reports & Score Distribution Statistics Page
![Reports Statistics](./screenshots/reports.png)

### 4. Top 10 Group A Rankings Page
![Top 10 Group A](./screenshots/top10.png)

---

## Getting Started

### Prerequisites
- Node.js (v18 or above)
- npm or yarn
- Docker (optional, for containerized run)

### Environmental Variables Setup

#### Backend (`/backend/.env`)
Create a `.env` file in the `/backend` directory based on `.env.example`:
```env
DATABASE_URL="postgresql://postgres.sewonomxuehscwoexydq:Anhhoang69@@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
PGPOOL_URL="postgresql://postgres.sewonomxuehscwoexydq:Anhhoang69%40@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
PORT=3000
```
*(Note: `PGPOOL_URL` must have the password correctly URL-encoded and exclude the `?pgbouncer=true` parameter so the raw query pool client parses it correctly)*

#### Frontend (`/frontend/.env`)
Create a `.env` file in the `/frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```

---

## Running Locally

### Option 1: Standard Run

#### 1. Setup Backend
```bash
cd backend
npm install
npx prisma db push
node prisma/seed.js   # Seed raw dataset (~1M students) to DB (takes 10-15m)
npm run dev
```

#### 2. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Option 2: Run with Docker Compose

Ensure Docker is running, then execute the following command at the project root directory:
```bash
docker-compose up --build
```
The frontend will be available at [http://localhost](http://localhost) and backend at [http://localhost:3000](http://localhost:3000).

---

## Implementation Details

### OOP Design Principle
A class `SubjectManager` encapsulating properties like subjects config list and formatting methods (e.g. `classifyScore`, `formatStudent`) is utilized as a single source of truth across controller/service layers to strictly follow Object-Oriented Programming (OOP) requirements.

### Database Query Optimization (Supabase Free Tier)
To bypass connection constraints on Supabase Free Tier, the application implements:
1. **Connection Routing**: Normal CRUD uses Prisma via PgBouncer. Heavy statistical analytics query runs via raw PostgreSQL aggregate queries using `pg` Pool directly.
2. **In-Memory Cache & Warmup**: The app pre-computes and caches statistics upon startup to deliver instant responses to the client while keeping the DB connection pool footprint safe.
