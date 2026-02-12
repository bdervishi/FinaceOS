# FinanceOS - Deployment Guide

## GitHub Repository erstellen

### Option 1: GitHub Web Interface

1. **Go to:** https://github.com/new
2. **Repository name:** `FinanceOS`
3. **Description:** `All-in-One Personal Finance Platform built with Next.js, Supabase, Plaid, and Finnhub`
4. **Visibility:** Public
5. **Initialize:** Do NOT add README (we have one already)
6. Click **"Create repository"**

### Option 2: GitHub CLI (falls installiert)

```bash
cd /home/burim/finance-os
gh repo create FinanceOS --public --description "All-in-One Personal Finance Platform"
git remote add origin https://github.com/anomalyco/FinanceOS.git
git branch -M main
git push -u origin main
```

---

## GitHub authentifizieren

Falls du nach Credentials gefragt wirst:

1. **Falls GitHub CLI nicht installiert:**
   ```bash
   # Install GitHub CLI (Ubuntu/Debian)
   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list
   sudo apt update
   sudo apt install gh
   ```

2. **Oder authentifiziere mit Browser:**
   ```bash
   git push -u origin main
   ```
   → Ein Browser-Fenster öffnet sich für Login

---

## Vercel Deployment

1. **Go to:** https://vercel.com
2. **Sign Up** mit GitHub Account
3. **"Add New Project"**
4. **Import** dein GitHub Repository `anomalyco/FinanceOS`
5. **Environment Variables** hinzufügen:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ixflihypufpbbqsgikaj.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   AUTH0_SECRET=your_generated_secret
   AUTH0_BASE_URL=https://your-vercel-app.vercel.app
   AUTH0_ISSUER_BASE_URL=https://dev-gsfk2mtqhl2w3u4y.us.auth0.com
   AUTH0_CLIENT_ID=Lxi9B4dtvDwgFHY6rV1BJipGffkFjQj5
   AUTH0_CLIENT_SECRET=yGPFYEyrQYI4BIuODsnZ_HpLENSPg_QSPKeKLZ5zMVwTKLgLrmLc4eH0Bhwz2n8b
   PLAID_CLIENT_ID=698da48657d7d1001e943400
   PLAID_SECRET=e9021c89e6c0d48e4b9087956cdc6c
   PLAID_ENV=sandbox
   FINNHUB_API_KEY=d66qd99r01qnh6sfsjf0
   NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
   ```

6. **Deploy** klicken

---

## Supabase Database Setup

1. **Go to:** https://supabase.com → Your Project → SQL Editor
2. **Copy** den Inhalt von `supabase/schema.sql`
3. **Paste** in den SQL Editor
4. **Run** klicken

---

## Auth0 Configuration

1. **Go to:** https://manage.auth0.com → Your Application → Settings

2. **Update URLs:**
   - Allowed Callback URLs: `https://your-vercel-app.vercel.app`
   - Allowed Logout URLs: `https://your-vercel-app.vercel.app`
   - Allowed Web Origins: `https://your-vercel-app.vercel.app`

3. **Save** Changes

---

## Plaid Configuration

1. **Go to:** https://dashboard.plaid.com → Settings → Secrets
2. **Copy** Client ID und Secret
3. **Update** `.env.local` und Vercel Environment Variables

---

## Finnhub Configuration

1. **Go to:** https://finnhub.io → Dashboard
2. **Copy** API Key
3. **Update** `.env.local` und Vercel Environment Variables

---

## Production Checklist

- [ ] GitHub Repository erstellt und gepusht
- [ ] Supabase Database Schema ausgeführt
- [ ] Auth0 URLs auf Production gesetzt
- [ ] Vercel Deployment erfolgreich
- [ ] Environment Variables in Vercel konfiguriert
- [ ] Plaid auf Production Mode umgestellt (falls nötig)
- [ ] Custom Domain konfiguriert (optional)
- [ ] SSL Certificate aktiv (automatisch bei Vercel)

---

## Quick Commands

```bash
# Lokal entwickeln
cd finance-os
npm run dev

# Build prüfen
npm run build

# Deployment
git add .
git commit -m "Update"
git push origin main
```

---

## Support

Bei Fragen:
- Supabase Docs: https://supabase.com/docs
- Auth0 Docs: https://auth0.com/docs
- Plaid Docs: https://plaid.com/docs
- Next.js Docs: https://nextjs.org/docs
