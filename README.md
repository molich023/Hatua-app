This is the final, polished README.md for HATUA. It is designed to look professional for your GitHub repository, clearly explaining the "10km = 10 points" logic, the M-Pesa integration, and the Simba/Chui tier system.
## The Final README.md
# 🏃 HATUA — Kila hatua ni ushindi mdogo.

**HATUA** is an open-source fitness platform built specifically for the East African market. It transforms physical movement into a digital economy using a dual-mode odometer, M-Pesa integration, and a tiered competitive leaderboard.

## 🌟 Core Features
- **Precision Odometer:** Real-time GPS tracking using the Haversine formula for accurate distance calculation.
- **Points Economy:** Earn **1 Point for every 1 KM** walked (10km = 10 Points).
- **M-Pesa Integration:** Seamless subscription upgrades via STK Push.
- **Tiered Trophies:** Compete in specific leagues: **Cheetah**, **Chui**, **Simba**, and **Nyati**.
- **Privacy First:** Edge-based middleware for secure authentication via Auth0.

## 🛠 Tech Stack
- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Savanna Green & Solar Yellow theme)
- **Database:** [Neon DB](https://neon.tech/) (Serverless Postgres)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** [Auth0](https://auth0.com/) (Edge Middleware)
- **Hosting:** [Netlify](https://www.netlify.com/)

## 📂 Project Structure
```text
├── src/
│   ├── app/            # Next.js Pages & API (M-Pesa, Sync)
│   ├── components/     # Odometer, Leaderboard UI
│   ├── lib/            # Haversine Math, Neon DB Client, Sync Logic
│   ├── hooks/          # useGPS tracking logic
│   └── types/          # TypeScript Interfaces (Simbas vs Chuis)
├── drizzle/            # Database Migrations
└── public/             # Avatars & Savanna Assets

🚀 Getting Started
1. Clone and Install
git clone [https://github.com/molich023/HATUA.git](https://github.com/molich023/HATUA.git)
cd HATUA
npm install

2. Environment Variables
Create a .env.local file in the root and add your credentials:
# Database
DATABASE_URL=postgres://user:password@neon-host/hatua

# Auth0
NEXT_PUBLIC_AUTH0_DOMAIN=your-tenant.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-client-id
AUTH0_SECRET=your-long-secret

# M-Pesa (Daraja API)
MPESA_CONSUMER_KEY=your-key
MPESA_CONSUMER_SECRET=your-secret

3. Database Setup
Push the schema to your Neon instance:
npx drizzle-kit push:pg

4. Run Locally
npm run dev

🇰🇪 Pricing Tiers
| Tier | Price (Annual) | Feature Highlight |
|---|---|---|
| Cheetah | Free | Basic Tracking |
| Chui | KSH 500 | Training Insights |
| Simba | KSH 1,000 | Elite Leaderboard & Double Points |
| Nyati | KSH 2,500 | Heatmaps & Family Sharing |
🤝 Contributing
We welcome contributions! Please open an issue or submit a pull request if you want to improve the GPS logic or UI.
Built with ❤️ for the Kenyan fitness community. Hatua kwa hatua.

---

### ## Final Deployment Check
Now that your `README.md`, `package.json`, and all `lib` files are ready:
1. **Push to GitHub:** `git add .` -> `git commit -m "Final HATUA Engine build"` -> `git push origin main`.
2. **Watch Netlify:** Since we fixed the `package.json` syntax and the `next.config.js` file earlier, this build should go green.
