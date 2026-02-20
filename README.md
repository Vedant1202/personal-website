# Vedant Nandoskar — Personal Portfolio v2

A sleek, performance-focused portfolio built with **React + TypeScript**, showcasing my work in scalable frontend systems, data-intensive research platforms, and production-grade engineering.

Live site: _[Add GitHub Pages / domain link here]_
GitHub Repo: [https://github.com/Vedant1202/personal-website](https://github.com/Vedant1202/personal-website)

---

## 👋 About Me

I’m Vedant Nandoskar, a Software Engineer based in Chicago. I recently completed my MS in Computer Science at UIC and currently work as a Software Research Engineer building HIPAA-compliant, data-intensive systems for large-scale clinical research.

My work spans:

- High-performance frontend dashboards
- Research data pipelines (500K+ PHI records)
- Cloud-backed reporting systems
- Modular backend architectures
- Real-time collaborative systems

---

## 🚀 Tech Stack

### Frontend

- React
- TypeScript
- TailwindCSS
- Framer Motion
- Vite

### Backend (Project Experience)

- Node.js
- Django
- Flask
- MongoDB
- PostgreSQL

### Infrastructure

- Docker
- CI/CD
- AWS
- Google Cloud

---

## ✨ Features

- Pinterest-style elastic project gallery
- Smooth layout transitions with Framer Motion
- Typed hover animations for skill tiles
- Modular component architecture
- Clean, minimal UI with subtle motion
- Fully responsive design
- Optimized build via Vite

---

## 🧠 Architecture Philosophy

This project follows a few strict design principles:

- Component isolation — each section is modular and reusable
- Data-driven UI — projects are powered by structured JSON
- Motion with restraint — animation enhances, not distracts
- Minimal cognitive load — readable at a glance
- Scalable structure — easy to extend without rewrites

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── Hero/
 │    ├── Skills/
 │    ├── Projects/
 │    └── Contact/
 │
 ├── data/
 │    └── projects.ts
 │
 ├── styles/
 ├── assets/
 └── App.tsx
```

---

## 🛠 Installation & Setup

Clone the repo:

```bash
git clone https://github.com/Vedant1202/personal-website.git
cd personal-website/vedantportfolio-v2
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

---

## 🚀 Deployment (GitHub Pages)

If using Vite:

Make sure `vite.config.ts` has:

```ts
export default defineConfig({
  base: "/personal-website/",
});
```

Then:

```bash
npm run build
```

Deploy the `dist/` folder to the `gh-pages` branch.

---

## 📊 Highlighted Work

### Grant Management System

Modular Node.js + MongoDB backend supporting workflow automation across research divisions.

### GestureTips (Master’s Thesis)

Context-aware VR help system built in Unity for HoloLens. Reduced gesture learning effort by 30% in user study.

### Clinical Research Reporting System

Automated reporting system handling 500K+ PHI records across UIC, Stanford, and UW.

---

## 📫 Contact

Email: [vedant.nandoskar@gmail.com](mailto:vedant.nandoskar@gmail.com)
LinkedIn: [https://linkedin.com/in/vedant-nandoskar-692824169/](https://linkedin.com/in/vedant-nandoskar-692824169/)
GitHub: [https://github.com/Vedant1202](https://github.com/Vedant1202)

---

<!-- ## Future Improvements

- Blog section (engineering deep dives)
- Dark/light theme toggle
- Performance audits & Lighthouse optimization
- Case-study mode for detailed project breakdowns -->
