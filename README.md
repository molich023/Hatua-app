hatua-fitness/
├── .github/                # GitHub Actions for CI/CD
├── .netlify/               # Netlify specific local config
├── public/                 # Static assets (Avatars, Logos)
│   └── avatars/            # Simba, Chui, Nyati icons
├── src/
│   ├── app/                # Next.js App Router (Pages & API)
│   │   ├── api/            # Backend endpoints (M-Pesa, Sync, Auth)
│   │   ├── (auth)/         # Login, Register, Forgot Password
│   │   ├── dashboard/      # Main Odometer & Tracking
│   │   └── leaderboard/    # Global & Tier rankings
│   ├── components/         # Reusable UI (Map, Charts, Buttons)
│   ├── lib/                # Database clients & Utilities
│   │   ├── neon-db.ts      # Neon Serverless config
│   │   └── odometer.ts     # Haversine & Step logic
│   ├── hooks/              # Custom React hooks (useGPS, useSteps)
│   └── types/              # TypeScript interfaces
├── drizzle/                # Database migrations (Schema)
├── .gitignore              # Files to ignore in Git
├── drizzle.config.ts       # Neon DB schema manager
├── netlify.toml            # Netlify deployment configuration
├── next.config.js          # Next.js settings
├── package.json            # Dependencies & Scripts
├── postcss.config.js       # Styling (Tailwind)
├── README.md               # Documentation
└── tailwind.config.ts      # UI Theme (Savanna Green/Solar Yellow)


# 🏃 HATUA — Kila hatua ni ushindi mdogo.

**HATUA** is an open-source fitness platform built for the East African market. 
It features a dual-mode odometer (Indoor/Outdoor), an M-Pesa points economy, 
and tiered subscription plans.

## 🛠 Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS
- **Database:** Neon DB (PostgreSQL)
- **Auth:** Neon Authorize / Stack Auth
- **Hosting:** Netlify
- **Maps:** MapLibre GL & OpenStreetMap

## 🇰🇪 Pricing Tiers
| Tier | Price (Annual) | Features |
| :--- | :--- | :--- |
| **Basic** | KSH 100 | Basic Tracking, Leaderboard |
| **Pro** | KSH 500 | AI Routes, No Ads, Referral |
| **Platinum**| KSH 1,000 | Double Points, Heatmaps |

## 🚀 Getting Started
1. `npm install`
2. Set up `.env.local` with your Neon `DATABASE_URL`.
3. `npm run dev`
