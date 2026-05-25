<div align="center">

<img src="public/logo.png" alt="Hassan The Controlman" height="80" />

# Hassan · The Controlman

**Industrial Automation & Electronics Engineer**

[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-2.45-3ecf8e?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222?style=flat-square&logo=github)](https://pages.github.com)

[🌐 Live Site](https://hassan-ibn-mustafa.github.io/portfolio/) 

</div>

---

## 📋 Overview

Personal portfolio website for Hassan, Industrial Automation & Electronics Engineer. Features a fully dynamic content management system with an admin dashboard — no rebuilding required to update projects, skills, or certifications.

**Sections:** Hero · About · Skills · Projects · Certifications · Contact

---

## ✨ Features

- 🌑 **Dark theme** — industrial crimson + charcoal palette inspired by the personal brand
- ⚡ **Dynamic content** — Projects, Skills, and Certifications managed live via Admin Dashboard
- 🔐 **Secure admin panel** — protected with Supabase Auth at `/admin`
- 🎨 **SVG illustrations** — unique auto-generated artwork per project category (no random stock photos)
- 📱 **Fully responsive** — works on all screen sizes
- 🚀 **Auto deploy** — GitHub Actions builds and deploys on every `git push`
- 🔄 **Fallback data** — site shows seed content even without Supabase configured

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 + custom CSS variables |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Routing | React Router v6 (HashRouter) |
| Icons | Lucide React |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── logo.png                    # Site logo
│   ├── favicon.svg                 # Browser tab icon
│   └── 404.html                    # SPA routing fix for GitHub Pages
│
├── src/
│   ├── data/
│   │   └── staticData.js           # ✏️ Personal info, seed data
│   │
│   ├── lib/
│   │   └── supabase.js             # Supabase client
│   │
│   ├── hooks/
│   │   ├── useProjects.js          # Projects CRUD
│   │   ├── useCertifications.js    # Certifications CRUD
│   │   └── useSkills.js            # Skills & Tools CRUD
│   │
│   ├── components/                 # Public portfolio sections
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── CategoryIllustrations.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   │
│   ├── admin/                      # CMS dashboard
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx      # Tabbed: Projects / Certs / Skills
│   │   ├── ProjectForm.jsx
│   │   ├── CertificationForm.jsx
│   │   ├── SkillsManager.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── App.jsx                     # Routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles + CSS variables
│
├── .env.example                    # Environment variables template
├── .github/workflows/deploy.yml    # Auto deploy to GitHub Pages
├── tailwind.config.js
├── vite.config.js
└── AI_CONTEXT.md                   # Full project reference for AI assistants
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A free [Supabase](https://supabase.com) account

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd portfolio
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_BASE_URL=/your-repo-name/
```

### 3. Set Up Supabase

Run the following SQL in your Supabase **SQL Editor**:

<details>
<summary>Click to expand SQL setup</summary>

```sql
-- Projects
CREATE TABLE public.projects (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title            text NOT NULL,
  description      text,
  long_description text,
  tech_stack       text[] DEFAULT '{}',
  category         text DEFAULT 'Other',
  image_url        text,
  github_url       text,
  demo_url         text,
  featured         boolean DEFAULT false,
  created_at       timestamptz DEFAULT now()
);

-- Certifications
CREATE TABLE public.certifications (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title          text NOT NULL,
  issuer         text,
  year           text,
  color          text DEFAULT '#c0392b',
  credential_url text,
  created_at     timestamptz DEFAULT now()
);

-- Skill Categories
CREATE TABLE public.skill_categories (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category   text NOT NULL,
  icon       text DEFAULT 'cpu',
  color      text DEFAULT '#c0392b',
  sort_order int  DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Skills
CREATE TABLE public.skills (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id uuid REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  name        text NOT NULL,
  level       int  DEFAULT 0,
  sort_order  int  DEFAULT 0
);

-- Tools (also familiar with)
CREATE TABLE public.tools (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text NOT NULL,
  sort_order int  DEFAULT 0
);

-- Enable RLS on all tables
ALTER TABLE public.projects          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools             ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read" ON public.projects         FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.certifications   FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.skills           FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.tools            FOR SELECT USING (true);

-- Authenticated (admin) full access
CREATE POLICY "Admin all" ON public.projects         FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all" ON public.certifications   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all" ON public.skill_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all" ON public.skills           FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin all" ON public.tools            FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

</details>

Then go to **Supabase → Authentication → Users** and create your admin account.

### 4. Run Locally

```bash
npm run dev
# → http://localhost:5173
# Admin panel → http://localhost:5173/#/admin
```

---

## 🌐 Deploy to GitHub Pages

### 1. Add GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions** → add:

| Secret | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_BASE_URL` | `/your-repo-name/` |

### 2. Enable GitHub Pages

Repo **Settings → Pages → Source → GitHub Actions**

### 3. Push & Deploy

```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

GitHub Actions will build and deploy automatically. Your site will be live at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 🔐 Admin Dashboard

Navigate to `YOUR_SITE/#/admin` and log in with your Supabase Auth credentials.

| Tab | What you can do |
|---|---|
| **Projects** | Add, edit, delete projects with title, description, tech stack, links, images |
| **Certifications** | Add, edit, delete certifications with color picker and credential URL |
| **Skills** | Add/remove categories, add/remove skill tags, manage "Also Familiar With" tools |

> Changes are **live immediately** — no rebuild needed.

---

## 🎨 Customization

The main file to edit is **`src/data/staticData.js`** — it contains all personal info (name, bio, links, seed data).

Colors are CSS variables in **`src/index.css`**:

```css
:root {
  --crimson:        #c0392b;  /* main accent */
  --crimson-bright: #e84040;  /* hover states */
  --ink-900:        #0e0e0e;  /* page background */
  --ink-800:        #161616;  /* card background */
}
```

For a full reference on every file and how to modify it, see [`AI_CONTEXT.md`](./AI_CONTEXT.md).

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.

---

<div align="center">
  <sub>Built with React + Supabase · Deployed on GitHub Pages</sub>
</div>
