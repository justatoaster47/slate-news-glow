
## Project Overview
The **econ dashboard web app** is a specialized intelligence platform
designed for **stock traders and business analysts**. It aims to provide a
competitive edge by aggregating data from diverse global and financial
sources (including SEC filings, economic indicators, financial markets, and
news), processing this information using AI for insights like summarization
and trend identification, and presenting it through a consolidated,
user-friendly web dashboard. The platform focuses on delivering curated,
timely, and actionable intelligence relevant to economic impact and business
strategy, facilitating faster and more informed decision-making.

## Core Features
| **Feature**                      | **Description**                                                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Multi-Source Data Aggregation** | Automatically pulls and updates data from configured sources like SEC EDGAR, FRED, financial APIs (Stock/Fundamentals), and News APIs.       |
| **AI Processing & Analysis**    | Parses documents, summarizes articles/filings, performs sentiment analysis, and identifies emerging trends/anomalies using AI.                 |
| **Consolidated Dashboard**      | Central web interface displaying aggregated insights, featuring near real-time feeds, customizable filters (by industry, company, etc.), and interactive data visualizations. |
| **Targeted Relevance Engine**   | Filters information for direct economic/business significance, tailoring context for traders (catalysts, volatility) and analysts (strategy, trends). |
| **User Authentication**         | Secure user registration, login, and profile management (likely via Supabase Auth).                                                               |
| **(Suggested) Watchlists & Alerts** | Allow users to create custom watchlists (stocks, sectors, keywords) and receive personalized notifications for relevant events or data changes. |
| **(Suggested) Advanced AI Insights** | Implement correlation analysis between different datasets (e.g., specific economic indicators and sector performance) and enhanced anomaly detection. |
| **(Suggested) Data Export**        | Enable users to export filtered data sets or specific chart data (e.g., CSV, JSON) for offline analysis or integration with other tools.      |
| **(Suggested) Source Bias Indicator** | (Future Goal Refinement) Develop and display a potential bias score or indicator for news sources based on historical reporting patterns.    |

## Stack / Packages + Links to Documentation URLs
Version Control
  Git: Distributed version control system.
    Documentation URL: https://git-scm.com/doc
Frontend Stack
  Next.js: React framework for building user interfaces and server-side logic. Using App Router and Turbopack (Rust-based bundler).
    Documentation URL: https://nextjs.org/docs
  React: (Core library used by Next.js) JavaScript library for building user interfaces.
    Documentation URL: https://react.dev/
  Tailwind CSS: Utility-first CSS framework for rapid UI development.
    Documentation URL: https://tailwindcss.com/docs
  Shadcn/ui: Re-usable UI components built using Radix UI and Tailwind CSS.
    Documentation URL: https://ui.shadcn.com/docs
  Lucide React: Icon library.
    Documentation URL: https://lucide.dev/guide/packages/lucide-react
  Axios / Fetch API: For client-side API requests (alternative/complement to Next.js Server Actions/Route Handlers).
    Axios Docs: https://axios-http.com/docs/intro
    Fetch API Docs: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
Backend & Database
  Supabase: Backend-as-a-Service platform using PostgreSQL, providing database, authentication, and storage.
    Documentation URL: https://supabase.com/docs
  Next.js API Routes / Server Actions: For backend logic hosted within the Next.js application.
    API Routes Docs: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
    Server Actions Docs: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
Deployment
  Vercel: Platform for deploying the Next.js frontend and serverless functions.
    Documentation URL: https://vercel.com/docs
  Supabase: Hosts the PostgreSQL database and handles backend services like authentication.
    (Covered by Supabase Docs above)

