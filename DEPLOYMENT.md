# 2 Stray Cats — AWS Amplify Deployment Guide

## What AWS Amplify Does Automatically

Once connected to GitHub, Amplify:
- Watches your branches for any new push/merge
- Runs the build (`npm ci` + `npm run build`) on its own servers
- Deploys to a global CDN with HTTPS automatically
- No GitHub Actions, no servers, no manual steps

---

## One-Time Setup (~15 minutes)

### Step 1 — Open AWS Amplify Console

Go to: https://ap-south-1.console.aws.amazon.com/amplify/home

---

### Step 2 — Create Testing Environment

1. Click **"New App" → "Host Web App"**
2. Select **GitHub** → Authorize AWS Amplify
3. Repository: `prateekrepo-space/2-stray-cats`
4. Branch: **`test`**
5. App name: `2cat-test`
6. Build settings: Amplify will auto-detect `amplify.yml` ✅
7. Environment variables (click "Advanced"):
   ```
   NEXT_PUBLIC_ENV = testing
   ```
8. Click **Save and Deploy**
9. Your Testing URL will be: `https://test.XXXX.amplifyapp.com`

---

### Step 3 — Create Production Environment

1. Click **"New App" → "Host Web App"** again
2. Repository: `prateekrepo-space/2-stray-cats`
3. Branch: **`main`**
4. App name: `2cat-prod`
5. Environment variables:
   ```
   NEXT_PUBLIC_ENV = production
   ```
6. Click **Save and Deploy**
7. Your Production URL will be: `https://main.XXXX.amplifyapp.com`

---

## Your Daily Workflow After Setup

```
# Work on a feature
git checkout test
git checkout -b feature/my-feature

# Make changes, then push
git add .
git commit -m "feat: my new feature"
git push origin feature/my-feature

# Open PR on GitHub: feature/my-feature → test
# Merge PR → Amplify auto-builds & deploys to Testing ✅

# Verify on Testing URL
# Open PR on GitHub: test → main
# Merge PR → Amplify auto-builds & deploys to Production ✅
```

---

## What Triggers Auto-Deploy

| Event                    | Environment  |
|--------------------------|--------------|
| Push / Merge to `test`   | Testing      |
| Push / Merge to `main`   | Production   |

## Amplify Free Tier Limits

| Resource                | Free Tier         |
|-------------------------|-------------------|
| Build minutes           | 1,000 min/month   |
| Data served             | 15 GB/month       |
| Requests                | 500,000/month     |
| Storage                 | 5 GB              |

> Your 2.2 MB pixel scene site will comfortably stay in the free tier.
