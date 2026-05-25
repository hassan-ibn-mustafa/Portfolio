# 🚀 Portfolio Setup Guide
## Hassan · Industrial Automation & Electronics Engineer

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup (Local)](#project-setup)
3. [Supabase Database Setup](#supabase-setup)
4. [Environment Variables](#environment-variables)
5. [Customizing Your Content](#customizing-content)
6. [Running Locally](#running-locally)
7. [Deploying to GitHub Pages](#deploying)
8. [Using the Admin Dashboard](#admin-usage)
9. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

Make sure you have installed:
- **Node.js** v18 or later — https://nodejs.org
- **Git** — https://git-scm.com
- A free **Supabase** account — https://supabase.com
- A **GitHub** account

---

## 2. Project Setup (Local)

```bash
# Clone or initialize your repo
git init portfolio && cd portfolio

# Copy all project files into this directory, then:
npm install
```

---

## 3. Supabase Database Setup

### Step 1 — Create a Supabase project

1. Go to https://supabase.com and click **New Project**
2. Give it a name (e.g. `portfolio`) and choose a region close to you
3. Set a strong database password and save it

### Step 2 — Create the `projects` table

Open the **SQL Editor** in Supabase and run:

```sql
-- Create projects table
CREATE TABLE public.projects (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  description text,
  long_description text,
  tech_stack  text[] DEFAULT '{}',
  category    text DEFAULT 'Other',
  image_url   text,
  github_url  text,
  demo_url    text,
  featured    boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- Allow public read access (portfolio visitors)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON public.projects FOR SELECT
  USING (true);

-- Only authenticated users (admin) can insert/update/delete
CREATE POLICY "Admin insert"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin delete"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);
```

### Step 3 — Create an admin user

1. In Supabase, go to **Authentication → Users**
2. Click **Add user** (or **Invite user**)
3. Enter **your email** and a **strong password**
4. Note this email — it will be your admin login

### Step 4 — Get your API keys

1. Go to **Project Settings → API**
2. Copy:
   - **Project URL** (e.g. `https://abcdef.supabase.co`)
   - **anon public** key (the long JWT string)

---

## 4. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...your-anon-key
VITE_ADMIN_EMAIL=your-admin@email.com

# For GitHub Pages deployment (project page):
# If your repo is github.com/username/portfolio, set:
VITE_BASE_URL=/portfolio/

# If it's your user page (username.github.io), set:
# VITE_BASE_URL=/
```

> ⚠️ **NEVER commit .env to git.** It's already in `.gitignore`.

---

## 5. Customizing Your Content

Edit `src/data/staticData.js`:

### Personal Info
```js
export const PERSONAL = {
  name: 'Hassan',                    // ← Your first name
  role: 'Industrial Automation & Electronics Engineer',
  linkedin: 'https://linkedin.com/in/your-handle',
  github: 'https://github.com/your-username',
  email: 'you@example.com',
  cvUrl: '/cv.pdf',                  // ← Put your CV in /public/cv.pdf
  location: 'Egypt',
}
```

### Skills
Update the `SKILLS` array with your actual proficiency levels (0–100).

### Certifications
Add/edit the `CERTIFICATIONS` array.

### Seed Projects
The `SEED_PROJECTS` array shows when Supabase isn't configured. Once Supabase is live, manage projects from the Admin Dashboard.

---

## 6. Running Locally

```bash
npm run dev
# Open http://localhost:5173
# Admin panel at http://localhost:5173/#/admin
```

---

## 7. Deploying to GitHub Pages

### Step 1 — Create a GitHub repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Step 2 — Set the base URL

In `package.json`, update the deploy script homepage if needed.
In `.env` (or create `.env.production`):
```env
VITE_BASE_URL=/YOUR_REPO_NAME/
```

### Step 3 — Add GitHub Secrets for env vars

Go to your GitHub repo → **Settings → Secrets and variables → Actions** → **New repository secret**:

| Secret Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_BASE_URL` | `/your-repo-name/` |

### Step 4 — Create GitHub Actions workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_BASE_URL: ${{ secrets.VITE_BASE_URL }}

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - uses: actions/deploy-pages@v4
```

### Step 5 — Enable GitHub Pages

Go to repo **Settings → Pages**:
- Source: **GitHub Actions**

### Step 6 — Push and deploy

```bash
git add .
git commit -m "Initial portfolio deploy"
git push origin main
```

GitHub Actions will automatically build and deploy. Your site will be live at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 8. Using the Admin Dashboard

1. Navigate to `https://your-site.com/#/admin`
2. Log in with the email/password you created in Supabase Auth
3. Use the dashboard to:
   - **Add projects** — Fill in title, description, tech stack, links, image URL
   - **Edit projects** — Click the Edit button on any project row
   - **Delete projects** — Click Delete (with confirmation)
   - **Feature/unfeature** — Toggle the "Featured" switch in the form
4. Changes are **instantly live** — no rebuild needed

### Adding project images
- Upload images to a free host like **Imgur** (https://imgur.com) or **Cloudinary**
- Paste the direct image URL in the "Image URL" field

---

## 9. Troubleshooting

### "Supabase fetch failed, using seed data"
→ Check your `.env` variables are correct and the Supabase project is running.

### Admin login fails with "Invalid login credentials"
→ Make sure you created the user in Supabase Auth (not just in the database).

### Page shows 404 on GitHub Pages refresh
→ The `public/404.html` handles this. Make sure it's in your repo.

### Blank page after deployment
→ Check `VITE_BASE_URL` matches your repo name exactly (case-sensitive).

### CORS errors in browser
→ In Supabase → Authentication → URL Configuration, add your GitHub Pages domain to **Allowed Origins**.

---

## 📁 Final Project Structure

```
portfolio/
├── public/
│   ├── 404.html              ← SPA routing fix for GitHub Pages
│   └── favicon.svg
├── src/
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── ProjectForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── data/
│   │   └── staticData.js     ← ✏️ Edit your personal info here
│   ├── hooks/
│   │   └── useProjects.js
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example              ← Copy to .env and fill in
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
