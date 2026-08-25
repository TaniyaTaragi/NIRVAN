# NIRVAN

NIRVAN is an advanced digital platform and spatial web experience engineered for India's premier annual technical festival and hackathon. The platform unifies five flagship competition arenas—Hackathon, Esports Championship, Capture The Flag (CTF), Cryptic Treasure Hunt, and Tech Masterclasses—into an interactive, high-performance web interface.

Built with a focus on editorial typography, 3D spatial physics, low-latency client-side interaction, and responsive design, NIRVAN serves as the central hub for event discovery, participant registration, rule verification, real-time query resolution, and live tournament coordination.

---

## Live Demonstration

- Live Deployment: https://nirvan-orcin.vercel.app/
- Source Repository: https://github.com/TaniyaTaragi/NIRVAN

---

## Core Features and Experience Architecture

### 1. Spatial Landing Experience
- Inflatable 3D Balloon Atmosphere: Iridescent floating visual assets rendered with subtle harmonic vertical bobbing and perspective scale transitions.
- Interactive Foam and Particle Canvas: Real-time 2D Canvas physics simulation that spawns ambient foam clusters and responds dynamically to user mouse velocity and movement paths.
- Full-Bleed Bold Vector Typography: Fluid responsive typography scaling seamlessly across ultra-wide desktop monitors, laptops, tablets, and mobile screens.
- Frosted Interface Elements: Contrast-tuned glassmorphic navigation bars, action pills, and status badges designed for maximum readability over textured backgrounds.

### 2. 360-Degree Circular Feature Wheel
- Circular Orbital Projection: Interactive rotating carousel presenting the festival's core technological pillars around a central monogram emblem.
- Dynamic Angle Calculation: Trigonometric positioning of orbiting cards with smooth rotational transitions, active-index tracking, and tactile navigation controls.

### 3. 3D Constellation Orbital Gallery
- Multi-Axis Spatial Orbit: A custom 3D carousel engine that distributes innovation tracks and challenge nodes along a mathematically mapped orbital wave.
- Physics-Based Inertia Drag: Pointer and touch drag listeners equipped with velocity damping, momentum glide, and mouse wheel tilt controls.
- Dynamic Depth Sorting: Real-time recalculation of CSS 3D perspective transforms, Z-indexes, blur scales, and depth opacity based on angular position.
- Dual-Mode Projection: Seamless switching between the 3D Constellation Orbit view and an accessible 2D Grid view.
- Track Detail Lightbox: Interactive full-screen modal displaying comprehensive domain descriptions, prerequisite stacks, prize allocations, and direct registration triggers.

### 4. Dedicated Flagship Competition Arenas

The platform provides isolated, customized portal experiences for each of the five festival verticals:

- Flagship National Hackathon (`/hackathon`)
  - 48-hour continuous product and AI crucible.
  - Six innovation domains: Generative AI Swarms, Web3 ZK Rollups, Autonomous Robotics, Developer Tools, Spatial 3D WebGPU, and Cyber Defense.
  - Structured chronological build sprint timeline and jury profiles.

- Esports Championship Arena (`/esports`)
  - Tier-1 competitive collegiate gaming tournament.
  - Formats: Valorant Tactical (5v5), BGMI Squad Warfare, and EA FC 26.
  - Match schedules, LAN hardware specifications (240Hz calibrated rigs), broadcast casting stages, and referee guidelines.

- Jeopardy Cyber Security CTF (`/ctf`)
  - 24-hour offensive and defensive cybersecurity siege.
  - Exploit vectors: Binary Exploitation (Pwn), Web Application Security, Lattice Cryptography, Reverse Engineering, Digital Forensics, and Hardware Hacking.
  - Live wave challenge release schedule and ethical hacking rules.

- Campus Cryptic Treasure Hunt (`/treasure-hunt`)
  - Alternate Reality Game (ARG) spanning physical campus waypoints and cryptographic puzzle boxes.
  - Challenge stages: Terminal Ciphers, SDR Radio Frequency Beacons, Campus Geolocation Checkpoints, Steganographic Audio, AR Lens Visuals, and Master Vault Cracking.
  - Four-phase release timeline and game master directory.

- Hands-On Tech Masterclasses (`/workshop`)
  - Deep-dive developer labs led by staff engineers and researchers.
  - Curriculum tracks: Autonomous AI Agents, Zero-Knowledge Circuits, Three.js Spatial Shaders, Rust High-Concurrency, AI Alignment, and Distributed Systems.
  - Session timeline, starter repository blueprints, and verifiable certificate issuance details.

### 5. Embedded AI Assistant Copilot
- On-Demand Drawer Interface: Slide-over AI intelligence drawer accessible globally across the platform.
- Knowledge Retrieval: Instant answers regarding event rules, team size constraints, submission deadlines, accommodation logistics, prize distributions, and campus navigation.
- Suggested Prompt Chips: Quick-action queries for rapid navigation and guideline lookups.

### 6. Multi-Step Squad Registration Engine
- Structured Registration Pipeline: Step-by-step modal for solo and squad entries with real-time field validation.
- Dynamic Squad Member Allocation: Configurable team capacity (1 to 4 members) tailored to specific arena requirements.
- Digital Ticket Issuance: Client-side ticket generation complete with unique squad registration IDs, chosen track confirmation, and celebratory visual effects.

