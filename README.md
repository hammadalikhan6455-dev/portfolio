# Hammad Ali Khan — Portfolio Website

A world-class, full-stack portfolio with contextual animated experience cards, a secure admin dashboard, and a MongoDB-backed API.

---

## Tech Stack

| Layer     | Technology |
|-----------|-----------|
| Frontend  | React 18 + Vite + Tailwind CSS v3 |
| Animations | Framer Motion + CSS Keyframes |
| State     | Zustand |
| Backend   | Node.js 20 + Express 5 |
| Database  | MongoDB 7 + Mongoose 8 |
| Auth      | JWT (access 15m + refresh 7d rotation) |
| Storage   | Cloudinary |
| Email     | Nodemailer (SMTP) |
| Tests     | Vitest + Supertest |
| Deploy    | Docker Compose + nginx |

---

## Project Structure

```
hammad-portfolio/
├── client/           # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Footer, ProtectedRoute
│   │   │   ├── sections/   # Hero, About, Experience, Projects, Skills, Contact
│   │   │   └── ui/         # GlassCard, ClayChip
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Admin/      # Dashboard, Projects, Experience, About, Leads
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # useScrollReveal, useCountUp, useDebounce
│   │   ├── services/       # api.js (Axios), portfolio.service.js
│   │   ├── store/          # Zustand portfolioStore
│   │   └── utils/          # animations.js, constants.js
│   └── ...
└── server/           # Express 5 API
    ├── src/
    │   ├── config/         # database.js (with retry)
    │   ├── controllers/    # all CRUD + auth + upload
    │   ├── middleware/      # auth, errorHandler, logger, validate
    │   ├── models/         # About, Project, Experience, Skill, Lead, User
    │   ├── routes/         # public + admin routes
    │   ├── scripts/        # seed.js
    │   ├── services/       # email.service.js, upload.service.js
    │   └── tests/          # api.test.js (Vitest + Supertest)
    └── ...
```

---

## Quick Start (Local Development)

### 1. Clone and install

```bash
git clone https://github.com/yourusername/hammad-portfolio.git
cd hammad-portfolio

# Install server deps
cd server && npm install && cd ..

# Install client deps
cd client && npm install && cd ..
```

### 2. Configure environment

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit server/.env with your MongoDB URI, JWT secrets, Cloudinary keys, and SMTP config
```

### 3. Seed the database

```bash
cd server
node src/scripts/seed.js
# Creates admin user + seeds projects, experiences, and skills
```

### 4. Run in development

```bash
# Terminal 1 — API server (port 5000)
cd server && npm run dev

# Terminal 2 — React client (port 5173)
cd client && npm run dev
```

Open `http://localhost:5173` for the portfolio.  
Open `http://localhost:5173/admin` and login with the seed credentials.

---

## Admin Dashboard

| Route          | Description              |
|----------------|--------------------------|
| `/admin`       | Overview                 |
| `/admin/about` | Edit bio, stats, avatar  |
| `/admin/projects` | CRUD projects         |
| `/admin/experience` | CRUD experience     |
| `/admin/leads` | View & manage leads      |

Default credentials (from seed script):
- **Email:** `admin@hammad.dev`
- **Password:** `Admin@1234!`

> ⚠️ Change the password immediately after first login.

---

## API Reference

### Public Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/about` | Get about data |
| GET | `/api/projects` | List published projects |
| GET | `/api/projects/:slug` | Get single project |
| GET | `/api/experiences` | List experience entries |
| GET | `/api/skills` | List skill groups |
| POST | `/api/leads` | Submit contact form (rate-limited: 5/hr) |

### Auth

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Login (returns access token) |
| POST | `/api/auth/refresh` | Refresh access token via cookie |
| POST | `/api/auth/logout` | Logout + clear cookie |

### Admin (Bearer token required)

| Method | Route | Description |
|--------|-------|-------------|
| PUT | `/api/admin/about` | Update about |
| POST | `/api/admin/projects` | Create project |
| PUT | `/api/admin/projects/:id` | Update project |
| DELETE | `/api/admin/projects/:id` | Delete project |
| POST/PUT/DELETE | `/api/admin/experiences/:id` | Experience CRUD |
| PUT | `/api/admin/skills` | Upsert skill groups |
| GET | `/api/admin/leads` | List leads |
| PUT | `/api/admin/leads/:id` | Update lead status |
| POST | `/api/admin/upload` | Upload media to Cloudinary |

---

## Run Tests

```bash
cd server
npm test
```

Tests cover: health check, public endpoints, lead submission validation, auth rejection, and admin route protection.

---

## Production Deployment (Docker Compose)

```bash
# 1. Set production env vars in server/.env
# 2. Build and run all services
docker compose up -d --build

# 3. Seed the production database
docker compose exec server node src/scripts/seed.js
```

Services:
- **mongo** — MongoDB 7 on port 27017
- **server** — Express API on port 5000
- **client** — React (nginx) on port 80

---

## Animated Experience Cards

Each experience card renders a live animated background scene:

| Company | Scene |
|---------|-------|
| LoadEdge Dispatch | 🚛 SVG semi-truck driving on night highway |
| Skillsrator (Amazon PPC) | 📈 Rising bar chart + floating £$ symbols |
| TikTok Shop | ♥ Floating hearts + phone + notification pops |
| WarpMill Technologies | ⚙️ Rotating interlocked gears + hotel building |
| JKSM Pepsi | 🏭 Factory silhouette + conveyor + moving bottles |

---

## Design System

- **Backgrounds:** Obsidian `#07090F` → Surface `#0D1117` → Elevated `#131A27`
- **Primary:** Electric Indigo `#6366F1`
- **Secondary:** Cyan `#22D3EE` · Clay Violet `#C084FC` · Amber `#FB923C`
- **Typography:** Space Grotesk (display) · Inter (body) · JetBrains Mono (code/data)
- **Glass:** `rgba(255,255,255,0.04)` bg + `blur(20px)` + `rgba(255,255,255,0.08)` border
- **Clay:** Soft inner shadow + coloured bg/border with `border-radius: 10px`

---

## License

MIT — © 2025 Hammad Ali Khan
