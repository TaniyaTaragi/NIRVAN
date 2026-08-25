# NIRVAN '26 🎯

**Annual Technical Festival — Graphic Era Hill University (GEHU), Haldwani Campus**

> *"Where Ideas Become Innovation"*

Organized by **TECH GEEKS** | **12–13 October 2026** | Haldwani, Uttarakhand, India

---

## 🌐 Live Preview

```
https://nirvan-orcin.vercel.app/
```

---

## 📌 About the Project

**NIRVAN '26** is the official website for the annual technical fest at Graphic Era Hill University (GEHU), Haldwani. Built as part of **Web-a-thon 4.0**, it is a fully immersive, animated, and responsive React + TypeScript web application featuring:

- A cinematic **preloader animation** with NIRVAN branding
- A **multi-section landing page** in dark, minimalist monochrome aesthetic
- Dedicated **competition pages** with full rules, prizes, and registration
- An **AI Assistant Drawer** for smart event guidance
- A **multi-step Registration Modal** with instant digital ticket generation
- **Smooth scroll** powered by Lenis
- **Framer Motion** animations throughout

---

## 🏆 Competition Tracks

| Track | Prize Pool | Route |
|---|---|---|
| 🔧 **24h Hackathon** | ₹15,000 | `/hackathon` |
| 🎮 **E-Sports Championship** | ₹12,000 | `/esports` |
| 🔐 **Capture The Flag (CTF)** | ₹10,000 | `/ctf` |
| 🗺️ **Treasure Hunt Odyssey** | ₹8,000 | `/treasure-hunt` |
| 💡 **AI & Quantum Workshop** | Free | `/workshop` |

---

## 🧩 Key Features

- **Preloader** — Branded entry animation with NIRVAN identity
- **Nothin-style Landing Hero** — Full-screen black hero with animated typeface and CTA
- **Hero Carousel** — Auto-advancing 2-slide perspective carousel ("Who We Are" / "What We Are Doing")
- **Circular Features Gallery** — 360° orbital constellation of event track cards with hover-dimming effects
- **How It Works** — 4-step numbered process guide with directional arrows
- **Sponsors Strip** — Scrolling horizontal strip of sponsoring brands
- **Testimonials Gallery** — Student and mentor quote cards
- **FAQ Section** — Accordion-style expandable Q&A
- **Newspaper Event Page** — Editorial-style deep-dive per competition track
- **Competition Pages** (5 dedicated routes):
  - Hackathon, E-Sports, CTF, Treasure Hunt, Workshop — each with rules, prizes, timeline, and registration CTA
- **AI Assistant Drawer** — Slide-in AI chat panel for event queries
- **Registration Modal** — 3-step wizard (Personal Info → Track Selection → Digital Pass Generation with confetti)
- **Demo Modal** — Feature demo video overlay

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tooling & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Lenis** | Smooth scroll |
| **Lucide React** | Icon library |
| **canvas-confetti** | Registration celebration effect |
| **clsx + tailwind-merge** | Conditional class management |
| **Puppeteer** | Visual verification & screenshot testing |

---

## 📁 Project Structure

```
NIRVAN/
├── public/                       # Static assets
├── scripts/                      # Puppeteer visual capture scripts
├── src/
│   ├── competitions/             # Dedicated competition route pages
│   │   ├── hackathon/
│   │   ├── esports/
│   │   ├── ctf/
│   │   ├── treasure-hunt/
│   │   └── workshop/
│   ├── components/               # Reusable UI components
│   │   ├── AIAssistantDrawer.tsx
│   │   ├── CircularFeaturesGallery.tsx
│   │   ├── DemoModal.tsx
│   │   ├── FAQSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroCarousel.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Navbar.tsx
│   │   ├── NewspaperEventPage.tsx
│   │   ├── NothinLandingHero.tsx
│   │   ├── Preloader.tsx
│   │   ├── RegistrationModal.tsx
│   │   ├── SponsorsStrip.tsx
│   │   └── TestimonialsGallery.tsx
│   ├── App.tsx                   # Root application with client-side routing
│   ├── types.ts                  # Shared TypeScript interfaces
│   ├── index.css                 # Global styles
│   └── main.tsx                  # React entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/TaniyaTaragi/NIRVAN.git
cd NIRVAN

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5175** (or next available port).

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🗺️ Client-Side Routes

| Path | View |
|---|---|
| `/` | Landing Page |
| `/hackathon` | Hackathon Competition Page |
| `/esports` | E-Sports Competition Page |
| `/ctf` | CTF Competition Page |
| `/treasure-hunt` | Treasure Hunt Competition Page |
| `/workshop` | Workshop Page |
| `/newspaper` | Newspaper-Style Event Explorer |

---


## 📄 License

This project is built for **Web-a-thon 4.0** at Graphic Era Hill University. All rights reserved © NIRVAN '26 — TECH GEEKS, GEHU Haldwani.