### 7. Schedule, Organizers, and Community Modules
- Master Chronology: Unified festival agenda categorized by stage, timeline, and session status (Completed, Live, Upcoming).
- Leadership and Mentors Directory: Grayscale-to-color interactive spotlight cards highlighting conveners, technical leads, and guest evaluators.
- Historical Archive Gallery: Visual retrospective documenting past editions, participant statistics, and hackathon project showcases.
- Developer Testimonials: Filtered participant reviews and community feedback.
- Comprehensive FAQ Accordion: Detailed breakdowns of eligibility, intellectual property ownership, hardware requirements, and travel allowances.

---

## Technical Stack and Architecture

### Core Frontend Framework
- React 18: Component-driven user interface architecture.
- TypeScript: Type safety, strict interface definitions, and compile-time contract enforcement.
- Vite: Optimized module bundling, hot module replacement (HMR), and tree-shaking.

### Motion and Interaction Engineering
- Framer Motion: Declarative layout animations, presence exits, spring physics, and staggered entrance sequences.
- Lenis: Hardware-accelerated smooth scrolling with custom easing curves.
- HTML5 Canvas API: Custom procedural bubble clustering and velocity-based fluid simulation.
- Canvas Confetti: Client-side particle generation for registration milestones.

### Styling and Typography
- Tailwind CSS: Utility-first CSS engine with custom design tokens, responsive breakpoints, and glassmorphic filters.
- Lucide React: Vector iconography integrated into interactive buttons and informational cards.
- Custom Typography: High-contrast serif headlines paired with monospace terminal metadata.

### Infrastructure and Routing
- Single Page Application (SPA) Routing: History API integration with synchronized browser history (`popstate`) for clean URL navigation (`/`, `/hackathon`, `/esports`, `/ctf`, `/treasure-hunt`, `/workshop`).
- Vercel Edge Deployment: Optimized asset caching, gzip compression, and rewrite rules for client-side routing.

---

## Project Structure

```
nirvan/
├── public/
│   ├── assets/
│   │   ├── nirvan-3d-bg.jpg         # 3D balloon hero visual asset
│   │   └── ...                      # Arena imagery and branding
│   ├── hackathon/                   # Hackathon track visual assets
│   ├── esports/                     # Tournament and arena assets
│   ├── ctf/                         # CTF security track assets
│   ├── techtreasur/                 # Treasure hunt waypoint imagery
│   └── workshop/                    # Masterclass curriculum assets
├── src/
│   ├── competitions/                # Flagship competition arena modules
│   │   ├── ctf/
│   │   │   └── CtfPage.tsx
│   │   ├── esports/
│   │   │   └── EsportsPage.tsx
│   │   ├── hackathon/
│   │   │   └── HackathonPage.tsx
│   │   ├── treasure-hunt/
│   │   │   └── TreasureHuntPage.tsx
│   │   └── workshop/
│   │       └── WorkshopPage.tsx
│   ├── components/                  # Shared UI components and galleries
│   │   ├── AIAssistantDrawer.tsx    # Event AI query copilot
│   │   ├── ArchiveGallery.tsx       # Historical editions archive
│   │   ├── CircularFeaturesGallery.tsx # 360-degree circular feature wheel
│   │   ├── ConstellationOrbitalGallery.tsx # 3D orbital physics gallery
│   │   ├── DemoModal.tsx            # Interactive preview modal
│   │   ├── EventDetailsSummary.tsx  # Key event metrics and summaries
│   │   ├── FAQSection.tsx           # Accordion FAQ module
│   │   ├── FestSchedule.tsx         # Master timeline schedule
│   │   ├── Footer.tsx               # Platform sitemap and legal links
│   │   ├── GuestProfiles.tsx        # Guest speakers and judges
│   │   ├── HeroCarousel.tsx         # 3-slide editorial narrative carousel
│   │   ├── HowItWorks.tsx           # Process pipeline breakdown
│   │   ├── Navbar.tsx               # Floating responsive navigation bar
│   │   ├── NewspaperEventPage.tsx   # Gazette layout view
│   │   ├── NothinLandingHero.tsx    # Spatial landing hero with canvas foam
│   │   ├── Preloader.tsx            # Startup loader and monogram
│   │   ├── RegistrationModal.tsx    # Multi-step registration portal
│   │   ├── SponsorsStrip.tsx        # Sponsor and partner logo carousel
│   │   └── TestimonialsGallery.tsx  # Community testimonials
│   ├── data/                        # Static datasets and event definitions
│   ├── types/                       # Shared TypeScript interfaces
│   ├── App.tsx                      # Root application component and view router
│   ├── index.css                    # Base styling and design tokens
│   └── main.tsx                     # Application entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── vercel.json                      # Production SPA rewrite configuration
```

---

## Local Development and Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/TaniyaTaragi/NIRVAN.git
   cd NIRVAN/nirvan
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5175
   ```

---

## Production Build and Verification

To compile TypeScript and bundle the project for production deployment:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Performance and Quality Standards

- Zero TypeScript Warnings: Strict typing enforced across all components, interfaces, and state handlers.
- Smooth Frame Rates: Hardware-accelerated transforms used exclusively for continuous physics animations and orbital carousels.
- Contrast Compliance: Text elements rendered over photographic backgrounds utilize localized frosted scrims and gradient backdrops to ensure legibility across diverse display calibrations.
- Responsive Viewports: Optimized layouts across mobile devices (320px+), tablets (768px+), standard desktops (1024px+), and wide monitors (1440px+).

---

## License

This project is released under the MIT License.
