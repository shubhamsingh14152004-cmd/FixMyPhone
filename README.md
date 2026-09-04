# FixMyPhone — Full-Stack Mobile Phone Repair App

FixMyPhone is a full-stack web application for phone repairs, service bookings, status tracking, and admin management.

```text
.
├── api/            ← Vercel Serverless Function entry point (api/index.js)
├── backend/        ← Express REST API & Data Store
├── frontend/       ← Vite frontend client (HTML/CSS/JS)
├── vercel.json     ← Vercel build & SPA rewrite configuration
└── package.json    ← Unified workspace scripts and dependencies
```

---

## How to Run Locally

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Start Development Servers
```bash
npm run dev
```
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **Frontend App**: [http://localhost:5173](http://localhost:5173) (Vite Dev Server with hot reload)

### Default Admin Credentials
- **URL**: `http://localhost:5173/#login` (or `/#admin`)
- **Email**: `admin@fixmyphone.com`
- **Password**: `Admin@123`

---

# Deploying to Vercel

The application is fully configured for deployment on **Vercel** with both the Vite frontend and Express serverless backend running under the same origin (`https://<your-app>.vercel.app`).

### 1. Push to GitHub
Make sure your latest code is pushed to your GitHub repository:
```bash
git add .
git commit -m "Prepare app for Vercel deployment"
git push origin main
```

### 2. Import Project in Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New... > Project**.
2. Select your GitHub repository.
3. Keep the default framework detection or select **Other / Vite**.
4. Configure Project Settings:
   - **Framework Preset**: `Other` or `Vite`
   - **Root Directory**: `./` (Leave blank or set to `./`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install`

### 3. Required Environment Variables

Add the following Environment Variables in Vercel (**Project Settings > Environment Variables**):

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_EMAIL` | Yes | Admin login email |
| `ADMIN_PASSWORD` | Yes | Secure admin password |
| `JWT_SECRET` | Yes | Single secret key used for signing JWT session tokens |
| `NODE_ENV` | Yes | Set to `production` |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins (defaults to allowing same-origin) |

#### Environment Configuration for `JWT_SECRET`:
- **Production**: `JWT_SECRET` = Generate privately in Vercel UI or CLI (see below)
- **Preview**: `JWT_SECRET` = Generate a separate secure value (or check "Apply to Preview" in Vercel)
- **Development**: `JWT_SECRET` = Defined in local `.env` file (never committed)

#### How to Generate a Secure `JWT_SECRET` Locally:
Run this Node.js command in your terminal to generate a strong 256-bit random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Or using OpenSSL:
```bash
openssl rand -hex 32
```
Copy the generated string and paste it into Vercel Project Settings for `JWT_SECRET`. Do **NOT** commit this value to Git.

### 4. How Frontend/Backend Routing Works
- Requests to `/api/*` are routed to the Express serverless function (`api/index.js`).
- Requests to static assets (HTML/JS/CSS) are served directly from `frontend/dist`.
- Direct route navigations (e.g., `/admin`, `/login`) automatically rewrite to `/index.html` for single-page app (SPA) routing.

### 5. Database Requirements & Production Persistence
- **Demo/Testing Mode**: The app reads initial seeded data from `backend/storage/database.json`. In Vercel serverless environments where local disk access is read-only, runtime modifications (new bookings, settings changes) use `/tmp` fallback storage and in-memory caching.
- **Production Scale**: For persistent data across multiple lambdas, replace `readDB()` / `writeDB()` in `backend/src/data/store.js` with a persistent database client (e.g. **PostgreSQL / Neon**, **Supabase**, or **MongoDB**). Every backend route talks exclusively to `getCollection()` and `setCollection()`, making database swaps seamless.

### 6. Local Development vs Production Testing
- **Local Dev**: Frontend proxies `/api` calls to `http://localhost:3000` via Vite.
- **Production**: Frontend automatically makes same-origin requests to `/api/*` without requiring hardcoded backend URLs.

### 7. Common Deployment Problems & Solutions

| Issue | Cause | Solution |
| --- | --- | --- |
| **500 error on API calls** | Missing environment variables | Ensure `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` are set in Vercel project settings. |
| **404 on direct refresh of /admin** | Missing SPA rewrite rule | Ensure `vercel.json` contains rewrites for `/(.*)` pointing to `/index.html`. |
| **CORS blocked** | Misconfigured origin header | Remove `ALLOWED_ORIGINS` or ensure it matches your exact Vercel domain (`https://<app>.vercel.app`). |
| **Native build failure** | Committed `node_modules` | Untrack `node_modules` from Git index (`git rm -r --cached node_modules`) and rely on Vercel install. |

---

## License
MIT License - FixMyPhone Team