## EXTERNAL ASSETS
**API's:**
  1.  **SEC EDGAR (via SEC API):** Official company filings.
      *   Docs: [https://www.sec.gov/edgar/sec-api-documentation](https://www.sec.gov/edgar/sec-api-documentation)
  2.  **Federal Reserve Economic Data (FRED) API:** Economic indicators.
      *   Docs: [https://fred.stlouisfed.org/docs/api/fred/](https://fred.stlouisfed.org/docs/api/fred/)
  3.  **Alpha Vantage API (Free Tier):** Stock quotes, potentially fundamentals/technicals.
      *   Docs: [https://www.alphavantage.co/documentation/](https://www.alphavantage.co/documentation/)
  4.  **Financial Modeling Prep (FMP) API (Free Tier):** Stock quotes, fundamentals, news.
      *   Docs: [https://site.financialmodelingprep.com/developer/docs](https://site.financialmodelingprep.com/developer/docs)
  5.  **NewsAPI.org (Free Developer Plan):** Global news headlines and articles.
      *   Docs: [https://newsapi.org/docs](https://newsapi.org/docs)
  6.  **US Bureau of Labor Statistics (BLS) API:** Employment, inflation data (CPI).
      *   Docs: [https://www.bls.gov/developers/](https://www.bls.gov/developers/)
  7.  **US Bureau of Economic Analysis (BEA) API:** GDP and economic accounts data.
      *   Docs: [https://apps.bea.gov/api/signup/](https://apps.bea.gov/api/signup/) (Includes link to User Guide)
  8.  **Federal Register API:** Official US government notices and proposed/final rules.
      *   Docs: [https://www.federalregister.gov/developers/api/v1](https://www.federalregister.gov/developers/api/v1)
  9.  **US Census Bureau API:** Demographic and economic survey data.
      *   Docs: [https://www.census.gov/data/developers/guidance.html](https://www.census.gov/data/developers/guidance.html)
  10. **Energy Information Administration (EIA) API:** Energy data (oil, gas prices, inventories).
      *   Docs: [https://www.eia.gov/opendata/documentation.php](https://www.eia.gov/opendata/documentation.php)
  11. **Congress.gov API:** US legislative information.
      *   Docs: [https://api.congress.gov/](https://api.congress.gov/) (Documentation linked from main page)
  12. **USAspending.gov API:** Federal spending data.
      *   Docs: [https://api.usaspending.gov/](https://api.usaspending.gov/)

## File Structure & Architecture
econ-dashboard/
│
├── public/                # Static assets (images, fonts, manifest.json)
│   ├── assets/
│   └── ...
│
├── src/                   # Main source code directory (using src directory pattern)
│   ├── app/               # Next.js App Router: Pages, Layouts, API Routes
│   │   ├── (api)/         # API Route Handlers (e.g., /api/...)
│   │   │   └── ...
│   │   ├── (auth)/        # Authentication related pages (login, signup)
│   │   │   └── ...
│   │   ├── dashboard/     # Main dashboard sections/pages
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   ├── layout.js      # Root layout
│   │   └── page.js        # Root page (e.g., landing or redirect)
│   │
│   ├── components/        # Reusable UI components (Shared & Specific)
│   │   ├── ui/            # Base UI elements from Shadcn (Button, Card, Input etc.)
│   │   ├── charts/        # Charting components
│   │   ├── dashboard/     # Components specific to dashboard sections
│   │   └── shared/        # Components used across multiple pages (e.g., Header, Sidebar)
│   │
│   ├── lib/               # Utilities, helpers, constants, API clients, Supabase client
│   │   ├── api-clients/   # Functions to interact with external APIs
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # General utility functions
│   │   ├── constants.js   # Project constants
│   │   └── supabaseClient.js # Supabase client initialization
│   │
│   ├── services/          # Backend logic, AI processing (can live here or in app/(api)/)
│   │   ├── aggregation/   # Data aggregation logic
│   │   └── analysis/      # AI analysis logic (summarization, sentiment)
│   │
│   └── styles/            # Global styles, Tailwind base/config extensions
│       └── globals.css
│
├── tests/                 # Unit and integration tests (e.g., using Jest, Playwright)
│   └── ...
│
├── .env.local             # Local environment variables (API keys, Supabase keys) - **DO NOT COMMIT**
├── .gitignore             # Specifies intentionally untracked files by Git
├── components.json        # Shadcn/ui configuration
├── next.config.mjs        # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration (for Tailwind)
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration (if using TS)
├── README.md              # Project documentation
└── instructions.md        # This PRD/instructions file

### Curosr Exclude ( -> .cursorignore):
*   `node_modules/`: Contains all project dependencies, very large.
*   `.next/`: Next.js build output directory.
*   `.git/`: Git repository metadata.
*   `.env*`: All environment variable files (except possibly `.env.example`).
*   `*.log`: Log files generated during development or runtime.
*   `build/`, `dist/`, `out/`: General build output directories for various tools.
*   Large static assets or data files not essential for understanding the code structure (e.g., multi-gigabyte datasets, high-res images/videos).
*   Test coverage reports (`coverage/`).
*   `.DS_Store` (macOS specific).
*   `*.pem`, `*.key` (Private keys).

## Best Practices During Implementation / CURSORRULES
* when we encounter a recurring issue, do this:
    1. consider all potential fixes equally, remove any bias you have on what is
    already correct. 
    2. search the web (use brave mcp) on stackoverflow, github
    issues, and any relevant documentation (find documentation links in
    instructions.md)
    3. write a reasoning paragraph for each potential fix you come
    across on why it will and will not work for our use case, our project, and
    the versions of the frameworks/langauges/etc we are using. rank these by
    which you believe is best. 
    4. attempt the best one
    5. if your fix attempts fail. immediately remove any implementations in
       attempting that fix. undo these changes throughly. then move onto the
       next best one. 
    6. repeat until success
* DO NOT DO TASKS THAT ARE COMMENTED OUT: <!-- --> (this
notation)
* plan a task multiple steps ahead before implementation. think through
carefully and gather any context that could be even slighty relevant. 
* implement and fix code in the most concise, elegant way possible. in this
your goal is to achieve the exact functionality with the least amount of code.
* do not add any new features or functionality unless explicitly asked to do
  so. do not change any aspect of code that is not absolutely necessary to
  complete the given task. 
* do not ask me to do tasks such as read files, create files, run commands,
etc if you are able to do them yourself. 
* use consistent naming conventions and file structures.
* before creating any new files, check through all potential directories that
  the files or directories could be in. 
* At the end of every task and every sub-task, include how to verify that it
was implemented successfully and is fully functional. Also list any actions
that need to be taken externally, such as on the Supabase dashboard, Vercel
dashboard, getting API keys, etc.



## Implementation Plan: Econ Dashboard (Slate News Glow)
**Overall Goal:** Develop a functional web application that aggregates
financial and economic data, applies AI for insights, and presents it in a
consolidated dashboard for stock traders and business analysts, including
core features like authentication, data display, and basic AI processing.

### Completed Phases
**Phase 1: Foundation & Core Authentication**
**Goal:** Solidify the project setup, establish database connection, implement robust user authentication, and create the main application layout.
*   **Task 1.1: Project Setup & Configuration Verification**
    *   Action: Verify existing Next.js, Tailwind CSS, and Shadcn/ui setup is correct and functional.
    *   Action: Create/Verify a standard `.gitignore` file suitable for a Next.js/Supabase project (ensure `node_modules`, `.next`, `.env*` etc., are ignored).
    *   Action: Create environment file templates: `.env.local` (for local secrets, ignored by git) and `.env.example` (listing required variables, committed to git).
    *   Action: Ensure ESLint, Prettier configurations are active for code consistency.
    *   [Deliverable]: Verified base project structure, standard `.gitignore`, environment file templates (`.env.local`, `.env.example`).
*   **Task 1.2: Supabase Integration & Database Schema**
    *   Action: Set up a Supabase project via the Supabase dashboard.
    *   Action: Add Supabase Project URL and Anon Key to `.env.local` and list them in `.env.example`.
    *   Action: Configure Supabase CLI tool for local development (Supabase login, link project, test connection).
    *   Action: Install Supabase client libraries: `npm install @supabase/supabase-js @supabase/auth-helpers-nextjs` (or equivalent using your package manager).
    *   Action: Create the Supabase client instance configuration file (`src/lib/supabaseClient.js` or similar) using the environment variables.
    *   Action: Define initial database schemas using the Supabase SQL editor or local migration files (if using Supabase CLI). Define tables like `data_sources` (for managing API source info/status) and maybe a placeholder `aggregated_data` (structure TBD based on specific data needs). Note: The `users` table is implicitly managed by Supabase Auth, but a `profiles` table might be useful for custom user data, linked via foreign key to `auth.users.id`.
    *   [Deliverable]: Functional Supabase instance connected, client libraries installed, client configured, required environment variables defined, initial core DB schema (SQL) created.
**Phase 2: Core Data Aggregation - Backend**
**Goal:** Implement backend logic to fetch data from the *most critical* external APIs and establish a basic data handling strategy.
*   **Task 2.1: API Client Library (`src/lib/api-clients/`)**
    *   Action: Create modular functions/classes to interact with the initial set of external APIs: NewsAPI, Alpha Vantage (or FMP), SEC EDGAR API. Add necessary API keys to `.env.local` / `.env.example`.
    *   Action: Handle API key injection securely from environment variables.
    *   Action: Implement basic error handling and logging for API requests.
    *   [Deliverable]: Reusable library functions for fetching data from core APIs.
*   **Task 2.2: Data Fetching Server Logic (News)**
    *   Action: Create a Next.js Route Handler (e.g., `src/app/api/news/route.js`) or Server Action to fetch news using the NewsAPI client.
    *   Action: Define parameters (e.g., keywords, sources) for fetching relevant news.
    *   Action: Define the data structure (TypeScript interface or shape) for news articles.
    *   [Deliverable]: Backend endpoint/action capable of fetching news data.
*   **Task 2.3: Data Fetching Server Logic (Stocks)**
    *   Action: Create a Route Handler or Server Action to fetch stock quotes/basic data using Alpha Vantage/FMP client.
    *   Action: Define parameters (e.g., stock symbols).
    *   Action: Define the data structure for stock data.
    *   [Deliverable]: Backend endpoint/action capable of fetching basic stock data.
*   **Task 2.4: Data Fetching Server Logic (SEC Filings)**
    *   Action: Create a Route Handler or Server Action to fetch a list of recent SEC filings metadata using the SEC API client.
    *   Action: Focus on retrieving metadata (company name, CIK, form type, filing date, link).
    *   Action: Define the data structure for filing metadata.
    *   [Deliverable]: Backend endpoint/action capable of fetching recent SEC filing metadata.
*   **Task 2.5: Initial Data Caching/Storage Strategy**
    *   Action: Implement basic caching for API responses using Next.js fetch cache options (`cache: 'force-cache'`, `revalidate`) or Vercel Data Cache.
    *   Action: Define strategy for persisting fetched data (e.g., news articles, filing metadata) into Supabase tables if needed for history, analysis, or avoiding repeated fetches. Implement basic Supabase insert/upsert logic within backend fetchers if persistence is required.
    *   [Deliverable]: Basic caching implemented. Strategy and potential implementation for storing fetched data in Supabase.
**Phase 3: Basic Dashboard Implementation**
**Goal:** Display the fetched core data sets on the dashboard in a user-friendly manner.
*   **Task 3.1: Dashboard Page Structure (`src/app/dashboard/page.js`)**
    *   Action: Use Server Components to fetch initial data via the backend logic created in Phase 2 (or trigger client-side fetches if more dynamic interaction is needed).
    *   Action: Implement loading states using Next.js `loading.js` files or React Suspense boundaries.
    *   Action: Implement basic error handling display (e.g., Shadcn `Alert` component for "Failed to load data").
    *   [Deliverable]: Dashboard page structure capable of loading and displaying data components with appropriate loading/error states.
*   **Task 3.2: News Feed Component**
    *   Action: Create a `NewsFeed` component (`src/components/dashboard/NewsFeed.js`) using Shadcn `Card` components or similar layout structures.
    *   Action: Display fetched news articles (title, source, publication date, link to original). Add placeholder for AI summary.
    *   [Deliverable]: A widget displaying a list of recent news articles on the dashboard.
**Phase 4: Core AI Integration**
**Goal:** Integrate basic AI capabilities, starting with text summarization for news articles.
*   **Task 4.1: AI Service Integration (`src/services/analysis/`)**
    *   Action: Choose an AI provider API (e.g., OpenAI, Anthropic, Gemini) and sign up for an API key. Add the key to `.env.local` / `.env.example`.
    *   Action: Create a service function (e.g., `summarizeText(text)` in `src/services/analysis/aiService.js`) to interact securely with the chosen AI API, using the key from environment variables.
    *   [Deliverable]: Backend service function capable of sending text to an AI API and receiving a summary.
*   **Task 4.2: News Summarization Implementation**
    *   Action: Modify the news data fetching/processing logic (e.g., in the Route Handler/Server Action or a separate processing step). Trigger the summarization service for fetched articles. Consider cost/performance implications (summarize on fetch vs. on demand).
    *   Action: Store the generated summary alongside the news article data (in cache or Supabase DB). Update the corresponding schema if storing in DB.
    *   Action: Update the `NewsFeed` component (`src/components/dashboard/NewsFeed.js`) to display the AI-generated summary if available.
    *   [Deliverable]: News articles displayed on the dashboard include AI-generated summaries.

### Phases In Progress 
**Phase 5: Dashboard Enhancement & Filtering**
**Goal:** Improve dashboard usability with filtering, add more data sources (economic indicators), and introduce basic charting.

*   **Task 5.1: Add Economic Indicators (FRED/BLS)**
    *   Action: Add API clients for FRED and/or BLS APIs (`src/lib/api-clients/`). Add required keys/registration info to `.env`.
    *   Action: Implement backend logic (Route Handlers/Server Actions) to fetch key indicators (e.g., GDP, CPI, Unemployment Rate).
    *   Action: Define data structures for these indicators.
    *   [Deliverable]: Backend capable of fetching key economic indicators.

*   **Task 5.2: Basic Data Visualization**
    *   Action: Integrate a charting library compatible with Next.js/React (e.g., Recharts, Tremor). Create reusable chart components in `src/components/charts/`.
    *   Action: Create a dashboard widget (`src/components/dashboard/EconomicIndicatorChart.js`) to display fetched economic indicators using basic charts (e.g., line, bar).
    *   [Deliverable]: Dashboard includes widgets with basic charts for economic data.

*   **Task 5.3: Dashboard Filtering (Basic)**
    *   Action: Implement basic filtering controls on the dashboard using Shadcn components (e.g., `Select` for sources, `Input` for keywords).
    *   Action: Update data fetching logic to accept filter parameters. This might involve making fetches client-side or using Server Actions triggered by filter changes to update data passed to Server Components.
    *   Action: Re-render relevant widgets when filters change (manage state appropriately).
    *   [Deliverable]: Users can apply basic filters to refine the displayed data (e.g., news feed).

*   **Task 5.4: UI/UX Refinements**
    *   Action: Improve loading states, error handling messages, and responsiveness across components.
    *   Action: Ensure consistent styling and usability based on Shadcn UI principles. Review accessibility.
    *   [Deliverable]: More polished and user-friendly dashboard interface.

**Phase 6: Suggested Features (Initial Implementation)**
**Goal:** Begin implementing high-priority suggested features like Watchlists.

*   **Task 6.1: Watchlist Feature - Backend**
    *   Action: Design and implement DB schema for user watchlists (e.g., `watchlists` table with `user_id` (FK to `auth.users`), `item_type` (e.g., 'stock', 'keyword'), `item_value`).
    *   Action: Implement Supabase Row Level Security (RLS) policies on the `watchlists` table to ensure users can only access/modify their own data.
    *   Action: Create API endpoints/Server Actions for CRUD operations (Create, Read, Update, Delete) on watchlist items, respecting RLS.
    *   [Deliverable]: Backend functionality and secure database structure for managing user-specific watchlists.

*   **Task 6.2: Watchlist Feature - Frontend**
    *   Action: Create UI components (`src/components/dashboard/WatchlistManager.js`, potentially within a Modal or separate settings area) for managing watchlists.
    *   Action: Allow users to add/remove stocks (or other entities like keywords) to their watchlists via the UI.
    *   Action: Modify relevant dashboard widgets (e.g., `StockTicker`) to fetch and display data based on the current user's watchlist retrieved from the backend.
    *   [Deliverable]: Users can create and manage personal watchlists, and the dashboard reflects their selections.

*   **Task 6.3: Expand Data Sources (Tier 2)**
    *   Action: Gradually integrate more APIs from the list based on priority (e.g., BEA, EIA, Federal Register).
    *   Action: Create corresponding API clients, backend fetchers, database storage considerations (if needed), and frontend display components/widgets.
    *   [Deliverable]: Dashboard incorporates data from additional relevant sources.

**Phase 7: Testing, Deployment & Polish**
**Goal:** Ensure the application is stable, performant, secure, and ready for initial deployment.

*   **Task 7.1: Testing**
    *   Action: Write unit tests for critical utilities, API clients, and potentially complex components (using Jest/React Testing Library).
    *   Action: Write integration tests for authentication flow, watchlist CRUD, and core data fetching/display pipelines.
    *   Action: Perform manual End-to-End testing (consider Playwright or Cypress for automation later).
    *   [Deliverable]: Test suite providing confidence in application stability and correctness.

*   **Task 7.2: Performance & Optimization**
    *   Action: Analyze application performance using browser dev tools and Vercel Analytics (load times, Largest Contentful Paint, Interaction to Next Paint).
    *   Action: Optimize data fetching (pagination for long lists, review caching strategies, selective fetching).
    *   Action: Review Next.js build output and optimize bundle sizes (dynamic imports, code splitting).
    *   [Deliverable]: Improved application performance and responsiveness.

*   **Task 7.3: Security Hardening**
    *   Action: Thoroughly review and test Supabase Row Level Security (RLS) policies.
    *   Action: Ensure proper input validation and sanitization on all user inputs and API interactions (client and server side).
    *   Action: Verify secure handling and non-exposure of all API keys and secrets. Check server-side logic for potential vulnerabilities.
    *   [Deliverable]: Enhanced application security posture.

*   **Task 7.4: Documentation**
    *   Action: Update `README.md` with accurate setup instructions, project overview, feature list, and environment variable explanations.
    *   Action: Add JSDoc or TypeScript types for better code understanding. Add comments to complex logic sections.
    *   [Deliverable]: Clear documentation for developers.

*   **Task 7.5: Deployment**
    *   Action: Configure Vercel project settings: link Git repository, set build commands, configure environment variables (including Supabase keys, AI keys, etc.).
    *   Action: Deploy the application to Vercel via Git pushes. Set up production and preview environments.
    *   Action: Set up basic monitoring and logging (Vercel built-ins, Supabase logs).
    *   [Deliverable]: Application deployed and accessible online via Vercel.

---

**Future Phases (Post-MVP):**

*   **Advanced AI:** Correlation analysis, sophisticated anomaly detection, SEC document deep parsing/summarization.
*   **Alerts & Notifications:** Real-time/scheduled alerts (email, in-app) based on watchlists or data triggers (requires background jobs/triggers).
*   **Advanced Filtering & Relevance:** Multi-faceted filtering, user preference settings influencing data presentation.
*   **Data Export:** CSV/JSON export functionality.
*   **Source Bias Indicator:** Research and implementation.
*   **Full Mobile Responsiveness & UX Overhaul:** Dedicated refinement pass.

