# AI-Powered Finance Platform

A comprehensive personal finance management application powered by AI, built with Next.js, Prisma, and Gemini AI.

![Finance Platform Screenshot](public/screenshot.png)

## Features

- **Dashboard:** Financial overview with key metrics and visualizations  
  ![Dashboard Screenshot](public/dashboard.png)

- **Account Management:** Multiple account types support with balance tracking  
  ![Account Management Screenshot](public/account-management.png)

- **Transaction Tracking:** Record and categorize income and expenses  
  ![Transaction Tracking Screenshot](public/transaction-tracking.png)

- **Budgeting:** Create and monitor monthly budgets with spending limits
- **AI Recommendations:** Personalized financial insights and savings opportunities
- **Data Visualization:** Track spending trends and financial patterns
- **Light/Dark Mode:** UI theme support for user preference

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS 3.3, Shadcn UI
- **Backend:** Next.js API routes, Prisma ORM 5.0
- **Database:** PostgreSQL 15 (via Supabase)
- **Authentication:** Clerk 4.6
- **AI:** Google Gemini AI (v2.1) for financial recommendations
- **Email:** Resend 1.2 for transactional emails
- **Background Jobs:** Inngest 0.9
- **Security:** ArcJet 2.0 for API security

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/finance-platform.git
   cd finance-platform
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=
   DIRECT_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   GEMINI_API_KEY=
   RESEND_API_KEY=
   ARCJET_KEY=
   ```

4. Generate Prisma client
   ```bash
   npx prisma generate
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Known Issues

There's currently a JSON parsing error in the AI recommendations API when parsing responses from Gemini AI that needs to be fixed.

## License

MIT
